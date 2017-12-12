import { isEmpty, isUndefined } from 'lodash';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

export const APP_NAME = 'conduit';

export const isAppValid = () => !isUndefined(window.localStorage) && !isEmpty(window.localStorage.getItem(APP_NAME)) && !isUndefined(window.localStorage.getItem(APP_NAME));

export const setApp = (state) => window.localStorage.setItem(APP_NAME, JSON.stringify(state));

export const getApp = () => JSON.parse(window.localStorage.getItem(APP_NAME));

export const destroy = () => window.localStorage.clear();

export const setLocalStorage = (state) => {
  if (!isAppValid()) {
    if (state.get('login') && state.getIn(['login', 'user', 'data']).count() !== 0) {
      setApp(state.get('login').get('user').get('data'));
    }
    return null;
  }
  return false;
};

export const getCurrentUser = () => {
  if (isAppValid()) {
    const { id, image, username, email, bio } = getApp();
    return {
      id,
      image,
      username,
      email,
      bio,
    };
  }
  return null;
};

export const getToken = () => {
  const { token } = getApp();
  return `Token ${token}`;
};

export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: () => isAppValid(),
  wrapperDisplayName: 'UserIsAuthenticated',
});

export const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: '/',
  authenticatedSelector: () => !isAppValid(),
  wrapperDisplayName: 'UserIsNotAuthenticated',
});
