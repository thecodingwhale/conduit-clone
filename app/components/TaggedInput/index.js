/**
*
* TaggedInput
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, Badge } from 'reactstrap';
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
    };
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
        });
        /* istanbul ignore next */
        if (this.props.onUpdate) {
          this.props.onUpdate(tags);
        }
      }
    }
  }

  onChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  deleteTabButton(key) {
    this.setState({
      tags: this.state.tags.filter((x, i) => i !== key),
    }, () => {
      /* istanbul ignore next */
      if (this.props.onUpdate) {
        this.props.onUpdate(this.state.tags);
      }
    });
  }

  renderTaggedButtons() {
    if (this.state.tags.length === 0) return null;
    return this.state.tags.map((tag, index) => (
      <StyledBadge
        key={`${tag}`}
        color="primary"
        onClick={() => {
          this.deleteTabButton(index);
        }}
        pill
      >
        <span className="close-icon">x</span>
        <span className="tag-name">{tag}</span>
      </StyledBadge>
    ));
  }

  render() {
    return (
      <div>
        <StyledInput
          placeholder={this.props.placeholder}
          type="text"
          onKeyPress={this.onKeyPress}
          onChange={this.onChange}
          value={this.state.value}
        />
        {this.renderTaggedButtons()}
      </div>
    );
  }
}

TaggedInput.defaultProps = {
  placeholder: 'Enter Tags',
  tags: [],
};

TaggedInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  onUpdate: PropTypes.func,
};

export default TaggedInput;
