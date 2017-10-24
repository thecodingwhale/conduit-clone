import React from 'react';
import { shallow, mount } from 'enzyme';
import { Collapse, NavbarToggler } from 'reactstrap';
import Header from '../index';

describe('<Header />', () => {
  it('should have a isOpen state and default value should be false', () => {
    const fixture = false;
    const component = shallow(<Header />);
    const collapseComponent = component.find(Collapse);
    const { isOpen } = component.state();

    expect(isOpen).toBeDefined();
    expect(isOpen).toEqual(fixture);
    expect(collapseComponent.length).toEqual(1);
    expect(collapseComponent.props().isOpen).toEqual(fixture);
  });

  it('should trigger toggle method on click and invert the state value of isOpen', () => {
    const fixture = false;
    const component = mount(<Header />);
    const navbarTogglerComponent = component.find(NavbarToggler);
    const collapseComponent = component.find(Collapse);
    const { isOpen } = component.state();

    expect(isOpen).toBeDefined();
    expect(isOpen).toEqual(fixture);

    navbarTogglerComponent.simulate('click');

    expect(collapseComponent.props().isOpen).toEqual(!fixture);
  });
});
