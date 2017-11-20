import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field, reduxForm } from 'redux-form/immutable';
import Input from 'components/Input';
import { Button } from 'reactstrap';

const required = (value) => (value ? undefined : 'Required');
const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

let LoginForm = (props) => { // eslint-disable-line import/no-mutable-exports
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <Field
          name="email"
          component={Input}
          type="text"
          validate={[required, email]}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Field
          name="password"
          component={Input}
          type="password"
          validate={[required]}
        />
      </div>
      <Button type="submit" outline color="primary" disabled={submitting}>
        Submit
      </Button>{' '}
      <Button outline color="primary" disabled={pristine || submitting} onClick={reset}>
        Clear Values
      </Button>
    </Form>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
};

LoginForm = reduxForm({
  // a unique name for the form
  form: 'login',
})(LoginForm);

export default LoginForm;
