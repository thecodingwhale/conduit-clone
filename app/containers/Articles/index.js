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
import { Alert, Card, CardTitle, CardText, CardLink, Button, Row, Col } from 'reactstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { BASE_LIMIT, getUrlParams, checkUrlParams } from 'utils/url';
import Loader from 'components/Loader';
import AuthorCard from 'components/AuthorCard';
import ArticleTags from 'components/ArticleTags';
import {
  fetchArticles,
  fetchArticlesByAuthor,
  fetchArticlesFavoritedByAuthor,
  } from './actions';
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
    this.getArticles(
      this.props.match.params.username,
      this.props.location.search,
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const { username, search } = nextProps.filters;
      this.getArticles(username, search);
    }
  }
  onPageChange(data) {
    const setActivePage = data.selected + 1;
    this.props.onPageChange(this.preparePageUrl(setActivePage));
  }
  getArticles(username, search) {
    const page = getUrlParams(search, 'page');
    if (username) {
      if (checkUrlParams(/\?favorited/g, search)) {
        this.props.onFetchArticlesFavoritedByAuthor(page, username);
      } else {
        this.props.onFetchArticlesByAuthor(page, username);
      }
    } else {
      const tag = getUrlParams(search, 'tag');
      this.props.onFetchArticles(page, tag);
    }
  }
  getPageCount() {
    const { pageCount } = this.props;
    return pageCount / BASE_LIMIT;
  }
  getForcePage() {
    const setForcePage = getUrlParams(this.props.location.search, 'page');
    return parseInt(setForcePage, 10) - 1;
  }
  preparePageUrl(activePage) {
    const filters = `page=${activePage}`;
    let pageLink = `/?${filters}`;
    if (this.props.match.params.username) {
      pageLink = checkUrlParams(/\?favorited/g, this.props.location.search)
        ? `/author/${this.props.match.params.username}?favorited&${filters}`
        : `/author/${this.props.match.params.username}?${filters}`;
    } else {
      const tag = getUrlParams(this.props.location.search, 'tag');
      if (tag) {
        pageLink = `/?tag=${tag}&${filters}`;
      }
    }
    return pageLink;
  }
  renderPost(post, index) {
    const { author, title, description, createdAt, tagList, slug, favoritesCount, favorited } = post;
    return (
      <Wrapper key={index}>
        <Card body>
          <Row style={{ marginBottom: '10px' }}>
            <Col xs="6">
              <AuthorCard
                author={author}
                createdAt={new Date(createdAt).toDateString()}
              />
            </Col>
            <Col xs="6">
              <div className="text-right">
                <Button
                  active={favorited}
                  outline
                  color="primary"
                  size="sm"
                >
                  <i className="ion-heart"></i>
                  {favoritesCount}
                </Button>
              </div>
            </Col>
          </Row>
          <CardTitle>{title}</CardTitle>
          <CardText>{description}</CardText>
          <Row>
            <Col xs="6">
              <CardLink href={`/article/${slug}`}>
                Read More
              </CardLink>
            </Col>
            <Col className="text-right" xs="6">
              <ArticleTags tagList={tagList} />
            </Col>
          </Row>
        </Card>
      </Wrapper>
    );
  }

  renderPosts() {
    return (
      <div>
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
      </div>
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
      <div>
        <Helmet>
          <title>Articles</title>
          <meta name="description" content="Description of Articles" />
        </Helmet>
        {content}
      </div>
    );
  }
}

Articles.defaultProps = {
  posts: [],
  pageCount: 0,
};

Articles.propTypes = {
  onFetchArticles: PropTypes.func.isRequired,
  onFetchArticlesFavoritedByAuthor: PropTypes.func,
  onFetchArticlesByAuthor: PropTypes.func,
  onPageChange: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    search: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string,
    }),
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
    onFetchArticles: (page, tag) => {
      dispatch(fetchArticles(page, tag));
    },
    onFetchArticlesByAuthor: (page, username) => {
      dispatch(fetchArticlesByAuthor(page, username));
    },
    onFetchArticlesFavoritedByAuthor: (page, username) => {
      dispatch(fetchArticlesFavoritedByAuthor(page, username));
    },
    onPageChange: (link) => {
      if (link) {
        dispatch(push(link));
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
