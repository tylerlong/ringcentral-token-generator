import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const webConfig = {
  target: 'web',
  entry: {
    index: ['babel-polyfill', './src/web/index.js']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].bundle.css')
  ],
  devtool: 'source-map'
}

const electronConfig = {
  target: 'electron',
  entry: {
    electron: ['babel-polyfill', './src/electron/index.js'],
    preload: './src/electron/preload.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env'
            ]
          }
        }
      }
    ]
  },
  node: {
    __dirname: false // https://github.com/webpack/webpack/issues/2010#issuecomment-181256611
  },
  devtool: 'source-map'
}

export default [webConfig, electronConfig]
