/**
 *  dev-server配置
 *  Created by shiyanlin
 *  810975746@qq.com
 */

module.exports = {
    //contentBase: '/',
    host: '127.0.0.1',
    port: 1024,
    historyApiFallback: true,
    hot: true,
    inline:true,
    overlay: {
      errors: true,
      warnings: true
    }
}