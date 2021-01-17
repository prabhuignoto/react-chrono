module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  routes: [{ match: 'routes', src: '.*', dest: '/index.html' }],
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  alias: {
    /* ... */
  },
};
