const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');
const path = require('path');

/** @type {import('tailwindcss').Config} */
const tailwindPlugin = require('@tailwindcss/postcss');

const cssnano = require('cssnano');

module.exports = {
  plugins: [
    tailwindPlugin({
      config: path.join(__dirname, 'tailwind.config.js'),
    }),
    autoprefixer(),
    postcssPresetEnv({
      stage: 3,
      features: {
        'nesting-rules': true,
        'logical-properties-and-values': true,
        'media-query-ranges': true,
        'custom-media-queries': true,
        'color-functional-notation': true,
        'color-mix': true,
      },
    }),
    process.env.NODE_ENV === 'production' ? cssnano({ preset: 'default' }) : false,
  ].filter(Boolean),
};
