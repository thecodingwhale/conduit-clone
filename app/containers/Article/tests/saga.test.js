/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put } from 'redux-saga/effects';
import { FETCH_ARTICLE } from 'containers/Article/constants';

import {
  articleLoadingError,
  commentsLoadingError,
} from 'containers/Article/actions';

import articleData, { getArticle, getComments } from '../saga';

const payload = {
  article: {
    foo: 'bar',
  },
  comments: [{
    foo: 'bar',
  }],
};

describe('getArticle', () => {
  let getArticleGenerator;

  beforeEach(() => {
    getArticleGenerator = getArticle({
      slug: 'sample-slug',
    });

    const selectDescriptor = getArticleGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getArticleGenerator.next(payload.article).value;
    expect(callDescriptor).toMatchSnapshot();
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
      slug: 'sample-slug',
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

describe('articlesDataSaga Saga', () => {
  const articleDataSaga = articleData();

  it('should start task to watch for FETCH_ARTICLES action with getArticle', () => {
    const takeLatestDescriptor = articleDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(FETCH_ARTICLE, getArticle));
  });

  it('should start task to watch for FETCH_ARTICLES action with getComments', () => {
    const takeLatestDescriptor = articleDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(FETCH_ARTICLE, getComments));
  });
});
