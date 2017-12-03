import React from 'react';
import { shallow } from 'enzyme';

import Editor from '../index';

describe('<Editor />', () => {
  it('should match the expected component', () => {
    const component = shallow(<Editor />);
    const expectedComponet = (
      <div>
        Editor Page
      </div>
    );
    expect(component.contains(expectedComponet)).toEqual(true);
  });
});
