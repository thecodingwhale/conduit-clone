/*
 *
 * Article reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ARTICLE_LOADED,
  LOAD_ARTICLE_ERROR,
} from './constants';

const initialState = fromJS({
  error: false,
  fetching: true,
  article: null,
});

function articleReducer(state = initialState, action) {
  switch (action.type) {
    case ARTICLE_LOADED:
      return state
        .set('fetching', false)
        .set('article', action.article);
    case LOAD_ARTICLE_ERROR:
      return state
        .set('error', true)
        .set('fetching', false);
    default:
      return state;
  }
}

export default articleReducer;
