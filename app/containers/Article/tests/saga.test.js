/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put } from 'redux-saga/effects';
import { FETCH_ARTICLE } from 'containers/Article/constants';

import {
  articleLoadingError,
} from 'containers/Article/actions';

import articleData, { getArticle } from '../saga';

const payload = {
  article: {
    foo: 'bar',
  },
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

  it('should dispatch the articleLoadingError action if it requests the data successfully', () => {
    const putDescriptor = getArticleGenerator.throw().value;
    expect(putDescriptor).toEqual(put(articleLoadingError()));
  });
});

describe('articlesDataSaga Saga', () => {
  const articleDataSaga = articleData();

  it('should start task to watch for FETCH_ARTICLES action', () => {
    const takeLatestDescriptor = articleDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(FETCH_ARTICLE, getArticle));
  });
});
