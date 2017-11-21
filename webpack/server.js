const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, '..', 'src/server/index.js'),
  output: {
    path: path.resolve(__dirname, '..', 'build'),
    publicPath: '/build/',
    filename: 'server.js',
    library: 'app',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, '..', 'src/components'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              localIdentName: '[local]',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|otf|svg|png)$/,
        loader: 'file-loader?emitFile=false',
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader?emitFile=false',
      },
    ],
  },
};
