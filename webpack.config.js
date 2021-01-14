/* eslint-disable max-len */
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  // An entry point indicates which module webpack should use to begin building out its internal dependency graph.
  entry: path.join(__dirname, './public/index.js'),
  // The output property tells webpack where to emit the bundles it creates and how to name these files.
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  devServer: {
    publicPath: '/build/',
    proxy: {
      '/api': 'http://localhost:3000',
    },
    hot: true,
  },
};
