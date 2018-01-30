
import { fromJS } from 'immutable';
import articleReducer from '../reducer';
import {
  articleLoaded,
  commentsLoaded,
  articleLoadingError,
  commentsLoadingError,
  deletingComment,
  deletingArticle,
  deleteArticleCompleted,
  deleteArticleError,
  deleteCommentCompleted,
  postingComment,
  postCommentCompleted,
  postCommentError,
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

  it('should handle the deletingArticle action correctly', () => {
    const expectedResult = state
      .setIn(['article', 'deleting'], true);
    expect(articleReducer(state, deletingArticle())).toEqual(expectedResult);
  });

  it('should handle the deleteArticleCompleted correctly', () => {
    const expectedResult = state
      .setIn(['article', 'deleting'], false)
      .setIn(['article', 'deleted'], true);
    expect(articleReducer(state, deleteArticleCompleted())).toEqual(expectedResult);
  });

  it('should handle the deleteArticleError correctly', () => {
    const expectedResult = state
      .set('error', true)
      .setIn(['article', 'deleting'], false)
      .setIn(['article', 'deleted'], false);
    expect(articleReducer(state, deleteArticleError())).toEqual(expectedResult);
  });

  it('should handle the postingComment correctly', () => {
    const expectedResult = state
      .setIn(['comments', 'posting'], true)
      .setIn(['comments', 'postingCompleted'], false)
      .setIn(['comments', 'postingError'], false);
    expect(articleReducer(state, postingComment())).toEqual(expectedResult);
  });

  it('should handle the postCommentError correctly', () => {
    const expectedResult = state
      .setIn(['comments', 'posting'], false)
      .setIn(['comments', 'postingError'], true);
    expect(articleReducer(state, postCommentError())).toEqual(expectedResult);
  });

  it('should handle the postCommentCompleted correctly', () => {
    const comment = {
      foo: 'bar',
    };
    const expectedResult = state
      .updateIn(['comments', 'data'], (data) => data.unshift(comment))
      .setIn(['comments', 'posting'], false)
      .setIn(['comments', 'postingCompleted'], true);
    expect(articleReducer(state, postCommentCompleted({ comment }))).toEqual(expectedResult);
  });

  it('should handle the deletingComment action correctly', () => {
    const expectedResult = state
      .setIn(['comments', 'deleting'], true);
    expect(articleReducer(state, deletingComment())).toEqual(expectedResult);
  });

  it('should handle the deleteCommentCompleted action correctly', () => {
    const comments = [{
      id: 1,
    }, {
      id: 2,
    }, {
      id: 3,
    }];
    const newState = state.setIn(['comments', 'data'], fromJS(comments));
    const expectedState = articleReducer(newState, deleteCommentCompleted(3));
    expect(expectedState.getIn(['comments', 'data']).toJS().length).toEqual(2);
  });
});
