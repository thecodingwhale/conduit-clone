import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Form, Field, reduxForm } from 'redux-form/immutable';
import validator from 'utils/validator';
import Input from 'components/Input';

let PostForm = (props) => { // eslint-disable-line import/no-mutable-exports
  const { handleSubmit, submitting, fetching } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <fieldset disabled={fetching}>
        <div>
          <label htmlFor="title">Article Title</label>
          <Field
            name="title"
            component={Input}
            type="text"
            validate={[validator.required]}
          />
        </div>
        <div>
          <label htmlFor="description">Whats this article about?</label>
          <Field
            name="description"
            component={Input}
            type="text"
            validate={[validator.required]}
          />
        </div>
        <div>
          <label htmlFor="body">Write your article (in markdown)</label>
          <Field
            name="body"
            component={Input}
            type="text"
            validate={[validator.required]}
          />
        </div>
        <div>
          <label htmlFor="tags">Enter Tags</label>
          <Field
            name="tagList"
            component={Input}
            type="lists"
            validate={[validator.required]}
          />
        </div>
        <Button type="submit" outline color="primary" disabled={submitting}>
          Publish Article
        </Button>
      </fieldset>
    </Form>
  );
};

PostForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  fetching: PropTypes.bool,
};

PostForm = reduxForm({
  // a unique name for the form
  form: 'post',
})(PostForm);

export default PostForm;
