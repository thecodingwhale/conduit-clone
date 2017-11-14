/*
 *
 * Author reducer
 *
 */

import { fromJS } from 'immutable';
import {
  AUTHOR_PROFILE_LOADED,
  AUTHOR_PROFILE_LOADING_ERROR,
} from './constants';

const initialState = fromJS({
  author: {
    fetching: true,
    error: false,
    data: {},
  },
});

function authorReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHOR_PROFILE_LOADED:
      return state
        .setIn(['author', 'fetching'], false)
        .setIn(['author', 'data'], fromJS(action.profile));
    case AUTHOR_PROFILE_LOADING_ERROR:
      return state
        .setIn(['author', 'fetching'], false)
        .setIn(['author', 'error'], true);
    default:
      return state;
  }
}

export default authorReducer;
