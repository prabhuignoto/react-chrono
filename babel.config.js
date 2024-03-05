module.exports = {
  plugins: [
    '@babel/plugin-transform-optional-chaining',
    '@babel/plugin-transform-typescript',
    'babel-plugin-jsx-remove-data-test-id',
    [
      '@emotion',
      {
        // sourceMap is on by default but source maps are dead code
        // eliminated in production
        sourceMap: false,
      },
    ],
  ],
};
