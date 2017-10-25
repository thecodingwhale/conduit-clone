/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put } from 'redux-saga/effects';
import { GET_TAGS } from 'containers/PopularTags/constants';

import {
  tagsLoadingError,
} from 'containers/PopularTags/actions';
import tagsData, { getTags } from '../saga';

describe('tagsDataSaga Saga', () => {
  let getTagsGenerator;
  beforeEach(() => {
    getTagsGenerator = getTags();

    const selectDescriptor = getTagsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getTagsGenerator.next({ tags: ['foo'] }).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch tagsLoadingError action if api request failed', () => {
    const putDescriptor = getTagsGenerator.throw().value;
    expect(putDescriptor).toEqual(put(tagsLoadingError()));
  });
});

describe('tagsDataSaga Saga', () => {
  const tagsDataSaga = tagsData();

  it('should start task to watch for GET_TAGS action', () => {
    const takeLatestDescriptor = tagsDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(GET_TAGS, getTags));
  });
});
