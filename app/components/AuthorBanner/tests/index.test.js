import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import { Button } from 'reactstrap';
import Avatar from 'components/Avatar';
import AuthorBanner from '../index';
import Wrapper from '../Wrapper';
import messages from '../messages';

const fixture = {
  bio: 'sample biography',
  following: true,
  image: 'sample.png',
  username: '@foobar',
};

const component = shallow(
  <AuthorBanner author={fixture} />
);

describe('<AuthorBanner />', () => {
  it('should render the expected component if all props have valid values', () => {
    const expectedComponent = (
      <Wrapper>
        <Avatar image={fixture.image} />
        <h2>{fixture.username}</h2>
        <p>{fixture.bio}</p>
        <Button outline color="primary" size="sm">
          + <FormattedMessage {...messages.follow} /> {fixture.username}
        </Button>
      </Wrapper>
    );
    expect(component.contains(expectedComponent)).toEqual(true);
  });

  it('should should not render bio if its empty or null', () => {
    component.setProps({
      author: {
        bio: null,
      },
    });
    expect(component.find('p').length).toEqual(0);
    component.setProps({
      author: {
        bio: '',
      },
    });
    expect(component.find('p').length).toEqual(0);
  });

  it('should see a Unfollow button when following prop sets to false', () => {
    component.setProps({
      author: {
        following: false,
      },
    });
    expect(component.contains(<FormattedMessage {...messages.unfollow} />)).toEqual(true);
  });
});
