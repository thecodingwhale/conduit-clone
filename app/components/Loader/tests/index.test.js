import React from 'react';
import { shallow } from 'enzyme';

import Loader from '../index';

describe('<Loader />', () => {
  it('Expect to have unit tests specified', () => {
    const component = shallow(<Loader />);
    const expectedComponent = (<div>Loading</div>);
    expect(component.contains(expectedComponent)).toEqual(true);
  });
});
