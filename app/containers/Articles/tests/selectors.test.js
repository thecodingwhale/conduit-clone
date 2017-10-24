import { fromJS } from 'immutable';
import {
  selectArticles,
  makeSelectPosts,
  makeSelectError,
  makeSelectFetching,
  makeSelectPageCount,
} from '../selectors';

describe('selectArticles', () => {
  it('should select the articles state', () => {
    const articleState = fromJS({
      posts: [],
    });
    const mockedState = fromJS({
      articles: articleState,
    });
    expect(selectArticles(mockedState)).toEqual(articleState);
  });
});

describe('makeSelectPosts', () => {
  const postsSelector = makeSelectPosts();
  it('should select the posts state', () => {
    const fixture = fromJS([]);
    const articleState = fromJS({
      posts: fixture,
    });
    const mockedState = fromJS({
      articles: articleState,
    });
    expect(postsSelector(mockedState)).toEqual(fixture);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the posts state', () => {
    const fixture = false;
    const articleState = fromJS({
      error: fixture,
    });
    const mockedState = fromJS({
      articles: articleState,
    });
    expect(errorSelector(mockedState)).toEqual(fixture);
  });
});

describe('makeSelectFetching', () => {
  const fetchingSelector = makeSelectFetching();
  it('should select the posts state', () => {
    const fixture = true;
    const articleState = fromJS({
      fetching: fixture,
    });
    const mockedState = fromJS({
      articles: articleState,
    });
    expect(fetchingSelector(mockedState)).toEqual(fixture);
  });
});

describe('makeSelectPageCount', () => {
  const pageCountSelector = makeSelectPageCount();
  it('should select the pageCount state', () => {
    const fixture = 0;
    const articleState = fromJS({
      pageCount: fixture,
    });
    const mockedState = fromJS({
      articles: articleState,
    });
    expect(pageCountSelector(mockedState)).toEqual(fixture);
  });
});

