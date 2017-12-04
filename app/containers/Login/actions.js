/*
 *
 * Login actions
 *
 */

import {
  DEFAULT_ACTION,
  ON_LOGIN_SUBMIT,
  AUTHENTICATION_REQUESTING,
  AUTHENTICATION_LOADED,
  AUTHENTICATION_LOADING_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loginSubmit(email, password) {
  return {
    type: ON_LOGIN_SUBMIT,
    email,
    password,
  };
}

export function authenticationLoaded(user) {
  return {
    type: AUTHENTICATION_LOADED,
    user,
  };
}

export function authenticationLoadingError(err) {
  return {
    type: AUTHENTICATION_LOADING_ERROR,
    err,
  };
}

export function authenticationRequesting() {
  return {
    type: AUTHENTICATION_REQUESTING,
  };
}
