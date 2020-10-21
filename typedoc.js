module.exports = {
  out: "./docs/dist/api/",

  readme: "none",
  includes: "./src/components",
  exclude: [
    "**/__tests__/**/*",
    "**/*.styles.ts",
    "**/*.style.ts"
  ],

  mode: "file",
  excludeExternals: true,
  excludeNotExported: true,
  excludePrivate: true,
};
