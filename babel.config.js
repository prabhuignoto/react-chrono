module.exports = {
  plugins: [
    '@babel/plugin-transform-optional-chaining',
    '@babel/plugin-transform-typescript',
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
