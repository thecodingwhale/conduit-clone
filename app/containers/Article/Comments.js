import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Alert, Card, CardBody, CardFooter, CardText } from 'reactstrap';
import AuthorCard from 'components/AuthorCard';
import Loader from 'components/Loader';
import { CommentPropTypes } from '../../PropTypesValues';

export const CardWrapper = styled.div`
  margin-bottom: 16px;
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

  renderComments() {
    const { comments } = this.props;
    return comments.map((comment) => (
      <CardWrapper key={comment.id}>
        <Card>
          <CardBody>
            <CardText>{comment.body}</CardText>
          </CardBody>
          <CardFooter>
            <AuthorCard
              author={comment.author}
              createdAt={new Date(comment.createdAt).toDateString()}
            />
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
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(CommentPropTypes),
};
