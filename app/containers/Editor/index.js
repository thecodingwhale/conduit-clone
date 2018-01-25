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

import { Container, Alert } from 'reactstrap';
import Loader from 'components/Loader';
import PostForm from 'components/PostForm';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectFetching, makeSelectSuccess, makeSelectSlug, makeSelectError, makeSelectArticle, makeSelectUpdating } from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  addNewPost,
  updateArticle,
  fetchArticle,
  } from './actions';

export class Editor extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    /* istanbul ignore next */
    if (this.isValidSlug() && !this.isValidLocationState()) {
      this.props.fetchArticle(this.props.match.params.slug);
    }
  }

  componentWillReceiveProps(nextProps) {
    /* istanbul ignore next */
    if (nextProps.success && nextProps.slug !== null && nextProps.slug !== '' && !nextProps.updating) {
      this.props.redirectToSlug(nextProps.slug, nextProps.article);
    }
  }

  onSubmit(form) {
    if (this.isValidSlug() || this.isValidLocationState()) {
      this.props.updateArticle(this.props.match.params.slug, form);
    } else {
      this.props.addNewPost(form);
    }
  }

  isValidLocationState() {
    /* istanbul ignore next */
    return (this.props.location && this.props.location.state && this.props.location.state.article);
  }

  isValidSlug() {
    /* istanbul ignore next */
    return (this.props.match && this.props.match.params.slug);
  }

  renderForm() {
    const setIntialValues = this.isValidLocationState() ? this.props.location.state.article : this.props.article;
    return (
      <PostForm
        fetching={this.props.fetching || this.props.updating}
        onSubmit={this.onSubmit}
        initialValues={setIntialValues}
      />
    );
  }

  render() {
    let content = <Loader />;
    if (!this.props.error) {
      if (this.props.fetching === false) {
        content = this.renderForm();
      }
    } else {
      content = (
        <Alert color="danger">
          Something went wrong.
        </Alert>
      );
    }

    return (
      <div>
        <Helmet>
          <title>Editor</title>
          <meta name="description" content="Description of Editor" />
        </Helmet>
        <Container>
          {content}
        </Container>
      </div>
    );
  }
}

Editor.defaultProps = {
  fetching: false,
  success: false,
  slug: null,
  error: false,
  article: null,
};

Editor.propTypes = {
  addNewPost: PropTypes.func.isRequired,
  redirectToSlug: PropTypes.func.isRequired,
  fetchArticle: PropTypes.func,
  updateArticle: PropTypes.func,
  fetching: PropTypes.bool.isRequired,
  updating: PropTypes.bool,
  success: PropTypes.bool,
  slug: PropTypes.string,
  error: PropTypes.bool,
  article: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      article: PropTypes.object,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  fetching: makeSelectFetching(),
  updating: makeSelectUpdating(),
  success: makeSelectSuccess(),
  error: makeSelectError(),
  slug: makeSelectSlug(),
  article: makeSelectArticle(),
});

export function mapDispatchToProps(dispatch) {
  return {
    addNewPost: (form) => dispatch(addNewPost(form)),
    updateArticle: (slug, article) => dispatch(updateArticle(slug, article)),
    redirectToSlug: (slug) => dispatch(push(`/article/${slug}`)),
    fetchArticle: (slug) => dispatch(fetchArticle(slug)),
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
