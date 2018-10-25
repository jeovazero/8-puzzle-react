const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry:'./src/index.js',
  output:{
    path: path.resolve(__dirname, './dist'),
    filename: 'hue_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:{
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: './src/index.html'
    })
  ]
}