import React from 'react';
import { mount } from 'enzyme';

import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import CommentForm from '../index';

describe('<CommentForm />', () => {
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
        <CommentForm {...props} />
      </Provider>
    );
  });

  it('shows help text when comment is set to blank', () => {
    const input = subject.find('textarea[name="comment"]');
    input.simulate('blur');
    const helpBlock = subject.find('.invalid-feedback');
    expect(helpBlock.length).toEqual(1);
    expect(helpBlock.text()).toEqual('Required');
  });

  it('should set the button submit to "Update Article" if props.initialValues is not empty', () => {
    const component = mount(
      <Provider store={store}>
        <CommentForm posting />
      </Provider>
    );
    const button = component.find('button[type="submit"]');
    expect(button.length).toEqual(1);
    expect(button.text()).toEqual('Posting Comment...');
  });
});
