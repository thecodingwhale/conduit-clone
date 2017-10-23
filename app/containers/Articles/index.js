/**
 *
 * Articles
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Alert, Container, Card, CardTitle, CardText } from 'reactstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getUrlParams } from 'utils/url';
import Loader from 'components/Loader';
import { fetchArticles } from './actions';
import { makeSelectPosts, makeSelectError, makeSelectFetching } from './selectors';
import reducer from './reducer';
import saga from './saga';
import Wrapper from './Wrapper';

export class Articles extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const value = getUrlParams(this.props.location.search, 'page');
    this.props.onFetchArticles(value);
  }
  renderPost(post, index) {
    const { title, description, createdAt } = post;
    return (
      <Wrapper key={index}>
        <Card body>
          <CardTitle>{title}</CardTitle>
          <CardText>{description}</CardText>
          <CardText>
            <small className="text-muted">{createdAt}</small>
          </CardText>
        </Card>
      </Wrapper>
    );
  }
  render() {
    const { fetching, error, posts } = this.props;
    let content = <Loader />;
    if (!fetching) {
      if (!error) {
        if (posts.length !== 0) {
          content = posts.map((post, index) => this.renderPost(post, index));
        } else {
          content = (
            <Alert color="info">
              This is a warning alert — check it out!
            </Alert>
          );
        }
      } else {
        content = (
          <Alert color="danger">
            This is a warning alert — check it out!
          </Alert>
        );
      }
    }
    return (
      <Container>
        <Helmet>
          <title>Articles</title>
          <meta name="description" content="Description of Articles" />
        </Helmet>
        {content}
      </Container>
    );
  }
}

Articles.defaultProps = {
  posts: [],
};

Articles.propTypes = {
  onFetchArticles: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  error: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  posts: makeSelectPosts(),
  error: makeSelectError(),
  fetching: makeSelectFetching(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchArticles: (page) => dispatch(fetchArticles(page)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'articles', reducer });
const withSaga = injectSaga({ key: 'articles', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Articles);
