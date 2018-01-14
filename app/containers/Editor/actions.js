/*
 *
 * Editor actions
 *
 */

import {
  ADD_NEW_POST,
  ADDING_NEW_POST,
  ADD_NEW_POST_COMPLETED,
} from './constants';

export function addNewPost(form) {
  return {
    type: ADD_NEW_POST,
    form,
  };
};

export function addingNewPost() {
  return {
    type: ADDING_NEW_POST,
  };
};

export function addNewPostCompleted(article) {
  return {
    type: ADD_NEW_POST_COMPLETED,
    article,
  };
};
