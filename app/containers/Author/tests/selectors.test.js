import { fromJS } from 'immutable';
import {
  selectAuthorDomain,
  makeSelectAuthorData,
  makeSelectAuthorFetching,
  makeSelectAuthorError,
} from '../selectors';

const author = {
  error: false,
  fetching: true,
  data: {},
};

describe('selectAuthorDomain', () => {
  it('should select the author state', () => {
    const authorState = fromJS({
      author,
    });
    const mockedState = fromJS({
      author: authorState,
    });
    expect(selectAuthorDomain(mockedState)).toEqual(authorState);
  });
});

describe('makeSelectAuthorData', () => {
  const selectAuthor = makeSelectAuthorData();
  it('should select the expected state from author state', () => {
    const authorStateSelector = fromJS({
      author,
    });
    const mockedState = fromJS({
      author: authorStateSelector,
    });
    expect(selectAuthor(mockedState)).toEqual(author.data);
  });
});

describe('makeSelectAuthorError', () => {
  const errorSelector = makeSelectAuthorError();
  it('should select the expected error state from author state', () => {
    const authorState = fromJS({
      author,
    });
    const mockedState = fromJS({
      author: authorState,
    });
    expect(errorSelector(mockedState)).toEqual(author.error);
  });
});

describe('makeSelectAuthorFetching', () => {
  const fetchingSelector = makeSelectAuthorFetching();
  it('should select the expected fetching state from author state', () => {
    const authorState = fromJS({
      author,
    });
    const mockedState = fromJS({
      author: authorState,
    });
    expect(fetchingSelector(mockedState)).toEqual(author.fetching);
  });
});
