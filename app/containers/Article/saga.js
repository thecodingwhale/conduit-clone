import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_ARTICLE } from 'containers/Article/constants';
import {
  articleLoaded,
  articleLoadingError,
} from 'containers/Article/actions';

import request from 'utils/request';

export function* getArticle(param) {
  const { slug } = param;
  const apiEndpoint = `https://conduit.productionready.io/api/articles/${slug}`;

  try {
    const payload = yield call(request, apiEndpoint);
    yield put(articleLoaded(payload.article));
  } catch (err) {
    yield put(articleLoadingError(err));
  }
}

export default function* articleData() {
  yield takeLatest(FETCH_ARTICLE, getArticle);
}
