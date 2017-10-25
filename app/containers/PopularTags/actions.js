/*
 *
 * PopularTags actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_TAGS,
  TAGS_LOADED,
  TAGS_LOADING_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getTags() {
  return {
    type: GET_TAGS,
  };
}

export function tagsLoaded(payload) {
  const { tags } = payload;
  return {
    type: TAGS_LOADED,
    tags,
  };
}

export function tagsLoadingError() {
  return {
    type: TAGS_LOADING_ERROR,
  };
}
