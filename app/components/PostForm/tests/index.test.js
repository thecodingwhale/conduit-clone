import React from 'react';
import { mount } from 'enzyme';

import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import PostForm from '../index';

describe('<PostForm />', () => {
  let store;
  let onSubmit;
  let subject;

  beforeEach(() => {
    store = createStore(combineReducers({ form: formReducer }));
    onSubmit = jest.fn().mockReturnValue(Promise.resolve());
    const props = {
      onSubmit,
    };
    subject = mount(
      <Provider store={store}>
        <PostForm {...props} />
      </Provider>
    );
  });

  it('shows help text when title is set to blank', () => {
    const input = subject.find('input[name="title"]');
    input.simulate('blur');
    const helpBlock = subject.find('.invalid-feedback');
    expect(helpBlock.length).toEqual(1);
    expect(helpBlock.text()).toEqual('Required');
  });

  it('shows help text when description is set to blank', () => {
    const input = subject.find('input[name="description"]');
    input.simulate('blur');
    const helpBlock = subject.find('.invalid-feedback');
    expect(helpBlock.length).toEqual(1);
    expect(helpBlock.text()).toEqual('Required');
  });

  it('shows help text when body is set to blank', () => {
    const input = subject.find('input[name="body"]');
    input.simulate('blur');
    const helpBlock = subject.find('.invalid-feedback');
    expect(helpBlock.length).toEqual(1);
    expect(helpBlock.text()).toEqual('Required');
  });

  it('shows help text when tagList is set to blank', () => {
    const input = subject.find('input[name="tagList"]');
    input.simulate('blur');
    const helpBlock = subject.find('.invalid-feedback');
    expect(helpBlock.length).toEqual(1);
    expect(helpBlock.text()).toEqual('Required');
  });
});
