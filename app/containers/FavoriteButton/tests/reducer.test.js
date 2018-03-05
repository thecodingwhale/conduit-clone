
import { fromJS } from 'immutable';
import favoriteButtonReducer from '../reducer';

describe('favoriteButtonReducer', () => {
  it('returns the initial state', () => {
    expect(favoriteButtonReducer(undefined, {})).toEqual(fromJS({}));
  });
});
