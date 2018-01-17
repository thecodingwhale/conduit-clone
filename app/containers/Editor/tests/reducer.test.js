
import { fromJS } from 'immutable';
import editorReducer from '../reducer';
import {
  addingNewPost,
  addNewPostCompleted,
  addNewPostError,
} from '../actions';

describe('editorReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      fetching: false,
      success: false,
      error: false,
      slug: null,
    });
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(editorReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the addingNewPost action correctly', () => {
    const expectedResult = state.set('fetching', true);
    expect(editorReducer(state, addingNewPost())).toEqual(expectedResult);
  });

  it('should handle the addNewPostCompleted action correctly', () => {
    const article = {
      slug: 'article-slug',
    };
    const expectedResult = state
      .set('fetching', false)
      .set('success', true)
      .set('slug', article.slug);
    expect(editorReducer(state, addNewPostCompleted(article))).toEqual(expectedResult);
  });

  it('should handle the addNewPostError action correctly', () => {
    const expectedResult = state
      .set('fetching', false)
      .set('error', true);
    expect(editorReducer(state, addNewPostError())).toEqual(expectedResult);
  });
});
