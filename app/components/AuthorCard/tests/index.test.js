import React from 'react';
import { shallow } from 'enzyme';
import { CardText, CardLink } from 'reactstrap';
import Avatar from 'components/Avatar';
import AuthorCard from '../index';

describe('<AuthorCard />', () => {
  it('Expect to have unit tests specified', () => {
    const data = {
      author: {
        username: 'sample foo',
        image: 'sample-image.png',
      },
      createdAt: 'Oct 31 2017',
    };
    const component = shallow(<AuthorCard {...data} />);
    const expectedComponent = (
      <div>
        <CardLink href={`/author/@${data.author.username}`} style={{ float: 'left' }}>
          <Avatar image={data.author.image} />
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
            href={`/author/@${data.author.username}`}
            style={{
              display: 'block',
            }}
          >
            {data.author.username}
          </CardLink>
          <CardText>
            <small className="text-muted">{data.createdAt}</small>
          </CardText>
        </div>
      </div>
    );

    expect(component.contains(expectedComponent)).toEqual(true);
  });
});
