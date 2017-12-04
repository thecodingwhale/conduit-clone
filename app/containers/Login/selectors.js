import { createSelector } from 'reselect';

/**
 * Direct selector to the login state domain
 */
const selectLoginDomain = (state) => state.get('login');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Login
 */

const makeSelectLoginUser = () => createSelector(
  selectLoginDomain,
  (substate) => substate.getIn(['user', 'data'])
);

const makeSelectLoginUserFetching = () => createSelector(
  selectLoginDomain,
  (substate) => substate.getIn(['user', 'fetching'])
);

const makeSelectLoginUserError = () => createSelector(
  selectLoginDomain,
  (substate) => substate.getIn(['user', 'error'])
);

export {
  selectLoginDomain,
  makeSelectLoginUser,
  makeSelectLoginUserFetching,
  makeSelectLoginUserError,
};
