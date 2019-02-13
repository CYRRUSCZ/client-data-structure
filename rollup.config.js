import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default [{
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
}];