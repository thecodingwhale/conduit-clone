
import {
  defaultAction,
  fetchArticle,
  articleLoaded,
  articleLoadingError,
} from '../actions';
import {
  DEFAULT_ACTION,
  FETCH_ARTICLE,
  ARTICLE_LOADED,
  LOAD_ARTICLE_ERROR,
} from '../constants';

describe('Article actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });

  describe('Fetch Article', () => {
    it('has a type of FETCH_ARTICLE', () => {
      const slug = 'sample-slug';
      const expected = {
        type: FETCH_ARTICLE,
        slug,
      };
      expect(fetchArticle(slug)).toEqual(expected);
    });
  });

  describe('Article Loaded', () => {
    it('has a type of FETCH_ARTICLE', () => {
      const article = {
        foo: 'bar',
      };
      const expected = {
        type: ARTICLE_LOADED,
        article,
      };
      expect(articleLoaded(article)).toEqual(expected);
    });
  });

  describe('Article Loading Error', () => {
    it('has a type of LOAD_ARTICLE_ERROR', () => {
      const expected = {
        type: LOAD_ARTICLE_ERROR,
      };
      expect(articleLoadingError()).toEqual(expected);
    });
  });
});
