/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Container, Alert } from 'reactstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import LoginForm from 'components/LoginForm';
import { makeSelectLoginUser, makeSelectLoginUserFetching, makeSelectLoginUserError } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loginSubmit } from './actions';
import { isAppValid } from '../../auth';

export class Login extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.onsubmit = this.onsubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user && isAppValid()) {
      this.props.redirectTo('/');
    }
  }
  onsubmit(form) {
    this.props.onLoginSubmit(
      form.get('email'),
      form.get('password')
    );
  }
  renderError() {
    if (!this.props.error) return null;
    return (
      <Alert color="danger">
        {this.props.error}
      </Alert>
    );
  }
  render() {
    return (
      <Container>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <FormattedMessage {...messages.header} />
        {this.renderError()}
        <LoginForm
          onSubmit={this.onsubmit}
          fetching={this.props.fetching}
        />
      </Container>
    );
  }
}

Login.propTypes = {
  onLoginSubmit: PropTypes.func,
  redirectTo: PropTypes.func,
  user: PropTypes.object,
  fetching: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectLoginUser(),
  fetching: makeSelectLoginUserFetching(),
  error: makeSelectLoginUserError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoginSubmit: (email, password) => {
      dispatch(loginSubmit(email, password));
    },
    redirectTo: (url) => {
      dispatch(push(url));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Login);
