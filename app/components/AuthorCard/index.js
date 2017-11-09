/**
* AuthorCard
*/

import React from 'react';
import { CardText, CardLink } from 'reactstrap';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import { AuthorPropTypes } from '../../PropTypesValues';

function AuthorCard(props) {
  const { createdAt, author } = props;
  return (
    <div>
      <CardLink href={`/author/@${author.username}`} style={{ float: 'left' }}>
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
          href={`/author/@${author.username}`}
          style={{
            display: 'block',
          }}
        >
          {author.username}
        </CardLink>
        <CardText>
          <small className="text-muted">{createdAt}</small>
        </CardText>
      </div>
    </div>
  );
}

AuthorCard.propTypes = {
  createdAt: PropTypes.string.isRequired,
  author: AuthorPropTypes,
};

export default AuthorCard;
