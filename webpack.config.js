const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './nes/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: process.env.NODE_ENV === 'production' ? 'REPLACE_PATH_VARIABLE' : undefined
  },
  mode: process.env.NODE_ENV,
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'nes/index.html'
    })
  ]
};