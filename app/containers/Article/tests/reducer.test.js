
import { fromJS } from 'immutable';
import articleReducer from '../reducer';
import {
  articleLoaded,
  commentsLoaded,
  articleLoadingError,
  commentsLoadingError,
  deleteArticle,
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
        deleting: false,
        data: {},
      },
      comments: {
        error: false,
        fetching: true,
        data: [],
      },
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
      data: [{
        foo: 'bar',
      }],
    };
    const expectedResult = state
      .setIn(['comments', 'error'], fixture.error)
      .setIn(['comments', 'fetching'], fixture.fetching)
      .setIn(['comments', 'data'], fromJS(fixture.data));
    expect(articleReducer(state, commentsLoaded(fixture.data))).toEqual(expectedResult);
  });

  it('should handle the articleLoadingError action correctly', () => {
    const expectedResult = state
      .setIn(['article', 'error'], true)
      .setIn(['article', 'fetching'], false);
    expect(articleReducer(state, articleLoadingError())).toEqual(expectedResult);
  });

  it('should handle the commentsLoadingError action correctly', () => {
    const expectedResult = state
      .setIn(['comments', 'error'], true)
      .setIn(['comments', 'fetching'], false);
    expect(articleReducer(state, commentsLoadingError())).toEqual(expectedResult);
  });

  it('should handle the deleteArticle action correctly', () => {
    const expectedResult = state
      .setIn(['article', 'deleting'], true);
    expect(articleReducer(state, deleteArticle())).toEqual(expectedResult);
  });
});
