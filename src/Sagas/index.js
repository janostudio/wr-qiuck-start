import {
  take,
  put,
  call,
  fork,
  select,
  takeEvery,
  all
} from "redux-saga/effects";
import * as actions from "../Actions";
import { rootReducer } from "../Reducers";
import * as api from "../Services/api";

export function* fetchUser(action) {
  try {
    const user = yield call(api.fetchUser, action.user);
    yield put({ type: "SIGN_IN_SUCCEEDED", user: user });
  } catch (e) {
    yield put({ type: "SIGN_IN_FAILED", message: e.message });
  }
}

export function* watchfetchUser() {
  yield takeEvery(actions.SIGN_IN, fetchUser);
}

export default function* rootSaga() {
  yield all([fork(watchfetchUser)]);
}
