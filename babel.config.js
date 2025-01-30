module.exports = {
  plugins: [
    '@babel/plugin-transform-optional-chaining',
    '@babel/plugin-transform-typescript',
    'babel-plugin-jsx-remove-data-test-id',
  ],
  // Adding presets for better compatibility and support
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};