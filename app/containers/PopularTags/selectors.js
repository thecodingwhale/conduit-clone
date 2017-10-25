import { createSelector } from 'reselect';

/**
 * Direct selector to the popularTags state domain
 */
const selectPopularTagsDomain = (state) => state.get('popularTags');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PopularTags
 */

const makeSelectFetching = () => createSelector(
  selectPopularTagsDomain,
  (substate) => substate.get('fetching'),
);

const makeSelectError = () => createSelector(
  selectPopularTagsDomain,
  (substate) => substate.get('error'),
);

const makeSelectTags = () => createSelector(
  selectPopularTagsDomain,
  (substate) => substate.get('tags'),
);


export {
  selectPopularTagsDomain,
  makeSelectFetching,
  makeSelectError,
  makeSelectTags,
};
