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
  DELETING_ARTICLE,
  DELETE_ARTICLE_COMPLETED,
  DELETE_ARTICLE_ERROR,
} from './constants';

const initialState = fromJS({
  error: false,
  fetching: true,
  article: {
    error: false,
    fetching: true,
    deleting: false,
    deleted: false,
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
    case DELETING_ARTICLE:
      return state
        .set('error', false)
        .setIn(['article', 'deleting'], true);
    case DELETE_ARTICLE_COMPLETED:
      return state
        .setIn(['article', 'deleting'], false)
        .setIn(['article', 'deleted'], true);
    case DELETE_ARTICLE_ERROR:
      return state
        .set('error', true)
        .setIn(['article', 'deleting'], false)
        .setIn(['article', 'deleted'], false);

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
