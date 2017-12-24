const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const babel = {
  presetEnv: require('babel-preset-env'),
  spread: require('babel-plugin-transform-object-rest-spread')
}

module.exports = {
  entry: {
    app: './src/index.jsx'
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true
    })
  ],
  devServer: {
    historyApiFallback: true,
    port: process.env.$PORT || 8080
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath:  '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [babel.presetEnv],
            plugins: [babel.spread]
          }
        }
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:2]',
              sourceMap: true,
              importLoaders: 3
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.css/,
        use: [  
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
