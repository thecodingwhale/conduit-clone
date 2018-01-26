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

  describe('Article', () => {
    it('should match the get request for an article', () => {
      const slug = 'sample-slug';
      const article = {
        title: 'sample title',
        description: 'sample description',
        body: 'sameple body',
        tagLists: ['foo', 'bar', 'baz'],
      };
      const url = `${API_DOMAIN}/articles/${slug}`;
      fetchMock.get(url, {
        status: 200,
        body: article,
      });
      api.Article.get(slug);
      expect(fetchMock.called()).toEqual(true);
      expect(fetchMock.lastUrl()).toEqual(url);
      expect(fetchMock.routes[2].response.body).toEqual(article);
      expect(fetchMock.lastOptions()).toEqual({
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
    });

    it('should match the post request for adding new article', () => {
      const article = {
        title: 'sample title',
        description: 'sample description',
        body: 'sameple body',
        tagLists: ['foo', 'bar', 'baz'],
      };
      const url = `${API_DOMAIN}/articles`;
      fetchMock.post(url, {
        status: 200,
        body: {
          article,
        },
      });
      api.Article.add(article);
      expect(fetchMock.called()).toEqual(true);
      expect(fetchMock.lastUrl()).toEqual(url);
      expect(fetchMock.lastOptions()).toEqual({
        method: 'POST',
        body: JSON.stringify({ article }),
        headers: { 'Content-Type': 'application/json' },
      });
    });

    it('should match the put request and update an article base on the slug and article arguments', () => {
      const slug = 'sample-slug';
      const url = `${API_DOMAIN}/articles/${slug}`;
      const article = {
        foo: 'bar',
      };
      fetchMock.put(url, {
        status: 200,
        body: {
          article,
        },
      });
      api.Article.update(slug, article);
      expect(fetchMock.called()).toEqual(true);
      expect(fetchMock.lastUrl()).toEqual(url);
      expect(fetchMock.lastOptions()).toEqual({
        method: 'PUT',
        body: JSON.stringify({ article }),
        headers: { 'Content-Type': 'application/json' },
      });
    });

    it('should match the delete request and delete an article base on the slug', () => {
      const slug = 'sample-slug';
      const url = `${API_DOMAIN}/articles/${slug}`;
      fetchMock.delete(url, {
        status: 200,
      });
      api.Article.delete(slug);
      expect(fetchMock.called()).toEqual(true);
      expect(fetchMock.lastUrl()).toEqual(url);
      expect(fetchMock.lastOptions()).toEqual({
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    });
  });
});
