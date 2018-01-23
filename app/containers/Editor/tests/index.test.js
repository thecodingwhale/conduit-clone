import React from 'react';
import { fromJS } from 'immutable';
import { push } from 'react-router-redux';
import { shallow, mount } from 'enzyme';

import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { Alert } from 'reactstrap';

import Loader from 'components/Loader';

import { Editor, mapDispatchToProps } from '../index';
import {
  addNewPost as addNewPostAction,
  fetchArticle as fetchArticleAction,
} from '../actions';

const data = fromJS({
  title: 'article title',
  description: 'article description',
  body: 'article body',
  tagList: [
    'foo',
    'bar',
    'baz',
  ],
});

describe('<Editor />', () => {
  let store;
  let addNewPost;
  let redirectToSlug;
  let fetchArticle;
  let subject;

  beforeEach(() => {
    store = createStore(combineReducers({ form: formReducer }));
    addNewPost = jest.fn().mockReturnValue(Promise.resolve());
    redirectToSlug = jest.fn().mockReturnValue(Promise.resolve());
    fetchArticle = jest.fn().mockReturnValue(Promise.resolve());
    const props = {
      addNewPost,
      redirectToSlug,
      fetchArticle,
      success: false,
      error: false,
      slug: null,
      match: {
        params: {
          slug: 'sample-slug',
        },
      },
    };

    subject = mount(
      <Provider store={store}>
        <Editor {...props} />
      </Provider>,
    );
  });

  it('should display the <Loader /> on first load', () => {
    const component = shallow(
      <Editor
        addNewPost={() => {}}
        redirectToSlug={() => {}}
      />
    );
    expect(component.find(Loader).length).toEqual(1);
  });

  it('should display <Alert /> if this.props.error set to true', () => {
    const component = shallow(
      <Editor
        error
        addNewPost={() => {}}
        redirectToSlug={() => {}}
      />
    );
    const expectedComponent = (
      <Alert color="danger">
        Something went wrong.
      </Alert>
    );
    expect(component.contains(expectedComponent)).toEqual(true);
  });

  it('should call addNewPost and match the expected for data', () => {
    const form = subject.find('form');
    const title = subject.find('input[name="title"]');
    const description = subject.find('input[name="description"]');
    const body = subject.find('input[name="body"]');
    const tagList = subject.find('input[name="tagList"]');

    title.simulate('change', { target: { value: data.get('title') } });
    title.simulate('keypress', { key: 'Enter' });

    description.simulate('change', { target: { value: data.get('description') } });
    description.simulate('keypress', { key: 'Enter' });

    body.simulate('change', { target: { value: data.get('body') } });
    body.simulate('keypress', { key: 'Enter' });

    data.get('tagList').forEach((tag) => {
      tagList.simulate('change', { target: { value: tag } });
      tagList.simulate('keypress', { key: 'Enter' });
    });

    form.simulate('submit');

    expect(addNewPost).toHaveBeenCalled();
    expect(store.getState().form.post.values).toEqual(data.toJS());
  });

  it('should call redirectToSlug if success and slug is not equal to null', () => {
    const redirectToSlugSpy = jest.fn();
    const component = shallow(
      <Editor
        addNewPost={() => {}}
        redirectToSlug={redirectToSlugSpy}
      />
    );
    expect(component.instance().props.fetching).toEqual(false);
    expect(component.instance().props.success).toEqual(false);
    expect(component.instance().props.slug).toEqual(null);

    component.setProps({
      success: true,
      slug: 'sample',
    });
    expect(component.instance().props.success).toEqual(true);
    expect(component.instance().props.slug).toEqual('sample');
    expect(redirectToSlugSpy).toHaveBeenCalled();
  });

  it('should call fetchArticle base on the current slug', () => {
    const props = {
      addNewPost: () => {},
      redirectToSlug: () => {},
      fetchArticle: jest.fn(),
      match: {
        params: {
          slug: 'sample-slug',
        },
      },
    };
    mount(
      <Provider store={store}>
        <Editor {...props} />
      </Provider>,
    );
    expect(fetchArticle).toHaveBeenCalled();
  });

  it('should fill all the form inputs if this.match.params.slug and this.props.article are not empty.', () => {
    const props = {
      addNewPost: () => {},
      redirectToSlug: () => {},
      fetchArticle: () => {},
      article: data,
      match: {
        params: {
          slug: 'sample-slug',
        },
      },
    };
    mount(
      <Provider store={store}>
        <Editor {...props} />
      </Provider>,
    );
    expect(store.getState().form.post.values).toEqual(data);
    expect(store.getState().form.post.initial).toEqual(data);
  });

  describe('mapDispatchToProps', () => {
    describe('addNewPost', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.addNewPost).toBeDefined();
      });

      it('should dispatch addNewPost when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.addNewPost(data);
        expect(dispatch).toHaveBeenCalledWith(addNewPostAction(data));
      });
    });

    describe('redirectToSlug', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.redirectToSlug).toBeDefined();
      });

      it('should dispatch push when called', () => {
        const slug = 'sample-slug';
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.redirectToSlug(slug);
        expect(dispatch).toHaveBeenCalledWith(push(`/article/${slug}`));
      });
    });

    describe('fetchArticle', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.fetchArticle).toBeDefined();
      });

      it('should dispatch push when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.fetchArticle(data);
        expect(dispatch).toHaveBeenCalledWith(fetchArticleAction(data));
      });
    });
  });
});
