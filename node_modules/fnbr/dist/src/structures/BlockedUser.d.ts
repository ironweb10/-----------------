import User from './User';
/**
 * Represents a blocked user
 */
declare class BlockedUser extends User {
    /**
     * Unblocks this user
     * @throws {UserNotFoundError} The user wasn't found
     * @throws {EpicgamesAPIError}
     */
    unblock(): Promise<void>;
}
export default BlockedUser;
