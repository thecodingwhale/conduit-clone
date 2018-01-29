import {
  defaultAction,
  fetchArticle,
  articleLoaded,
  getArticleSlug,
  commentsLoaded,
  articleLoadingError,
  commentsLoadingError,
  deleteArticleError,
  postingComment,
  postCommentCompleted,
  postCommentError,
} from '../actions';

import {
  DEFAULT_ACTION,
  FETCH_ARTICLE,
  ARTICLE_LOADED,
  GET_ARTICLE_SLUG,
  COMMENTS_LOADED,
  LOAD_ARTICLE_ERROR,
  LOAD_COMMENTS_ERROR,
  DELETE_ARTICLE_ERROR,
  POSTING_COMMENT,
  POST_COMMENT_COMPLETED,
  POST_COMMENT_ERROR,
} from '../constants';

const slug = 'sample-slug';

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
      const expected = {
        type: FETCH_ARTICLE,
        slug,
      };
      expect(fetchArticle(slug)).toEqual(expected);
    });
  });

  describe('Article Loaded', () => {
    it('has a type of ARTICLE_LOADED', () => {
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

  describe('Article Loaded', () => {
    it('has a type of ARTICLE_LOADED', () => {
      const expected = {
        type: GET_ARTICLE_SLUG,
        slug,
      };
      expect(getArticleSlug(slug)).toEqual(expected);
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

  describe('Comments Loaded', () => {
    it('has a type of COMMENTS_LOADED', () => {
      const comments = {
        foo: 'bar',
      };
      const expected = {
        type: COMMENTS_LOADED,
        comments,
      };
      expect(commentsLoaded(comments)).toEqual(expected);
    });
  });

  describe('Article Loading Error', () => {
    it('has a type of LOAD_COMMENTS_ERROR', () => {
      const expected = {
        type: LOAD_COMMENTS_ERROR,
      };
      expect(commentsLoadingError()).toEqual(expected);
    });
  });

  describe('Delete Article Error', () => {
    it('has a type of DELETE_ARTICLE_ERROR', () => {
      const expected = {
        type: DELETE_ARTICLE_ERROR,
      };
      expect(deleteArticleError()).toEqual(expected);
    });
  });

  describe('Posting Coment', () => {
    it('has a type of POSTING_COMMENT', () => {
      const expected = {
        type: POSTING_COMMENT,
      };
      expect(postingComment()).toEqual(expected);
    });
  });

  describe('Post Coment Completed', () => {
    it('has a type of POST_COMMENT_COMPLETED', () => {
      const comment = 'sample-comment';
      const expected = {
        type: POST_COMMENT_COMPLETED,
        comment,
      };
      expect(postCommentCompleted({ comment })).toEqual(expected);
    });
  });

  describe('Post Coment Error', () => {
    it('has a type of POST_COMMENT_ERROR', () => {
      const err = 'error';
      const expected = {
        type: POST_COMMENT_ERROR,
        err,
      };
      expect(postCommentError(err)).toEqual(expected);
    });
  });
});
