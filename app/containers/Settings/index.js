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
import SettingsForm from 'components/SettingsForm';
import { makeSelectFetching, makeSelectSuccess } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { updateSettings } from './actions';
import { destroy, getCurrentUser } from '../../auth';

export class Settings extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.onLogout = this.onLogout.bind(this);
    this.onSettingsUpdate = this.onSettingsUpdate.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    /* istanbul ignore else  */
    if (nextProps.success) {
      this.onLogout();
    }
  }
  onLogout() {
    destroy();
    this.props.onLogout();
  }
  onSettingsUpdate(form) {
    this.props.updateSettings(form.toJS());
  }
  render() {
    return (
      <Container>
        <Helmet>
          <title>Settings</title>
        </Helmet>
        <SettingsForm
          fetching={this.props.fetching}
          initialValues={getCurrentUser()}
          onSubmit={this.onSettingsUpdate}
        />
        <hr />
        <Button outline color="primary" onClick={this.onLogout}>
          <FormattedMessage {...messages.logout} />
        </Button>
      </Container>
    );
  }
}

Settings.propTypes = {
  updateSettings: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  fetching: makeSelectFetching(),
  success: makeSelectSuccess(),
});

export function mapDispatchToProps(dispatch) {
  return {
    updateSettings: (form) => dispatch(updateSettings(form)),
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
