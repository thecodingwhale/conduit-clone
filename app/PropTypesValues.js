import PropTypes from 'prop-types';

const { shape, bool, string, number, arrayOf } = PropTypes;

export const AuthorPropTypes = shape({
  bio: string,
  following: bool,
  image: string,
  username: string,
});

export const ArticlePropTypes = shape({
  author: AuthorPropTypes,
  body: string,
  createdAt: string,
  description: string,
  favorited: bool,
  favoritesCount: number,
  slug: string,
  tagLists: arrayOf(string),
  title: string,
  updatedAt: string,
});

export const CommentPropTypes = shape({
  id: number,
  author: ArticlePropTypes,
  body: string,
  createdAt: string,
  updatedAt: string,
});
