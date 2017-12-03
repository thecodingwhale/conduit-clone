import React from 'react';
import { mount } from 'enzyme';

import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import LoginForm from '../index';

describe('LoginForm', () => {
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
        <LoginForm {...props} />
      </Provider>
    );
  });

  it('shows help text when email is set to blank', () => {
    const input = subject.find('input').first();

    input.simulate('blur');
    const emailHelpBlock = subject.find('.invalid-feedback');

    expect(emailHelpBlock.length).toEqual(1);
    expect(emailHelpBlock.text()).toEqual('Required');
  });

  it('shows help text when email is set to invalid email address', () => {
    const input = subject.find('input').first();

    input.simulate('blur', { target: { value: 'asdasdasdasds' } });
    const emailHelpBlock = subject.find('.invalid-feedback');

    expect(emailHelpBlock.length).toEqual(1);
    expect(emailHelpBlock.text()).toEqual('Invalid email address');
  });

  it('shows help text when password is set to blank', () => {
    const input = subject.find('input').last();

    input.simulate('blur');
    const emailHelpBlock = subject.find('.invalid-feedback');

    expect(emailHelpBlock.length).toEqual(1);
    expect(emailHelpBlock.text()).toEqual('Required');
  });

  it('calls onSubmit', () => {
    const form = subject.find('form');
    const emailInput = subject.find('input').first();
    const passwordInput = subject.find('input').last();

    emailInput.simulate('change', { target: { value: 'email@web.com' } });
    passwordInput.simulate('change', { target: { value: 'password' } });
    form.simulate('submit');

    expect(onSubmit).toHaveBeenCalled();
  });

  it('calls reset', () => {
    const form = subject.find('form');
    const resetButton = form.find('button').last();
    const emailInput = subject.find('input').first();
    const passwordInput = subject.find('input').last();

    emailInput.simulate('change', { target: { value: 'email@web.com' } });
    passwordInput.simulate('change', { target: { value: 'password' } });

    resetButton.simulate('click');

    expect(emailInput.props().value).toEqual('');
    expect(passwordInput.props().value).toEqual('');
  });
});
