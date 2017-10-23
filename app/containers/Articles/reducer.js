/*
 *
 * Articles reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ARTICLES_LOADED,
  LOAD_ARTICLES_ERROR,
} from './constants';

const initialState = fromJS({
  fetching: true,
  error: false,
  posts: [],
});

function articlesReducer(state = initialState, action) {
  switch (action.type) {
    case ARTICLES_LOADED:
      return state
        .set('fetching', false)
        .set('posts', action.articles);
    case LOAD_ARTICLES_ERROR:
      return state
        .set('fetching', false)
        .set('error', true);
    default:
      return state;
  }
}

export default articlesReducer;
