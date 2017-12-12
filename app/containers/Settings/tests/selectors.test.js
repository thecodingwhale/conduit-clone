import { fromJS } from 'immutable';
import {
  makeSelectSettingsDomain,
  makeSelectFetching,
  makeSelectSuccess,
} from '../selectors';

describe('makeSelectSettingsDomain', () => {
  it('should select the login state', () => {
    const settingsState = fromJS({
      fetching: false,
    });
    const mockedState = fromJS({
      settings: settingsState,
    });
    expect(makeSelectSettingsDomain(mockedState)).toEqual(settingsState);
  });
});

describe('makeSelectFetching', () => {
  const selectFetching = makeSelectFetching();
  it('should select the expected state from login state', () => {
    const settingsState = fromJS({
      fetching: false,
    });
    const mockedState = fromJS({
      settings: settingsState,
    });
    expect(selectFetching(mockedState)).toEqual(false);
  });
});

describe('makeSelectSuccess', () => {
  const selectSuccess = makeSelectSuccess();
  it('should select the expected state from login state', () => {
    const settingsState = fromJS({
      success: false,
    });
    const mockedState = fromJS({
      settings: settingsState,
    });
    expect(selectSuccess(mockedState)).toEqual(false);
  });
});
