import { takeLatest, put, call } from 'redux-saga/effects';
import { ON_LOGIN_SUBMIT } from 'containers/Login/constants';
import {
  authenticationRequesting,
  authenticationLoaded,
  authenticationLoadingError,
} from 'containers/Login/actions';
import api from '../../api';

export function* onLoginSubmit(params) {
  yield put(authenticationRequesting());
  try {
    const payload = yield call(api.Auth.login, params);
    yield put(authenticationLoaded(payload.user));
  } catch (err) {
    yield put(authenticationLoadingError('incorrect email/password'));
  }
}

// Individual exports for testing
export default function* authentication() {
  yield takeLatest(ON_LOGIN_SUBMIT, onLoginSubmit);
}
