import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isUndefined, isEmpty } from 'lodash';
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
      /* istanbul ignore next */
      const tags = !isEmpty(input.value) ? input.value || input.value.toJS() : [];
      defaultComponent = (
        <TaggedInput
          {...input}
          tags={tags}
          required
          error={touched && !isUndefined(error)}
          errorText={error}
          placeholder={placeholder}
          onUpdate={(values) => {
            this.props.input.onChange(values);
          }}
        />
      );
    }

    return defaultComponent;
  }
}
