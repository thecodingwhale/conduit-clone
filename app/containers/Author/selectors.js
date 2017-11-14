import { createSelector } from 'reselect';

/**
 * Direct selector to the author state domain
 */
const selectAuthorDomain = (state) => state.get('author');

/**
 * Default selector used by Author
 */
const makeSelectAuthorData = () => createSelector(
  selectAuthorDomain,
  (substate) => substate.getIn(['author', 'data']).toJS()
);

const makeSelectAuthorFetching = () => createSelector(
  selectAuthorDomain,
  (substate) => substate.getIn(['author', 'fetching'])
);

const makeSelectAuthorError = () => createSelector(
  selectAuthorDomain,
  (substate) => substate.getIn(['author', 'error'])
);

export {
  selectAuthorDomain,
  makeSelectAuthorData,
  makeSelectAuthorFetching,
  makeSelectAuthorError,
};
