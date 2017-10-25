import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_ARTICLES } from 'containers/Articles/constants';
import {
  articlesLoaded,
  articlesLoadingError,
} from 'containers/Articles/actions';

import request from 'utils/request';
import { getOffsetLimit } from 'utils/url';

export function* getArticles(params) {
  const options = getOffsetLimit(params.page);
  const apiEndpoint = `https://conduit.productionready.io/api/articles?limit=${options.limit}&offset=${options.offset}`;

  try {
    const repos = yield call(request, apiEndpoint);
    yield put(articlesLoaded(repos));
  } catch (err) {
    yield put(articlesLoadingError());
  }
}

export default function* articlesData() {
  yield takeLatest(FETCH_ARTICLES, getArticles);
}
