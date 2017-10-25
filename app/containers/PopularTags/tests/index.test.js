import React from 'react';
import { shallow, mount } from 'enzyme';
import { Alert, Button } from 'reactstrap';
import Loader from 'components/Loader';
import { getTags } from '../actions';
import { PopularTags, mapDispatchToProps } from '../index';

describe('<PopularTags />', () => {
  it('should call getTags()', () => {
    const submitSpy = jest.fn();
    mount(<PopularTags getTags={submitSpy} />);
    expect(submitSpy).toHaveBeenCalled();
  });
  it('should match the title name', () => {
    const component = shallow(<PopularTags getTags={() => {}} />);
    const expectedComponent = (
      <h3>
        Popular Tags
      </h3>
    );
    expect(component.contains(expectedComponent)).toEqual(true);
  });

  it('should display a loading icon while fetching', () => {
    const component = mount(<PopularTags getTags={() => {}} />);
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

  it('should render a lists of tags', () => {
    const tags = [
      'foo',
      'bar',
    ];

    const component = shallow(
      <PopularTags
        getTags={() => {}}
        fetching={false}
        tags={tags}
      />
    );
    const expectedComponent = tags.map((tag) => { // eslint-disable-line arrow-body-style
      return (
        <Button
          key={tag}
          outline
          color="primary"
          size="sm"
        >
          {tag}
        </Button>
      );
    });

    expect(component.contains(<Loader />)).toEqual(false);
    expect(component.contains(expectedComponent)).toEqual(true);
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
    });
  });
});
