"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputBuffer = exports.DisplayBuffer = exports.diff = void 0;
const tslib_1 = require("tslib");
const async_1 = require("async");
const punycode_1 = tslib_1.__importDefault(require("punycode"));
/**
 * Calculate the erase and insert actions needed to describe the user's edit operation.
 *
 * Based on the code point buffers before and after the edit, we find the single erase
 * and insert actions needed to describe the full change. We are minimizing the number
 * of deltas, not minimizing the number of affected code points.
 *
 * @param oldText The original buffer of Unicode code points before the user's edit action.
 * @param newText The new buffer of Unicode code points after the user's edit action.
 */
function diff(oldText, newText) {
    const oldLen = oldText.length;
    const newLen = newText.length;
    const searchLen = Math.min(oldLen, newLen);
    let prefixSize = 0;
    for (prefixSize = 0; prefixSize < searchLen; prefixSize++) {
        if (oldText[prefixSize] !== newText[prefixSize]) {
            break;
        }
    }
    let suffixSize = 0;
    for (suffixSize = 0; suffixSize < searchLen - prefixSize; suffixSize++) {
        if (oldText[oldLen - suffixSize - 1] !== newText[newLen - suffixSize - 1]) {
            break;
        }
    }
    const matchedSize = prefixSize + suffixSize;
    const events = [];
    if (matchedSize < oldLen) {
        events.push({
            length: oldLen - matchedSize,
            position: oldLen - suffixSize,
            type: 'erase'
        });
    }
    if (matchedSize < newLen) {
        const insertedText = newText.slice(prefixSize, prefixSize + newLen - matchedSize);
        events.push({
            position: prefixSize,
            text: punycode_1.default.ucs2.encode(insertedText),
            type: 'insert'
        });
    }
    return events;
}
exports.diff = diff;
/**
 * Class for processing RTT events and providing a renderable string of the resulting text.
 */
class DisplayBuffer {
    constructor(onStateChange, ignoreWaits = false) {
        this.synced = false;
        this.cursorPosition = 0;
        this.ignoreWaits = false;
        this.timeDeficit = 0;
        this.sequenceNumber = 0;
        this.onStateChange =
            onStateChange ||
                function noop() {
                    return;
                };
        this.ignoreWaits = ignoreWaits;
        this.buffer = [];
        this.resetActionQueue();
    }
    /**
     * The encoded Unicode string to display.
     */
    get text() {
        return punycode_1.default.ucs2.encode(this.buffer.slice());
    }
    /**
     * Mark the RTT message as completed and reset state.
     */
    commit() {
        this.resetActionQueue();
    }
    /**
     * Accept an RTT event for processing.
     *
     * A single event can contain multiple edit actions, including
     * wait pauses.
     *
     * Events must be processed in order of their `seq` value in order
     * to stay in sync.
     *
     * @param event {RTTEvent} The RTT event to process.
     */
    process(event) {
        if (event.event === 'cancel' || event.event === 'init') {
            this.resetActionQueue();
            return;
        }
        else if (event.event === 'reset' || event.event === 'new') {
            this.resetActionQueue();
            if (event.seq !== undefined) {
                this.sequenceNumber = event.seq;
            }
        }
        else if (event.seq !== this.sequenceNumber) {
            this.synced = false;
        }
        if (event.actions) {
            const baseTime = Date.now();
            let accumulatedWait = 0;
            for (const action of event.actions) {
                action.baseTime = baseTime + accumulatedWait;
                if (action.type === 'wait') {
                    accumulatedWait += action.duration;
                }
                this.actionQueue.push(action, 0);
            }
        }
        this.sequenceNumber = this.sequenceNumber + 1;
    }
    /**
     * Insert text into the Unicode code point buffer
     *
     * By default, the insertion position is the end of the buffer.
     *
     * @param text The raw text to insert
     * @param position The position to start the insertion
     */
    insert(text = '', position = this.buffer.length) {
        text = text.normalize('NFC');
        const insertedText = punycode_1.default.ucs2.decode(text);
        this.buffer.splice(position, 0, ...insertedText);
        this.cursorPosition = position + insertedText.length;
        this.emitState();
    }
    /**
     * Erase text from the Unicode code point buffer
     *
     * By default, the erased text length is `1`, and the position is the end of the buffer.
     *
     * @param length The number of code points to erase from the buffer, starting at {position} and erasing to the left.
     * @param position The position to start erasing code points. Erasing continues to the left.
     */
    erase(length = 1, position = this.buffer.length) {
        position = Math.max(Math.min(position, this.buffer.length), 0);
        length = Math.max(Math.min(length, this.text.length), 0);
        this.buffer.splice(Math.max(position - length, 0), length);
        this.cursorPosition = Math.max(position - length, 0);
        this.emitState();
    }
    emitState(additional = {}) {
        this.onStateChange({
            cursorPosition: this.cursorPosition,
            synced: this.synced,
            text: this.text,
            ...additional
        });
    }
    /**
     * Reset the processing state and queue.
     *
     * Used when 'init', 'new', 'reset', and 'cancel' RTT events are processed.
     */
    resetActionQueue() {
        if (this.actionQueue) {
            this.actionQueue.kill();
        }
        this.sequenceNumber = 0;
        this.synced = true;
        this.buffer = [];
        this.timeDeficit = 0;
        this.actionQueue = async_1.priorityQueue((action, done) => {
            const currentTime = Date.now();
            if (action.type === 'insert') {
                this.insert(action.text, action.position);
                return done();
            }
            else if (action.type === 'erase') {
                this.erase(action.length, action.position);
                return done();
            }
            else if (action.type === 'wait') {
                if (this.ignoreWaits) {
                    return done();
                }
                if (action.duration > 700) {
                    action.duration = 700;
                }
                const waitTime = action.duration - (currentTime - action.baseTime) + this.timeDeficit;
                if (waitTime <= 0) {
                    this.timeDeficit = waitTime;
                    return done();
                }
                else {
                    this.timeDeficit = 0;
                    setTimeout(() => done(), waitTime);
                }
            }
            else {
                return done();
            }
        }, 1);
        this.emitState();
    }
}
exports.DisplayBuffer = DisplayBuffer;
/**
 * Class for tracking changes in a source text, and generating RTT events based on those changes.
 */
