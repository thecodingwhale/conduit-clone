
import { fromJS } from 'immutable';
import settingsReducer from '../reducer';
import {
  updateFetching,
  updateUserLoaded,
} from '../actions';
describe('settingsReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      fetching: false,
      success: false,
    });
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(settingsReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the updateFetching action correctly', () => {
    const expectedResult = state.set('fetching', true);
    expect(settingsReducer(state, updateFetching())).toEqual(expectedResult);
  });

  it('should handle the updateUserLoaded action correctly', () => {
    const sampleUser = {
      username: 'ausername',
    };
    const expectedResult = state
      .set('fetching', false)
      .set('success', true);
    expect(settingsReducer(state, updateUserLoaded(sampleUser))).toEqual(expectedResult);
  });
});
