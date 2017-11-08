import React from 'react';
import PropTypes from 'prop-types';

import { Alert, Card, CardBody, CardFooter, CardText } from 'reactstrap';
import AuthorCard from 'components/AuthorCard';
import Loader from 'components/Loader';

export class Comments extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  renderAlertMessage() {
    return (
      <Alert color="info">
        No Comments Found
      </Alert>
    );
  }

  renderComments() {
    const { comments } = this.props;
    return comments.map((comment) => (
      <Card key={comment.id}>
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
    ));
  }

  render() {
    const { fetching, comments } = this.props;
    let content = <Loader />;

    if (!fetching) {
      if (comments.length !== 0) {
        content = this.renderComments();
      } else {
        content = this.renderAlertMessage();
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
  comments: [],
};

Comments.propTypes = {
  fetching: PropTypes.bool,
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
};
