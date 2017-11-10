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

export function articleLoaded(article, slug) {
  return {
    type: ARTICLE_LOADED,
    article,
    slug,
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

