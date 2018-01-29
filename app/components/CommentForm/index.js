/**
*
* CommentForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field, reduxForm } from 'redux-form/immutable';

import { Button } from 'reactstrap';

import validator from 'utils/validator';
import Input from 'components/Input';

let CommentForm = (props) => { // eslint-disable-line import/no-mutable-exports
  const { handleSubmit, submitting, posting } = props;
  const setSubmitTextBotton = posting ? 'Posting Comment...' : 'Post Comment';
  return (
    <Form onSubmit={handleSubmit}>
      <fieldset disabled={posting}>
        <div>
          <Field
            placeholder="Write a comment..."
            name="comment"
            component={Input}
            type="textarea"
            validate={[validator.required]}
          />
        </div>
        <Button name="post-article" type="submit" outline color="primary" disabled={submitting}>
          {setSubmitTextBotton}
        </Button>
      </fieldset>
    </Form>
  );
};

CommentForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  posting: PropTypes.bool,
};

CommentForm = reduxForm({
  form: 'commentForm',
  enableReinitialize: true,
})(CommentForm);

export default CommentForm;
