
import { fromJS } from 'immutable';
import articlesReducer from '../reducer';

describe('articlesReducer', () => {
  it('returns the initial state', () => {
    expect(articlesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
