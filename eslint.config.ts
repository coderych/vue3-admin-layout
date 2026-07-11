import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  vue: true,
  isInEditor: false,
  rules: {
    'vue/max-attributes-per-line': ['error', { singleline: 4 }],
    'no-console': 'off',
  },
  ignores: ['**/*.md'],
})
