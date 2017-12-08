import React from 'react';
import { shallow } from 'enzyme';

import Avatar, { avatarImage } from '../index';

describe('<Avatar />', () => {
  it('should return default avatar', () => {
    const renderedComponent = shallow(<Avatar />);
    expect(renderedComponent.props().src).toEqual(avatarImage);
    renderedComponent.setProps({
      image: '',
    });
    expect(renderedComponent.props().src).toEqual(avatarImage);
  });

  it('should match the expected props', () => {
    const fixture = 'foo';
    const renderedComponent = shallow(<Avatar image={fixture} />);
    expect(renderedComponent.props().src).toEqual(fixture);
  });

  it('default prop size should be equal to medium', () => {
    const component = shallow(<Avatar />);
    expect(component.props().size).toEqual('medium');
  });

  it('prop size should be equal to small', () => {
    const size = 'small';
    const component = shallow(<Avatar size={size} />);
    expect(component.props().size).toEqual(size);
  });
});