class InputBuffer {
    constructor(onStateChange, ignoreWaits = false) {
        this.resetInterval = 10000;
        this.ignoreWaits = false;
        this.isStarting = false;
        this.isReset = false;
        this.changedBetweenResets = false;
        this.onStateChange =
            onStateChange ||
                function noop() {
                    return;
                };
        this.ignoreWaits = ignoreWaits;
        this.buffer = [];
        this.actionQueue = [];
        this.sequenceNumber = 0;
    }
    get text() {
        return punycode_1.default.ucs2.encode(this.buffer.slice());
    }
    /**
     * Generate action deltas based on the new full state of the source text.
     *
     * The text provided here is the _entire_ source text, not a diff.
     *
     * @param text The new state of the user's text.
     */
    update(text) {
        let actions = [];
        if (text !== undefined) {
            text = text.normalize('NFC');
            const newBuffer = punycode_1.default.ucs2.decode(text);
            actions = diff(this.buffer, newBuffer.slice());
            this.buffer = newBuffer;
            this.emitState();
        }
        const now = Date.now();
        if (this.changedBetweenResets && now - this.lastResetTime > this.resetInterval) {
            this.actionQueue = [];
            this.actionQueue.push({
                position: 0,
                text: this.text,
                type: 'insert'
            });
            this.isReset = true;
            this.lastActionTime = now;
            this.lastResetTime = now;
            this.changedBetweenResets = false;
        }
        else if (actions.length) {
            const wait = now - (this.lastActionTime || now);
            if (wait > 0 && !this.ignoreWaits) {
                this.actionQueue.push({
                    duration: wait,
                    type: 'wait'
                });
            }
            for (const action of actions) {
                this.actionQueue.push(action);
            }
            this.lastActionTime = now;
            this.changedBetweenResets = true;
        }
        else {
            this.lastActionTime = now;
        }
    }
    /**
     * Formally start an RTT session.
     *
     * Generates a random starting event sequence number.
     *
     * @param resetInterval {Milliseconds} Time to wait between using RTT reset events during editing.
     */
    start(resetInterval = this.resetInterval) {
        this.commit();
        this.isStarting = true;
        this.resetInterval = resetInterval;
        this.sequenceNumber = Math.floor(Math.random() * 10000 + 1);
        return {
            event: 'init'
        };
    }
    /**
     * Formally stops the RTT session.
     */
    stop() {
        this.commit();
        return {
            event: 'cancel'
        };
    }
    /**
     * Generate an RTT event based on queued edit actions.
     *
     * The edit actions included in the event are all those made since the last
     * time a diff was requested.
     */
    diff() {
        this.update();
        if (!this.actionQueue.length) {
            return null;
        }
        const event = {
            actions: this.actionQueue,
            seq: this.sequenceNumber++
        };
        if (this.isStarting) {
            event.event = 'new';
            this.isStarting = false;
            this.lastResetTime = Date.now();
        }
        else if (this.isReset) {
            event.event = 'reset';
            this.isReset = false;
        }
        this.actionQueue = [];
        return event;
    }
    /**
     * Reset the RTT session state to prepare for a new message text.
     */
    commit() {
        this.sequenceNumber = 0;
        this.lastActionTime = 0;
        this.actionQueue = [];
        this.buffer = [];
    }
    emitState() {
        this.onStateChange({
            text: this.text
        });
    }
}
exports.InputBuffer = InputBuffer;
