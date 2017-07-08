import { take, put, call, fork, select, takeEvery, all } from 'redux-saga/effects';
import * as actions from '../Actions';
import { rootReducer } from '../Reducers';
import { api } from '../Services/Api';

function* fetchUser(action) {
   try {
      const user = yield call(api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}


function* mySaga() {
  yield* takeEvery(actions.SIGN_IN, fetchUser);
}
