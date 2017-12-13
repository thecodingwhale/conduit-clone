import { takeLatest, put, call } from 'redux-saga/effects';
import { UPDATE_SETTINGS } from 'containers/Settings/constants';

import {
  updateFetching,
  updateUserLoaded,
  updateUserError,
} from 'containers/Settings/actions';
import api from '../../utils/api';

export function* fetchUpdateSettingValues(params) {
  yield put(updateFetching());
  try {
    const payload = yield call(api.Auth.updateSettings, params);
    yield put(updateUserLoaded(payload.user));
  } catch (err) {
    yield put(updateUserError(err));
  }
}

export default function* onUpdateSettingsSaga() {
  yield takeLatest(UPDATE_SETTINGS, fetchUpdateSettingValues);
}
