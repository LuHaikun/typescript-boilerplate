const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.config.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map', // 打包前的代码，便于调试3
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // 运行代码的目录
    compress: true, // 启动 gzip 压缩
    hot: true, // 开启HMR功能,当修改了webpack配置，新配置要想生效，必须重新webpack服务
    // overlay: false, // 如果出错了，不要全屏提示~
    inline: true, // 可以监控js变化
    clientLogLevel: 'none',
    stats: 'minimal', // 输出部分信息~
    // quiet: true, // 除了一些基本启动信息以外，其他内容都不要显示
    host: '0.0.0.0' // 域名
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})
