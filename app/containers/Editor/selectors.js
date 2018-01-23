import { createSelector } from 'reselect';

/**
 * Direct selector to the editor state domain
 */
const selectEditorDomain = (state) => state.get('editor');

/**
 * Default selector used by Settings
 */
const makeSelectFetching = () => createSelector(
  selectEditorDomain,
  (substate) => substate.get('fetching')
);

const makeSelectSuccess = () => createSelector(
  selectEditorDomain,
  (substate) => substate.get('success')
);

const makeSelectSlug = () => createSelector(
  selectEditorDomain,
  (substate) => substate.get('slug')
);

const makeSelectError = () => createSelector(
  selectEditorDomain,
  (substate) => substate.get('error')
);

const makeSelectArticle = () => createSelector(
  selectEditorDomain,
  (substate) => substate.get('article')
);

export {
  selectEditorDomain,
  makeSelectFetching,
  makeSelectSuccess,
  makeSelectSlug,
  makeSelectError,
  makeSelectArticle,
};
