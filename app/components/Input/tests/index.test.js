import React from 'react';
import { FormGroup, Input as ReactstrapInput, FormFeedback } from 'reactstrap';
import { shallow } from 'enzyme';
import Input from '../index';

describe('<Input />', () => {
  let component;
  beforeEach(() => {
    component = shallow(
      <Input
        type="text"
        placeholder="some placeholder"
        meta={{
          touched: false,
          error: false,
        }}
      />
    );
  });
  it('should render expected component by default', () => {
    const expectedComponent = (
      <FormGroup color="">
        <ReactstrapInput type="text" placeholder="some placeholder" valid={null} />
      </FormGroup>
    );
    expect(component.contains(expectedComponent)).toEqual(true);
  });
  it('should set <FormGroup /> to success if touched set to true and error set to false', () => {
    component.setProps({
      meta: {
        touched: true,
        error: false,
      },
    });
    expect(component.find(FormGroup).props().color).toEqual('success');
    expect(component.find(ReactstrapInput).props().valid).toEqual(null);
  });
  it('should set <FormGroup /> to danger if touched set to true and error set to true', () => {
    component.setProps({
      meta: {
        touched: true,
        error: 'this in an error message',
      },
    });
    const expectedComponent = (
      <FormFeedback>
        this in an error message
      </FormFeedback>
    );
    expect(component.find(FormGroup).props().color).toEqual('danger');
    expect(component.find(ReactstrapInput).props().valid).toEqual(false);
    expect(component.contains(expectedComponent)).toEqual(true);
  });
});
