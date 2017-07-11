// sign
export const SIGN_IN = "SIGN_IN";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILED = "SIGN_IN_FAILED";
export const SIGN_OUT = "SIGN_OUT";

function action(type, payload = {}) {
  return { type, ...payload };
}

export const signIn = user => action(SIGN_IN, { user });

export const signErrer = errer => action(SIGN_ERRER, { errer });

export const signOut = () => action(SIGN_OUT);
