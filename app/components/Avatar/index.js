import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

export const avatarImage = '//static.productionready.io/images/smiley-cyrus.jpg';

function Avatar(props) {
  const { image } = props;
  const defaultImage = (image && image !== '') ? image : avatarImage;

  return (
    <Image src={defaultImage} />
  );
}

Avatar.propTypes = {
  image: PropTypes.string,
};

export default Avatar;
