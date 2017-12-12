import { assign } from 'lodash';
import fetchMock from 'fetch-mock';
import api, { API_DOMAIN } from '../api';
import { setApp, destroy } from '../../auth';

let user = {
  email: 'email@web.com',
  password: 'password',
};
describe('api', () => {
  describe('Auth', () => {
    it('should match the post request for login', () => {
      const url = `${API_DOMAIN}/users/login`;
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
    it('should match the put request for updateSettings', () => {
      user = assign(user, {
        token: 'sampletoken',
      });
      setApp(user);
      const url = `${API_DOMAIN}/user`;
      fetchMock.put(url, {
        status: 200,
        body: {
          user,
        },
      });
      api.Auth.updateSettings({
        form: user,
      });
      expect(fetchMock.called()).toEqual(true);
      expect(fetchMock.lastUrl()).toEqual(url);
      expect(fetchMock.lastOptions()).toEqual({
        method: 'PUT',
        body: JSON.stringify({ user }),
        headers: {
          Authorization: `Token ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      destroy();
    });
  });
});
