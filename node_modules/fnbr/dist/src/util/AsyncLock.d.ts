/**
 * Represents an asynchronous task lock used for pending token refreshing or party changes
 * @private
 */
declare class AsyncLock {
    /**
     * The lock promise
     */
    private lockPromise?;
    constructor();
    /**
     * Whether this lock is active
     */
    get isLocked(): boolean;
    /**
     * Returns a promise that will resolve once the lock is released
     */
    wait(): Promise<void>;
    /**
     * Activates this lock
     */
    lock(): void;
    /**
     * Deactivates this lock
     */
    unlock(): void;
}
export default AsyncLock;
