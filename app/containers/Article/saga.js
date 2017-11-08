import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_ARTICLE } from 'containers/Article/constants';
import {
  articleLoaded,
  articleLoadingError,
  commentsLoaded,
  commentsLoadingError,
} from 'containers/Article/actions';

import request from 'utils/request';

export function* getArticle(param) {
  const { slug } = param;
  const articleEndPoint = `https://conduit.productionready.io/api/articles/${slug}`;
  const commentsEndPoint = `${articleEndPoint}/comments`;

  try {
    const payload = yield call(request, articleEndPoint);
    yield put(articleLoaded(payload.article));
  } catch (err) {
    yield put(articleLoadingError());
  }

  try {
    const payload = yield call(request, commentsEndPoint);
    yield put(commentsLoaded(payload.comments));
  } catch (err) {
    yield put(commentsLoadingError(err));
  }
}

export default function* articleData() {
  yield takeLatest(FETCH_ARTICLE, getArticle);
}
