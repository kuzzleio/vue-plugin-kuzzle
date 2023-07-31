/* eslint-disable sort-keys */
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  plugins: ['kuzzle'],
  extends: ['plugin:kuzzle/default', 'plugin:kuzzle/typescript'],
};
