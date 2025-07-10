module.exports = {
  plugins: [
    // Autoprefixer for cross-browser compatibility
    require('autoprefixer')({
      flexbox: 'no-2009',
      grid: 'autoplace',
    }),
    
    // PostCSS Preset Env for modern CSS features
    require('postcss-preset-env')({
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'media-query-ranges': true,
        'custom-properties': true,
        'color-functional-notation': true,
        'logical-properties-and-values': true,
        'overflow-property': true,
        'place-properties': true,
        'focus-visible-pseudo-class': true,
        'focus-within-pseudo-class': true,
        'color-mix': true,
      },
    }),
    
    // CSS Nano for production optimization (only in production)
    ...(process.env.NODE_ENV === 'production' ? [require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        normalizeWhitespace: true,
        colormin: true,
        minifyFontValues: true,
        minifyGradients: true,
        minifyParams: true,
        minifySelectors: true,
        mergeLonghand: true,
        mergeRules: true,
        reduceIdents: false,
        reduceInitial: true,
        reduceTransforms: true,
        uniqueSelectors: true,
        zindex: false,
      }],
    })] : []),
  ],
}; 