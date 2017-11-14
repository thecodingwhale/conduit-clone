/**
 *
 * Author
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { isEmpty } from 'lodash';

import {
  Container,
  Alert,
} from 'reactstrap';

import Loader from 'components/Loader';
import AuthorBanner from 'components/AuthorBanner';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectAuthorData,
  makeSelectAuthorFetching,
  makeSelectAuthorError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchAuthorProfile } from './actions';
import { AuthorPropTypes } from '../../PropTypesValues';

export class Author extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.onFetchAuthorProfile(this.props.match.params.username);
  }

  render() {
    const {
      fetching,
      error,
      data,
    } = this.props.author;
    let content;
    if (!fetching) {
      if (!error && !isEmpty(data)) {
        const { bio, following, image, username } = data;
        content = (
          <div>
            <AuthorBanner
              bio={bio}
              following={following}
              image={image}
              username={username}
            />
          </div>
        );
      } else {
        content = (
          <Container>
            <Alert color="danger">
              Something went wrong.
            </Alert>
          </Container>
        );
      }
    } else {
      content = (
        <Container>
          <Loader />
        </Container>
      );
    }

    return (
      <div>
        <Helmet>
          <title>Author</title>
          <meta name="description" content="Description of Author" />
        </Helmet>
        {content}
      </div>
    );
  }
}

Author.propTypes = {
  onFetchAuthorProfile: PropTypes.func.isRequired,
  author: PropTypes.shape({
    fetching: PropTypes.bool,
    error: PropTypes.bool,
    data: AuthorPropTypes,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  author: createStructuredSelector({
    fetching: makeSelectAuthorFetching(),
    error: makeSelectAuthorError(),
    data: makeSelectAuthorData(),
  }),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchAuthorProfile: (username) => {
      dispatch(fetchAuthorProfile(username));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'author', reducer });
const withSaga = injectSaga({ key: 'author', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Author);
