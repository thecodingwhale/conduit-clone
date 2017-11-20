/*
 *
 * Login actions
 *
 */

import {
  DEFAULT_ACTION,
  ON_LOGIN_SUBMIT,
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
