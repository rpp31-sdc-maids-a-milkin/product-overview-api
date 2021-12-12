module.exports = {
  env: {
    node: true,
    jest: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    rules: {
    },
    plugins: ['only-warn']
  }
}
