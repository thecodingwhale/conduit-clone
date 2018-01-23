
import {
  addNewPost,
  addingNewPost,
  addNewPostCompleted,
  addNewPostError,
  fetchingArticle,
  fetchArticleCompleted,
  fetchArticleError,
} from '../actions';
import {
  ADD_NEW_POST,
  ADDING_NEW_POST,
  ADD_NEW_POST_COMPLETED,
  ADD_NEW_POST_ERROR,
  FETCHING_ARTICLE,
  FETCH_ARTICLE_COMPLETED,
  FETCH_ARTICLE_ERROR,
} from '../constants';

describe('Editor actions', () => {
  describe('Add new post', () => {
    it('has a type of ADD_NEW_POST', () => {
      const form = {
        foo: 'bar',
      };
      const expected = {
        type: ADD_NEW_POST,
        form,
      };
      expect(addNewPost(form)).toEqual(expected);
    });
  });

  describe('Adding new post', () => {
    it('has a type of ADDING_NEW_POST', () => {
      const expected = {
        type: ADDING_NEW_POST,
      };
      expect(addingNewPost()).toEqual(expected);
    });
  });

  describe('Add new post completed', () => {
    it('has a type of ADD_NEW_POST_COMPLETED', () => {
      const article = {
        foo: 'bar',
      };
      const expected = {
        type: ADD_NEW_POST_COMPLETED,
        article,
      };
      expect(addNewPostCompleted(article)).toEqual(expected);
    });
  });

  describe('Add new post error', () => {
    it('has a type of ADD_NEW_POST_ERROR', () => {
      const expected = {
        type: ADD_NEW_POST_ERROR,
      };
      expect(addNewPostError()).toEqual(expected);
    });
  });

  describe('Fetching article', () => {
    it('has a type of FETCHING_ARTICLE', () => {
      const expected = {
        type: FETCHING_ARTICLE,
      };
      expect(fetchingArticle()).toEqual(expected);
    });
  });

  describe('Fetch article completed', () => {
    it('has a type of FETCH_ARTICLE_COMPLETED', () => {
      const article = {
        foo: 'bar',
      };
      const expected = {
        type: FETCH_ARTICLE_COMPLETED,
        article,
      };
      expect(fetchArticleCompleted(article)).toEqual(expected);
    });
  });

  describe('Fetch article error', () => {
    it('has a type of FETCH_ARTICLE_ERROR', () => {
      const err = 'some quick error';
      const expected = {
        type: FETCH_ARTICLE_ERROR,
        err,
      };
      expect(fetchArticleError(err)).toEqual(expected);
    });
  });
});
