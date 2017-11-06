import { fromJS } from 'immutable';
import {
  selectArticleDomain,
  makeSelectArticle,
  makeSelectError,
  makeSelectFetching,
} from '../selectors';

describe('selectArticleDomain', () => {
  it('should select the article state', () => {
    const articleState = fromJS({
      article: null,
    });
    const mockedState = fromJS({
      article: articleState,
    });
    expect(selectArticleDomain(mockedState)).toEqual(articleState);
  });
});

describe('makeSelectArticle', () => {
  const selectArticle = makeSelectArticle();
  it('should select the expected state from article state', () => {
    const fixture = null;
    const articleStateSelector = fromJS({
      article: fixture,
    });
    const mockedState = fromJS({
      article: articleStateSelector,
    });
    expect(selectArticle(mockedState)).toEqual(fixture);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the expected error state from article state', () => {
    const fixture = false;
    const articleState = fromJS({
      error: fixture,
    });
    const mockedState = fromJS({
      article: articleState,
    });
    expect(errorSelector(mockedState)).toEqual(fixture);
  });
});

describe('makeSelectFetching', () => {
  const fetchingSelector = makeSelectFetching();
  it('should select the expected fetching state from article state', () => {
    const fixture = true;
    const articleState = fromJS({
      fetching: fixture,
    });
    const mockedState = fromJS({
      article: articleState,
    });
    expect(fetchingSelector(mockedState)).toEqual(fixture);
  });
});
