import { takeLatest, put, call } from 'redux-saga/effects';
import { ADD_NEW_POST } from 'containers/Editor/constants';

import {
  addingNewPost,
  addNewPostCompleted,
  addNewPostError,
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

export default function* onAddNewPost() {
  yield takeLatest(ADD_NEW_POST, addNewPost);
}
