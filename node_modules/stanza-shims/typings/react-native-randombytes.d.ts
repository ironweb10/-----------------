declare module 'react-native-randombytes' {
    export function randomBytes(size: number): Buffer;
    export function randomBytes(size: number, cb: (err: Error | undefined, bytes?: Buffer) => void): void;
}
