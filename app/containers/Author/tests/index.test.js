import React from 'react';
import { Helmet } from 'react-helmet';
import { shallow, mount } from 'enzyme';

import { Container, Alert } from 'reactstrap';
import Loader from 'components/Loader';

import { Author, mapDispatchToProps } from '../index';
import { fetchAuthorProfile } from '../actions';

const username = '@john_doe';
const renderedComponent = shallow(
  <Author
    onFetchAuthorProfile={() => {}}
    match={{
      params: {
        username,
      },
    }}
    author={{
      fetching: true,
      error: false,
      data: {
        bio: 'sample biography',
        following: true,
        image: 'sample.png',
        username: '@foobar',
      },
    }}
  />
);

describe('<Author />', () => {
  it('should call onFetchAuthorProfile', () => {
    const onFetchAuthorProfileSpy = jest.fn();
    mount(
      <Author
        onFetchAuthorProfile={onFetchAuthorProfileSpy}
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
        data: {
          fetching: false,
        },
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
});
