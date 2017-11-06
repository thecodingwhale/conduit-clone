import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

function Avatar(props) {
  return (
    <Image src={props.image} />
  );
}

Avatar.defaultProps = {
  image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
};

Avatar.propTypes = {
  image: PropTypes.string.isRequired,
};

export default Avatar;
