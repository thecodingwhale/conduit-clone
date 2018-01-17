/**
 *
 * Editor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Container } from 'reactstrap';
import PostForm from 'components/PostForm';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectFetching, makeSelectSuccess, makeSelectSlug } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { addNewPost } from './actions';

export class Editor extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    /* istanbul ignore next */
    if (nextProps.success && nextProps.slug !== null && nextProps.slug !== '') {
      this.props.redirectToSlug(nextProps.slug);
    }
  }
  onSubmit(form) {
    this.props.addNewPost(form);
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>Editor</title>
          <meta name="description" content="Description of Editor" />
        </Helmet>
        <Container>
          <PostForm
            fetching={this.props.fetching}
            onSubmit={this.onSubmit}
          />
        </Container>
      </div>
    );
  }
}

Editor.defaultProps = {
  fetching: false,
  success: false,
  slug: null,
};

Editor.propTypes = {
  addNewPost: PropTypes.func.isRequired,
  redirectToSlug: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  success: PropTypes.bool,
  slug: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  fetching: makeSelectFetching(),
  success: makeSelectSuccess(),
  slug: makeSelectSlug(),
});

export function mapDispatchToProps(dispatch) {
  return {
    addNewPost: (form) => dispatch(addNewPost(form)),
    redirectToSlug: (slug) => dispatch(push(`/article/${slug}`)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'editor', reducer });
const withSaga = injectSaga({ key: 'editor', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Editor);
