import { fromJS } from 'immutable';
import {
  selectArticleDomain,
  makeSelectError,
  makeSelectArticleData,
  makeSelectArticleError,
  makeSelectArticleFetching,
  makeSelectCommentsData,
  makeSelectCommentsError,
  makeSelectCommentsFetching,
  makeSelectArticleDeleting,
  makeSelectArticleDeleted,
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

describe('makeSelectArticleData', () => {
  const selectArticle = makeSelectArticleData();
  it('should select the expected state from article state', () => {
    const fixture = {};
    const articleStateSelector = fromJS({
      article: {
        data: fixture,
      },
    });
    const mockedState = fromJS({
      article: articleStateSelector,
    });
    expect(selectArticle(mockedState)).toEqual(fixture);
  });
});

describe('makeSelectArticleError', () => {
  const errorSelector = makeSelectArticleError();
  it('should select the expected error state from article state', () => {
    const fixture = false;
    const articleState = fromJS({
      article: {
        error: fixture,
      },
    });
    const mockedState = fromJS({
      article: articleState,
    });
    expect(errorSelector(mockedState)).toEqual(fixture);
  });
});

describe('makeSelectArticleFetching', () => {
  const fetchingSelector = makeSelectArticleFetching();
  it('should select the expected fetching state from article state', () => {
    const fixture = true;
    const articleState = fromJS({
      article: {
        fetching: fixture,
      },
    });
    const mockedState = fromJS({
      article: articleState,
    });
    expect(fetchingSelector(mockedState)).toEqual(fixture);
  });
});

describe('makeSelectCommentsData', () => {
  const selectComments = makeSelectCommentsData();
  it('should select the comments state from initial state', () => {
    const fixture = [{
      foo: 'bar',
    }];
    const articleStateSelector = fromJS({
      comments: {
        data: fixture,
      },
    });
    const mockedState = fromJS({
      article: articleStateSelector,
    });
    expect(selectComments(mockedState)).toEqual(fixture);
  });
});

describe('makeSelectCommentsError', () => {
  const errorSelector = makeSelectCommentsError();
  it('should select the expected error state from article state', () => {
    const fixture = false;
    const articleState = fromJS({
      comments: {
        error: fixture,
      },
    });
    const mockedState = fromJS({
      article: articleState,
    });
    expect(errorSelector(mockedState)).toEqual(fixture);
  });
});

describe('makeSelectCommentsFetching', () => {
  const fetchingSelector = makeSelectCommentsFetching();
  it('should select the expected fetching state from article state', () => {
    const fixture = true;
    const articleState = fromJS({
      comments: {
        fetching: fixture,
      },
    });
    const mockedState = fromJS({
      article: articleState,
    });
    expect(fetchingSelector(mockedState)).toEqual(fixture);
  });
});

describe('makeSelectArticleDeleting', () => {
  const deletingSelector = makeSelectArticleDeleting();
  it('should select the expected deleting state from article state', () => {
    const fixture = true;
    const articleState = fromJS({
      article: {
        deleting: fixture,
      },
    });
    const mockedState = fromJS({
      article: articleState,
    });
    expect(deletingSelector(mockedState)).toEqual(fixture);
  });
});

describe('makeSelectArticleDeleted', () => {
  const deletedSelector = makeSelectArticleDeleted();
  it('should select the expected deleted state from article state', () => {
    const fixture = true;
    const articleState = fromJS({
      article: {
        deleted: fixture,
      },
    });
    const mockedState = fromJS({
      article: articleState,
    });
    expect(deletedSelector(mockedState)).toEqual(fixture);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the expected error state', () => {
    const fixture = true;
    const articleState = fromJS({
      error: fixture,
    });
    const mockedState = fromJS({
      article: articleState,
    });
    expect(errorSelector(mockedState)).toEqual(fixture);
  });
});
