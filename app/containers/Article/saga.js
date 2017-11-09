import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_ARTICLE } from 'containers/Article/constants';
import {
  articleLoaded,
  articleLoadingError,
  commentsLoaded,
  commentsLoadingError,
} from 'containers/Article/actions';

import request from 'utils/request';

const API_DOMAIN = 'https://conduit.productionready.io/api';
const ARTICLE_ENDPOINT = `${API_DOMAIN}/articles`;
export function* getArticle(param) {
  const { slug } = param;
  const endpoint = `${ARTICLE_ENDPOINT}/${slug}`;

  try {
    const payload = yield call(request, endpoint);
    yield put(articleLoaded(payload.article));
  } catch (err) {
    yield put(articleLoadingError());
  }
}

export function* getComments(param) {
  const { slug } = param;
  const endpoint = `${ARTICLE_ENDPOINT}/${slug}/comments`;

  try {
    const payload = yield call(request, endpoint);
    yield put(commentsLoaded(payload.comments));
  } catch (err) {
    yield put(commentsLoadingError(err));
  }
}

export default function* articleData() {
  yield takeLatest(FETCH_ARTICLE, getArticle);
  yield takeLatest(FETCH_ARTICLE, getComments);
}
