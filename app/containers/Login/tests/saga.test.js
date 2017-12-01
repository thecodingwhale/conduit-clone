/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put } from 'redux-saga/effects';
import { ON_LOGIN_SUBMIT } from 'containers/Login/constants';
import {
  authenticationLoadingError,
} from '../actions';
import authetication, { onLoginSubmit } from '../saga';

describe('defaultSaga Saga', () => {
  let onLoginSubmitGenerator;

  beforeEach(() => {
    onLoginSubmitGenerator = onLoginSubmit({
      email: 'email@web.com',
      password: 'sample password',
    });

    let putDescriptor = onLoginSubmitGenerator.next().value;
    expect(putDescriptor).toMatchSnapshot();

    const callDescriptor = onLoginSubmitGenerator.next({
      email: 'email@web.com',
      password: 'sample password',
    }).value;
    expect(callDescriptor).toMatchSnapshot();

    putDescriptor = onLoginSubmitGenerator.next({}).value;
    expect(putDescriptor).toMatchSnapshot();
  });

  it('should dispatch the authenticationLoadingError action if it requests throws an error', () => {
    const putDescriptor = onLoginSubmitGenerator.throw().value;
    expect(putDescriptor).toEqual(put(authenticationLoadingError('incorrect email/password')));
  });
});

describe('autheticationData Saga', () => {
  const autheticationData = authetication();
  it('should start task to watch for ON_LOGIN_SUBMIT action', () => {
    const takeLatestDescriptor = autheticationData.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(ON_LOGIN_SUBMIT, onLoginSubmit));
  });
});
