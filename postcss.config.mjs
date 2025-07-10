import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';

export default {
  plugins: [
    // Autoprefixer for cross-browser compatibility
    autoprefixer({
      flexbox: 'no-2009',
      grid: 'autoplace',
    }),
    
    // PostCSS Preset Env for modern CSS features
    postcssPresetEnv({
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
    ...(process.env.NODE_ENV === 'production' ? [cssnano({
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
