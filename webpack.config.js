/*
  TODO:
    * add a production flag that disables debug/sourcemaps and minifies
 */

var webpack = require('webpack');
var path = require('path');
var assign = require('object-assign');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var defaultConfig = {
  devtool: 'sourcemap'
};

var frontendConfig = assign({}, defaultConfig, {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/frontend/index.js'
  ],

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build', 'public')
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Skele',
      filename: 'index.html',
      template: 'src/frontend/index.template.html',
      inject: true
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src', 'frontend'),
        loaders: ['react-hot', 'babel?stage=0&plugins[]=' + path.join(__dirname, 'relayPlugin')]
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'src', 'frontend', 'scss'),
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
});

module.exports = [frontendConfig ];