const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
   entry: './main.js',
   output: {
      path: path.join(__dirname, '/bundle'),
      filename: 'index_bundle.js',
      publicPath: '/'
   },
   devServer: {
      inline: true,
      port: 8080,
      historyApiFallback: true,
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         },
         {  
            test: /\.css$/, 
            use: [
               'style-loader',
               'css-loader'
            ] 
         }
      ]
   },
   plugins:[
      new Dotenv(),
      new HtmlWebpackPlugin({
         template: './index.html'
      })
   ]
}