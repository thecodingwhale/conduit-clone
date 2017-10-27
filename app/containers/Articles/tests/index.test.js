import React from 'react';
import { push } from 'react-router-redux';
import { shallow, mount } from 'enzyme';
import ReactPaginate from 'react-paginate';
import { Alert, Card, CardTitle, CardText, Badge, CardLink, Row, Col, Button } from 'reactstrap';
import Loader from 'components/Loader';
import Wrapper from '../Wrapper';
import Avatar from '../Avatar';
import { Articles, mapDispatchToProps } from '../index';
import { fetchArticles } from '../actions';
import { BASE_LIMIT } from '../../../utils/url';

const samplePostData = [
  {
    author: {
      bio: 'ab cdadaf',
      following: false,
      image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      username: 'trinhnguyen',
    },
    title: 'sample title',
    description: 'sample description',
    createdAt: '2017-10-27T00:13:15.524Z',
    slug: 'hello-world-31l68b',
    favoritesCount: 1,
    favorited: true,
    tagList: [
      'dragons',
      'angularjs',
      'reactjs',
    ],
  },
];

describe('<Articles />', () => {
  it('should display a loading icon while fetching', () => {
    const component = shallow(
      <Articles
        fetching
        error
        onFetchArticles={() => {}}
        onPageChange={() => {}}
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
        onPageChange={() => {}}
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
        onPageChange={() => {}}
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
        onPageChange={() => {}}
        location={{
          search: '?page=1',
        }}
        posts={samplePostData}
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
        onPageChange={() => {}}
        location={{
          search: '?page=100',
        }}
        posts={samplePostData}
      />
    );
    const { author, title, description, createdAt, slug, favoritesCount, favorited } = samplePostData[0];
    const expectedComponent = (
      <Wrapper>
        <Card body>
          <Row style={{ marginBottom: '10px' }}>
            <Col xs="6">
              <CardLink href="#" style={{ float: 'left' }}>
                <Avatar image={author.image} />
              </CardLink>
              <div
                className="info"
                style={{
                  overflow: 'hidden',
                  paddingLeft: '10px',
                }}
              >
                <CardLink
                  className="author"
                  href={`@${author.username}`}
                  style={{
                    display: 'block',
                  }}
                >
                  {author.username}
                </CardLink>
                <CardText>
                  <small className="text-muted">{new Date(createdAt).toDateString()}</small>
                </CardText>
              </div>
            </Col>
            <Col xs="6">
              <div className="text-right">
                <Button
                  active={favorited}
                  outline
                  color="primary"
                  size="sm"
                >
                  <i className="ion-heart"></i>
                  {favoritesCount}
                </Button>
              </div>
            </Col>
          </Row>
          <CardTitle>{title}</CardTitle>
          <CardText>{description}</CardText>
          <Row>
            <Col xs="6">
              <CardLink href={`/article/${slug}`}>
                Read More
              </CardLink>
            </Col>
            <Col className="text-right" xs="6">
              <Badge color="secondary" pill>dragons</Badge>
              <Badge color="secondary" pill>angularjs</Badge>
              <Badge color="secondary" pill>reactjs</Badge>
            </Col>
          </Row>
        </Card>
      </Wrapper>
    );
    expect(component.contains(expectedComponent)).toEqual(true);
  });

  it('should call onFetchArticles and onPageChange when <ReactPaginate /> onPageChange triggered', () => {
    const onFetchArticlesSpy = jest.fn();
    const onPageChangeSpy = jest.fn();

    const component = shallow(
      <Articles
        fetching={false}
        error={false}
        onFetchArticles={onFetchArticlesSpy}
        onPageChange={onPageChangeSpy}
        location={{
          search: '?page=100',
        }}
        posts={samplePostData}
      />
    );

    component.find(ReactPaginate).props().onPageChange({ selected: 1 });
    expect(onFetchArticlesSpy).toHaveBeenCalled();
    expect(onPageChangeSpy).toHaveBeenCalled();
  });

  it('should match the fixture for the location.search and forcePage props', () => {
    const searchPageParam = 3;
    const basePageCount = 500;
    const component = mount(
      <Articles
        fetching={false}
        error={false}
        onFetchArticles={() => {}}
        onPageChange={() => {}}
        location={{
          search: `?page=${searchPageParam}`,
        }}
        pageCount={basePageCount}
        posts={samplePostData}
      />
    );
    const paginationComponentProps = component.find(ReactPaginate).props();
    const { forcePage, pageCount } = paginationComponentProps;

    expect(forcePage).toEqual(searchPageParam - 1);
    expect(pageCount).toEqual(basePageCount / BASE_LIMIT);
  });

  it('should call componentWillReceiveProps', () => {
    const spy = jest.spyOn(Articles.prototype, 'componentWillReceiveProps');
    const onFetchArticlesSpy = jest.fn();
    const component = shallow(
      <Articles
        fetching={false}
        error={false}
        onFetchArticles={onFetchArticlesSpy}
        onPageChange={() => {}}
        location={{
          search: '?page=1',
        }}
        posts={samplePostData}
      />
    );

    expect(spy).not.toHaveBeenCalled();
    component.setProps({
      location: {
        search: '?tag=foo&page=1',
      },
    });
    expect(spy).toHaveBeenCalled();
    expect(onFetchArticlesSpy).toHaveBeenCalled();

    spy.mockReset();
    spy.mockRestore();
  });

  describe('mapDispatchToProps', () => {
    describe('onFetchArticles', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onFetchArticles).toBeDefined();
      });
    });

    describe('onPageChange', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onPageChange).toBeDefined();
      });
    });

    it('should dispatch fetchArticles when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      const page = 1;
      const tag = 'foo';
      result.onFetchArticles(page, tag);
      expect(dispatch).toHaveBeenCalledWith(fetchArticles(page, tag));
    });

    it('should dispatch onPageChange when called', () => {
      const page = 1;
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.onPageChange(page);
      expect(dispatch).toHaveBeenCalledWith(push(`/?page=${page}`));
    });

    it('should not dispatch onPageChange when called if page param is null', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.onPageChange();
      expect(dispatch).not.toHaveBeenCalled();
    });
  });
});
