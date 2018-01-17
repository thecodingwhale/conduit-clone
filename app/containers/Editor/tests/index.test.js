import React from 'react';
import { fromJS } from 'immutable';
import { push } from 'react-router-redux';
import { shallow, mount } from 'enzyme';

import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { Editor, mapDispatchToProps } from '../index';
import { addNewPost as addNewPostAction } from '../actions';

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
  let subject;

  beforeEach(() => {
    store = createStore(combineReducers({ form: formReducer }));
    addNewPost = jest.fn().mockReturnValue(Promise.resolve());
    redirectToSlug = jest.fn().mockReturnValue(Promise.resolve());
    const props = {
      addNewPost,
      redirectToSlug,
      success: false,
      slug: null,
    };
    subject = mount(
      <Provider store={store}>
        <Editor {...props} />
      </Provider>,
    );
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
  });
});
