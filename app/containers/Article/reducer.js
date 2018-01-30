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
  POSTING_COMMENT,
  POST_COMMENT_COMPLETED,
  POST_COMMENT_ERROR,
  DELETING_COMMENT,
  DELETE_COMMENT_COMPLETED,
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
    deleting: false,
    posting: false,
    postingError: false,
    postingCompleted: false,
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
    case POSTING_COMMENT:
      return state
        .setIn(['comments', 'posting'], true)
        .setIn(['comments', 'postingCompleted'], false)
        .setIn(['comments', 'postingError'], false);
    case POST_COMMENT_COMPLETED:
      return state
        .updateIn(['comments', 'data'], (data) => data.unshift(action.comment))
        .setIn(['comments', 'posting'], false)
        .setIn(['comments', 'postingCompleted'], true);
    case POST_COMMENT_ERROR:
      return state
        .setIn(['comments', 'posting'], false)
        .setIn(['comments', 'postingError'], true);
    case DELETING_COMMENT:
      return state
        .setIn(['comments', 'deleting'], true);
    case DELETE_COMMENT_COMPLETED:
      return state
        .setIn(['comments', 'deleting'], false)
        .setIn(['comments', 'data'], fromJS(state.getIn(['comments', 'data']).toJS().filter((comment) => comment.id !== action.commentId)));
    default:
      return state;
  }
}

export default articleReducer;
