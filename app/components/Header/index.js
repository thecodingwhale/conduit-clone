/**
*
* Header
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { isEmpty } from 'lodash';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  renderLoggedOutView() {
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
      </Nav>
    );
  }
  renderLoggedInView() {
    return (
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
          <NavLink href={`/author/@${this.props.currentUser.username}`}>
            <img src={this.props.currentUser.image} className="user-pic" alt={this.props.currentUser.username} />
            {this.props.currentUser.username}
          </NavLink>
        </NavItem>
      </Nav>
    );
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">Conduit</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {isEmpty(this.props.currentUser) ? this.renderLoggedOutView() : this.renderLoggedInView()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

Header.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
};

export default Header;
