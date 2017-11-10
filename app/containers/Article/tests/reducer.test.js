
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
      article: {
        error: false,
        fetching: true,
        data: {},
      },
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
      data: {
        foo: 'bar',
      },
    };
    const expectedResult = state
      .setIn(['article', 'error'], fixture.error)
      .setIn(['article', 'fetching'], fixture.fetching)
      .setIn(['article', 'data'], fromJS(fixture.data));
    expect(articleReducer(state, articleLoaded(fixture.data))).toEqual(expectedResult);
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
      .set('comments', fromJS(fixture.comments));

    expect(articleReducer(state, commentsLoaded(fixture.comments))).toEqual(expectedResult);
  });

  it('should handle the articleLoadingError action correctly', () => {
    const expectedResult = state
      .setIn(['article', 'error'], true)
      .setIn(['article', 'fetching'], false);
    expect(articleReducer(state, articleLoadingError())).toEqual(expectedResult);
  });
});
