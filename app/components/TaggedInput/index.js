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

    this.state = {
      value: '',
      tags: this.props.tags,
      error: false,
      errorText: this.setErrorText(this.props.errorText),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorText) {
      this.setState({
        errorText: this.setErrorText(nextProps.errorText),
      });
    }
  }

  onKeyPress(event) {
    /* istanbul ignore next */
    if (event.key === 'Enter' && event.target.value !== '') {
      const inputTargetIndex = findIndex(this.state.tags, (tag) => tag === event.target.value);
      const isInputTargetIndexExists = (inputTargetIndex !== -1);
      if (!isInputTargetIndexExists) {
        const tags = [...this.state.tags, event.target.value];
        this.setState({
          value: '',
          tags,
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

  setErrorText(errorText) {
    if (this.props.required && errorText === '') return 'Required';
    return errorText;
  }

  deleteTabButton(key, value) {
    const inputTargetIndex = findIndex(this.state.tags, (tag) => tag === value);
    const isInputTargetIndexExists = (inputTargetIndex !== -1);

    this.setState({
      tags: this.state.tags.filter((x, i) => i !== key),
      error: !isInputTargetIndexExists,
    }, () => {
      /* istanbul ignore next */
      if (this.props.onUpdate) {
        this.props.onUpdate(this.state.tags);
      }
    });
  }

  isInvalid() {
    return this.state.error || (this.props.required && this.state.tags.length === 0);
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
          type="text"
          onKeyPress={this.onKeyPress}
          onChange={this.onChange}
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
  required: false,
  placeholder: '',
  errorText: '',
  tags: [],
};

TaggedInput.propTypes = {
  required: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  errorText: PropTypes.string,
  tags: PropTypes.array.isRequired,
  onUpdate: PropTypes.func,
};

export default TaggedInput;
