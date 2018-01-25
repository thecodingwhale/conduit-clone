/*
 *
 * Editor actions
 *
 */

import {
  ADD_NEW_POST,
  ADDING_NEW_POST,
  ADD_NEW_POST_COMPLETED,
  ADD_NEW_POST_ERROR,
  FETCH_ARTICLE,
  FETCHING_ARTICLE,
  FETCH_ARTICLE_COMPLETED,
  FETCH_ARTICLE_ERROR,
  UPDATE_ARTICLE,
  UPDATING_ARTICLE,
  UPDATE_ARTICLE_COMPLETED,
  UPDATE_ARTICLE_ERROR,
} from './constants';

export function addNewPost(form) {
  return {
    type: ADD_NEW_POST,
    form,
  };
}

export function addingNewPost() {
  return {
    type: ADDING_NEW_POST,
  };
}

export function addNewPostCompleted(article) {
  return {
    type: ADD_NEW_POST_COMPLETED,
    article,
  };
}

export function addNewPostError() {
  return {
    type: ADD_NEW_POST_ERROR,
  };
}

export function fetchArticle(slug) {
  return {
    type: FETCH_ARTICLE,
    slug,
  };
}

export function fetchingArticle() {
  return {
    type: FETCHING_ARTICLE,
  };
}

export function fetchArticleCompleted(article) {
  return {
    type: FETCH_ARTICLE_COMPLETED,
    article,
  };
}

export function fetchArticleError(err) {
  return {
    type: FETCH_ARTICLE_ERROR,
    err,
  };
}

export function updateArticle(slug, article) {
  return {
    type: UPDATE_ARTICLE,
    slug,
    article,
  };
}

export function updatingArticle() {
  return {
    type: UPDATING_ARTICLE,
  };
}

export function updateArticleCompleted(article) {
  return {
    type: UPDATE_ARTICLE_COMPLETED,
    article,
  };
}

export function updateArticleError(err) {
  return {
    type: UPDATE_ARTICLE_ERROR,
    err,
  };
}
