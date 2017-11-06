import React from 'react';
import { shallow } from 'enzyme';

import Avatar from '../index';

describe('<Avatar />', () => {
  it('foo', () => {
    const renderedComponent = shallow(<Avatar />);
    expect(renderedComponent.props().src).toEqual('https://static.productionready.io/images/smiley-cyrus.jpg');
  });

  it('should match the expected props', () => {
    const fixture = 'foo';
    const renderedComponent = shallow(<Avatar image={fixture} />);
    expect(renderedComponent.props().src).toEqual(fixture);
  });
});
