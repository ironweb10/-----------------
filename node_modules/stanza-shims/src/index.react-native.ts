import * as RNRandomBytes from 'react-native-randombytes';

export * from './index.browser';

export function randomBytes(size: number) {
    return RNRandomBytes.randomBytes(size);
}
