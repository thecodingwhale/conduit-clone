/**
 *
 * Article
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { isEmpty } from 'lodash';

import { Container, Alert, Button } from 'reactstrap';
import Loader from 'components/Loader';
import AuthorCard from 'components/AuthorCard';
import ArticleTags from 'components/ArticleTags';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Comments } from './Comments';
import {
  fetchArticle,
  deleteArticle,
} from './actions';
import {
  makeSelectArticleData,
  makeSelectArticleError,
  makeSelectArticleFetching,
  makeSelectCommentsData,
  makeSelectCommentsError,
  makeSelectCommentsFetching,
  makeSelectArticleDeleting,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { ArticlePropTypes, CommentPropTypes } from '../../PropTypesValues';
import {
  getCurrentUser,
} from '../../auth';

export class Article extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.onEditArticle = this.onEditArticle.bind(this);
    this.onDeleteArticle = this.onDeleteArticle.bind(this);
  }

  componentDidMount() {
    this.props.onFetchArticle(this.props.match.params.slug);
  }

  onEditArticle() {
    this.props.editArticle(this.props.article.data.slug, { article: this.props.article.data });
  }

  onDeleteArticle() {
    this.props.deleteArticle(this.props.article.data.slug);
  }

  renderArticleButtonActions() {
    if (getCurrentUser() !== null) {
      const setDeleteButtonText = this.props.article.deleting ? 'Deleting Article...' : 'Delete Article';
      return (
        <div>
          <Button disabled={this.props.article.deleting} name="edit-article" type="button" outline color="primary" size="sm" onClick={this.onEditArticle}>
            Edit Article
          </Button>{' '}
          <Button disabled={this.props.article.deleting} name="delete-article" type="button" outline color="danger" size="sm" onClick={this.onDeleteArticle}>
            {setDeleteButtonText}
          </Button>
          <hr />
        </div>
      );
    }
    return null;
  }

  renderContent() {
    const { title, description, body, tagList, author, createdAt } = this.props.article.data;
    const { fetching, error, data } = this.props.comments;
    return (
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
        <ArticleTags tagList={tagList} />
        <hr />
        <AuthorCard
          author={author}
          createdAt={new Date(createdAt).toDateString()}
        />
        <hr />
        {this.renderArticleButtonActions()}
        <div dangerouslySetInnerHTML={{ __html: body }} />
        <hr />
        <Comments error={error} fetching={fetching} comments={data} />
      </div>
    );
  }

  render() {
    let content;
    const { error, fetching, data } = this.props.article;

    if (!fetching) {
      if (!error) {
        if (!isEmpty(data)) {
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

Article.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }),
  }),
  onFetchArticle: PropTypes.func.isRequired,
  editArticle: PropTypes.func,
  deleteArticle: PropTypes.func,
  comments: PropTypes.shape({
    error: PropTypes.bool,
    fetching: PropTypes.bool,
    data: PropTypes.arrayOf(CommentPropTypes),
  }),
  article: PropTypes.shape({
    error: PropTypes.bool,
    fetching: PropTypes.bool,
    deleting: PropTypes.bool,
    data: ArticlePropTypes,
  }),
};

const mapStateToProps = createStructuredSelector({
  article: createStructuredSelector({
    deleting: makeSelectArticleDeleting(),
    error: makeSelectArticleError(),
    fetching: makeSelectArticleFetching(),
    data: makeSelectArticleData(),
  }),
  comments: createStructuredSelector({
    error: makeSelectCommentsError(),
    fetching: makeSelectCommentsFetching(),
    data: makeSelectCommentsData(),
  }),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchArticle: (slug) => dispatch(fetchArticle(slug)),
    editArticle: (slug, article) => dispatch(push(`/editor/${slug}`, article)),
    deleteArticle: (slug) => dispatch(deleteArticle(slug)),
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
