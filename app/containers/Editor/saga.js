import { takeLatest, put, call } from 'redux-saga/effects';
import {
  ADD_NEW_POST,
  FETCH_ARTICLE,
  UPDATE_ARTICLE,
} from 'containers/Editor/constants';

import {
  addingNewPost,
  addNewPostCompleted,
  addNewPostError,
  fetchingArticle,
  fetchArticleCompleted,
  fetchArticleError,
  updatingArticle,
  updateArticleCompleted,
  updateArticleError,
} from 'containers/Editor/actions';
import api from '../../utils/api';

export function* addNewPost(args) {
  yield put(addingNewPost());
  try {
    const payload = yield call(api.Article.add, args.form);
    yield put(addNewPostCompleted(payload.article));
  } catch (err) {
    yield put(addNewPostError(err));
  }
}

export function* fetchArticle(args) {
  yield put(fetchingArticle());
  try {
    const payload = yield call(api.Article.get, args.slug);
    yield put(fetchArticleCompleted(payload.article));
  } catch (err) {
    yield put(fetchArticleError(err));
  }
}

export function* updateArticle({ slug, article }) {
  yield put(updatingArticle());
  try {
    const payload = yield call(api.Article.update, slug, article);
    yield put(updateArticleCompleted(payload.article));
  } catch (err) {
    yield put(updateArticleError(err));
  }
}

export default function* onAddNewPost() {
  yield takeLatest(ADD_NEW_POST, addNewPost);
  yield takeLatest(FETCH_ARTICLE, fetchArticle);
  yield takeLatest(UPDATE_ARTICLE, updateArticle);
}
