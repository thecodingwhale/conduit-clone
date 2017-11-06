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
import { Alert, Card, CardTitle, CardText, CardLink, Badge, Button, Row, Col } from 'reactstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { BASE_LIMIT, getUrlParams } from 'utils/url';
import Loader from 'components/Loader';
import Avatar from 'components/Avatar';
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
    const page = getUrlParams(this.props.location.search, 'page');
    const tag = getUrlParams(this.props.location.search, 'tag');
    this.props.onFetchArticles(page, tag);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const page = getUrlParams(nextProps.location.search, 'page');
      const tag = getUrlParams(nextProps.location.search, 'tag');
      this.props.onFetchArticles(page, tag);
    }
  }
  onPageChange(data) {
    const setActivePage = data.selected + 1;
    const tag = getUrlParams(this.props.location.search, 'tag');
    this.props.onFetchArticles(setActivePage, tag);
    this.props.onPageChange(setActivePage, tag);
  }
  getPageCount() {
    const { pageCount } = this.props;
    return pageCount / BASE_LIMIT;
  }
  getForcePage() {
    const setForcePage = getUrlParams(this.props.location.search, 'page');
    return parseInt(setForcePage, 10) - 1;
  }
  renderPostTags(tagList) {
    if (tagList.length === 0) return null;

    const tagLists = tagList.map((list) => (
      <Badge
        key={list}
        color="secondary"
        pill
      >
        {list}
      </Badge>
    ));

    return (
      <div>
        {tagLists}
      </div>
    );
  }
  renderPost(post, index) {
    const { author, title, description, createdAt, tagList, slug, favoritesCount, favorited } = post;

    return (
      <Wrapper key={index}>
        <Card body>
          <Row style={{ marginBottom: '10px' }}>
            <Col xs="6">
              <CardLink href="#" style={{ float: 'left' }}>
                <Avatar image={author.image} />
              </CardLink>
              <div
                className="info"
                style={{
                  overflow: 'hidden',
                  paddingLeft: '10px',
                }}
              >
                <CardLink
                  className="author"
                  href={`@${author.username}`}
                  style={{
                    display: 'block',
                  }}
                >
                  {author.username}
                </CardLink>
                <CardText>
                  <small className="text-muted">{new Date(createdAt).toDateString()}</small>
                </CardText>
              </div>
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
              {this.renderPostTags(tagList)}
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
    onFetchArticles: (page, tag) => {
      dispatch(fetchArticles(page, tag));
    },
    onPageChange: (page, tag) => {
      if (page) {
        const setTag = tag ? `tag=${tag}&` : '';
        dispatch(push(`/?${setTag}page=${page}`));
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
