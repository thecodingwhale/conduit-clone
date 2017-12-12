import React from 'react';
import { fromJS } from 'immutable';
import { push } from 'react-router-redux';
import { Button } from 'reactstrap';
import { shallow } from 'enzyme';

import SettingsForm from 'components/SettingsForm';
import { Settings, mapDispatchToProps } from '../index';
import { updateSettings } from '../actions';

describe('<Settings />', () => {
  it('should call onLogout() function when <Button /> is click', () => {
    const onLogoutSpy = jest.fn();
    const component = shallow(
      <Settings
        onLogout={onLogoutSpy}
        updateSettings={() => {}}
        fetching={false}
        success={false}
      />
    );
    component.find(Button).simulate('click');
    expect(onLogoutSpy).toHaveBeenCalled();
    expect(localStorage.clear).toHaveBeenCalled();
  });
  it('should call updateSettings and match the form data', () => {
    const updateSettingsSpy = jest.fn();
    const component = shallow(
      <Settings
        onLogout={() => {}}
        updateSettings={updateSettingsSpy}
        fetching={false}
        success={false}
      />
    );
    component.find(SettingsForm).props().onSubmit(fromJS({
      email: 'web@email.com',
      username: 'ausername',
      password: 'password',
    }));
    expect(updateSettingsSpy).toHaveBeenCalled();
  });
  it('should call onLogout if success props set to true', () => {
    const onLogoutSpy = jest.fn();
    const component = shallow(
      <Settings
        onLogout={onLogoutSpy}
        updateSettings={() => {}}
        fetching={false}
        success={false}
      />
    );
    component.instance().componentWillReceiveProps({
      success: true,
    });
    expect(onLogoutSpy).toHaveBeenCalled();
  });
  describe('mapDispatchToProps', () => {
    describe('onLogout', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onLogout).toBeDefined();
      });
      it('should dispatch push when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onLogout();
        expect(dispatch).toHaveBeenCalledWith(push('/'));
      });
    });
    describe('updateSettings', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.updateSettings).toBeDefined();
      });
      it('should dispatch getTags when called', () => {
        const sample = fromJS({
          username: 'sample',
        });
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.updateSettings(sample);
        expect(dispatch).toHaveBeenCalledWith(updateSettings(sample));
      });
    });
  });
});

describe('<SettingsForm />', () => {
  it('should have a <SettingsForm />', () => {
    const component = shallow(
      <Settings
        onLogout={() => {}}
        updateSettings={() => {}}
        fetching={false}
        success={false}
      />
    );
    expect(component.find(SettingsForm).length).toEqual(1);
  });
});
