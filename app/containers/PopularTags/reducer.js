/*
 *
 * PopularTags reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  TAGS_LOADED,
  TAGS_LOADING_ERROR,
} from './constants';

const initialState = fromJS({
  fetching: true,
  error: false,
  tags: [],
});

function popularTagsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case TAGS_LOADED:
      return state
        .set('fetching', false)
        .set('tags', action.tags);
    case TAGS_LOADING_ERROR:
      return state
        .set('fetching', false)
        .set('error', true);
    default:
      return state;
  }
}

export default popularTagsReducer;
