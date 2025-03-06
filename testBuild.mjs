import * as esbuild from 'esbuild'

await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    outfile: 'test/client-data-structure.cjs'
})