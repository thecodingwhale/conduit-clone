
import { fromJS } from 'immutable';
import {
  isAppValid,
  setLocalStorage,
  APP_NAME,
  setApp,
  getApp,
  destroy,
  getCurrentUser,
} from '../../auth';

export const userData = fromJS({
  login: {
    user: {
      data: {
        email: 'email@web.com',
        password: 'password',
        username: 'trinhnguyen',
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        bio: 'sample bio',
        id: 1,
      },
    },
  },
});

describe('auth', () => {
  describe('isAppValid()', () => {
    it('should return false if localStorage is invalid', () => {
      const expectedData = userData.getIn(['login', 'user', 'data']);
      setApp(expectedData);
      expect(setLocalStorage(userData)).toEqual(false);
      localStorage.clear();
    });

    it('should return null if expect stated are invalid', () => {
      setApp({});
      expect(setLocalStorage(userData)).toEqual(false);
      localStorage.clear();
    });

    it('should passed the expected test output', () => {
      expect(isAppValid()).toEqual(false);
      setLocalStorage(userData);
      expect(localStorage.setItem).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenLastCalledWith(APP_NAME, JSON.stringify(userData.getIn(['login', 'user', 'data'])));
      expect(isAppValid()).toEqual(true);
      localStorage.clear();
    });
  });

  describe('getCurrentUser()', () => {
    it('should return null if isAppValid() return false', () => {
      setLocalStorage(fromJS({}));
      expect(getCurrentUser()).toEqual(null);
      localStorage.clear();
    });

    it('should return expected username and image from the localStorage', () => {
      setLocalStorage(userData);
      expect(getCurrentUser()).toEqual({
        email: 'email@web.com',
        username: 'trinhnguyen',
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        bio: 'sample bio',
        id: 1,
      });
      localStorage.clear();
    });
  });

  it('should test setApp()', () => {
    const expectedData = userData.getIn(['login', 'user', 'data']);
    setApp(expectedData);
    expect(localStorage.getItem(APP_NAME)).toEqual(JSON.stringify(expectedData));
    localStorage.clear();
  });

  it('should test getApp()', () => {
    setLocalStorage(userData);
    expect(JSON.parse(localStorage.getItem(APP_NAME))).toEqual(getApp());
    localStorage.clear();
  });

  it('should test destroy()', () => {
    setLocalStorage(userData);
    destroy();
    expect(localStorage.clear).toHaveBeenCalled();
    localStorage.clear();
  });
});
