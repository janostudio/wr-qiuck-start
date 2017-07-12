import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";
import { Provider } from "react-redux";
import route from "../Routers/route";
import store from "../Redux/Store/store";
import "../Styles/demo.less";

render(
  <Provider store={store}>
    {route}
  </Provider>,
  document.body.appendChild(document.createElement("div"))
);
