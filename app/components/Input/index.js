import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormGroup, Input as ReactstrapInput, FormFeedback } from 'reactstrap';

export default class Input extends React.PureComponent {
  static propTypes = {
    input: PropTypes.object,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.any,
    }),
  };

  render() {
    const {
      input,
      placeholder,
      type,
      meta: {
        touched,
        error,
      },
    } = this.props;

    const classes = classNames({
      success: touched && !error,
      danger: touched && error,
    });

    const state = (touched && error) ? false : null;

    return (
      <FormGroup color={classes}>
        <ReactstrapInput {...input} type={type} placeholder={placeholder} valid={state} />
        {touched && error && <FormFeedback>{error}</FormFeedback>}
      </FormGroup>
    );
  }
}
