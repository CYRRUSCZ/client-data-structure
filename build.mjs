import * as esbuild from 'esbuild'
import { readFileSync } from 'node:fs'

const { peerDependencies } = JSON.parse(readFileSync('package.json', 'utf-8'))
const external = Object.keys(peerDependencies)

await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile: 'dist/client-data-structure.esm.js',
    external,
    minify: true,
    sourcemap: true
})

await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'browser',
    format: 'esm',
    outfile: 'dist/client-data-structure.browser.esm.js',
    external,
    minify: true,
    sourcemap: true
})

await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    outfile: 'dist/client-data-structure.bundle.cjs',
    external: [],
    minify: true,
    sourcemap: true
})