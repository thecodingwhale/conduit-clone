import React from 'react';
import { push } from 'react-router-redux';
import { shallow, mount } from 'enzyme';
import { Container, Alert } from 'reactstrap';
import Loader from 'components/Loader';
import AuthorCard from 'components/AuthorCard';
import ArticleTags from 'components/ArticleTags';
import { Article, mapDispatchToProps } from '../index';
import { Comments } from '../Comments';
import { fetchArticle } from '../actions';
import { fixture } from './sampleData';
import { setLocalStorage } from '../../../auth';
import { userData } from '../../../utils/tests/auth.test';

describe('<Article />', () => {
  it('should display a <Loader /> component first', () => {
    const component = shallow(
      <Article
        onFetchArticle={() => {}}
        article={{
          error: false,
          fetching: true,
          data: {},
        }}
      />
    );
    const expectedComponent = (
      <Container>
        <Loader />
      </Container>
    );
    expect(component.contains(expectedComponent)).toEqual(true);
    component.setProps({
      article: {
        fetching: false,
      },
    });
    expect(component.find(Loader).length).toEqual(0);
  });

  it('should call onFetchArticle', () => {
    const onFetchArticleSpy = jest.fn();
    mount(
      <Article
        onFetchArticle={onFetchArticleSpy}
        article={{
          fetching: false,
          error: false,
          data: {},
        }}
        match={{
          params: {
            slug: 'foo',
          },
        }}
      />
    );
    expect(onFetchArticleSpy).toHaveBeenCalled();
  });

  it('should display an alert message if it throws an api error', () => {
    const component = shallow(
      <Article
        onFetchArticle={() => {}}
        article={{
          fetching: false,
          error: true,
          data: {},
        }}
      />
    );
    const expectedComponent = (
      <Container>
        <Alert color="danger">
          Something went wrong.
        </Alert>
      </Container>
    );

    expect(component.contains(expectedComponent)).toEqual(true);
  });

  it('should display an alert message if alert is still null after fetching', () => {
    const component = shallow(
      <Article
        onFetchArticle={() => {}}
        fetching={false}
        error={false}
        article={{}}
      />
    );
    const expectedComponent = (
      <Container>
        <Alert color="danger">
          Something went wrong.
        </Alert>
      </Container>
    );
    expect(component.contains(expectedComponent)).toEqual(true);
  });

  it('should render an article', () => {
    const component = shallow(
      <Article
        onFetchArticle={() => {}}
        article={{
          fetching: false,
          error: false,
          data: fixture,
        }}
        comments={{
          fetching: false,
          error: false,
          data: [],
        }}
      />
    );
    const expectedComponent = (
      <Container>
        <div>
          <h1>{fixture.title}</h1>
          <p>{fixture.description}</p>
          <ArticleTags tagList={fixture.tagList} />
          <hr />
          <AuthorCard
            author={fixture.author}
            createdAt={new Date(fixture.createdAt).toDateString()}
          />
          <hr />
          <div dangerouslySetInnerHTML={{ __html: fixture.body }} />
          <hr />
          <Comments fetching={false} comments={[]} />
        </div>
      </Container>
    );
    expect(component.contains(expectedComponent)).toEqual(true);
  });

  describe('Authenticated', () => {
    let component;
    beforeEach(() => {
      setLocalStorage(userData);
      component = mount(
        <Article
          onFetchArticle={() => {}}
          article={{
            fetching: false,
            error: false,
            data: fixture,
          }}
          comments={{
            fetching: false,
            error: false,
            data: [],
          }}
          match={{
            params: {
              slug: 'foo',
            },
          }}
        />
      );
    });

    afterEach(() => {
      localStorage.clear();
    });

    it('should render edit and delete article if the user is authenticated', () => {
      expect(component.find('button[name="edit-article"]').length).toEqual(1);
      expect(component.find('button[name="delete-article"]').length).toEqual(1);
    });

    it('when the user click the edit button it should call this.props.editArticle', () => {
      const editArticle = jest.fn();
      component.setProps({
        editArticle,
      });
      component.find('button[name="edit-article"]').simulate('click');
      expect(editArticle).toHaveBeenCalled();
    });
  });
});

describe('mapDispatchToProps', () => {
  describe('onFetchArticle', () => {
    it('should be injected', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      expect(result.onFetchArticle).toBeDefined();
    });
    it('should dispatch fetchArticle when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      const slug = 'sample-slug';
      result.onFetchArticle(slug);
      expect(dispatch).toHaveBeenCalledWith(fetchArticle(slug));
    });
  });
  describe('editArticle', () => {
    it('should be injected', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      expect(result.editArticle).toBeDefined();
    });
    it('should dispatch editArticle when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      const slug = 'sample-slug';
      const article = {
        foo: 'bar',
      };
      result.editArticle(slug, { article });
      expect(dispatch).toHaveBeenCalledWith(push(`/editor/${slug}`, { article }));
    });
  });
});
