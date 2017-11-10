const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

// webpack config files
const devServer = require('./webpack/devServer.js');
const eslint = require('./webpack/eslint.js');
const hotLoader = require('./webpack/hotLoader.js');
const staticFiles = require('./webpack/staticFiles.js');

let common = {
  entry: {
    app: [
      './src/index.jsx',
    ],
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
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
        test: /\.(woff2?|ttf|eot|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'static/fonts/[name].[ext]',
        },
      },
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};

module.exports = (env) => {
  if (env === 'development') {
    common = merge(
      hotLoader,
      common,
      devServer,
      eslint);
  }

  if (env === 'production') {
    common = merge(
      common,
      staticFiles);
  }

  common = merge(common, {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env),
      }),
    ],
  });

  return common;
};
