import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const setBaseSquareSize = (props) => {
  const sizes = {
    small: '30px',
    medium: '50px',
  };
  return sizes[props.size];
};

const Image = styled.img`
  border-radius: 50%;
  width: ${(props) => setBaseSquareSize(props)};
  height: ${(props) => setBaseSquareSize(props)};
`;

export const avatarImage = '//static.productionready.io/images/smiley-cyrus.jpg';

function Avatar(props) {
  const { image, size } = props;
  const defaultImage = (image && image !== '') ? image : avatarImage;
  return (
    <Image size={size} src={defaultImage} />
  );
}

Avatar.defaultProps = {
  size: 'medium',
};

Avatar.propTypes = {
  image: PropTypes.string,
  size: PropTypes.oneOf([
    'small',
    'medium',
  ]),
};

export default Avatar;
