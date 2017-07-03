import * as TYPES from "./actionTypes";
import { LoginUrl } from "../Config/url";

// login
export function logIn(opt) {
  return dispatch => {
    let inner_get = fetch(LoginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: opt.username, password: opt.password })
    })
      .then(response => response.json())
      .then(data => {
        sessionStorage.username = opt.username;
        sessionStorage.password = opt.password;
        if (data.data) {
          dispatch({ type: TYPES.SIGN_IN, user: data });
        } else {
          dispatch({ type: TYPES.SIGN_ERRER_REAL, error: data.message });
        }
      })
      .catch(e => {
        console.log(e.message);
        // dispatch({'type': TYPES.SIGN_ERRER, error: e});
      });
  };
}

// logout
export function logOut() {
  return dispatch => {
    dispatch({ type: TYPES.SIGN_OUT });
  };
}
