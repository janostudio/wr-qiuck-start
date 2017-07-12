import * as TYPES from "../Actions";

const initialState = {
  user: {},
  error: null,
  authenticated: false,
  isAuthenticating: false
};

let authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SIGN_IN:
      return {
        ...state,
        isAuthenticating: true
      };
    case TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        isAuthenticating: false
      };
    case TYPES.SIGN_IN_FAILED:
      return {
        ...state,
        authenticated: false,
        isAuthenticating: false,
        error: action.error
      };
    case TYPES.SIGN_OUT:
      return state;
    case TYPES.SIGN_OUT_SUCCESS:
      return {
        user: {},
        error: null,
        authenticated: false,
        isAuthenticating: false
      };
    default:
      return state;
  }
};

export default authReducer;
