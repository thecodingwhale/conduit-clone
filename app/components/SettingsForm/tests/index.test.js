import React from 'react';
import { mount } from 'enzyme';

import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import SettingsForm from '../index';

describe('SettingsForm', () => {
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
        <SettingsForm {...props} />
      </Provider>
    );
  });

  it('shows help text when username is set to blank', () => {
    const input = subject.find('input[name="username"]');
    input.simulate('blur');
    const usernameHelpBlock = subject.find('.invalid-feedback');
    expect(usernameHelpBlock.length).toEqual(1);
    expect(usernameHelpBlock.text()).toEqual('Required');
  });

  it('shows help text when email is set to blank', () => {
    const input = subject.find('input[name="email"]');
    input.simulate('blur');
    const emailHelpBlock = subject.find('.invalid-feedback');
    expect(emailHelpBlock.length).toEqual(1);
    expect(emailHelpBlock.text()).toEqual('Required');
  });

  it('shows help text when password is set to blank', () => {
    const input = subject.find('input[name="password"]');
    input.simulate('blur');
    const passwordHelpBlock = subject.find('.invalid-feedback');
    expect(passwordHelpBlock.length).toEqual(1);
    expect(passwordHelpBlock.text()).toEqual('Required');
  });

  it('shows help text when email is set to invalid email address', () => {
    const input = subject.find('input[name="email"]');
    input.simulate('blur', { target: { value: 'asdasdasdasds' } });
    const emailHelpBlock = subject.find('.invalid-feedback');
    expect(emailHelpBlock.length).toEqual(1);
    expect(emailHelpBlock.text()).toEqual('Invalid email address');
  });

  it('calls onSubmit', () => {
    const form = subject.find('form');
    const emailInput = subject.find('input[name="email"]');
    const usernameInput = subject.find('input[name="username"]');
    const passwordInput = subject.find('input[name="password"]');

    emailInput.simulate('change', { target: { value: 'email@web.com' } });
    usernameInput.simulate('change', { target: { value: 'username' } });
    passwordInput.simulate('change', { target: { value: 'password' } });
    form.simulate('submit');

    expect(onSubmit).toHaveBeenCalled();
  });
});
