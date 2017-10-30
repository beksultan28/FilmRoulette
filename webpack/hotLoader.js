const webpack = require('webpack');

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3030',
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
