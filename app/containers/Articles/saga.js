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

import api from 'utils/api';
import { getOffsetLimit } from 'utils/url';
import { removeFirstCharacter } from 'utils/string';

export function* getArticles(params) {
  let repos;
  const { limit, offset } = getOffsetLimit(params.page);
  const { username, favorited } = params;
  try {
    if (username) {
      const setUsername = removeFirstCharacter('@', username);
      if (favorited) {
        repos = yield call(api.Article.getFavoritedArticles, limit, offset, setUsername);
      } else {
        repos = yield call(api.Article.getAuthoredArticles, limit, offset, setUsername);
      }
    } else {
      repos = yield call(api.Article.getArticles, limit, offset);
    }
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
