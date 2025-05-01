module.exports = {
  customSyntax: require('postcss-scss'),
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-prettier/recommended',
  ],
  plugins: [
    'stylelint-order',
    'stylelint-scss',
  ],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'scss/double-slash-comment-whitespace-inside': 'always',
    'selector-class-pattern': null,
    'custom-property-empty-line-before': null,
    'color-hex-length': 'long',
    'block-no-empty': null,
  },
};