const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    CopyWebpackPlugin([
      { from: 'src/client/static', to: 'static' },
    ]),
  ],
};
