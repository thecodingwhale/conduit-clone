/**
*
* AuthorBanner
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';
import Avatar from 'components/Avatar';
import { AuthorPropTypes } from '../../PropTypesValues';
import messages from './messages';
import Wrapper from './Wrapper';

class AuthorBanner extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { bio, following, image, username } = this.props;
    const setFollowingText = following ? <FormattedMessage {...messages.follow} /> : <FormattedMessage {...messages.unfollow} />;
    const renderBio = (!bio || bio === '') ? null : (
      <p>{bio}</p>
    );
    return (
      <Wrapper>
        <Avatar image={image} />
        <h2>{username}</h2>
        {renderBio}
        <Button outline color="primary" size="sm">
          + {setFollowingText} {username}
        </Button>
      </Wrapper>
    );
  }
}

AuthorBanner.propTypes = AuthorPropTypes;

export default AuthorBanner;
