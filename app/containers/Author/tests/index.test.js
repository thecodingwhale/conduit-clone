import React from 'react';
import { push } from 'react-router-redux';
import { Helmet } from 'react-helmet';
import { shallow, mount } from 'enzyme';

import { Container, Alert, NavLink } from 'reactstrap';
import Loader from 'components/Loader';
import AuthorBanner from 'components/AuthorBanner';
import { Author, mapDispatchToProps } from '../index';
import { fetchAuthorProfile } from '../actions';

const username = '@john_doe';
const author = {
  bio: 'sample biography',
  following: true,
  image: 'sample.png',
  username: '@foobar',
};
const renderedComponent = shallow(
  <Author
    onFetchAuthorProfile={() => {}}
    location={{
      search: '',
    }}
    match={{
      params: {
        username,
      },
    }}
    author={{
      fetching: true,
      error: false,
      data: author,
    }}
  />
);

describe('<Author />', () => {
  it('should call onFetchAuthorProfile', () => {
    const onFetchAuthorProfileSpy = jest.fn();
    mount(
      <Author
        onFetchAuthorProfile={onFetchAuthorProfileSpy}
        location={{
          search: '',
        }}
        match={{
          params: {
            username,
          },
        }}
        author={{
          fetching: true,
          error: false,
          data: {},
        }}
      />
    );
    expect(onFetchAuthorProfileSpy).toHaveBeenCalled();
  });
  it('should render <Loader /> by default', () => {
    const expectedComponent = (
      <div>
        <Helmet>
          <title>Author</title>
          <meta name="description" content="Description of Author" />
        </Helmet>
        <Container>
          <Loader />
        </Container>
      </div>
    );
    expect(renderedComponent.contains(expectedComponent)).toEqual(true);
    renderedComponent.setProps({
      author: {
        fetching: false,
        data: {},
      },
    });
    expect(renderedComponent.find(Loader).length).toEqual(0);
  });
  it('should display an alert message if it throws an api error', () => {
    const expectedComponent = (
      <div>
        <Helmet>
          <title>Author</title>
          <meta name="description" content="Description of Author" />
        </Helmet>
        <Container>
          <Alert color="danger">
            Something went wrong.
          </Alert>
        </Container>
      </div>
    );
    renderedComponent.setProps({
      author: {
        fetching: false,
        error: true,
      },
    });
    expect(renderedComponent.contains(expectedComponent)).toEqual(true);
  });
  it('should render <AuthorBanner /> component', () => {
    renderedComponent.setProps({
      author: {
        fetching: false,
        error: false,
        data: author,
      },
    });
    const expectedComponent = (
      <AuthorBanner author={author} />
    );
    expect(renderedComponent.contains(expectedComponent)).toEqual(true);
  });
  it('should set it active when user tries to click the corresponding tab', () => {
    const onPageChangeSpy = jest.fn();
    renderedComponent.setProps({
      onPageChange: onPageChangeSpy,
    });

    expect(renderedComponent.instance().state.activeTab).toEqual('');
    renderedComponent.find(NavLink).at(0).simulate('click');
    expect(renderedComponent.instance().state.activeTab).toEqual('1');
    expect(onPageChangeSpy).toHaveBeenCalled();

    renderedComponent.find(NavLink).at(1).simulate('click');
    expect(renderedComponent.instance().state.activeTab).toEqual('2');
  });
});

describe('mapDispatchToProps', () => {
  describe('onFetchAuthorProfile', () => {
    it('should be injected', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      expect(result.onFetchAuthorProfile).toBeDefined();
    });
    it('should dispatch fetchAuthorProfile when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.onFetchAuthorProfile(username);
      expect(dispatch).toHaveBeenCalledWith(fetchAuthorProfile(username));
    });
  });
  describe('onPageChange', () => {
    it('should be injected', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      expect(result.onPageChange).toBeDefined();
    });
    it('should not dispatch onPageChange when called if page param is null', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.onPageChange();
      expect(dispatch).not.toHaveBeenCalled();
    });
    it('should dispatch onPageChange when called', () => {
      const page = 'link';
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.onPageChange(page);
      expect(dispatch).toHaveBeenCalledWith(push(page));
    });
  });
});
