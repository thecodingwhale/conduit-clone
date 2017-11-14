import { takeLatest, call, put } from 'redux-saga/effects';
import {
  FETCH_AUTHOR_PROFILE,
} from 'containers/Author/constants';
import {
  authorProfileLoaded,
  authorProfileLoadingError,
} from 'containers/Author/actions';
import request from 'utils/request';
import { removeFirstCharacter } from 'utils/string';

const API_DOMAIN = 'https://conduit.productionready.io/api';

export function* getAuthorProfile(param) {
  const { username } = param;
  const PROFILE_ENDPOINT = `${API_DOMAIN}/profiles/${removeFirstCharacter('@', username)}`;
  try {
    const payload = yield call(request, PROFILE_ENDPOINT);
    yield put(authorProfileLoaded(payload.profile));
  } catch (err) {
    yield put(authorProfileLoadingError());
  }
}

export default function* authorProfileData() {
  yield takeLatest(FETCH_AUTHOR_PROFILE, getAuthorProfile);
}
