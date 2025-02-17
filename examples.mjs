import * as esbuild from 'esbuild'

await esbuild.build({
    entryPoints: ['exampleValidations.ts'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile: 'dist/exampleValidations.esm.js',
})