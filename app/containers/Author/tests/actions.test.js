
import {
  defaultAction,
  fetchAuthorProfile,
  authorProfileLoaded,
  authorProfileLoadingError,
} from '../actions';
import {
  DEFAULT_ACTION,
  FETCH_AUTHOR_PROFILE,
  AUTHOR_PROFILE_LOADED,
  AUTHOR_PROFILE_LOADING_ERROR,
} from '../constants';

const username = '@john_doe';
const profile = {
  username,
};
describe('Author actions', () => {
  it('has a type of DEFAULT_ACTION', () => {
    const expected = {
      type: DEFAULT_ACTION,
    };
    expect(defaultAction()).toEqual(expected);
  });
  it('has a type of FETCH_AUTHOR_PROFILE', () => {
    const expected = {
      type: FETCH_AUTHOR_PROFILE,
      username,
    };
    expect(fetchAuthorProfile(username)).toEqual(expected);
  });
  it('has a type of AUTHOR_PROFILE_LOADED', () => {
    const expected = {
      type: AUTHOR_PROFILE_LOADED,
      profile,
    };
    expect(authorProfileLoaded(profile)).toEqual(expected);
  });
  it('has a type of AUTHOR_PROFILE_LOADED', () => {
    const expected = {
      type: AUTHOR_PROFILE_LOADING_ERROR,
    };
    expect(authorProfileLoadingError()).toEqual(expected);
  });
});
