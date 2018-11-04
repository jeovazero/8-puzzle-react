const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const resolve = (relativePath) => path.resolve(__dirname, relativePath);

module.exports = {
  entry:'./src/index.js',
  output:{
    path: resolve('./dist'),
    filename: 'hue_bundle.js'
  },
  devServer:{
    contentBase: resolve('dist'),
    compress: true,
    hot: true,
    port: 8976
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:{
          loader: "babel-loader"
        }
      },
      {
        test: /\.svg|\.png$/,
        use: {
          loader: "file-loader"
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  },
  plugins: [
    new HtmlPlugin({
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}