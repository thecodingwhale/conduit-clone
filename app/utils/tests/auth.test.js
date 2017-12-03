
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

const dummyData = fromJS({
  login: {
    user: {
      data: {
        email: 'email@web.com',
        password: 'password',
        username: 'username',
        image: 'image.jpg',
      },
    },
  },
});

describe('auth', () => {
  describe('isAppValid()', () => {
    it('should return false if localStorage is invalid', () => {
      const expectedData = dummyData.getIn(['login', 'user', 'data']);
      setApp(expectedData);
      expect(setLocalStorage(dummyData)).toEqual(false);
      localStorage.clear();
    });

    it('should return null if expect stated are invalid', () => {
      setApp({});
      expect(setLocalStorage(dummyData)).toEqual(false);
      localStorage.clear();
    });

    it('should passed the expected test output', () => {
      expect(isAppValid()).toEqual(false);
      setLocalStorage(dummyData);
      expect(localStorage.setItem).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenLastCalledWith(APP_NAME, JSON.stringify(dummyData.getIn(['login', 'user', 'data'])));
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
      setLocalStorage(dummyData);
      expect(getCurrentUser()).toEqual({
        username: 'username',
        image: 'image.jpg',
      });
      localStorage.clear();
    });
  });

  it('should test setApp()', () => {
    const expectedData = dummyData.getIn(['login', 'user', 'data']);
    setApp(expectedData);
    expect(localStorage.getItem(APP_NAME)).toEqual(JSON.stringify(expectedData));
    localStorage.clear();
  });

  it('should test getApp()', () => {
    setLocalStorage(dummyData);
    expect(JSON.parse(localStorage.getItem(APP_NAME))).toEqual(getApp());
    localStorage.clear();
  });

  it('should test destroy()', () => {
    setLocalStorage(dummyData);
    destroy();
    expect(localStorage.clear).toHaveBeenCalled();
    localStorage.clear();
  });
});
