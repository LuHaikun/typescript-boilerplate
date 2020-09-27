const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

// 使用__dirname变量获取当前模块文件所在目录的完整绝对路径
function getPath (dir) {
  return path.resolve(__dirname, dir)
}
const PATH_SRC = getPath('src')
const PATH_DIST = getPath('dist')
const NODE_MODULES = '/node_modules/'
const pkg = require(getPath('package.json'))
const env = process.env.NODE_ENV || 'development'
let antdModifyVars
try {
  antdModifyVars = require(getPath('src/style/antd'))
} catch (e) {
  antdModifyVars = {}
}

// 复用 loader
const getCommonLoader = function (isModule) {
  return [
    env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: isModule ? {
          mode: 'local',
          localIdentName: '[local]_[hash:base64:5]'
        } : false
      }
    },
    { // 还需要在 package.json 中定义 browserslist
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: () => [require('postcss-preset-env')()]
      }
    }
  ]
}

module.exports = {
  // 入口配置
  entry: {
    app: PATH_SRC, // 入口文件
    // vendor: ['react', 'react-dom', 'antd'], // 第三库抽离vendor
    config: `${PATH_SRC}/config/${env}` // 环境变量配置文件
  },
  // 输出配置
  output: {
    filename: 'js/[name].[hash:8].js', // 输出文件名称（指定名称+目录）
    path: PATH_DIST, // 输出文件目录（将来所有资源输出的公共目录）
    publicPath: '/', // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
    chunkFilename: 'js/[name].[hash:8].js' // 非入口 chunk 的名称
  },
  // 解析模块的规则
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // 配置省略文件路径的后缀名
    alias: { // 配置解析模块路径别名: 优点简写路径 缺点路径没有提示
      $api: getPath('src/api/'), // api文件
      $components: getPath('src/components/'), // 组件文件
      $config: getPath('src/config/'), // 配置文件
      $constant: getPath('src/constant/'), // 常量文件
      $lib: getPath('src/lib/'), // 库文件
      $style: getPath('src/style/'), // 样式文件
      $redux: getPath('src/redux/'), // redux文件
      $assets: getPath('src/assets/') // 资源文件
    }
  },
  // 模块配置
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...getCommonLoader(false)] // 多个 loader 用 use
      },
      {
        test: /\.scss$/,
        exclude: NODE_MODULES,
        use: [...getCommonLoader(true), 'sass-loader']
      },
      {
        test: /\.less$/,
        exclude: NODE_MODULES,
        include: PATH_SRC,
        use: [
          ...getCommonLoader(true),
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: antdModifyVars,
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader'
      },
      {
        test: /\.tsx?$/,
        exclude: NODE_MODULES,
        include: PATH_SRC,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  useBuiltIns: 'usage',
                  corejs: {
                    version: 3
                  },
                  targets: {
                    chrome: '60',
                    firefox: '50'
                  }
                }]
              ],
              plugins: [
                ['import', {
                  libraryName: 'antd',
                  style: 'css'
                }]
              ],
              // 开启babel缓存 第二次构建时，会读取之前的缓存
              cacheDirectory: true
            }
          },
          'ts-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[name].[contenthash:10].[ext]',
          esModule: false, // 关闭 es6 模块化
          outputPath: 'imgs'
        },
        exclude: NODE_MODULES,
        include: PATH_SRC
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash:10].[ext]',
              outputPath: 'fonts',
              esModule: false
            }
          }
        ]
      },
      { // 处理其他资源
        test: /\.(mov|mp4|webm)$/,
        loader: 'file-loader',
        options: {
          name: '[name][contenthash:10].[ext]',
          outputPath: 'media',
          esModule: false
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: pkg.projectName || 'react前端脚手架',
      chunks: ['manifest', 'config', 'vendor', 'app'], // 可以设置chunks按需引入JS文件，不设置就会引入所有产出的js
      template: getPath('src/index.html'), // 入口文件
      favicon: getPath('src/assets/images/favicon.ico'),
      chunksSortMode: 'manual' // 将chunks按引入的顺序排序,不用这个的话,引入到html的JS可能是错乱排序的
    }),
    new ProgressBarPlugin({
      format: 'build [:bar] ' + chalk.green.bold(':percent') + ' (:msg)',
      clear: false,
      stream: process.stdout
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendor: { // 项目基本框架等
          chunks: 'all',
          priority: 100,
          test: /(react|react-dom|antd)/,
          name: 'vendor'
        },
        lazy: { // 异步加载公共包、组件等
          chunks: 'async',
          minChunks: 2,
          name: 'lazy',
          priority: 90
        },
        commons: { // 其他同步加载公共包
          chunks: 'all',
          minChunks: 2,
          name: 'commons',
          priority: 80
        }
      }
    },
    // 将当前模块的记录其他模块的 hash 单独打包为一个文件 runtime // 解决：修改 a 文件导致 b 文件的 contenthash 变化
    runtimeChunk: {
      name: 'manifast'
    }
  }
}
