/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put } from 'redux-saga/effects';
import { FETCH_ARTICLES } from 'containers/Articles/constants';

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
  });

  it('should dispatch the articlesLoaded action if it requests the data successfully', () => {
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
});
