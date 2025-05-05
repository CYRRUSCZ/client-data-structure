import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/*.ts'],
    format: ['cjs', 'esm'],
    target: ['node16', 'es2022'],
    splitting: false,
    sourcemap: true,
    clean: true,
    dts: true,
    cjsInterop: true,
    minify: true
})
