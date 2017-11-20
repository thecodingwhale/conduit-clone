/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Container } from 'reactstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loginSubmit } from './actions';
import LoginForm from './LoginForm';

export class Login extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.onsubmit = this.onsubmit.bind(this);
  }
  onsubmit(values) {
    this.props.onLoginSubmit(
      values.get('email'),
      values.get('password')
    );
  }
  render() {
    return (
      <Container>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Description of Login" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <LoginForm onSubmit={this.onsubmit} />
      </Container>
    );
  }
}

Login.propTypes = {
  onLoginSubmit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoginSubmit: (email, password) => {
      dispatch(loginSubmit(email, password));
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
