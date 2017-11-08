/**
 *
 * Article
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Container, Alert } from 'reactstrap';
import Loader from 'components/Loader';
import AuthorCard from 'components/AuthorCard';
import ArticleTags from 'components/ArticleTags';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Comments } from './Comments';
import { fetchArticle } from './actions';
import { makeSelectArticle, makeSelectComments, makeSelectError, makeSelectFetching } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class Article extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.onFetchArticle(this.props.match.params.slug);
  }

  renderContent() {
    const { fetching } = this.props;
    const { title, body, tagList, author, createdAt } = this.props.article;
    return (
      <div>
        <h1>{title}</h1>
        <ArticleTags tagList={tagList} />
        <hr />
        <AuthorCard
          author={author}
          createdAt={new Date(createdAt).toDateString()}
        />
        <hr />
        <div dangerouslySetInnerHTML={{ __html: body }} />
        <Comments fetching={fetching} comments={this.props.comments} />
      </div>
    );
  }

  render() {
    let content;
    const { error, fetching } = this.props;
    if (!fetching) {
      if (!error) {
        if (this.props.article) {
          content = this.renderContent();
        } else {
          content = (
            <Alert color="danger">
              Something went wrong.
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
    } else {
      content = <Loader />;
    }
    return (
      <Container>
        {content}
      </Container>
    );
  }
}

Article.defaultProps = {
  error: false,
  fetching: true,
  comments: [],
};

Article.propTypes = {
  error: PropTypes.bool,
  fetching: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }),
  }),
  onFetchArticle: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      bio: PropTypes.string,
      following: PropTypes.bool.isRequired,
      image: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  })),
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
    author: PropTypes.shape({
      bio: PropTypes.string,
      following: PropTypes.bool.isRequired,
      image: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

const mapStateToProps = createStructuredSelector({
  article: makeSelectArticle(),
  comments: makeSelectComments(),
  error: makeSelectError(),
  fetching: makeSelectFetching(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchArticle: (slug) => {
      dispatch(fetchArticle(slug));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'article', reducer });
const withSaga = injectSaga({ key: 'article', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Article);
