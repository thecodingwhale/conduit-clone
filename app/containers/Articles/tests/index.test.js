import React from 'react';
import { shallow, mount } from 'enzyme';
import { Alert, Card, CardTitle, CardText } from 'reactstrap';
import Loader from 'components/Loader';
import Wrapper from '../Wrapper';
import { Articles, mapDispatchToProps } from '../index';
import { fetchArticles } from '../actions';

describe('<Articles />', () => {
  it('should display a loading icon while fetching', () => {
    const component = shallow(
      <Articles
        fetching
        error
        onFetchArticles={() => {}}
        posts={[]}
      />
    );
    expect(component.contains(<Loader />)).toEqual(true);
  });

  it('should display an error message after fetching the articles and it throws and error', () => {
    const component = shallow(
      <Articles
        fetching={false}
        error
        onFetchArticles={() => {}}
        posts={[]}
      />
    );
    const expectedComponent = (
      <Alert color="danger">
        This is a warning alert — check it out!
      </Alert>
    );
    expect(component.contains(expectedComponent)).toEqual(true);
  });

  it('should display and alert mesage after fetching is completed and returns an empty articles', () => {
    const component = shallow(
      <Articles
        fetching={false}
        error={false}
        onFetchArticles={() => {}}
        posts={[]}
      />
    );
    const expectedComponent = (
      <Alert color="info">
        This is a warning alert — check it out!
      </Alert>
    );
    expect(component.contains(expectedComponent)).toEqual(true);
  });

  it('should call onFetchArticles if location.search is not empty', () => {
    const submitSpy = jest.fn();
    mount(
      <Articles
        fetching={false}
        error={false}
        onFetchArticles={submitSpy}
        location={{
          search: '?page=1',
        }}
        posts={[
          {
            title: 'sample title',
            description: 'sample description',
            createdAt: 'sample date',
          },
        ]}
      />
    );
    expect(submitSpy).toHaveBeenCalled();
  });

  it('should render a post', () => {
    const component = shallow(
      <Articles
        fetching={false}
        error={false}
        onFetchArticles={() => {}}
        posts={[
          {
            title: 'sample title',
            description: 'sample description',
            createdAt: 'sample date',
          },
        ]}
      />
    );
    const expectedComponent = (
      <Wrapper>
        <Card body>
          <CardTitle>sample title</CardTitle>
          <CardText>sample description</CardText>
          <CardText>
            <small className="text-muted">sample date</small>
          </CardText>
        </Card>
      </Wrapper>
    );
    expect(component.contains(expectedComponent)).toEqual(true);
  });

  describe('mapDispatchToProps', () => {
    describe('onFetchArticles', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onFetchArticles).toBeDefined();
      });
    });

    it('should dispatch fetchArticles when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      const page = 1;
      result.onFetchArticles(page);
      expect(dispatch).toHaveBeenCalledWith(fetchArticles(page));
    });
  });
});
