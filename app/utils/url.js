import 'url-search-params-polyfill';

export const BASE_LIMIT = 10;

export const getUrlParams = (string, param) => {
  const query = new URLSearchParams(string);
  return query.get(param);
};

export const getOffsetLimit = (page, limit = BASE_LIMIT) => {
  const offset = (page && page !== 0) ? ((page - 1) * limit) : 0;
  return {
    limit,
    offset,
  };
};

export const getKeyNameParam = (params, key) => {
  const getKey = params[key] ? `${key}=${params[key]}&` : '';
  return getKey;
};
