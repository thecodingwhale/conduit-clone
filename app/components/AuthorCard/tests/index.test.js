import React from 'react';
import { shallow } from 'enzyme';
import { CardText, CardLink } from 'reactstrap';
import Avatar from 'components/Avatar';
import AuthorCard from '../index';

const data = {
  author: {
    username: 'sample foo',
    image: 'sample-image.png',
  },
  createdAt: 'Oct 31 2017',
};

describe('<AuthorCard />', () => {
  it('should match the expected component base on the setup props', () => {
    const component = shallow(<AuthorCard {...data} />);
    const expectedComponent = (
      <div className="author-card">
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

  it('should match the expect className', () => {
    const component = shallow(<AuthorCard {...data} />);
    const baseComponentClassName = 'author-card';
    const expectedClassName = 'foo-bar';
    expect(component.find(`.${baseComponentClassName}`).length).toEqual(1);
    component.setProps({
      className: expectedClassName,
    });
    expect(component.find(`.${expectedClassName}`).length).toEqual(1);
    expect(component.find(`.${baseComponentClassName}.${expectedClassName}`).length).toEqual(1);
  });
});
