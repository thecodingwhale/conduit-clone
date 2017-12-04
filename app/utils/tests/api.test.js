import fetchMock from 'fetch-mock';
import api, { API_DOMAIN } from '../api';

describe('api', () => {
  describe('Auth', () => {
    it('should match the post request for login', () => {
      const url = `${API_DOMAIN}/users/login`;
      const user = {
        email: 'email@web.com',
        password: 'password',
      };
      fetchMock.post(url, {
        status: 200,
        body: {
          user,
        },
      });
      api.Auth.login({
        ...user,
      });
      expect(fetchMock.called()).toEqual(true);
      expect(fetchMock.lastUrl()).toEqual(url);
      expect(fetchMock.lastOptions()).toEqual({
        method: 'POST',
        body: JSON.stringify({ user }),
        headers: { 'Content-Type': 'application/json' },
      });
    });
  });
});
