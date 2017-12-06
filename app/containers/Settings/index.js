/**
 *
 * Settings
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

import { Container, Button } from 'reactstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSettings from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { destroy } from '../../auth';

export class Settings extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.onLogout = this.onLogout.bind(this);
  }
  onLogout() {
    destroy();
    this.props.onLogout();
  }
  render() {
    return (
      <Container>
        <Helmet>
          <title>Settings</title>
          <meta name="description" content="Description of Settings" />
        </Helmet>
        <Button outline color="primary" onClick={this.onLogout}>
          <FormattedMessage {...messages.logout} />
        </Button>
      </Container>
    );
  }
}

Settings.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  settings: makeSelectSettings(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(push('/')),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'settings', reducer });
const withSaga = injectSaga({ key: 'settings', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Settings);
