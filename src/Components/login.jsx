import React, { Component } from "react";
import { Form, Button, Input, Icon } from "antd";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signIn } from "../Redux/Actions/user";
import { cryptPwd } from "../config/utils";

const FormItem = Form.Item;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login({
          username: this.state.username,
          password: cryptPwd(this.state.password)
        });
      }
    });
  }
  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ height: "100vh", background: "rgba(0, 0, 0, .5)" }}>
        <div
          style={{
            width: 300,
            height: 280,
            background: "white",
            boxShadow: "0 0 100px rgba(0,0,0,.6)",
            borderRadius: 5,
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <div style={{ height: "100%", padding: "0 20px" }}>
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <FormItem>
                {getFieldDecorator("userName", {
                  rules: [{ required: true, message: "用户名不能为空!" }]
                })(
                  <div style={{ marginTop: 10 }}>
                    <Input
                      prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                      size="large"
                      name="username"
                      placeholder="请输入用户名"
                      onChange={this.handleChange.bind(this)}
                    />
                  </div>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "密码不能为空！" }]
                })(
                  <div style={{ marginTop: 10 }}>
                    <Input
                      prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                      size="large"
                      type="password"
                      name="password"
                      placeholder="请输入密码"
                      onChange={this.handleChange.bind(this)}
                    />
                  </div>
                )}
              </FormItem>
              <div
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 0,
                  width: "100%",
                  padding: "0 20px"
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.props.authReducer.isAuthenticating}
                  style={{ width: "100%" }}
                >
                  登录
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProp(state) {
  return {
    authReducer: state.authReducer
  };
}
function mapDispatchToProp(dispatch) {
  return {
    login: data => {
      dispatch(signIn(data));
    }
  };
}

const WrappedLogin = Form.create()(Login);
// export default connect(mapStateToProp, mapDispatchToProp)(withRouter(WrappedLogin));
export default withRouter(
  connect(mapStateToProp, mapDispatchToProp)(WrappedLogin)
);
