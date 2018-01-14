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
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Container } from 'reactstrap';
import PostForm from 'components/PostForm';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectFetching, makeSelectSuccess, makeSelectSlug } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { addNewPost } from './actions';

export class Editor extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.success && nextProps.slug !== null) {
      this.props.redirectToSlug(nextProps.slug);
    }
  }
  onSubmit(form) {
    this.props.addNewPost(form.toJS());
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>Editor</title>
          <meta name="description" content="Description of Editor" />
        </Helmet>
        <Container>
          <FormattedMessage {...messages.header} />
          <PostForm
            fetching={this.props.fetching}
            onSubmit={this.onSubmit}
          />
        </Container>
      </div>
    );
  }
}

Editor.propTypes = {
  addNewPost: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  fetching: makeSelectFetching(),
  success: makeSelectSuccess(),
  slug: makeSelectSlug(),
});

function mapDispatchToProps(dispatch) {
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
