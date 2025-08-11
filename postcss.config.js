module.exports = {
  plugins: {
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
        'logical-properties-and-values': true,
        'media-query-ranges': true,
        'custom-media-queries': true,
        'color-functional-notation': true,
        'color-mix': true,
      },
    },
    autoprefixer: {},
    cssnano: process.env.NODE_ENV === 'production' ? { preset: 'default' } : false,
  },
};
