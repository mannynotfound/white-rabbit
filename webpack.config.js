var HTMLWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var loadCSS = new ExtractTextPlugin('build/app.css');

module.exports = {
  entry: './example/index.js',
  output: {
    filename: 'build/white-rabbit.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-2']
        }
      },
      {
        test: /\.css$/,
        loader: loadCSS.extract('style', 'css')
      },
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './example/index.html',
    }),
    loadCSS,
  ],
};
