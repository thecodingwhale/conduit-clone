
import {
  fetchArticles,
  articlesLoaded,
  articlesLoadingError,
} from '../actions';
import {
  FETCH_ARTICLES,
  ARTICLES_LOADED,
  LOAD_ARTICLES_ERROR,
} from '../constants';

describe('Articles actions', () => {
  describe('fetchArticles Action', () => {
    it('has a type of fetchArticles', () => {
      const fixture = 1;
      const expected = {
        type: FETCH_ARTICLES,
        page: fixture,
      };
      expect(fetchArticles(fixture)).toEqual(expected);
    });
  });

  describe('articlesLoaded Action', () => {
    it('has a type of articlesLoaded', () => {
      const fixture = {};
      const expected = {
        type: ARTICLES_LOADED,
        articles: fixture,
      };
      expect(articlesLoaded({ articles: fixture })).toEqual(expected);
    });
  });

  describe('articlesLoaded Action', () => {
    it('has a type of articlesLoaded', () => {
      const expected = {
        type: LOAD_ARTICLES_ERROR,
      };
      expect(articlesLoadingError()).toEqual(expected);
    });
  });
});
