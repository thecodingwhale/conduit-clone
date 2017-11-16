/*
 *
 * Articles actions
 *
 */

import {
  FETCH_ARTICLES,
  FETCH_ARTICLES_BY_AUTHOR,
  FETCH_ARTICLES_FAVORITED_BY_AUTHOR,
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

export function fetchArticlesByAuthor(page, username) {
  return {
    type: FETCH_ARTICLES_BY_AUTHOR,
    page,
    username,
  };
}

export function fetchArticlesFavoritedByAuthor(page, username) {
  return {
    type: FETCH_ARTICLES_FAVORITED_BY_AUTHOR,
    favorited: true,
    page,
    username,
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
