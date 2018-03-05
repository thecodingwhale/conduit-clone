import { createSelector } from 'reselect';

/**
 * Direct selector to the favoriteButton state domain
 */
const selectFavoriteButtonDomain = (state) => state.get('favoriteButton');

/**
 * Other specific selectors
 */


/**
 * Default selector used by FavoriteButton
 */

const makeSelectFavoriteButton = () => createSelector(
  selectFavoriteButtonDomain,
  (substate) => substate.toJS()
);

export default makeSelectFavoriteButton;
export {
  selectFavoriteButtonDomain,
};
