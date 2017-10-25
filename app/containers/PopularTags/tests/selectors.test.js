import { fromJS } from 'immutable';
import {
  selectPopularTagsDomain,
  makeSelectFetching,
  makeSelectError,
  makeSelectTags,
} from '../selectors';

describe('selectPopularTagsDomain', () => {
  it('should select the tags state', () => {
    const tagState = fromJS({
      fetching: true,
      error: false,
      tags: [],
    });
    const mockedState = fromJS({
      popularTags: tagState,
    });
    expect(selectPopularTagsDomain(mockedState)).toEqual(tagState);
  });
});

describe('makeSelectFetching', () => {
  const fetchingSelector = makeSelectFetching();
  it('should select the fetching state', () => {
    const fixture = true;
    const tagState = fromJS({
      fetching: fixture,
    });
    const mockedState = fromJS({
      popularTags: tagState,
    });
    expect(fetchingSelector(mockedState)).toEqual(fixture);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the error state', () => {
    const fixture = false;
    const tagState = fromJS({
      error: fixture,
    });
    const mockedState = fromJS({
      popularTags: tagState,
    });
    expect(errorSelector(mockedState)).toEqual(fixture);
  });
});

describe('makeSelectTags', () => {
  const tagSelector = makeSelectTags();
  it('should select the tags state', () => {
    const fixture = fromJS([]);
    const tagState = fromJS({
      tags: fixture,
    });
    const mockedState = fromJS({
      popularTags: tagState,
    });
    expect(tagSelector(mockedState)).toEqual(fixture);
  });
});
