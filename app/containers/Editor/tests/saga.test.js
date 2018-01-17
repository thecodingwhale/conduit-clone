/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put } from 'redux-saga/effects';
import { ADD_NEW_POST } from 'containers/Editor/constants';
import { addNewPostError } from '../actions';
import onAddNewPost, { addNewPost } from '../saga';

describe('addNewPost Saga', () => {
  let addNewPostGenerator;
  beforeEach(() => {
    const params = {
      form: {
        foo: 'bar',
      },
    };
    addNewPostGenerator = addNewPost(params);
    let putDescriptor = addNewPostGenerator.next().value;
    expect(putDescriptor).toMatchSnapshot();

    const callDescriptor = addNewPostGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();

    putDescriptor = addNewPostGenerator.next({ article: { foo: 'bar' } }).value;
    expect(putDescriptor).toMatchSnapshot();
  });

  it('should dispatch the addNewPostError action if it requests throws an error', () => {
    const putDescriptor = addNewPostGenerator.throw('Error').value;
    expect(putDescriptor).toEqual(put(addNewPostError('Error')));
  });
});

describe('onAddNewPost Saga', () => {
  const defaultSaga = onAddNewPost();
  it('should start task to watch for ADD_NEW_POST action', () => {
    const takeLatestDescriptor = defaultSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(ADD_NEW_POST, addNewPost));
  });
});
