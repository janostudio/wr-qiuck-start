import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider} from 'react-redux';
import route from '../Routers/route'; //路由配置
import store from '../Store/store';

import '../Styles/demo.less';

// store.subscribe(() => { //监听state变化
//     console.log(store.getState())
// });

render(
    <Provider store={store}>
        {route}
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);