/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put } from 'redux-saga/effects';
import { FETCH_AUTHOR_PROFILE } from 'containers/Author/constants';

import {
  authorProfileLoadingError,
} from 'containers/Author/actions';

import authorProfileData, { getAuthorProfile } from '../saga';

const response = {};

describe('defaultSaga Saga', () => {
  let getAuthorProfileGenerator;

  beforeEach(() => {
    getAuthorProfileGenerator = getAuthorProfile({
      username: '@john_doe',
    });

    const selectDescriptor = getAuthorProfileGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getAuthorProfileGenerator.next(response).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the authorProfileLoadingError action if it requests throws an error', () => {
    const putDescriptor = getAuthorProfileGenerator.throw().value;
    expect(putDescriptor).toEqual(put(authorProfileLoadingError()));
  });
});

describe('authorProfileData Saga', () => {
  const authorProfile = authorProfileData();

  it('should start task to watch for FETCH_AUTHOR_PROFILE action', () => {
    const takeLatestDescriptor = authorProfile.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(FETCH_AUTHOR_PROFILE, getAuthorProfile));
  });
});
