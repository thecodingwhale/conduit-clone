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

const makeSelectCommentsData = () => createSelector(
  selectArticleDomain,
  (substate) => substate.getIn(['comments', 'data']).toJS(),
);

const makeSelectCommentsError = () => createSelector(
  selectArticleDomain,
  (substate) => substate.getIn(['comments', 'error'])
);

const makeSelectCommentsFetching = () => createSelector(
  selectArticleDomain,
  (substate) => substate.getIn(['comments', 'fetching'])
);

export {
  selectArticleDomain,

  makeSelectArticleData,
  makeSelectArticleError,
  makeSelectArticleFetching,

  makeSelectCommentsData,
  makeSelectCommentsError,
  makeSelectCommentsFetching,
};
