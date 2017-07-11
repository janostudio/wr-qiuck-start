# React


## 为什么获取的数据一定要在componentDidMount里调用

这与React组件的生命周期有关，组件挂载时有关的生命周期有以下几个:

* constructor()
* componentWillMount()
* render()
* componentDidMount()

上面这些方法的调用是有次序的，由上而下，也就是当说如果你要获取外部数据并加载到组件上，只能在组件"已经"挂载到真实的网页上才能作这事情，其它情况你是加载不到组件的。

componentDidMount方法中的代码，是在组件已经完全挂载到网页上才会调用被执行，所以可以保证数据的加载。此外，在这方法中调用setState方法，会触发重渲染。所以，官方设计这个方法就是用来加载外部数据用的，或处理其他的副作用代码。

constructor被调用是在组件准备要挂载的最一开始，所以此时组件尚未挂载到网页上。

componentWillMount方法的调用在constructor之后，在render之前，在这方法里的代码调用setState方法不会触发重渲染，所以它一般不会用来作加载数据之用，它也很少被使用到。

一般的从后台(服务器)获取的数据，都会与组件上要用的数据加载有关，所以都在componentDidMount方法里面作。虽然与组件上的数据无关的加载，也可以在constructor里作，但constructor是作组件state初绐化工作，并不是设计来作加载数据这工作的，所以所有有副作用的代码都会集中在componentDidMount方法里。

## 组件的生命周期

组件的生命周期分成三个状态：

> Mounting：已插入真实 DOM  
Updating：正在被重新渲染  
Unmounting：已移出真实 DOM 

React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数。

> componentWillMount()  
componentDidMount()  
componentWillUpdate(object nextProps, object nextState)  
componentDidUpdate(object prevProps, object prevState)  
componentWillUnmount()  

此外，React 还提供两种特殊状态的处理函数。

> componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用  
shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用  