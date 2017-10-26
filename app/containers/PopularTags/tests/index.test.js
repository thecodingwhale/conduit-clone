import React from 'react';
import { push } from 'react-router-redux';
import { shallow, mount } from 'enzyme';
import { Alert, Button } from 'reactstrap';
import Loader from 'components/Loader';
import { getTags } from '../actions';
import { PopularTags, mapDispatchToProps } from '../index';

describe('<PopularTags />', () => {
  it('should call getTags()', () => {
    const submitSpy = jest.fn();
    mount(<PopularTags getTags={submitSpy} onTagSelect={() => {}} />);
    expect(submitSpy).toHaveBeenCalled();
  });
  it('should match the title name', () => {
    const component = shallow(<PopularTags getTags={() => {}} onTagSelect={() => {}} />);
    const expectedComponent = (
      <h3>
        Popular Tags
      </h3>
    );
    expect(component.contains(expectedComponent)).toEqual(true);
  });

  it('should display a loading icon while fetching', () => {
    const component = mount(<PopularTags getTags={() => {}} onTagSelect={() => {}} />);
    expect(component.props().fetching).toEqual(true);
    expect(component.contains(<Loader />)).toEqual(true);
  });

  it('should call getTags()', () => {
    const getTagsSpy = jest.fn();
    mount(<PopularTags getTags={getTagsSpy} />);
    expect(getTagsSpy).toHaveBeenCalled();
  });

  it('should display an alert message that there are no return tags after fetching', () => {
    const component = shallow(
      <PopularTags
        getTags={() => {}}
        onTagSelect={() => {}}
        fetching={false}
        tags={[]}
      />
    );
    const expectedComponent = (
      <Alert color="info">
        No Tags
      </Alert>
    );

    expect(component.contains(<Loader />)).toEqual(false);
    expect(component.contains(expectedComponent)).toEqual(true);
  });

  it('should display an alert message the something bad when getting the tqags after fetching', () => {
    const component = shallow(
      <PopularTags
        getTags={() => {}}
        onTagSelect={() => {}}
        error
        fetching={false}
        tags={[]}
      />
    );
    const expectedComponent = (
      <Alert color="danger">
        Something went wrong.
      </Alert>
    );

    expect(component.contains(<Loader />)).toEqual(false);
    expect(component.contains(expectedComponent)).toEqual(true);
  });

  it('should make the button set to active state onLoad if the current url param match and title tag', () => {
    const activeTag = 'foo';
    const tags = [
      activeTag,
      'bar',
    ];
    const component = shallow(
      <PopularTags
        getTags={() => {}}
        onTagSelect={() => {}}
        fetching={false}
        tags={tags}
        location={{
          search: `?tag=${activeTag}`,
        }}
      />
    );

    expect(component.find(Button).length).toEqual(2);
    component.find(Button).forEach((node) => {
      const { children, active } = node.props();
      if (children === activeTag) {
        expect(active).toEqual(true);
      }
    });
  });

  it('should call onTagSelect if the tag button is click and push it as a url tag param', () => {
    const onTagSelectSpy = jest.fn();
    const tags = [
      'foo',
    ];
    const component = mount(
      <PopularTags
        getTags={() => {}}
        onTagSelect={onTagSelectSpy}
        fetching={false}
        tags={tags}
        location={{
          search: '',
        }}
      />
    );

    component.find(Button).simulate('click');
    expect(onTagSelectSpy).toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    describe('getTags', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.getTags).toBeDefined();
      });
      it('should dispatch getTags when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.getTags();
        expect(dispatch).toHaveBeenCalledWith(getTags());
      });
      it('should dispatch onTagSelect when called', () => {
        const tag = 'foo';
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onTagSelect(tag);
        expect(dispatch).toHaveBeenCalledWith(push(`/?tag=${tag}&page=1`));
      });
    });
  });
});
