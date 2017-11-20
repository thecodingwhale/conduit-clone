import { takeLatest, call } from 'redux-saga/effects';
import {
  ON_LOGIN_SUBMIT,
} from 'containers/Login/constants';
import request from 'utils/request';

const API_DOMAIN = 'https://conduit.productionready.io/api';

export function* onLoginSubmit({ email, password }) {
  try {
    const payload = yield call(request, `${API_DOMAIN}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    });
    console.log(payload.user);
  } catch (err) {
    console.log(err);
  }
}

// Individual exports for testing
export default function* authentication() {
  yield takeLatest(ON_LOGIN_SUBMIT, onLoginSubmit);
}
