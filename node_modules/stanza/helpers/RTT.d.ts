import { RTT, RTTAction } from '../protocol';
export declare type UnicodeBuffer = number[];
export interface DisplayBufferState {
    text: string;
    cursorPosition: number;
    synced: boolean;
    drained?: boolean;
}
export interface InputBufferState {
    text: string;
}
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
export declare function diff(oldText: UnicodeBuffer, newText: UnicodeBuffer): RTTAction[];
/**
 * Class for processing RTT events and providing a renderable string of the resulting text.
 */
export declare class DisplayBuffer {
    synced: boolean;
    onStateChange: (state: DisplayBufferState) => void;
    cursorPosition: number;
    ignoreWaits: boolean;
    private buffer;
    private timeDeficit;
    private sequenceNumber;
    private actionQueue;
    constructor(onStateChange?: (state: DisplayBufferState) => void, ignoreWaits?: boolean);
    /**
     * The encoded Unicode string to display.
     */
    get text(): string;
    /**
     * Mark the RTT message as completed and reset state.
     */
    commit(): void;
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
    process(event: RTT): void;
    /**
     * Insert text into the Unicode code point buffer
     *
     * By default, the insertion position is the end of the buffer.
     *
     * @param text The raw text to insert
     * @param position The position to start the insertion
     */
    private insert;
    /**
     * Erase text from the Unicode code point buffer
     *
     * By default, the erased text length is `1`, and the position is the end of the buffer.
     *
     * @param length The number of code points to erase from the buffer, starting at {position} and erasing to the left.
     * @param position The position to start erasing code points. Erasing continues to the left.
     */
    private erase;
    private emitState;
    /**
     * Reset the processing state and queue.
     *
     * Used when 'init', 'new', 'reset', and 'cancel' RTT events are processed.
     */
    private resetActionQueue;
}
/**
 * Class for tracking changes in a source text, and generating RTT events based on those changes.
 */
export declare class InputBuffer {
    onStateChange: (state: InputBufferState) => void;
    resetInterval: number;
    ignoreWaits: boolean;
    sequenceNumber: number;
    private isStarting;
    private isReset;
    private buffer;
    private actionQueue;
    private lastActionTime?;
    private lastResetTime?;
    private changedBetweenResets;
    constructor(onStateChange?: (state: InputBufferState) => void, ignoreWaits?: boolean);
    get text(): string;
    /**
     * Generate action deltas based on the new full state of the source text.
     *
     * The text provided here is the _entire_ source text, not a diff.
     *
     * @param text The new state of the user's text.
     */
    update(text?: string): void;
    /**
     * Formally start an RTT session.
     *
     * Generates a random starting event sequence number.
     *
     * @param resetInterval {Milliseconds} Time to wait between using RTT reset events during editing.
     */
    start(resetInterval?: number): RTT;
    /**
     * Formally stops the RTT session.
     */
    stop(): RTT;
    /**
     * Generate an RTT event based on queued edit actions.
     *
     * The edit actions included in the event are all those made since the last
     * time a diff was requested.
     */
    diff(): RTT | null;
    /**
     * Reset the RTT session state to prepare for a new message text.
     */
    commit(): void;
    private emitState;
}
