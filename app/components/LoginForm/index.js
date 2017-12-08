import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Form, Field, reduxForm } from 'redux-form/immutable';
import validator from 'utils/validator';
import Input from 'components/Input';

let LoginForm = (props) => { // eslint-disable-line import/no-mutable-exports
  const { handleSubmit, pristine, reset, submitting, fetching } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <fieldset disabled={fetching}>
        <div>
          <label htmlFor="email">Email</label>
          <Field
            name="email"
            component={Input}
            type="text"
            validate={[validator.required, validator.email]}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Field
            name="password"
            component={Input}
            type="password"
            validate={[validator.required]}
          />
        </div>
        <Button type="submit" outline color="primary" disabled={submitting}>
          Submit
        </Button>{' '}
        <Button outline color="primary" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
      </fieldset>
    </Form>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  fetching: PropTypes.bool,
};

LoginForm = reduxForm({
  // a unique name for the form
  form: 'login',
})(LoginForm);

export default LoginForm;
