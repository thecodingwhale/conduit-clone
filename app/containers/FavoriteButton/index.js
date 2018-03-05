/**
 *
 * FavoriteButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Button } from 'reactstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectFavoriteButton from './selectors';
import reducer from './reducer';
import saga from './saga';

export class FavoriteButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Button
        outline
        color="primary"
        size="sm"
      >
        <i className="ion-heart"></i>
        {this.props.count}
      </Button>
    );
  }
}

FavoriteButton.propTypes = {
  count: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  favoritebutton: makeSelectFavoriteButton(),
});

function mapDispatchToProps() {
  return {};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'favoriteButton', reducer });
const withSaga = injectSaga({ key: 'favoriteButton', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FavoriteButton);
