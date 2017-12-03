import React from 'react';
import { shallow } from 'enzyme';

import Settings from '../index';

describe('<Settings />', () => {
  it('should match the expected component', () => {
    const component = shallow(<Settings />);
    const expectedComponet = (
      <div>
        Settings Page
      </div>
    );
    expect(component.contains(expectedComponet)).toEqual(true);
  });
});
