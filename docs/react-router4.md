# react-router4翻译

[原文](https://reacttraining.com/react-router/web/example/url-params)

react-router 4.x版本相较于2.x版本改动很大,安装了`react-router-dom`就不需要安装`react-router`。

## BrowserRouter

使用HTML5原生的history API(pushState,replaceState,popstate),官方推荐使用，不推荐使用HashRouter。

```
    import { BrowserRouter } from 'react-router-dom'

    <BrowserRouter
        basename={optionalString}
        forceRefresh={optionalBool}
        getUserConfirmation={optionalFunc}
        keyLength={optionalNumber}
    >
        <App/>
    </BrowserRouter>
```

* 配置项

*basename: string*  
设置基准url，即当`basename`设置为"/basename",则之后所有链接都将带有"/basename/otherurl"，且`<Link to="otherurl" />`会自动跳转至"/basename/otherurl"。

*getUserConfirmation: func*  
确认是否跳转链接，默认使用`window.confirm`.
```
    // 默认行为
    const getConfirmation = (message, callback) => {
        const allowTransition = window.confirm(message)
        callback(allowTransition)
    }
```

*forceRefresh: bool*  
如果设置`true`，将强制刷新整个页面，一般在不支持HTML5原生history API的浏览器上使用。
```
    const supportsHistory = 'pushState' in window.history
    <BrowserRouter forceRefresh={!supportsHistory}/>
```

*keyLength: number*  
设置location.key的长度，默认为6.

*children: node*  
指定一个子节点，参考`React.Children.only(children)`.

## HashRouter

使用url的hash部分将视图与url同步，但是不支持`location.key`与`location.state`。

```
    <HashRouter
        basename={optionalString}
        hashType={optionalString}
        getUserConfirmation={optionalFunc}
    >
        <App/>
    </HashRouter>
```

* 配置项

*hashType: string*  
设置` window.location.hash`的编码类型，可选项有:  
|可选项|编码类型|
|----|----|
|`slash`（default）| `#/`、` #/sunshine/lollipops`|
|`noslash`|`#`、`#sunshine/lollipops`|
|`hashbang`|`#!/`、`#!/sunshine/lollipops`|

## Link

类似于a标签

```
    <Link to="/courses"/>

    <Link to={{
        pathname: '/courses',
        search: '?sort=name',
        hash: '#the-hash',
        state: { fromDashboard: true }
    }}/>
```

* 配置项

*to: string/object*  
可以传string也可以传option，可以通过`this.props.location.state.params`获取传过来的值。

*replace: bool*   
默认为false,如果设为true将现有的history stack最上层替换而不是新增。

## NavLink

带有样式的Link，当与现有url一致时。

```
    const Func = (match, location) => {
        if (!match) {
            return false
        }
        const eventID = parseInt(match.params.eventID)
        return !isNaN(eventID) && eventID % 2 === 1
    }

    <NavLink
        to="/faq"
        activeClassName="selected"
        activeStyle={{
            fontWeight: 'bold',
            color: 'red'
        }}
        exact
        strict
        isActive={Func}
    >FAQs</NavLink>
```

* 配置项

*activeClassName: string*  
激活时的属性名。

*activeStyle: object*  
激活时的样式

*exact: bool*   
默认为false，当设置为true时，只有与location完全一致时才会被激活。

*strict：bool*  
默认为false，当设置为true时，尾部的/也将计入考虑。

*isActive: Func*  
判断是否激活。

## Prompt

当离开页面的时候使用，比如表单填写页面。

```
    <Prompt
        when={formIsHalfFilledOut}
        message="Are you sure you want to leave?"
    />
```

* 配置项

*message: string/func*  
弹出的文字,当设置为func时，可以传入相关的参数，如：location。

*when*  
当值为true时，不弹出prompt。

## MemoryRouter

把url历史保存在内存中，使用与不读写地址的情况，如react-native或非浏览器环境。

```
    <MemoryRouter
        initialEntries={[ '/one', '/two', { pathname: '/three' } ]}
        initialIndex={1}
    >
        <App/>
    </MemoryRouter>
```

* 配置项

*initialEntries: array*  
初始化hostory stack，配置有`{ pathname, search, hash, state } `或是简单的urls。

*initialIndex: number*  
初始化index。 

## Redirect

跳转至新的页面，且替换history stack最上面的url，类似与服务器端的redirect（HTTP 3XX）。

```
    import { Route, Redirect } from 'react-router'

    <Route exact path="/" render={() => (
        loggedIn ? (
            <Redirect to="/dashboard"/>
        ) : (
            <PublicHomePage/>
        )
    )}/>
```

* 配置项

*to: string/object*  

*push: bool*  
当设置为true时，将push进history stack。

*from: string*  
只有在`switch`内部是才能使用，设置从哪里重定向过来。

## Route

当location与Route的path一致时，渲染相应的UI。

```
    import { BrowserRouter as Router, Route } from 'react-router-dom'

    <Router>
        <div>
            <Route exact path="/" component={Home}/>
            <Route path="/news" component={NewsFeed}/>
        </div>
    </Router>
    <div>
        <Home/>
        <!-- react-empty: 2 -->
    </div>
    <div>
        <!-- react-empty: 1 -->
        <NewsFeed/>
    </div>
```

* 配置项

*component*  
使用`React.createElement`创建`react element`,每次都将重新创建`component`而不是更新,渲染优先级高于render。

*render: func*  
不会创建多余的组件，`<Route path="/home" render={() => <div>Home</div>}/>`。

*children: func*  
路径不完全匹配的时候也会渲染，优先级低于前两者。

*path: string*

*exact: bool*

*strict: bool*

*location: object*
待补充，做动画使用。

## Router

```
    <BrowserRouter>
    <HashRouter>
    <MemoryRouter>
    <NativeRouter>
    <StaticRouter>
```

staticRouter是服务器端渲染使用，不做拓展。

## Switch

第一个匹配的子项将被渲染。

```
    import { Switch, Route } from 'react-router'

    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/:user" component={User}/>
        <Route component={NoMatch}/>
    </Switch>
```

* 配置项

*location: object*


*children: node*


## history

分为“browser history”、“hash history”、“memory history与Router组件相对应，是react router主要的依赖之一。

* 属性

*length: number*  

*action: string*  
当前的action（PUSH, REPLACE, or POP）。

*location*  
包含pathname - (string)、search - (string)、hash - (string)、state - (string)

* 方法

*push(path, [state]) - (function)*  

*replace(path, [state]) - (function)*  

*go(n) - (function)*  

*goBack() - (function)*  

*goForward() - (function)*  

*block(prompt) - (function)*
阻止页面挑战

## location

## match

match包含的信息用于匹配url。

* 属性
  
*params: object*  
键值对，参数传递。

*isExact: bool*
是否匹配

*path: string*  
用于匹配的路径

*url: string*  
url需要匹配的部分

## matchPath

在渲染前，重新配置match

```
    import { matchPath } from 'react-router'

    const match = matchPath('/users/123', {
        path: '/users/:id',
        exact: true,
        strict: false
    })
```

## withRouter

待完善

* 方法

*Component.WrappedComponent*
独立包装组件，用于测试。

*wrappedComponentRef: func*
增加ref
