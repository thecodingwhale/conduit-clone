/*
 *
 * Settings actions
 *
 */

import {
  UPDATE_SETTINGS,
  UPDATE_FETCHING,
  UPDATE_USER_LOADED,
  UPDATE_USER_ERROR,
} from './constants';

export function updateSettings(form) {
  return {
    type: UPDATE_SETTINGS,
    form,
  };
}

export function updateFetching() {
  return {
    type: UPDATE_FETCHING,
  };
}

export function updateUserLoaded(user) {
  return {
    type: UPDATE_USER_LOADED,
    user,
  };
}

export function updateUserError(err) {
  return {
    type: UPDATE_USER_ERROR,
    err,
  };
}
