/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import {
  AUTHENTICATION_REQUESTING,
  AUTHENTICATION_LOADED,
  AUTHENTICATION_LOADING_ERROR,
} from './constants';

const initialState = fromJS({
  user: {
    fetching: false,
    error: false,
    data: fromJS({}),
  },
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATION_LOADED:
      return state
        .setIn(['user', 'fetching'], false)
        .setIn(['user', 'data'], fromJS(action.user));
    case AUTHENTICATION_LOADING_ERROR:
      return state
        .setIn(['user', 'fetching'], false)
        .setIn(['user', 'error'], action.message);
    case AUTHENTICATION_REQUESTING:
      return state
        .setIn(['user', 'error'], false)
        .setIn(['user', 'fetching'], true);
    default:
      return state;
  }
}

export default loginReducer;
