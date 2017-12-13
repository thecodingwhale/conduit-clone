/*
 *
 * Settings reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_FETCHING,
  UPDATE_USER_LOADED,
} from './constants';


const initialState = fromJS({
  fetching: false,
  success: false,
});

function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FETCHING:
      return state.set('fetching', true);
    case UPDATE_USER_LOADED:
      return state
        .set('fetching', false)
        .set('success', true);
    default:
      return state;
  }
}

export default settingsReducer;
