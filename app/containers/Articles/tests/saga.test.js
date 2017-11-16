/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put } from 'redux-saga/effects';
import {
  FETCH_ARTICLES,
  FETCH_ARTICLES_BY_AUTHOR,
  FETCH_ARTICLES_FAVORITED_BY_AUTHOR,
} from 'containers/Articles/constants';

import {
  articlesLoadingError,
} from 'containers/Articles/actions';

import articlesData, { getArticles } from '../saga';

const response = [{
  title: 'First Title',
}, {
  title: 'Second Title',
}];

describe('getRepos Saga', () => {
  let getArticlesGenerator;

  beforeEach(() => {
    getArticlesGenerator = getArticles({
      page: 1,
    });

    const selectDescriptor = getArticlesGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getArticlesGenerator.next(response).value;
    expect(callDescriptor).toMatchSnapshot();

    getArticlesGenerator = getArticles({
      page: 1,
      username: '@john_doe',
    });
    expect(getArticlesGenerator.next().value).toMatchSnapshot();

    getArticlesGenerator = getArticles({
      page: 1,
      username: '@john_doe',
      favorited: true,
    });
    expect(getArticlesGenerator.next().value).toMatchSnapshot();
  });

  it('should dispatch the articlesLoadingError action if api request failed', () => {
    const putDescriptor = getArticlesGenerator.throw().value;
    expect(putDescriptor).toEqual(put(articlesLoadingError()));
  });
});

describe('articlesDataSaga Saga', () => {
  const articlesDataSaga = articlesData();
  it('should start task to watch for FETCH_ARTICLES action', () => {
    const takeLatestDescriptor = articlesDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(FETCH_ARTICLES, getArticles));
  });
  it('should start task to watch for FETCH_ARTICLES_BY_AUTHOR action', () => {
    const takeLatestDescriptor = articlesDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(FETCH_ARTICLES_BY_AUTHOR, getArticles));
  });
  it('should start task to watch for FETCH_ARTICLES_FAVORITED_BY_AUTHOR action', () => {
    const takeLatestDescriptor = articlesDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(FETCH_ARTICLES_FAVORITED_BY_AUTHOR, getArticles));
  });
});
