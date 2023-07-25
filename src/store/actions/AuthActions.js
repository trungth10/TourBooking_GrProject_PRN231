import {
  formatError,
  login,
  runLogoutTimer,
  saveTokenInLocalStorage,
  signUp,
} from "../../services/AuthService";

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";

export function signupAction(email, password, history) {
  return (dispatch) => {
    signUp(email, password)
      .then((response) => {
        saveTokenInLocalStorage(response.data);
        runLogoutTimer(dispatch, response.data.expiresIn * 1000, history);
        dispatch(confirmedSignupAction(response.data));
        history.push("/c");
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function logout(history) {
  localStorage.removeItem("userDetails");
  localStorage.removeItem("jwtToken");
  history.push("/login");
  return {
    type: LOGOUT_ACTION,
  };
}

// export function loginAction(userName, password, history) {
//   return (dispatch) => {
//     login(userName, password)
//       .then((response) => {
//         console.log(response.data.data);
//         saveTokenInLocalStorage(response.data.data);
//         runLogoutTimer(dispatch, response.data.data.expiresIn * 1000, history);
//         dispatch(loginConfirmedAction(response.data.data));
//         console.log(dispatch(loginConfirmedAction(response.data.data)));
//         history.push("/bookings");
//       })
//       .catch((error) => {
//         //console.log(error);
//         const errorMessage = formatError(error.response.data.data);
//         dispatch(loginFailedAction(errorMessage));
//       });
//   };
// }

export function loginAction(userName, password, history) {
  return (dispatch) => {
    login(userName, password)
      .then((response) => {
        const tokenDetails = response.data.data;
        tokenDetails.expireDate = new Date(new Date().getTime() + 8600000);
        saveTokenInLocalStorage(response.data.data);
        runLogoutTimer(dispatch, 8600000, history);
        dispatch(loginConfirmedAction(tokenDetails));
        history.push("/tours");
      })
      .catch((error) => {
        //console.log(error);
        const errorMessage = formatError(error.response.data.data);
        dispatch(loginFailedAction(errorMessage));
      });
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}
