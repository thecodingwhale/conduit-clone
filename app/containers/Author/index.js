/**
 *
 * Author
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import { isEmpty } from 'lodash';
import { Container, Alert, TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import Articles from 'containers/Articles';

import Loader from 'components/Loader';
import AuthorBanner from 'components/AuthorBanner';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { checkUrlParams } from 'utils/url';
import {
  makeSelectAuthorData,
  makeSelectAuthorFetching,
  makeSelectAuthorError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchAuthorProfile } from './actions';
import { AuthorPropTypes } from '../../PropTypesValues';

const BannerWrapper = styled.div`
  margin-bottom: 2rem;
`;

const ArticlesWrapper = styled.div`
  padding: 16px 8px;
  border: 1px solid #e1e1e1;
  border-top: 0px;
`;

export class Author extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '',
    };
  }
  componentDidMount() {
    this.props.onFetchAuthorProfile(this.props.match.params.username);
    this.setActiveTab();
  }
  setActiveTab() {
    if (this.state.activeTab === '' && !checkUrlParams(/\?favorited/g, this.props.location.search)) {
      this.setState({
        activeTab: '1',
      });
    }
  }
  setActiveClass(tab) {
    if (checkUrlParams(/\?favorited/g, this.props.location.search) && tab === '2') {
      return 'active';
    }
    return this.state.activeTab === tab && tab !== '2' ? 'active' : '';
  }
  toggle(tab, callback) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      }, () => {
        callback();
      });
    }
  }
  renderTabs() {
    return (
      <Container>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={this.setActiveClass('1')}
              onClick={() => {
                this.toggle('1', () => {
                  this.props.onPageChange(`/author/${this.props.match.params.username}`);
                });
              }}
            >
              My Articles
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.setActiveClass('2')}
              onClick={() => {
                this.toggle('2', () => {
                  this.props.onPageChange(`/author/${this.props.match.params.username}?favorited`);
                });
              }}
            >
              Favorited Articles
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent>
          <ArticlesWrapper>
            <Articles
              filters={{
                search: this.props.location.search,
                username: this.props.match.params.username,
              }}
              {...this.props}
            />
          </ArticlesWrapper>
        </TabContent>
      </Container>
    );
  }
  render() {
    const {
      fetching,
      error,
      data,
    } = this.props.author;
    let content;
    if (!fetching) {
      if (!error && !isEmpty(data)) {
        content = (
          <div>
            <BannerWrapper>
              <AuthorBanner author={data} />
            </BannerWrapper>
            {this.renderTabs()}
          </div>
        );
      } else {
        content = (
          <Container>
            <Alert color="danger">
              Something went wrong.
            </Alert>
          </Container>
        );
      }
    } else {
      content = (
        <Container>
          <Loader />
        </Container>
      );
    }

    return (
      <div>
        <Helmet>
          <title>Author</title>
          <meta name="description" content="Description of Author" />
        </Helmet>
        {content}
      </div>
    );
  }
}

Author.propTypes = {
  onFetchAuthorProfile: PropTypes.func.isRequired,
  onPageChange: PropTypes.func,
  author: PropTypes.shape({
    fetching: PropTypes.bool,
    error: PropTypes.bool,
    data: AuthorPropTypes,
  }),
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  author: createStructuredSelector({
    fetching: makeSelectAuthorFetching(),
    error: makeSelectAuthorError(),
    data: makeSelectAuthorData(),
  }),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchAuthorProfile: (username) => {
      dispatch(fetchAuthorProfile(username));
    },
    onPageChange: (url) => {
      if (url) {
        dispatch(push(url));
      }
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'author', reducer });
const withSaga = injectSaga({ key: 'author', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Author);
