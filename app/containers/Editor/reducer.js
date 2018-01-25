/*
 *
 * Editor reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADDING_NEW_POST,
  ADD_NEW_POST_COMPLETED,
  ADD_NEW_POST_ERROR,
  FETCHING_ARTICLE,
  FETCH_ARTICLE_COMPLETED,
  FETCH_ARTICLE_ERROR,
  UPDATING_ARTICLE,
  UPDATE_ARTICLE_COMPLETED,
  UPDATE_ARTICLE_ERROR,
} from './constants';

const initialState = fromJS({
  fetching: false,
  updating: false,
  success: false,
  error: false,
  slug: null,
  article: null,
});

function editorReducer(state = initialState, action) {
  switch (action.type) {
    case ADDING_NEW_POST:
      return state.set('fetching', true);
    case ADD_NEW_POST_COMPLETED:
      return state
        .set('fetching', false)
        .set('success', true)
        .set('slug', action.article.slug);
    case ADD_NEW_POST_ERROR:
      return state
        .set('fetching', false)
        .set('error', true);
    case FETCHING_ARTICLE:
      return state.set('fetching', true);
    case FETCH_ARTICLE_COMPLETED:
      return state
        .set('fetching', false)
        .set('error', false)
        .set('article', action.article);
    case FETCH_ARTICLE_ERROR:
      return state
        .set('fetching', false)
        .set('error', true);
    case UPDATING_ARTICLE:
      return state
        .set('updating', true);
    case UPDATE_ARTICLE_COMPLETED:
      return state
        .set('updating', false)
        .set('success', true)
        .set('article', action.article)
        .set('slug', action.article.slug);
    case UPDATE_ARTICLE_ERROR:
      return state
        .set('updating', false)
        .set('error', true);
    default:
      return state;
  }
}

export default editorReducer;
