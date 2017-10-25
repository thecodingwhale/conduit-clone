import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_TAGS } from 'containers/PopularTags/constants';
import {
  tagsLoaded,
  tagsLoadingError,
} from 'containers/PopularTags/actions';

import request from 'utils/request';

export function* getTags() {
  const apiEndpoint = 'https://conduit.productionready.io/api/tags';
  try {
    const tags = yield call(request, apiEndpoint);
    yield put(tagsLoaded(tags));
  } catch (err) {
    yield put(tagsLoadingError());
  }
}

export default function* tagsData() {
  yield takeLatest(GET_TAGS, getTags);
}
