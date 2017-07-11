import * as TYPES from "../Actions";

const initialState = {
  isLoggedIn: false,
  user: {},
  error: null
};

let authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SIGN_IN:
      return {
        isLoggedIn: true
      };
    case TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.user
      };
    case TYPES.SIGN_IN_FAILED:
      return {
        isLoggedIn: false,
        error: action.error
      };
    case TYPES.SIGN_OUT:
      return {
        isLoggedIn: false,
        user: {}
      };
    default:
      return state;
  }
};

export default authReducer;
