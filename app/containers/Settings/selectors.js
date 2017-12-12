import { createSelector } from 'reselect';

/**
 * Direct selector to the settings state domain
 */
const makeSelectSettingsDomain = (state) => state.get('settings');

/**
 * Default selector used by Settings
 */
const makeSelectFetching = () => createSelector(
  makeSelectSettingsDomain,
  (substate) => substate.get('fetching')
);

const makeSelectSuccess = () => createSelector(
  makeSelectSettingsDomain,
  (substate) => substate.get('success')
);

export {
  makeSelectSettingsDomain,
  makeSelectFetching,
  makeSelectSuccess,
};
