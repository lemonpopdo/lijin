import uni from '@uni-helper/eslint-config'

export default uni(
  {
    unocss: true,
    ignores: [
      'src/components/qiun-data-charts/**',
      'src/components/u-charts/**',
      'src/components/qiun-error/**',
      'src/components/qiun-loading/**',
      'landing/**',
      'doc/**',
      'pocketbase/pb_data/**',
      'pocketbase/seed.js',
    ],
    stylistic: {
      overrides: {
        'antfu/top-level-function': 'off',
      },
    },
    rules: {
      'vue/first-attribute-linebreak': [
        'error',
        {
          multiline: 'ignore',
        },
      ],
    },
  },
)
