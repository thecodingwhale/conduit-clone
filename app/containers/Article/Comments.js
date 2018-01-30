import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Alert, Card, CardBody, CardFooter, CardText, Button } from 'reactstrap';
import AuthorCard from 'components/AuthorCard';
import Loader from 'components/Loader';
import { CommentPropTypes } from '../../PropTypesValues';

export const CardWrapper = styled.div`
  margin-bottom: 16px;
`;

export const AuthorCardStyled = styled(AuthorCard)`
  float: left;
`;

const DeleteButton = styled(Button)`
  float: right;
`;

export class Comments extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  renderAlertMessage() {
    return (
      <Alert color="info">
        No Comments Found
      </Alert>
    );
  }

  renderErrorMessage() {
    return (
      <Alert color="danger">
        Something Went Wrong
      </Alert>
    );
  }

  renderDeleteButton(comment) {
    if (this.props.enableAuthorToDelete !== comment.author.username) return null;
    const setDeleteButtonText = this.props.deleting ? 'Deleting...' : 'Delete';
    return (
      <DeleteButton
        name="delete-comment"
        disabled={this.props.deleting}
        color="secondary"
        size="sm"
        className="pull-right"
        onClick={(e) => {
          e.preventDefault();
          /* istanbul ignore next */
          if (this.props.deleteComment) {
            this.props.deleteComment(comment.id);
          }
        }}
      >
        {setDeleteButtonText}
      </DeleteButton>
    );
  }

  renderComments() {
    const { comments } = this.props;
    return comments.map((comment) => (
      <CardWrapper key={comment.id}>
        <Card>
          <CardBody>
            <CardText>{comment.body}</CardText>
          </CardBody>
          <CardFooter>
            <AuthorCardStyled
              author={comment.author}
              createdAt={new Date(comment.createdAt).toDateString()}
            />
            {this.renderDeleteButton(comment)}
          </CardFooter>
        </Card>
      </CardWrapper>
    ));
  }

  render() {
    const { fetching, error, comments } = this.props;
    let content = <Loader />;

    if (!fetching) {
      if (!error) {
        if (comments.length !== 0) {
          content = this.renderComments();
        } else {
          content = this.renderAlertMessage();
        }
      } else {
        content = this.renderErrorMessage();
      }
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

Comments.defaultProps = {
  fetching: true,
  error: false,
  comments: [],
};

Comments.propTypes = {
  fetching: PropTypes.bool,
  deleting: PropTypes.bool,
  error: PropTypes.bool,
  enableAuthorToDelete: PropTypes.string,
  deleteComment: PropTypes.func,
  comments: PropTypes.arrayOf(CommentPropTypes),
};
