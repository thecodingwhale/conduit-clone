import React from 'react';
import { Input, Badge } from 'reactstrap';
import { shallow, mount } from 'enzyme';

import TaggedInput from '../index';

describe('<TaggedInput />', () => {
  it('should have a <Input /> component', () => {
    const component = mount(<TaggedInput />);
    expect(component.find(Input).length).toEqual(1);
  });

  it('should have a prop tags by default with empty value', () => {
    const component = shallow(<TaggedInput />);
    expect(component.instance().props.tags).toEqual([]);
  });

  it('should accept and tags tags data by default', () => {
    const tags = ['foo', 'bar', 'baz'];
    const component = mount(
      <TaggedInput tags={tags} />
    );
    expect(component.find(Badge).length).toEqual(tags.length);
    expect(component.find(Badge).at(0).find('.tag-name').length);
    expect(component.find(Badge).at(0).find('.tag-name').text()).toEqual(tags[0]);
  });

  it('should call onUpdate after a new item is added', () => {
    const onUpdateSpy = jest.fn();
    const expectedValue = 'foo';
    const component = mount(
      <TaggedInput
        onUpdate={onUpdateSpy}
      />
    );
    const input = component.find('input');
    input.simulate('change', { target: { value: expectedValue } });
    input.simulate('keypress', { key: 'Enter' });

    const badgeComponent = component.find(Badge);
    expect(onUpdateSpy).toHaveBeenCalled();
    expect(badgeComponent.length).toEqual(1);
    expect(badgeComponent.at(0).find('.tag-name').text()).toEqual(expectedValue);
  });

  it('should delete an existing value base on the selected button', () => {
    const onUpdateSpy = jest.fn();
    const tags = ['foo', 'bar', 'baz'];
    const component = mount(
      <TaggedInput
        onUpdate={onUpdateSpy}
        tags={tags}
      />
    );

    const badgeComponent = component.find(Badge);
    expect(badgeComponent.length).toEqual(tags.length);

    badgeComponent.at(1).simulate('click');
    expect(component.instance().state.tags.length).toEqual(tags.length - 1);
    expect(onUpdateSpy).toHaveBeenCalled();
  });

  it('should have default placeholder', () => {
    const component = shallow(<TaggedInput />);
    const placeholder = component.find('[placeholder]');
    expect(placeholder.length).toEqual(1);
    expect(placeholder.prop('placeholder')).toEqual('Enter Tags');

    component.setProps({
      placeholder: 'A New Place Holder',
    });
    expect(component.find('[placeholder]').prop('placeholder')).toEqual('A New Place Holder');
  });
});