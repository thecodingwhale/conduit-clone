/**
 *
 * Articles
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectArticles from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class Articles extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Articles</title>
          <meta name="description" content="Description of Articles" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Articles.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  articles: makeSelectArticles(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'articles', reducer });
const withSaga = injectSaga({ key: 'articles', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Articles);
