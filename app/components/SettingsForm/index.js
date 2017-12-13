import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field, reduxForm } from 'redux-form/immutable';
import validator from 'utils/validator';
import Input from 'components/Input';
import { Button } from 'reactstrap';

let SettingsForm = (props) => { // eslint-disable-line import/no-mutable-exports
  const { handleSubmit, submitting, fetching } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <h3>Your Settings</h3>
      <fieldset disabled={fetching}>
        <div>
          <label htmlFor="image">Image</label>
          <Field
            name="image"
            component={Input}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <Field
            name="username"
            component={Input}
            type="text"
            validate={[validator.required]}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <Field
            name="bio"
            component={Input}
            type="text"
          />
        </div>
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
          Update Settings
        </Button>
      </fieldset>
    </Form>
  );
};

SettingsForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  fetching: PropTypes.bool,
};

SettingsForm = reduxForm({
  // a unique name for the form
  form: 'settings',
})(SettingsForm);

export default SettingsForm;
