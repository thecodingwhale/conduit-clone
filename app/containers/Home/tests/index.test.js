import React from 'react';
import { shallow } from 'enzyme';
import Articles from 'containers/Articles';
import { Home } from '../index';

describe('<Home />', () => {
  it('should render <Articles /> container', () => {
    const component = shallow(<Home />);

    expect(component.find(Articles).length).toEqual(1);
  });
});
