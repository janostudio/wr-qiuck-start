import { combineReducers } from "redux";
import * as ActionTypes from "../Actions";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  authReducer
});

export default rootReducer;
