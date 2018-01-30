/*
 *
 * Article actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_ARTICLE,
  ARTICLE_LOADED,
  GET_ARTICLE_SLUG,
  COMMENTS_LOADED,
  LOAD_ARTICLE_ERROR,
  LOAD_COMMENTS_ERROR,
  DELETING_ARTICLE,
  DELETE_ARTICLE,
  DELETE_ARTICLE_COMPLETED,
  DELETE_ARTICLE_ERROR,
  POST_COMMENT,
  POSTING_COMMENT,
  POST_COMMENT_COMPLETED,
  POST_COMMENT_ERROR,
  DELETE_COMMENT,
  DELETING_COMMENT,
  DELETE_COMMENT_COMPLETED,
  DELETE_COMMENT_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchArticle(slug) {
  return {
    type: FETCH_ARTICLE,
    slug,
  };
}

export function articleLoaded(article) {
  return {
    type: ARTICLE_LOADED,
    article,
  };
}

export function getArticleSlug(slug) {
  return {
    type: GET_ARTICLE_SLUG,
    slug,
  };
}

export function articleLoadingError() {
  return {
    type: LOAD_ARTICLE_ERROR,
  };
}

export function commentsLoaded(comments) {
  return {
    type: COMMENTS_LOADED,
    comments,
  };
}

export function commentsLoadingError() {
  return {
    type: LOAD_COMMENTS_ERROR,
  };
}

export function deletingArticle() {
  return {
    type: DELETING_ARTICLE,
  };
}

export function deleteArticle(slug) {
  return {
    type: DELETE_ARTICLE,
    slug,
  };
}

export function deleteArticleCompleted() {
  return {
    type: DELETE_ARTICLE_COMPLETED,
  };
}

export function deleteArticleError(err) {
  return {
    type: DELETE_ARTICLE_ERROR,
    err,
  };
}

export function postComment(slug, comment) {
  return {
    type: POST_COMMENT,
    slug,
    comment,
  };
}

export function postingComment() {
  return {
    type: POSTING_COMMENT,
  };
}

export function postCommentCompleted({ comment }) {
  return {
    type: POST_COMMENT_COMPLETED,
    comment,
  };
}

export function postCommentError(err) {
  return {
    type: POST_COMMENT_ERROR,
    err,
  };
}

export function deleteComment(slug, commentId) {
  return {
    type: DELETE_COMMENT,
    slug,
    commentId,
  };
}

export function deletingComment() {
  return {
    type: DELETING_COMMENT,
  };
}

export function deleteCommentCompleted(commentId) {
  return {
    type: DELETE_COMMENT_COMPLETED,
    commentId,
  };
}

export function deleteCommentError(err) {
  return {
    type: DELETE_COMMENT_ERROR,
    err,
  };
}
