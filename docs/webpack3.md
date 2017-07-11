# webpack3文档说明

* [Webpack2中文文档](http://www.css88.com/doc/webpack2/)

## 1 基本配置选项

|设置名称|功能|
|--|--|
|`context`|指定源文件目录； |  
|`entry`|指定入口文件（多入口则配置多个），指定将哪些公共模块提取出来；   |
|`devtool`|指定项目调试的模式|
|`externals`|指定哪些插件不需要打包；   |
|`output`|输出配置；   |
|`plugins`|指定插件集齐配置；  |
|`resolve`|指定解析规则及索引； | 
|`module`|指定loader模块； |
|`devServer`|配置webpack-dev-server。  |

## 2 各个配置详情

### 2.1 entry入口配置

```
    [file-rename]:path.resolve(__dirname, "src/Entries/app"),
    common: [
        "react",
        'react-dom',
        'react-router',
        'redux',
        'react-redux',
        'redux-thunk'
    ]
```

入口文件配置，基本为"[文件名]:[文件路径]"，可以有多个，即多入口网站；  
而另一种配置，"[文件名]:[模块名称]",可以将模块打包进一个文件（需要`new webpack.optimize.CommonsChunkPlugin`配合使用）。

### 2.2 devtool

```
    devtool: "inline-source-map"
```

source-map方便查错，`inline-source-map`模式为打包前的每个文件添加sourcemap的dataUrl，追加到打包后文件内容的结尾；此处，dataUrl包含一个文件完整 souremap 信息的 Base64 格式化后的字符串。  

有7中模式，且模式中可以相互组织，请自己扩展查阅学习。

### 2.3 externals

```
    externals:[
        'react' : 'React'
    ]

    在Html模板文件中需要引入react.js
```

一种减小打包后文件过大的方案，推荐使用`new webpack.optimize.CommonsChunkPlugin`插件来解决文件过大问题。

### 2.4 output

```
    path: path.resolve(__dirname, './dist'),
    //filename: '[name].[chunkhash:8].bundle.js', // 推荐使用 ，但是--hot会报错，
    filename: '[name].js',       // --hot时使用，不推荐
    chunkFilename: '[name]-[id].[chunkhash:8].bundle.js', // 代码分割
    publicPath: 'dist/'
```

`filename`入口文件名，`chunkFilename`非入口文件名，在`--hot`模式下，`[chunkhash]`会报错，可以不适用使用或使用`hash`来替代。  
可扩展学习`chunkhash`与`hash`的区别。

### 2.5 plugins

```
    // 热加载模块，在生产环境中不启用
    new webpack.HotModuleReplacementPlugin(),
    // 依赖模块的正整数 ID 替换为相对路径
    new webpack.NamedModulesPlugin(),
    // 定义编译环境
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development') 
        }
    }),
    // 独立打包css文件
    new ExtractTextPlugin('[name].css'),
    // 提取公共包（单入口文件时候不能把引用多次的模块打印到commonChunkPlugin中）
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['index','index2'],
        minChunks: function (module) {
            // 该配置假定你引入的 vendor 存在于 node_modules 目录中
            return module.context && module.context.indexOf('node_modules') !== -1;
        }
    }),
     // 生成Html文件
    new HtmlWebpackPlugin({
        template: "./Template/index.html"
        //favicon:'./icon.ico'
    })
```

一面为生成环境需增加的插件

```
    // 删除历史文件
    new CleanWebpackPlugin(path.resolve(__dirname, "dist")),
    // 压缩
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        comments: false
    }),
    // 3.0新功能 范围提升 （Scope Hoisting ）
    new webpack.optimize.ModuleConcatenationPlugin()     
```

### 2.6 resolve

```
    resolve: { extensions: [".jsx", ".js", ".json", ".less"] }
```

webpack模块解析规则，extensions自动加载后缀名，webpack3第一个不需要空字符。

### 2.7 module

```
  module: {
    // loader 规则
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
        use: ExtractTextPlugin.extract({
            use: ["css-loader", "postcss-loader", "less-loader"]
        })
      }
    ]
  }
```

主要就是引入各类loader，但是需要注意的是loader是从右往左加载的，及`"less-loader" -> "postcss-loader" -> "css-loader"`。

### 2.8 devServer

```
    host: '127.0.0.1',
    port: 3000,
    historyApiFallback: true,
    // 热加载
    hot: true,
    inline:true,
    // 内容地址
    contentBase: path.resolve(__dirname),
    // 发布路径与output一致即可
    publicPath: path.resolve(__dirname,"/dist"),
    // proxy: proxyConfig
```

proxy可配置网站代理。

## 3 PostCSS配置

具体参考[postcss](https://segmentfault.com/a/1190000003909268)

主要要说到的是，在配置中，把`browserlist`规则写入了package.json中：

```
  "browserslist": [
    "ie > 8",
    "Opera >= 10",
    "Firefox >= 20",
    "Chrome >= 40"
  ]
```

如果不写`ie` `opera`等规则，则`autoprefixer`不会主动加`-ms-` `-o-`等前缀。


