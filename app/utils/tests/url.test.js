import 'url-search-params-polyfill';

import {
  getUrlParams,
  getOffsetLimit,
  } from '../url';

describe('url', () => {
  it('should return the the expected params', () => {
    const fixture = 1;
    const param = 'foo';
    const url = `?${param}=${fixture}`;
    const result = getUrlParams(url, param);

    expect(result).toEqual(fixture.toString());
  });

  it('should return expected limit and offset', () => {
    let result = getOffsetLimit(1);
    let expectedResult = { limit: 10, offset: 0 };
    expect(result).toEqual(expectedResult);

    result = getOffsetLimit(2, 20);
    expectedResult = { limit: 20, offset: 20 };
    expect(result).toEqual(expectedResult);

    result = getOffsetLimit(0);
    expectedResult = { limit: 10, offset: 0 };
    expect(result).toEqual(expectedResult);
  });
});
