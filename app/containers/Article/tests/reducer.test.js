
import { fromJS } from 'immutable';
import articleReducer from '../reducer';
import {
  articleLoaded,
  commentsLoaded,
  articleLoadingError,
} from '../actions';

describe('articleReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      error: false,
      fetching: true,
      article: null,
      comments: [],
    });
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(articleReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the articleLoaded action correctly', () => {
    const fixture = {
      error: false,
      fetching: false,
      article: {
        foo: 'bar',
      },
    };
    const expectedResult = state
      .set('error', fixture.error)
      .set('fetching', fixture.fetching)
      .set('article', fixture.article);

    expect(articleReducer(state, articleLoaded(fixture.article))).toEqual(expectedResult);
  });

  it('should handle the commentsLoaded action correctly', () => {
    const fixture = {
      error: false,
      fetching: false,
      comments: [{
        foo: 'bar',
      }],
    };

    const expectedResult = state
      .set('error', fixture.error)
      .set('fetching', fixture.fetching)
      .set('comments', fixture.comments);

    expect(articleReducer(state, commentsLoaded(fixture.comments))).toEqual(expectedResult);
  });

  it('should handle the articleLoadingError action correctly', () => {
    const expectedResult = state
      .set('error', true)
      .set('fetching', false);
    expect(articleReducer(state, articleLoadingError())).toEqual(expectedResult);
  });
});
