const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

// webpack config files
const devServer = require('./devServer.js');
const eslint = require('./eslint.js');
const hotLoader = require('./hotLoader.js');
const staticFiles = require('./staticFiles.js');

let common = {
  entry: {
    app: [
      './src/client/index.jsx',
    ],
  },

  output: {
    path: path.join(__dirname, '../build'),
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
      template: './src/client/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};

module.exports = (args) => {
  const env = args.NODE_ENV;
  const deploy = args.deploy;
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

  // Create additional 200 page for client-side routing on Surge
  if (deploy === 'true') {
    common = merge(common, {
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/client/index.html',
          filename: '200.html',
          inject: 'body',
        }),
      ],
    });
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
