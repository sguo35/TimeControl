'use strict';

/**
 * Module dependencies.
 */
var path = require('path');

/**
 * Export webpack config.
 */
module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, '/app/main.js')],
  output: {
    path: path.join(__dirname, '/app/build/'),
        filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [["syntax-async-functions", {"loose": true}]]
        }
      }
    ]
  }
}