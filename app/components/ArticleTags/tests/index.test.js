import React from 'react';
import { shallow } from 'enzyme';
import { Badge } from 'reactstrap';
import ArticleTags from '../index';

describe('<ArticleTags />', () => {
  it('should return null if prop is empty', () => {
    const component = shallow(<ArticleTags />);
    expect(component.node).toEqual(null);
  });

  it('should render tags as expected', () => {
    const tags = [
      'foo',
      'bar',
      'baz',
    ];
    const component = shallow(<ArticleTags tagList={tags} />);
    const expectedComponent = (
      <div>
        <Badge color="secondary" pill>foo</Badge>
        <Badge color="secondary" pill>bar</Badge>
        <Badge color="secondary" pill>baz</Badge>
      </div>
    );

    expect(component.contains(expectedComponent)).toEqual(true);
  });
});
