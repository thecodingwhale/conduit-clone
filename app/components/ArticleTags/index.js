/**
* ArticleTags
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';

function ArticleTags(props) {
  const { tagList } = props;
  if (tagList.length === 0) return null;

  const tagLists = tagList.map((list) => (
    <Badge
      key={list}
      color="secondary"
      pill
    >
      {list}
    </Badge>
  ));
  return (
    <div>
      {tagLists}
    </div>
  );
}

ArticleTags.defaultProps = {
  tagList: [],
};

ArticleTags.propTypes = {
  tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ArticleTags;
