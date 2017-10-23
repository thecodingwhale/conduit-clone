import { createSelector } from 'reselect';

/**
 * Direct selector to the articles state domain
 */
const selectArticles = (state) => state.get('articles');

/**
 * Other specific selectors
 */

const makeSelectPosts = () => createSelector(
  selectArticles,
  (substate) => substate.get('posts')
);

const makeSelectError = () => createSelector(
  selectArticles,
  (substate) => substate.get('error')
);

const makeSelectFetching = () => createSelector(
  selectArticles,
  (substate) => substate.get('fetching')
);

export {
  selectArticles,
  makeSelectPosts,
  makeSelectError,
  makeSelectFetching,
};
