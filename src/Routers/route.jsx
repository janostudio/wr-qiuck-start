import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import store from "../Store/store";
import Main from "../Components/main";

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
        <Route path="/" component={Main} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default RouteConfig;
