import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_OUT,
  SIGN_OUT_SUCCESS
} from "./index.js";

function action(type, payload = {}) {
  return { type, ...payload };
}

export const signIn = payload => action(SIGN_IN, { payload });
export const signInSuccess = (token, userName) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userName", userName);
  return { type: SIGN_IN_SUCCESS, payload: { token, userName } };
};
export const signInFailure = data => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  return {
    type: SIGN_IN_FAILED,
    status: data.code,
    error: data.error
  };
};

export const signOut = () => action(SIGN_OUT);
export const signOutSuccess = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  return { type: SIGN_OUT_SUCCESS };
};
