const path = require("path");
const webpack = require("webpack");
const DashboardPlugin = require("webpack-dashboard/plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 引入页面配置文件
const pageConfig = require('./config/config.page.js');

// 引入dev-server配置文件
const serverConfig = require('./config/config.server.js'); 

// entry配置
const entryConfig = {}
pageConfig.list.map(function(item, index) {
    // entryConfig[item.name] = item.entry
    let _obj = {
    	[item.name]: path.join(__dirname, item.entry)
    }
    Object.assign(entryConfig, _obj)
})

const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development') //定义编译环境
        }
    }),
    new DashboardPlugin()
]
// 生成html配置
pageConfig.list.map(function(item, index) {
    plugins.push(
        new HtmlWebpackPlugin({
            template: path.join(__dirname, item.template),
            title: item.title,
            filename: item.filename,
            chunks: [item.chunks]
        })
    )
})

module.exports = {
  context: path.resolve(__dirname, './src'),
  devtool: "inline-source-map",
  //entry: entryConfig,
  entry: {
      app:path.resolve(__dirname, "src/Entries/app"),
      common: [
          "react",
          'react-dom',
          'react-router',
          'redux',
          'react-redux',
          'redux-thunk'
      ]
  },
  externals: {
      "react": "React",
      "react-router": "ReactRouter",
      "react-dom": "ReactDOM",
      "redux": "Redux",
      'react-redux': "ReactRedux",
      'redux-thunk': "ReduxThunk"
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    //filename: '[name].[chunkhash:8].bundle.js', // 推荐使用 ，但是--hot会报错，
    filename: '[name].js',       // --hot时使用，不推荐
    chunkFilename: '[name]-[id].[chunkhash:8].bundle.js', // 代码分割
    publicPath: 'dist/'
  },
  plugins: plugins,
  devServer: serverConfig,
  resolve: { extensions: [".jsx", ".js", ".json", ".less"] },
  module: {
    rules: [
      // {
      //   loader: "eslint-loader",
      //   test: /\.(js|jsx)$/,
      //   enforce: "pre",
      //   exclude: /node_modules/,
      //   options: {
      //     emitWarning: true
      //   }
      // },
      // jsx
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, "./src"),
        use: ["babel-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
        use: ["url-loader"]
      },
      {
        test: /\.(png|jpg|ico)$/,
        loader: "url-loader?limit=10000&name=assets/[name].[ext]"
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      },
      {
        test: /\.json?$/,
        loader: "json-loader"
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, "src"),
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[name]__[local]--[hash:base64:5]",
              Composing: true,
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader:"postcss-loader",
            options: { sourceMap: true }
          },
          {
            loader:"less-loader",
            options: { sourceMap: true }
          }
        ]
      }
    ]
  }
};