/**
 *
 * Articles
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import ReactPaginate from 'react-paginate';
import { Container, Row, Col, Alert, Card, CardTitle, CardText } from 'reactstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { BASE_LIMIT, getUrlParams } from 'utils/url';
import Loader from 'components/Loader';
import { fetchArticles } from './actions';
import { makeSelectPosts, makeSelectError, makeSelectFetching, makeSelectPageCount } from './selectors';
import reducer from './reducer';
import saga from './saga';
import Wrapper from './Wrapper';

export class Articles extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.onPageChange = this.onPageChange.bind(this);
  }
  componentDidMount() {
    const value = getUrlParams(this.props.location.search, 'page');
    this.props.onFetchArticles(value);
  }
  onPageChange(data) {
    const setActivePage = data.selected + 1;
    this.props.onFetchArticles(setActivePage);
    this.props.onPageChange(setActivePage);
  }
  getPageCount() {
    const { pageCount } = this.props;
    return pageCount / BASE_LIMIT;
  }
  getForcePage() {
    const setForcePage = getUrlParams(this.props.location.search, 'page');
    return parseInt(setForcePage, 10) - 1;
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

  renderPosts() {
    return (
      <Container>
        <Row>
          <Col xs="8">
            {this.props.posts.map((post, index) => this.renderPost(post, index))}
            <ReactPaginate
              disableInitialCallback={false}
              previousLabel="previous"
              nextLabel="next"
              breakLabel={<a className="page-link" href="">...</a>}
              breakClassName="page-item"
              forcePage={this.getForcePage()}
              pageCount={this.getPageCount()}
              marginPagesDisplayed={3}
              pageRangeDisplayed={3}
              onPageChange={this.onPageChange}
              containerClassName="pagination"
              subContainerClassName="pages pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              activeClassName="active"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
            />
          </Col>
          <Col xs="6">
          </Col>
        </Row>
      </Container>
    );
  }
  render() {
    const { fetching, error, posts } = this.props;
    let content = <Loader />;
    if (!fetching) {
      if (!error) {
        if (posts.length !== 0) {
          content = this.renderPosts();
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
  pageCount: 0,
};

Articles.propTypes = {
  onFetchArticles: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  error: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
  pageCount: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  posts: makeSelectPosts(),
  error: makeSelectError(),
  fetching: makeSelectFetching(),
  pageCount: makeSelectPageCount(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchArticles: (page) => {
      dispatch(fetchArticles(page));
    },
    onPageChange: (page) => {
      if (page) {
        dispatch(push(`/?page=${page}`));
      }
    },
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
