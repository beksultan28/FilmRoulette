const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    CopyWebpackPlugin([
      { from: 'client/static', to: 'static' },
    ]),
  ],
};
