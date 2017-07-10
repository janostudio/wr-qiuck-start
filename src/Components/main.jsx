import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../Actions";

class Main extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    const user = { name: "opt", password: "123" };
    signIn(user);
  };

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
        <button className="btn-default" onClick={this.handleClick.bind(this)}>
          login
        </button>
        <br />
        <button className="btn-default">loginout</button>
      </div>
    );
  }
}

export default connect(
  state => ({
    authReducer: state.authReducer
  }),
  {
    signIn
  }
)(Main);
