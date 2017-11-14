/*
 *
 * Author actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_AUTHOR_PROFILE,
  AUTHOR_PROFILE_LOADED,
  AUTHOR_PROFILE_LOADING_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchAuthorProfile(username) {
  return {
    type: FETCH_AUTHOR_PROFILE,
    username,
  };
}

export function authorProfileLoaded(profile) {
  return {
    type: AUTHOR_PROFILE_LOADED,
    profile,
  };
}

export function authorProfileLoadingError() {
  return {
    type: AUTHOR_PROFILE_LOADING_ERROR,
  };
}
