/**
 *
 * Asynchronously loads the component for FavoriteButton
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
