/**
 *
 * PopularTags
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getUrlParams } from 'utils/url';
import { Alert, Button } from 'reactstrap';
import Loader from 'components/Loader';

import { makeSelectFetching, makeSelectTags, makeSelectError } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getTags } from './actions';

export class PopularTags extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.getTags();
  }
  renderButtonTag(tag) {
    const activeTag = getUrlParams(this.props.location.search, 'tag');
    return (
      <Button
        active={tag === activeTag}
        key={`${tag}`}
        outline
        color="primary"
        size="sm"
        onClick={() => {
          this.props.onTagSelect(tag);
        }}
      >
        {tag}
      </Button>
    );
  }
  render() {
    let content = <Loader />;
    if (!this.props.fetching) {
      if (!this.props.error) {
        if (this.props.tags.length !== 0) {
          content = this.props.tags.map((tag) => this.renderButtonTag(tag));
        } else {
          content = (
            <Alert color="info">
              No Tags
            </Alert>
          );
        }
      } else {
        content = (
          <Alert color="danger">
            Something went wrong.
          </Alert>
        );
      }
    }
    return (
      <div>
        <h3>Popular Tags</h3>
        {content}
      </div>
    );
  }
}

PopularTags.defaultProps = {
  fetching: true,
  error: false,
  tags: [],
};

PopularTags.propTypes = {
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  tags: PropTypes.array.isRequired,
  getTags: PropTypes.func.isRequired,
  onTagSelect: PropTypes.func,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  fetching: makeSelectFetching(),
  error: makeSelectError(),
  tags: makeSelectTags(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getTags: () => dispatch(getTags()),
    onTagSelect: (tag) => dispatch(push(`/?tag=${tag}&page=1`)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'popularTags', reducer });
const withSaga = injectSaga({ key: 'popularTags', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PopularTags);
