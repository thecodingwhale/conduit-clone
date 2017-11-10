import { createSelector } from 'reselect';

/**
 * Direct selector to the article state domain
 */
const selectArticleDomain = (state) => state.get('article');

/**
 * Other specific selectors
 */

const makeSelectArticleData = () => createSelector(
  selectArticleDomain,
  (substate) => substate.getIn(['article', 'data']).toJS()
);

const makeSelectArticleError = () => createSelector(
  selectArticleDomain,
  (substate) => substate.getIn(['article', 'error'])
);

const makeSelectArticleFetching = () => createSelector(
  selectArticleDomain,
  (substate) => substate.getIn(['article', 'fetching'])
);

const makeSelectComments = () => createSelector(
  selectArticleDomain,
  (substate) => substate.get('comments').toJS()
);

export {
  selectArticleDomain,
  makeSelectArticleData,
  makeSelectArticleError,
  makeSelectArticleFetching,
  makeSelectComments,
};
