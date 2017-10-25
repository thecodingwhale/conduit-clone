
import {
  defaultAction,
  getTags,
  tagsLoaded,
  tagsLoadingError,
} from '../actions';

import {
  DEFAULT_ACTION,
  GET_TAGS,
  TAGS_LOADED,
  TAGS_LOADING_ERROR,
} from '../constants';

describe('PopularTags actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });

  describe('getTags() action', () => {
    it('has a type of GET_TAGS', () => {
      const expected = {
        type: GET_TAGS,
      };
      expect(getTags()).toEqual(expected);
    });
  });

  describe('tagsLoaded() action', () => {
    it('has a type of TAGS_LOADED', () => {
      const expected = {
        type: TAGS_LOADED,
        tags: ['foo'],
      };
      expect(tagsLoaded({ tags: ['foo'] })).toEqual(expected);
    });
  });

  describe('tagsLoadingError() action', () => {
    it('has a type of TAGS_LOADING_ERROR', () => {
      const expected = {
        type: TAGS_LOADING_ERROR,
      };
      expect(tagsLoadingError()).toEqual(expected);
    });
  });
});
