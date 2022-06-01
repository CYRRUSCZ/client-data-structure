import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import dts from 'rollup-plugin-dts'

export default [
    {
        input: 'lib/index.js',
        output: [
            {
                file: 'dist/clientdatastructure.js',
                format: 'cjs'
            },
            {
                file: 'dist/clientdatastructure.esm.js',
                format: 'esm'
            }
        ],
        plugins: [
            resolve(),
            commonjs(),
            babel({
                exclude: 'node_modules/**'
            })
        ]
    },
    {
        input: 'lib/types/index.d.ts',
        output: [
            {
                file: 'dist/index.d.ts',
                format: 'es'
            }
        ],
        plugins: [
            dts()
        ]
    }
]
