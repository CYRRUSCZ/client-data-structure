import { defineConfig } from 'tsdown'

export default defineConfig({
    entry: ['src/*.ts'],
    format: ['cjs', 'esm'],
    target: ['node16', 'es2025'],
    sourcemap: true,
    clean: true,
    dts: true,
    minify: false,
    deps: {
        neverBundle: true
    }
})
