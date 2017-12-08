import React from 'react';
import { shallow, mount } from 'enzyme';
import { Collapse, NavbarToggler, Nav, NavLink, NavItem } from 'reactstrap';
import Avatar from 'components/Avatar';
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

  it('should have to 2 <NavItem /> component by default', () => {
    const component = shallow(<Header />);
    expect(component.find(NavItem).length).toEqual(2);
  });

  it('should render expected navigation if currentUser is given', () => {
    const currentUser = {
      username: 'john_doe',
      image: 'image.jpeg',
    };
    const component = shallow(<Header currentUser={currentUser} />);
    const expectedComponent = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/editor">
            <i className="ion-compose"></i>&nbsp;New Post
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/settings">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href={`/author/@${currentUser.username}`}>
            <span style={{ marginRight: '10px' }}>
              <Avatar
                size="small"
                image={currentUser.image}
              />
            </span>
            {currentUser.username}
          </NavLink>
        </NavItem>
      </Nav>
    );
    expect(component.contains(expectedComponent)).toEqual(true);
  });
});
