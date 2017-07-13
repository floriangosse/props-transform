
module.exports = {
    root: true,

    extends: 'eslint:recommended',

    parser: 'babel-eslint',
    env: {
        node: true,
        es6: true
    },

    rules: {
        indent: ['error', 4, {
            SwitchCase: 1,
        }]
    }
}
