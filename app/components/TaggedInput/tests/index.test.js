import React from 'react';
import { Input, Badge, FormFeedback } from 'reactstrap';
import { shallow, mount } from 'enzyme';

import TaggedInput from '../index';

describe('<TaggedInput />', () => {
  it('should have a <Input /> component', () => {
    const component = mount(<TaggedInput name="custom-name" />);
    expect(component.find(Input).length).toEqual(1);
  });

  it('should have a prop tags by default with empty value', () => {
    const component = shallow(<TaggedInput name="custom-name" />);
    expect(component.instance().props.tags).toEqual([]);
  });

  it('should accept and tags tags data by default', () => {
    const tags = ['foo', 'bar', 'baz'];
    const component = mount(
      <TaggedInput
        name="custom-name"
        tags={tags}
      />
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
        name="custom-name"
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
        name="custom-name"
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

  it('should accept a placeholder prop', () => {
    const component = shallow(<TaggedInput name="custom-name" />);
    const placeholder = component.find('[placeholder]');
    expect(placeholder.length).toEqual(1);
    expect(placeholder.prop('placeholder')).toEqual('');

    component.setProps({
      placeholder: 'A New Place Holder',
    });
    expect(component.find('[placeholder]').prop('placeholder')).toEqual('A New Place Holder');
  });

  it('should throw an error message if the entered component is already added', () => {
    const tags = ['foo', 'bar', 'baz'];
    const component = mount(
      <TaggedInput
        name="custom-name"
        onUpdate={() => {}}
        tags={tags}
      />
    );

    const input = component.find('input');
    input.simulate('change', { target: { value: 'foo' } });
    input.simulate('keypress', { key: 'Enter' });

    const feedback = component.find(FormFeedback);
    expect(feedback.length).toEqual(1);
    expect(feedback.text()).toEqual('foo is already taken');
  });

  it('should not delete of add new value if delete prop is set to true', () => {
    const tags = ['foo', 'bar', 'baz'];
    const component = mount(
      <TaggedInput
        name="custom-name"
        tags={tags}
        disabled
      />
    );

    const badgeComponent = component.find(Badge);
    badgeComponent.at(1).simulate('click');
    expect(component.instance().state.tags.length).toEqual(tags.length);

    const input = component.find('input');
    input.simulate('change', { target: { value: 'bax' } });
    input.simulate('keypress', { key: 'Enter' });
    expect(component.instance().state.tags.length).toEqual(tags.length);
  });

  it('should throw an error message if on blur if props required is set to true and state tags length is equal to 0', () => {
    const component = mount(<TaggedInput required name="custom-name" />);
    const input = component.find('input');
    input.simulate('blur');

    const feedback = component.find(FormFeedback);
    expect(feedback.length).toEqual(1);
    expect(feedback.text()).toEqual('Required');
  });

  it('should throw an error if prop required is set to true', () => {
    const component = mount(
      <TaggedInput
        required
        name="custom-name"
      />
    );

    const input = component.find('input');
    input.simulate('blur');

    const feedback = component.find(FormFeedback);
    expect(feedback.length).toEqual(1);
    expect(feedback.text()).toEqual('Required');
  });

  it('should have a state error set false by default and can be update by passing also an error prop', () => {
    const component = mount(
      <TaggedInput
        name="custom-name"
      />
    );
    expect(component.instance().props.error).toEqual(false);
    expect(component.instance().state.error).toEqual(false);

    component.setProps({ error: true });
    expect(component.instance().props.error).toEqual(true);
    expect(component.instance().state.error).toEqual(true);
  });
});
