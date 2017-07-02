import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../Actions/authAction';

class Login extends Component {
  constructor(props){
        super(props);
        this.state = {
        };
  }

  render() {
    return (
      <div>
        Hello,world!s
      </div>
    );
  }
}

export default connect((state) => {
    const { authReducer } = state;
    return {
        authReducer
    }
})(Login);