import { fromJS } from 'immutable';

import articlesReducer from '../reducer';
import {
  articlesLoaded,
  articlesLoadingError,
} from '../actions';

describe('articlesReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      fetching: true,
      error: false,
      posts: [],
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(articlesReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the articlesLoaded action correctly', () => {
    const fixture = {
      articles: {},
    };
    const expectedResult = state.set('fetching', false).set('posts', fixture.articles);
    expect(articlesReducer(state, articlesLoaded(fixture))).toEqual(expectedResult);
  });

  it('should handle the articlesLoadingError action correctly', () => {
    const expectedResult = state.set('fetching', false).set('error', true);
    expect(articlesReducer(state, articlesLoadingError())).toEqual(expectedResult);
  });
});
