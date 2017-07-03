/**
 *  dev-server配置
 *  Created by shiyanlin
 *  810975746@qq.com
 */

module.exports = {
    host: '127.0.0.1',
    port: 3000,
    historyApiFallback: true,
    hot: true,
    inline:true,
    contentBase: path.resolve(__dirname),
    publicPath: path.resolve(__dirname,"/"),
    overlay: {
      errors: true,
      warnings: true
    }
}