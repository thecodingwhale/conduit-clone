/* eslint-disable arrow-body-style */

import { assign } from 'lodash';
import request from './request';
import { isAppValid, getToken } from '../auth';

export const API_DOMAIN = 'https://conduit.productionready.io/api';

const requestHeader = () => {
  let headers = {
    'Content-Type': 'application/json',
  };
  if (isAppValid()) {
    headers = assign(headers, {
      Authorization: getToken(),
    });
  }
  return {
    headers,
  };
};

const reqX = {
  get: (url, body) => {
    return request(`${API_DOMAIN}${url}`, assign({
      method: 'GET',
      body: JSON.stringify(body),
    }, requestHeader()));
  },
  post: (url, body) => {
    return request(`${API_DOMAIN}${url}`, assign({
      method: 'POST',
      body: JSON.stringify(body),
    }, requestHeader()));
  },
  put: (url, body) => {
    return request(`${API_DOMAIN}${url}`, assign({
      method: 'PUT',
      body: JSON.stringify(body),
    }, requestHeader()));
  },
};

const Auth = {
  login: (params) => {
    const { email, password } = params;
    return reqX.post('/users/login', {
      user: {
        email,
        password,
      },
    });
  },
  updateSettings: (params) => {
    const { form } = params;
    return reqX.put('/user', {
      user: form,
    });
  },
};

const Article = {
  get: (slug) => {
    return reqX.get(`/articles/${slug}`);
  },
  add: (form) => {
    return reqX.post('/articles', {
      article: form,
    });
  },
};

export default {
  Auth,
  Article,
};
