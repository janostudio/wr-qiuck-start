import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import store from "../Redux/Store/store";
import Main from "../Containers/main";
import Login from "../Components/login";
import NoMatch from "../Containers/nomatch";

// this is the default behavior
const getConfirmation = (message, callback) => {
  // const allowTransition = window.confirm(message)
  // callback(allowTransition)
  console.log("getConfirmation");
};

const RouteConfig = (
  <BrowserRouter getUserConfirmation={getConfirmation}>
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/main" component={Main} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default RouteConfig;
