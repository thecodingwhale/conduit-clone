import { takeLatest, put, call } from 'redux-saga/effects';
import {
  ADD_NEW_POST,
  FETCH_ARTICLE,
} from 'containers/Editor/constants';

import {
  addingNewPost,
  addNewPostCompleted,
  addNewPostError,
  fetchingArticle,
  fetchArticleCompleted,
  fetchArticleError,
} from 'containers/Editor/actions';
import api from '../../utils/api';

export function* addNewPost(params) {
  yield put(addingNewPost());
  try {
    const payload = yield call(api.Article.add, params.form);
    yield put(addNewPostCompleted(payload.article));
  } catch (err) {
    yield put(addNewPostError(err));
  }
}

export function* fetchArticle(params) {
  yield put(fetchingArticle());
  try {
    const payload = yield call(api.Article.get, params.slug);
    yield put(fetchArticleCompleted(payload.article));
  } catch (err) {
    yield put(fetchArticleError(err));
  }
}

export default function* onAddNewPost() {
  yield takeLatest(ADD_NEW_POST, addNewPost);
  yield takeLatest(FETCH_ARTICLE, fetchArticle);
}
