module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'indent': ['error', 2],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': ['error', 'always'],
    'quotes': [
      'error',
      'single',
      {
        'avoidEscape': true
      }
    ],
    'vue/no-v-html': 'off',
    'vue/html-indent': ['error', 2],
    'vue/html-self-closing': 'error',
    'vue/html-closing-bracket-newline': 'error',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ]
  }
};
