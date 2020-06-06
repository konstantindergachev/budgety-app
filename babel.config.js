module.exports = {
  presets: [ '@babel/preset-env', '@babel/react' ],
  plugins: [ '@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime' ],
  env: {
    test: {
      presets: [ '@babel/preset-env', '@babel/react' ],
      plugins: [ '@babel/plugin-proposal-class-properties', 'babel-plugin-dynamic-import-node' ],
    },
  },
};
