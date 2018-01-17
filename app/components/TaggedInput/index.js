/**
*
* TaggedInput
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, Badge, FormFeedback, FormGroup } from 'reactstrap';
import { findIndex } from 'lodash';

const StyledInput = styled(Input)`
  margin-bottom: 8px;
`;

const StyledBadge = styled(Badge)`
  padding: 0.5em 0.8em;
  span.close-icon {
    margin-right: 5px;
  }
  &:hover {
    cursor: pointer;
    opacity: .8;
  }
`;

class TaggedInput extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyPress = this.onKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.state = {
      value: '',
      tags: this.props.tags,
      error: this.props.error,
      errorText: this.setErrorText(this.props.errorText),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorText) {
      this.setState({
        errorText: this.setErrorText(nextProps.errorText),
      });
    }
    if (nextProps.error) {
      this.setState({
        error: true,
      });
    }
  }

  onKeyPress(event) {
    /* istanbul ignore next */
    if (event.key === 'Enter' && event.target.value !== '' && !this.props.disabled) {
      event.preventDefault();
      if (!this.isInputTargetIndexExists(event.target.value)) {
        const tags = [...this.state.tags, event.target.value];
        this.setState({
          tags,
          value: '',
          error: false,
          errorText: '',
        });
        /* istanbul ignore next */
        if (this.props.onUpdate) {
          this.props.onUpdate(tags);
        }
      } else {
        this.setState({
          error: true,
          errorText: `${event.target.value} is already taken`,
        });
      }
    }
  }

  onChange(event) {
    this.setState({
      value: event.target.value,
      error: false,
    });
  }

  onBlur() {
    /* istanbul ignore next */
    if (this.props.required && this.state.tags.length === 0) {
      this.setState({
        error: true,
        errorText: this.setErrorText(this.props.errorText),
      });
    }
  }

  setErrorText(errorText) {
    if (this.props.required && errorText === '') return 'Required';
    return errorText;
  }

  deleteTabButton(key, value) {
    /* istanbul ignore next */
    if (!this.props.disabled) {
      this.setState({
        tags: this.state.tags.filter((x, i) => i !== key),
        error: !this.isInputTargetIndexExists(value),
      }, () => {
        /* istanbul ignore next */
        if (this.props.onUpdate) {
          this.props.onUpdate(this.state.tags);
        }
      });
    }
  }

  isInvalid() {
    return (this.state.error && this.props.required)
    || this.isInputTargetIndexExists(this.state.value);
  }

  isInputTargetIndexExists(value) {
    const inputTargetIndex = findIndex(this.state.tags, (tag) => tag === value);
    return inputTargetIndex !== -1;
  }

  renderTaggedButtons() {
    if (this.state.tags.length === 0) return null;
    return this.state.tags.map((tag, index) => (
      <StyledBadge
        key={`${tag}`}
        color="primary"
        onClick={() => {
          this.deleteTabButton(index, tag);
        }}
        pill
      >
        <span className="close-icon">x</span>
        <span className="tag-name">{tag}</span>
      </StyledBadge>
    ));
  }

  renderFormFeedback() {
    return this.isInvalid() ? (
      <FormFeedback>{this.state.errorText}</FormFeedback>
    ) : null;
  }

  render() {
    const setValid = this.isInvalid() ? false : null;
    return (
      <FormGroup>
        <StyledInput
          placeholder={this.props.placeholder}
          name={this.props.name}
          type="text"
          onKeyPress={this.onKeyPress}
          onChange={this.onChange}
          onBlur={this.onBlur}
          value={this.state.value}
          valid={setValid}
          ref={(ref) => {
            this.input = ref;
          }}
        />
        {this.renderFormFeedback()}
        {this.renderTaggedButtons()}
      </FormGroup>
    );
  }
}

TaggedInput.defaultProps = {
  error: false,
  required: false,
  disabled: false,
  placeholder: '',
  errorText: '',
  tags: [],
};

TaggedInput.propTypes = {
  error: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  tags: PropTypes.array.isRequired,
  onUpdate: PropTypes.func,
};

export default TaggedInput;
