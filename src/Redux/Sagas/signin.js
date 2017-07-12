import { take, put, call, fork, select, takeEvery } from "redux-saga/effects";
import { SIGN_IN } from "../Actions";
import { signInSuccess, signInFailure } from "../Actions/user";
import * as api from "../../Services/api";

export function* loginRequest(user) {
  try {
    const response = yield call(api.callApi, "api", user);
    if (response.data.code === 200) {
      yield put(signInSuccess(response.data.data.token, data.username));
    } else {
      yield put(
        signInFailure({
          code: response.data.code,
          error: response.data.msg
        })
      );
    }
  } catch (e) {
    yield put(
      signInFailure({
        code: "601",
        error: e.message
      })
    );
  }
}

export function* signin() {
  while (true) {
    const resData = yield take(SIGN_IN);
    yield fork(loginRequest, resData.payload);
  }
}
