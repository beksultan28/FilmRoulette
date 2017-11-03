const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    CopyWebpackPlugin([
      { from: 'src/static', to: 'static' },
    ]),
  ],
};
