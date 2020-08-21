module.exports = {
    root: true,
    env: {
        browser: true
    },
    extends: 'standard',
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: ['error', 4, { SwitchCase: 1, ignoredNodes: ['TemplateLiteral'] }], // ignoredNodes - temporary wk for babel bug
        'no-prototype-builtins': 'off',
        'template-curly-spacing': 'off' // temporary wk for babel bug
    }
}
