import { createSelector } from 'reselect';

/**
 * Direct selector to the article state domain
 */
const selectArticleDomain = (state) => state.get('article');

/**
 * Other specific selectors
 */

const makeSelectArticle = () => createSelector(
  selectArticleDomain,
  (substate) => substate.get('article')
);

const makeSelectError = () => createSelector(
  selectArticleDomain,
  (substate) => substate.get('error')
);

const makeSelectFetching = () => createSelector(
  selectArticleDomain,
  (substate) => substate.get('fetching')
);

export {
  selectArticleDomain,
  makeSelectArticle,
  makeSelectError,
  makeSelectFetching,
};
