import { createSelector } from 'reselect';

/**
 * Direct selector to the article state domain
 */
const selectArticleDomain = (state) => state.get('article');

/**
 * Other specific selectors
 */

const makeSelectError = () => createSelector(
  selectArticleDomain,
  (substate) => substate.get('error')
);

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


const makeSelectArticleDeleting = () => createSelector(
  selectArticleDomain,
  (substate) => substate.getIn(['article', 'deleting'])
);

const makeSelectArticleDeleted = () => createSelector(
  selectArticleDomain,
  (substate) => substate.getIn(['article', 'deleted'])
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

const makeSelectCommentsDeleting = () => createSelector(
  selectArticleDomain,
  (substate) => substate.getIn(['comments', 'deleting'])
);

const makeSelectCommentsPosting = () => createSelector(
  selectArticleDomain,
  (substate) => substate.getIn(['comments', 'posting'])
);

const makeSelectCommentsPostingCompleted = () => createSelector(
  selectArticleDomain,
  (substate) => substate.getIn(['comments', 'postingCompleted'])
);

const makeSelectCommentsPostingError = () => createSelector(
  selectArticleDomain,
  (substate) => substate.getIn(['comments', 'postingError'])
);

export {
  selectArticleDomain,

  makeSelectError,

  makeSelectArticleData,
  makeSelectArticleError,
  makeSelectArticleFetching,
  makeSelectArticleDeleting,
  makeSelectArticleDeleted,

  makeSelectCommentsData,
  makeSelectCommentsError,
  makeSelectCommentsFetching,
  makeSelectCommentsDeleting,
  makeSelectCommentsPosting,
  makeSelectCommentsPostingError,
  makeSelectCommentsPostingCompleted,
};
