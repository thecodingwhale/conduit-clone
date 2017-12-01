import { fromJS } from 'immutable';
import {
  selectLoginDomain,
  makeSelectLoginUser,
  makeSelectLoginUserFetching,
  makeSelectLoginUserError,
} from '../selectors';

const login = {
  user: {
    fetching: false,
    error: false,
    data: fromJS({}),
  },
};

describe('selectLoginDomain', () => {
  it('should select the login state', () => {
    const loginState = fromJS({
      login,
    });
    const mockedState = fromJS({
      login: loginState,
    });
    expect(selectLoginDomain(mockedState)).toEqual(loginState);
  });
});

describe('makeSelectLoginUser', () => {
  const selectLoginUser = makeSelectLoginUser();
  it('should select the expected state from login state', () => {
    const loginStateSelector = fromJS({
      login,
    });
    const mockedState = fromJS({
      login: loginStateSelector,
    });
    expect(selectLoginUser(mockedState)).toEqual(loginStateSelector.user);
  });
});

describe('makeSelectLoginUserFetching', () => {
  const selectLoginFetching = makeSelectLoginUserFetching();
  it('should select the expected state from login state', () => {
    const loginStateSelector = fromJS({
      login,
    });
    const mockedState = fromJS({
      login: loginStateSelector,
    });
    expect(selectLoginFetching(mockedState)).toEqual(loginStateSelector.fetching);
  });
});

describe('makeSelectLoginUserError', () => {
  const selectLoginError = makeSelectLoginUserError();
  it('should select the expected state from login state', () => {
    const loginStateSelector = fromJS({
      login,
    });
    const mockedState = fromJS({
      login: loginStateSelector,
    });
    expect(selectLoginError(mockedState)).toEqual(loginStateSelector.error);
  });
});
