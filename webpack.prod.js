const common = require('./webpack.config.js')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge.smart(common, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
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
        cache: true, // 开启缓存
        parallel: true, // 开启多进程打包
        sourceMap: true // 启动 source-map
      })
    ]
  }
})
