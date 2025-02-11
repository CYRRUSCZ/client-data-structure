import * as esbuild from 'esbuild'

await esbuild.build({
    entryPoints: ['src/test.ts'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile: 'dist/test.esm.js',
})