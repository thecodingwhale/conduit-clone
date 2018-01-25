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
  LOAD_COMMENTS_ERROR,
  DELETE_ARTICLE,
} from './constants';

const initialState = fromJS({
  error: false,
  fetching: true,
  article: {
    error: false,
    fetching: true,
    deleting: false,
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
    case DELETE_ARTICLE:
      return state
        .setIn(['article', 'deleting'], true);
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
    case LOAD_COMMENTS_ERROR:
      return state
        .setIn(['comments', 'error'], true)
        .setIn(['comments', 'fetching'], false);
    default:
      return state;
  }
}

export default articleReducer;
