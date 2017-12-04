
import { fromJS } from 'immutable';
import loginReducer from '../reducer';

import {
  authenticationLoaded,
  authenticationLoadingError,
  authenticationRequesting,
} from '../actions';

describe('loginReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      user: {
        fetching: false,
        error: false,
        data: fromJS({}),
      },
    });
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(loginReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the authenticationLoaded action correctly', () => {
    const fixture = {
      user: {},
    };
    const expectedResult = state
      .setIn(['user', 'fetching'], false)
      .setIn(['user', 'data'], fromJS(fixture.user));
    expect(loginReducer(state, authenticationLoaded(fixture.user))).toEqual(expectedResult);
  });

  it('should handle the authenticationLoadingError action correctly', () => {
    const fixture = {
      error: 'sample error message',
    };
    const expectedResult = state
      .setIn(['user', 'fetching'], false)
      .setIn(['user', 'error'], fixture.message);
    expect(loginReducer(state, authenticationLoadingError(fixture))).toEqual(expectedResult);
  });

  it('should handle the authenticationRequesting action correctly', () => {
    const expectedResult = state
      .setIn(['user', 'fetching'], true);
    expect(loginReducer(state, authenticationRequesting())).toEqual(expectedResult);
  });
});
