import { fromJS } from 'immutable';

import popularTagsReducer from '../reducer';
import {
  defaultAction,
  tagsLoaded,
  tagsLoadingError,
} from '../actions';

describe('popularTagsReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      fetching: true,
      error: false,
      tags: [],
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(popularTagsReducer(undefined, {})).toEqual(expectedResult);
    expect(popularTagsReducer(state, defaultAction())).toEqual(expectedResult);
  });

  it('should handle the tagsLoaded action correctly', () => {
    const fixture = {
      tags: ['foo'],
    };
    const expectedResult = state.set('fetching', false).set('tags', fixture.tags);
    expect(popularTagsReducer(state, tagsLoaded(fixture))).toEqual(expectedResult);
  });

  it('should handle the tagsLoadingError action correctly', () => {
    const expectedResult = state.set('fetching', false).set('error', true);
    expect(popularTagsReducer(state, tagsLoadingError())).toEqual(expectedResult);
  });
});
