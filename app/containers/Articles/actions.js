/*
 *
 * Articles actions
 *
 */

import {
  FETCH_ARTICLES,
  ARTICLES_LOADED,
  LOAD_ARTICLES_ERROR,
} from './constants';

export function fetchArticles(page) {
  return {
    type: FETCH_ARTICLES,
    page,
  };
}

export function articlesLoaded(payload) {
  const { articles } = payload;
  return {
    type: ARTICLES_LOADED,
    articles,
  };
}

export function articlesLoadingError() {
  return {
    type: LOAD_ARTICLES_ERROR,
  };
}
