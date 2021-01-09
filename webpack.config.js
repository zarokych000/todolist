'use strict';

let path = require('path');

module.exports = {
  mode: 'production',
  entry: './js/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js/'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
