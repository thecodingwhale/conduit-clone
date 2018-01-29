/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put } from 'redux-saga/effects';
import {
  FETCH_ARTICLE,
  GET_ARTICLE_SLUG,
  DELETE_ARTICLE,
  POST_COMMENT,
} from 'containers/Article/constants';

import {
  articleLoadingError,
  commentsLoadingError,
  deleteArticleError,
  postCommentError,
} from 'containers/Article/actions';

import articleData, { getArticle, getComments, deleteArticle, postComment } from '../saga';

const payload = {
  article: {
    foo: 'bar',
  },
  comments: [{
    foo: 'bar',
  }],
};
const slug = 'sample-slug';
const comment = 'sample-comment';

describe('getArticle', () => {
  let getArticleGenerator;

  beforeEach(() => {
    getArticleGenerator = getArticle({
      slug,
    });

    const callDescriptor = getArticleGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();

    let putDescriptor = getArticleGenerator.next(slug).value;
    expect(putDescriptor).toMatchSnapshot();

    putDescriptor = getArticleGenerator.next(payload.article).value;
    expect(putDescriptor).toMatchSnapshot();
  });

  it('should dispatch the articleLoadingError action if api requests failed', () => {
    const putDescriptor = getArticleGenerator.throw().value;
    expect(putDescriptor).toEqual(put(articleLoadingError()));
  });
});

describe('getComments', () => {
  let getCommentsGenerator;

  beforeEach(() => {
    getCommentsGenerator = getComments({
      slug,
    });

    const selectDescriptor = getCommentsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getCommentsGenerator.next(payload.comments).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the commentsLoadingError action if api requests failed', () => {
    const putDescriptor = getCommentsGenerator.throw().value;
    expect(putDescriptor).toEqual(put(commentsLoadingError()));
  });
});

describe('deleteArticle', () => {
  let deleteArticleGenerator;

  beforeEach(() => {
    deleteArticleGenerator = deleteArticle({
      slug,
    });

    let putDescriptor = deleteArticleGenerator.next().value;
    expect(putDescriptor).toMatchSnapshot();

    const callDescriptor = deleteArticleGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();

    putDescriptor = deleteArticleGenerator.next().value;
    expect(putDescriptor).toMatchSnapshot();
  });

  it('should dispatch the deleteArticleError action if api requests failed', () => {
    const putDescriptor = deleteArticleGenerator.throw().value;
    expect(putDescriptor).toEqual(put(deleteArticleError()));
  });
});

describe('postComment', () => {
  let postCommentGenerator;

  beforeEach(() => {
    postCommentGenerator = postComment({ slug, comment });

    let putDescriptor = postCommentGenerator.next().value;
    expect(putDescriptor).toMatchSnapshot();

    const callDescriptor = postCommentGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();

    putDescriptor = postCommentGenerator.next({ comment }).value;
    expect(putDescriptor).toMatchSnapshot();
  });

  it('should dispatch the postCommentError action if api requests failed', () => {
    const err = 'Error';
    const putDescriptor = postCommentGenerator.throw(err).value;
    expect(putDescriptor).toEqual(put(postCommentError(err)));
  });
});

describe('articlesDataSaga Saga', () => {
  const articleDataSaga = articleData();

  it('should start task to watch for FETCH_ARTICLES action with getArticle', () => {
    const takeLatestDescriptor = articleDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(FETCH_ARTICLE, getArticle));
  });

  it('should start task to watch for GET_ARTICLE_SLUG action with getComments', () => {
    const takeLatestDescriptor = articleDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(GET_ARTICLE_SLUG, getComments));
  });

  it('should start task to watch for DELETE_ARTICLE action with getComments', () => {
    const takeLatestDescriptor = articleDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(DELETE_ARTICLE, deleteArticle));
  });

  it('should start task to watch for POST_COMMENT action with getComments', () => {
    const takeLatestDescriptor = articleDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(POST_COMMENT, postComment));
  });
});
