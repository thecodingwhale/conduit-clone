import React from 'react';
import { fromJS } from 'immutable';
import { push } from 'react-router-redux';
import {
  shallow,
  // mount,
} from 'enzyme';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import {
  // Container,
  Alert,
} from 'reactstrap';
import LoginForm from 'components/LoginForm';
import { Login, mapDispatchToProps } from '../index';
// import messages from '../messages';
import { loginSubmit } from '../actions';
import { setLocalStorage, destroy } from '../../../auth';

describe('<Login />', () => {
  it('should render <LoginForm /> by default', () => {
    const component = shallow(<Login />);
    expect(component.find(LoginForm).length).toEqual(1);
  });

  it('should display an error message if error props set to true', () => {
    const errorMessage = 'sample error message';
    const component = shallow(<Login error={errorMessage} />);
    const expectedComponent = (
      <Alert color="danger">
        {errorMessage}
      </Alert>
    );
    expect(component.contains(expectedComponent)).toEqual(true);
  });

  it('should call onLoginSubmit', () => {
    const onLoginSubmitSpy = jest.fn();
    const component = shallow(<Login onLoginSubmit={onLoginSubmitSpy} />);
    component.find(LoginForm).props().onSubmit(fromJS({
      email: 'sample@email.com',
      password: 'password',
    }));
    expect(onLoginSubmitSpy).toHaveBeenCalled();
  });

  it('should render call this.props.redirectTo if user and expected localStorage is valid', () => {
    const user = {
      email: 'sample@email.com',
      password: 'password',
    };
    setLocalStorage(fromJS({
      login: {
        user: {
          data: user,
        },
      },
    }));
    const redirectToSpy = jest.fn();
    const component = shallow(<Login redirectTo={redirectToSpy} />);
    component.setProps({
      user,
    });
    expect(redirectToSpy).toHaveBeenCalled();
    destroy();
  });
});

describe('onLoginSubmit', () => {
  describe('onLoginSubmit', () => {
    it('should be injected', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      expect(result.onLoginSubmit).toBeDefined();
    });
    it('should dispatch loginSubmit when called', () => {
      const email = 'sample@email.com';
      const password = 'password';
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.onLoginSubmit(email, password);
      expect(dispatch).toHaveBeenCalledWith(loginSubmit(email, password));
    });
  });
  describe('redirectTo', () => {
    it('should be injected', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      expect(result.redirectTo).toBeDefined();
    });
    it('should dispatch redirectTo when called', () => {
      const page = 'link';
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.redirectTo(page);
      expect(dispatch).toHaveBeenCalledWith(push(page));
    });
  });
});
