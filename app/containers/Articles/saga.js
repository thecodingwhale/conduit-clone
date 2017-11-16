import { takeLatest, call, put } from 'redux-saga/effects';
import {
  FETCH_ARTICLES,
  FETCH_ARTICLES_BY_AUTHOR,
  FETCH_ARTICLES_FAVORITED_BY_AUTHOR,
} from 'containers/Articles/constants';
import {
  articlesLoaded,
  articlesLoadingError,
} from 'containers/Articles/actions';

import request from 'utils/request';
import { getOffsetLimit, getKeyNameParam } from 'utils/url';
import { removeFirstCharacter } from 'utils/string';

const API_DOMAIN = 'https://conduit.productionready.io/api';

export function* getArticles(params) {
  const options = getOffsetLimit(params.page);
  const tag = getKeyNameParam(params, 'tag');
  const filters = `limit=${options.limit}&offset=${options.offset}`;
  let apiEndpoint = `${API_DOMAIN}/articles?${tag}${filters}`;
  if (params.username) {
    const username = removeFirstCharacter('@', params.username);
    if (params.favorited) {
      apiEndpoint = `${API_DOMAIN}/articles?favorited=${username}&${filters}`;
    } else {
      apiEndpoint = `${API_DOMAIN}/articles?author=${username}&${filters}`;
    }
  }
  try {
    const repos = yield call(request, apiEndpoint);
    yield put(articlesLoaded(repos));
  } catch (err) {
    yield put(articlesLoadingError());
  }
}

export default function* articlesData() {
  yield takeLatest(FETCH_ARTICLES, getArticles);
  yield takeLatest(FETCH_ARTICLES_BY_AUTHOR, getArticles);
  yield takeLatest(FETCH_ARTICLES_FAVORITED_BY_AUTHOR, getArticles);
}
