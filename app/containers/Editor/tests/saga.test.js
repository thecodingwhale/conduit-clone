/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put } from 'redux-saga/effects';
import {
  ADD_NEW_POST,
  FETCH_ARTICLE,
} from 'containers/Editor/constants';
import {
  addNewPostError,
  fetchArticleError,
} from '../actions';
import onAddNewPost, { addNewPost, fetchArticle } from '../saga';

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

describe('fetchArticle Saga', () => {
  let fetchArticleGenerator;
  beforeEach(() => {
    const params = {
      form: {
        foo: 'bar',
      },
    };
    fetchArticleGenerator = fetchArticle(params);
    let putDescriptor = fetchArticleGenerator.next().value;
    expect(putDescriptor).toMatchSnapshot();

    const callDescriptor = fetchArticleGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();

    putDescriptor = fetchArticleGenerator.next({ article: { foo: 'bar' } }).value;
    expect(putDescriptor).toMatchSnapshot();
  });

  it('should dispatch the fetchArticleError action if it requests throws an error', () => {
    const putDescriptor = fetchArticleGenerator.throw('Error').value;
    expect(putDescriptor).toEqual(put(fetchArticleError('Error')));
  });
});

describe('onAddNewPost Saga', () => {
  const defaultSaga = onAddNewPost();
  it('should start task to watch for ADD_NEW_POST action', () => {
    const takeLatestDescriptor = defaultSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(ADD_NEW_POST, addNewPost));
  });
  it('should start task to watch for FETCH_ARTICLE action', () => {
    const takeLatestDescriptor = defaultSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(FETCH_ARTICLE, fetchArticle));
  });
});
