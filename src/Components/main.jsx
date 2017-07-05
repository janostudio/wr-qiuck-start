import React, { Component } from "react";

export default class Main extends Component {
  render() {
    return (
      <div className="verb">
        <br />
        <br />
        <br />
        <input
          className="input-default"
          type="text"
          name="username"
          placeholder="请输入您的用户名"
        />
        <br />
        <input
          className="input-default"
          type="password"
          name="password"
          placeholder="请输入您的密码"
        />
        <br />
        <button className="btn-default">login</button>
        <br />
        <button className="btn-default">loginout</button>
      </div>
    );
  }
}
