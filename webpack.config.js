var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path              = require('path');
var webpack           = require('webpack');

var module_path = path.resolve(__dirname, 'node_modules');

var devtool = process.env.NODE_ENV === 'development' ? 'source-map' : null;

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/client/app.jsx'
  ],
  output: {
    path: path.join(__dirname, 'static', 'packed'),
    filename: 'avian.js',
  },
  plugins: [
    new ExtractTextPlugin('feathers.css')
  ],
  module: {
    loaders: [
      // Javascript
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: path.resolve(__dirname, 'node_modules'),
        include: __dirname
      },
      // Styling
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css-loader?sourceMap!sass-loader?sourceMap&outputStyle=expanded'
        )
      }
    ],
    preLoaders: [{
      test: /\.jsx$/,
      exclude: module_path,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css']
  }
}