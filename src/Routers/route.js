import React, {Component} from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import store from '../Store/store';

// 模块打包进页面
import main from '../Components/main'; 

// 模块单独打包
// const main = (location, cb) => {
//     require.ensure([], require => {
//         cb(null, require('../Component/main').default)
//     },'main')
// }


const requireAuth = (nextState, replace) => {
    //const store = store.getState();
    //console.log(store.getState().authReducer.isLoggedIn)
    if (!store.getState().authReducer.isLoggedIn) {
        // Redirect to Home page if not an Admin
        replace({ pathname: '/' })
    }
}

const RouteConfig = (
        <Router  basename="/">
            <Route path="/" Component={main} />
            {/*<Route path="main" getComponent={main} onEnter={requireAuth}>
            </Route>模块单独打包*/}
        </Router>
);

export default RouteConfig;