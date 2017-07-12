# wq-react-start

用到的框架及插件：Webpack3 PostCss HotReload Eslint React React-Router4 Redux Redux-Saga

## 快速开始

```
  git clone https://github.com/janostudio/wr-qiuck-start.git

  cd wr-quick-start

  npm install

  npm run dev (热替换开发模式) 

  npm run dist (发布生产版本，对代码进行混淆压缩，提取公共代码，分离css文件)

  访问 http://localhost:3000
  
  npm run lint (校对语法)

  npm run fix (自动更正语法)

```

## 文件结构

config           webpack外置配置文件  
dist             生产代码  
docs             相关文档  
src              开发代码  
|--Actions       action  
|--Components    组件  
|--Configs       配置文件  
|--Containers    组件组装  
|--Entries       入口文件  
|--Reducers      reducer  
|--Routers       路径文件  
|--Sagas         sagas  
|--Services      saga-api  
|--Store         store  
|--Styles        总的样式文件  
|--Template      Html模板  
test             单元测试   


## License

MIT © [janostudio](http://jealand.win)