/*
 *
 * Editor reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADDING_NEW_POST,
  ADD_NEW_POST_COMPLETED
} from './constants';

const initialState = fromJS({
  fetching: false,
  success: false,
  slug: null,
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
    default:
      return state;
  }
}

export default editorReducer;
