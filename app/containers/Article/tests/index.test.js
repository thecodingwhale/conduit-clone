import React from 'react';
import { push } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';

import { Container, Alert } from 'reactstrap';

import Loader from 'components/Loader';
import AuthorCard from 'components/AuthorCard';
import ArticleTags from 'components/ArticleTags';
import CommentForm from 'components/CommentForm';

import { Article, mapDispatchToProps } from '../index';
import { Comments } from '../Comments';
import { fetchArticle, deleteArticle, postComment } from '../actions';
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

  it('should call history.goBack() if this.props.article.deleted', () => {
    const goBackSpy = jest.fn();
    const component = shallow(
      <Article
        onFetchArticle={() => {}}
        history={{
          goBack: goBackSpy,
        }}
        article={{
          error: false,
          deleted: false,
        }}
      />
    );
    component.setProps({
      article: {
        deleted: true,
      },
    });
    expect(goBackSpy).toHaveBeenCalled();
  });

  it('should render the edit and delete button if author username is not the same', () => {
    const newUserData = userData.setIn(['login', 'user', 'data', 'username'], 'foo');
    setLocalStorage(newUserData);
    const store = createStore(combineReducers({ form: formReducer }));
    const component = mount(
      <Provider store={store}>
        <Article
          onFetchArticle={() => {}}
          article={{
            deleting: false,
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
      </Provider>
    );
    expect(component.find('button[name="edit-article"]').length).toEqual(0);
    expect(component.find('button[name="delete-article"]').length).toEqual(0);
    localStorage.clear();
  });

  describe('Authenticated', () => {
    let component;
    let store;
    beforeEach(() => {
      setLocalStorage(userData);
      store = createStore(combineReducers({ form: formReducer }));
      component = mount(
        <Provider store={store}>
          <Article
            onFetchArticle={() => {}}
            article={{
              deleting: false,
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
        </Provider>
      );
    });

    afterEach(() => {
      localStorage.clear();
    });

    it('should display <Alert /> error message if this.props.error set to true', () => {
      component = mount(
        <Article
          onFetchArticle={() => {}}
          error
          article={{
            fetching: false,
            error: true,
            deleting: false,
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
      const expectedComponent = (
        <Alert color="danger">
          Something went wrong.
        </Alert>
      );
      expect(component.contains(expectedComponent)).toEqual(true);
    });

    it('should render an article', () => {
      component = mount(
        <Provider store={store}>
          <Article
            onFetchArticle={() => {}}
            article={{
              fetching: false,
              error: false,
              deleting: false,
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
        </Provider>
      );

      expect(component.find(Container).length).toEqual(1);
      expect(component.find(ArticleTags).length).toEqual(1);
      expect(component.find(AuthorCard).length).toEqual(1);
      expect(component.find(Comments).length).toEqual(1);
      expect(component.find('button[name="edit-article"]').length).toEqual(1);
      expect(component.find('button[name="delete-article"]').length).toEqual(1);
    });

    it('should render edit and delete article if the user is authenticated', () => {
      expect(component.find('button[name="edit-article"]').length).toEqual(1);
      expect(component.find('button[name="delete-article"]').length).toEqual(1);
    });

    it('when the user click the edit button it should call this.props.editArticle', () => {
      const editArticle = jest.fn();
      component = mount(
        <Provider store={store}>
          <Article
            onFetchArticle={() => {}}
            editArticle={editArticle}
            article={{
              fetching: false,
              error: false,
              deleting: false,
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
        </Provider>
      );
      component.find('button[name="edit-article"]').simulate('click');
      expect(editArticle).toHaveBeenCalled();
    });

    it('when the user click the delete button it should call this.props.deleteArticle', () => {
      const deleteArticleSpy = jest.fn();
      component = mount(
        <Provider store={store}>
          <Article
            onFetchArticle={() => {}}
            deleteArticle={deleteArticleSpy}
            article={{
              fetching: false,
              error: false,
              deleting: false,
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
        </Provider>
      );
      component.find('button[name="delete-article"]').simulate('click');
      expect(deleteArticleSpy).toHaveBeenCalled();
    });

    it('should set the edit and delete button disabled if this.props.deleting set to true', () => {
      component = mount(
        <Provider store={store}>
          <Article
            onFetchArticle={() => {}}
            article={{
              deleting: true,
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
        </Provider>
      );
      expect(component.find('button[name="edit-article"][disabled]').length).toEqual(1);
      expect(component.find('button[name="delete-article"][disabled]').length).toEqual(1);
      expect(component.find('button[name="delete-article"]').text()).toEqual('Deleting Article...');
    });

    it('should call this.props.postComment when button[name="post-article"] is click', () => {
      const postCommentSpy = jest.fn();
      component = mount(
        <Provider store={store}>
          <Article
            onFetchArticle={() => {}}
            postComment={postCommentSpy}
            article={{
              deleting: true,
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
        </Provider>
      );

      const form = component.find(CommentForm);
      const textarea = component.find('textarea[name="comment"]');

      textarea.simulate('change', { target: { value: 'sample-comment' } });
      textarea.simulate('keypress', { key: 'Enter' });

      form.simulate('submit');
      expect(postCommentSpy).toHaveBeenCalled();
    });

    it('should render <Alert /> set to color danger if this.props.comments.postingError to true', () => {
      component = shallow(
        <Article
          onFetchArticle={() => {}}
          article={{
            error: false,
            fetching: false,
            data: fixture,
          }}
          comments={{
            error: false,
            fetching: false,
            posting: false,
            postingError: true,
            postingCompleted: false,
            data: [],
          }}
        />
      );
      const expectedComponent = (
        <Alert color="danger">
          Failed posting your comment.
        </Alert>
      );

      expect(component.contains(expectedComponent)).toEqual(true);
    });

    it('should render <Alert /> set to color success if this.props.comments.postingCompleted to true', () => {
      component = shallow(
        <Article
          onFetchArticle={() => {}}
          article={{
            error: false,
            fetching: false,
            data: fixture,
          }}
          comments={{
            error: false,
            fetching: false,
            posting: false,
            postingError: false,
            postingCompleted: true,
            data: [],
          }}
        />
      );
      const expectedComponent = (
        <Alert color="success">
          Success posting your comment.
        </Alert>
      );

      expect(component.contains(expectedComponent)).toEqual(true);
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

  describe('deleteArticle', () => {
    it('should be injected', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      expect(result.deleteArticle).toBeDefined();
    });

    it('should dispatch deleteArticle when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      const slug = 'sample-slug';
      result.deleteArticle(slug);
      expect(dispatch).toHaveBeenCalledWith(deleteArticle(slug));
    });
  });

  describe('postComment', () => {
    it('should be injected', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      expect(result.postComment).toBeDefined();
    });

    it('should dispatch postComment when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      const slug = 'sample-slug';
      const comment = 'sample-comment';
      result.postComment(slug, comment);
      expect(dispatch).toHaveBeenCalledWith(postComment(slug, comment));
    });
  });
});
