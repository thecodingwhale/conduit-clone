
import { fromJS } from 'immutable';
import authorReducer from '../reducer';

import {
  authorProfileLoaded,
  authorProfileLoadingError,
} from '../actions';

describe('authorReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      author: {
        fetching: true,
        error: false,
        data: {},
      },
    });
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(authorReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the authorProfileLoaded action correctly', () => {
    const fixture = {
      author: {
        fetching: true,
        error: false,
        data: {},
      },
    };
    const expectedResult = state
      .setIn(['author', 'fetching'], false)
      .setIn(['author', 'data'], fromJS(fixture.data));
    expect(authorReducer(state, authorProfileLoaded(fixture.data))).toEqual(expectedResult);
  });

  it('should handle the authorProfileLoadingError action correctly', () => {
    const expectedResult = state
      .setIn(['author', 'fetching'], false)
      .setIn(['author', 'error'], true);
    expect(authorReducer(state, authorProfileLoadingError())).toEqual(expectedResult);
  });
});
