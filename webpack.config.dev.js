const path = require("path");
const webpack = require("webpack");
const DashboardPlugin = require("webpack-dashboard/plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './src'),
  devtool: "inline-source-map",
  entry: {
      app:path.resolve(__dirname, "src/Entries/app"),
      common: [
        "react",
        'react-dom',
        'react-router',
        'redux',
        'react-redux',
        'redux-saga'
      ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    //filename: '[name].[chunkhash:8].bundle.js', // 推荐使用 ，但是--hot会报错，
    filename: '[name].js',       // --hot时使用，不推荐
    chunkFilename: '[name]-[id].[chunkhash:8].bundle.js', // 代码分割
    publicPath: 'dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development') //定义编译环境
        }
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: function (module) {
            // 该配置假定你引入的 common 存在于 node_modules 目录中
            return module.context && module.context.indexOf('node_modules') !== -1;
        }
    }),
    new HtmlWebpackPlugin({
        template: "./Template/index.html"
        //favicon:'./icon.ico'
    })
  ],
  devServer: {
    host: '127.0.0.1',
    port: 3000,
    historyApiFallback: true,
    hot: true,
    inline:true,
    contentBase: path.resolve(__dirname),
    publicPath: path.resolve(__dirname,"/dist"),
    overlay: {
        errors: true,
        warnings: true
    }
    //proxy: proxyConfig
  },
  resolve: { extensions: [".jsx", ".js", ".json", ".less"] },
  module: {
    rules: [
      {
        loader: "eslint-loader",
        test: /\.(js|jsx)$/,
        enforce: "pre",
        exclude: /node_modules/,
        options: {
          emitWarning: true
        }
      },
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
            options: { sourceMap: true }
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