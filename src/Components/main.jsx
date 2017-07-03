import React, { Component } from "react";
import { connect } from "react-redux";
import { logIn } from "../Actions/authAction";

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>Hello,wor1ld!s</div>;
  }
}

// export default connect(state => {
//   const { authReducer } = state;
//   return {
//     authReducer
//   };
// })(Login);
