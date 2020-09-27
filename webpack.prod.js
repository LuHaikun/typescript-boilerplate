const merge = require('webpack-merge')
const common = require('./webpack.config.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const PUBLIC_PATH = '/dist/'
module.exports = merge.smart(common, {
  mode: 'production',
  output: {
    publicPath: PUBLIC_PATH
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[name].[chunkhash].css',
      ignoreOrder: false
    }),
    new OptimizeCssAssetsWebpackPlugin(), // 压缩 css
    new WorkboxWebpackPlugin.GenerateSW({
      /*
        1.帮助serviceWorker快速启动
        2.删除旧的serviceWorker
        3.生成一个serviceWorker配置文件
      */
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  stats: {
    children: false
  },
  performance: {
    hints: false
  },
  optimization: {
    minimizer: [ // 配置生产环境的压缩方案：js 和 css
      new TerserWebpackPlugin({
        parallel: 4, // 开启4个进程
        cache: true, // 开启缓存
        terserOptions: {
          output: {
            comments: false
          }
        },
        extractComments: false,
        sourceMap: true // 启动 source-map
      })
    ]
  }
})
