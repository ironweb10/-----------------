import resolve from 'rollup-plugin-node-resolve';

export default {
    external: [
        'crypto',
        'node-fetch',
        'readable-stream',
        'stream',
        'tslib',
        'ws'
    ],
    input: 'dist/es/index.browser.js',
    output: {
        file: 'dist/index.browser-module.js',
        format: 'es'
    },
    plugins: [resolve()]
};
