import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isUndefined } from 'lodash';
import { FormGroup, Input as ReactstrapInput, FormFeedback } from 'reactstrap';
import TaggedInput from 'components/TaggedInput';

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
    let defaultComponent = (
      <FormGroup color={classes}>
        <ReactstrapInput {...input} type={type} placeholder={placeholder} valid={state} />
        {touched && error && <FormFeedback>{error}</FormFeedback>}
      </FormGroup>
    );

    if (type === 'lists') {
      defaultComponent = (
        <TaggedInput
          required={touched && !isUndefined(error)}
          errorText={error}
          placeholder={placeholder}
          onUpdate={(tags) => {
            this.props.input.onChange(tags);
          }}
        />
      );
    }

    return defaultComponent;
  }
}
