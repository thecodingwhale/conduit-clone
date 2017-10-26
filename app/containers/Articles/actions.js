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

export function fetchArticles(page, tag) {
  return {
    type: FETCH_ARTICLES,
    page,
    tag,
  };
}

export function articlesLoaded(payload) {
  const { articles, articlesCount } = payload;
  return {
    type: ARTICLES_LOADED,
    pageCount: articlesCount,
    articles,
  };
}

export function articlesLoadingError() {
  return {
    type: LOAD_ARTICLES_ERROR,
  };
}
