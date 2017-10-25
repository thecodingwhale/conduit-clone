import React from 'react';
import { shallow } from 'enzyme';
import Articles from 'containers/Articles';
import PopularTags from 'containers/PopularTags';
import { Home } from '../index';

describe('<Home />', () => {
  it('should render <Articles /> container', () => {
    const component = shallow(<Home />);
    expect(component.find(Articles).length).toEqual(1);
  });

  it('should render <PopularTags /> container', () => {
    const component = shallow(<Home />);
    expect(component.find(PopularTags).length).toEqual(1);
  });
});
