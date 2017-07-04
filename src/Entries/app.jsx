import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";
import { Provider } from "react-redux";
import route from "../Routers/route";
import store from "../Store/store";
import "../Styles/normalize.less";
import "../Styles/demo.less";

// 监听state变化
store.subscribe(() => {
  console.log(store.getState());
});

render(
  <Provider store={store}>
    {route}
  </Provider>,
  document.body.appendChild(document.createElement("div"))
);
