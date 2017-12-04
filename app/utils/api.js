/* eslint-disable arrow-body-style */

import { assign } from 'lodash';
import request from './request';

export const API_DOMAIN = 'https://conduit.productionready.io/api';

const headerPlugin = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return {
    headers,
  };
};

const requests = {
  post: (url, body) => {
    return request(`${API_DOMAIN}${url}`, assign({
      method: 'POST',
      body: JSON.stringify(body),
    }, headerPlugin()));
  },
};

const Auth = {
  login: (params) => {
    const { email, password } = params;
    return requests.post('/users/login', {
      user: {
        email,
        password,
      },
    });
  },
};

export default {
  Auth,
};
