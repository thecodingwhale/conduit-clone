
import {
  updateSettings,
  updateFetching,
  updateUserError,
} from '../actions';

import {
  UPDATE_SETTINGS,
  UPDATE_FETCHING,
  UPDATE_USER_ERROR,
} from '../constants';

describe('Settings actions', () => {
  describe('Update Settings Action', () => {
    it('has a type of UPDATE_SETTINGS', () => {
      const form = {
        foo: 'bar',
      };
      const expected = {
        type: UPDATE_SETTINGS,
        form,
      };
      expect(updateSettings(form)).toEqual(expected);
    });
  });
  describe('Update Fetching Action', () => {
    it('has a type of UPDATE_FETCHING', () => {
      const expected = {
        type: UPDATE_FETCHING,
      };
      expect(updateFetching()).toEqual(expected);
    });
  });
  describe('Update User Error Action', () => {
    it('has a type of UPDATE_USER_ERROR', () => {
      const expected = {
        type: UPDATE_USER_ERROR,
      };
      expect(updateUserError()).toEqual(expected);
    });
  });
});
