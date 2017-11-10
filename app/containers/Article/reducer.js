/*
 *
 * Article reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ARTICLE_LOADED,
  COMMENTS_LOADED,
  LOAD_ARTICLE_ERROR,
} from './constants';

const initialState = fromJS({
  error: false,
  fetching: true,
  article: {
    error: false,
    fetching: true,
    data: {},
  },
  comments: {
    error: false,
    fetching: true,
    data: [],
  },
});

function articleReducer(state = initialState, action) {
  switch (action.type) {
    case ARTICLE_LOADED:
      return state
        .setIn(['article', 'fetching'], false)
        .setIn(['article', 'data'], fromJS(action.article));
    case LOAD_ARTICLE_ERROR:
      return state
        .setIn(['article', 'error'], true)
        .setIn(['article', 'fetching'], false);
    case COMMENTS_LOADED:
      return state
        .setIn(['comments', 'fetching'], false)
        .setIn(['comments', 'data'], fromJS(action.comments));
    default:
      return state;
  }
}

export default articleReducer;
