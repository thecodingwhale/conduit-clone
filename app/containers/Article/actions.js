/*
 *
 * Article actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_ARTICLE,
  ARTICLE_LOADED,
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

export function articleLoaded(article) {
  return {
    type: ARTICLE_LOADED,
    article,
  };
}

export function commentsLoaded(comments) {
  return {
    type: COMMENTS_LOADED,
    comments,
  };
}

export function articleLoadingError() {
  return {
    type: LOAD_ARTICLE_ERROR,
  };
}

export function commentsLoadingError() {
  return {
    type: LOAD_COMMENTS_ERROR,
  };
}

