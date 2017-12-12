/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put } from 'redux-saga/effects';
import { UPDATE_SETTINGS } from 'containers/Settings/constants';
import {
  updateUserError,
} from '../actions';
import onUpdateSettingsSaga, { fetchUpdateSettingValues } from '../saga';

describe('defaultSaga Saga', () => {
  let fetchUpdateSettingValuesGenerator;
  beforeEach(() => {
    const user = {
      username: 'ausername',
      email: 'email@web.com',
      password: 'sample password',
    };
    fetchUpdateSettingValuesGenerator = fetchUpdateSettingValues(user);
    let putDescriptor = fetchUpdateSettingValuesGenerator.next().value;
    expect(putDescriptor).toMatchSnapshot();

    const callDescriptor = fetchUpdateSettingValuesGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();

    putDescriptor = fetchUpdateSettingValuesGenerator.next({ user }).value;
    expect(putDescriptor).toMatchSnapshot();
  });

  it('should dispatch the updateUserError action if it requests throws an error', () => {
    const putDescriptor = fetchUpdateSettingValuesGenerator.throw('Error').value;
    expect(putDescriptor).toEqual(put(updateUserError('Error')));
  });
});

describe('onUpdateSettingsSaga Saga', () => {
  const defaultSaga = onUpdateSettingsSaga();
  it('should start task to watch for UPDATE_SETTINGS action', () => {
    const takeLatestDescriptor = defaultSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(UPDATE_SETTINGS, fetchUpdateSettingValues));
  });
});
