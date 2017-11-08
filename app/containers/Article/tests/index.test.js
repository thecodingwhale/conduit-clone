import React from 'react';
import { shallow, mount } from 'enzyme';
import { Container, Alert, Card, CardBody, CardFooter, CardText } from 'reactstrap';
import Loader from 'components/Loader';
import AuthorCard from 'components/AuthorCard';
import ArticleTags from 'components/ArticleTags';
import { Article, mapDispatchToProps } from '../index';
import { Comments } from '../Comments';
import { fetchArticle } from '../actions';

describe('<Article />', () => {
  it('should display a <Loader /> component first', () => {
    const component = shallow(
      <Article
        onFetchArticle={() => {}}
        error={false}
        fetching
      />
    );
    const expectedComponent = (
      <Container>
        <Loader />
      </Container>
    );
    expect(component.contains(expectedComponent)).toEqual(true);
    component.setProps({ fetching: false });
    expect(component.find(Loader).length).toEqual(0);
  });

  it('should call onFetchArticle', () => {
    const onFetchArticleSpy = jest.fn();
    mount(
      <Article
        onFetchArticle={onFetchArticleSpy}
        error={false}
        fetching={false}
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
        fetching={false}
        error
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
        article={null}
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
    const body = '<h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h1> ↵↵<h2>Praesentium blanditiis architecto aperiam porro, voluptates fugiat ullam</h2> ↵↵<h3>Odio rerum earum libero deserunt voluptas, repellat iste mollitia, aliquam</h3>';
    const author = {
      following: false,
      image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      username: 'trinhnguyen',
    };
    const createdAt = '2017-10-18T11:27:14.109Z';
    const tagList = [
      'foo',
      'bar',
      'baz',
    ];
    const component = shallow(
      <Article
        onFetchArticle={() => {}}
        fetching={false}
        error={false}
        article={{
          author,
          title: 'sample title',
          body,
          createdAt,
          tagList,
        }}
      />
    );
    const expectedComponent = (
      <Container>
        <div>
          <h1>sample title</h1>
          <ArticleTags tagList={tagList} />
          <hr />
          <AuthorCard
            author={author}
            createdAt={new Date(createdAt).toDateString()}
          />
          <hr />
          <div dangerouslySetInnerHTML={{ __html: body }} />
          <Comments fetching={false} comments={[]} />
        </div>
      </Container>
    );
    expect(component.contains(expectedComponent)).toEqual(true);
  });
});

describe('<Comments />', () => {
  it('should display <Loader /> component by default', () => {
    const component = shallow(<Comments />);
    const expectedComponent = (
      <div>
        <Loader />
      </div>
    );
    expect(component.contains(expectedComponent)).toEqual(true);
  });

  it('should display an alert message if there comments are empty', () => {
    const component = shallow(<Comments fetching={false} comment={[]} />);
    const expectedComponent = (
      <div>
        <Alert color="info">
          No Comments Found
        </Alert>
      </div>
    );
    expect(component.contains(expectedComponent)).toEqual(true);
  });

  it('should display a comments', () => {
    const author = {
      following: false,
      image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      username: 'trinhnguyen',
    };
    const comments = [
      {
        id: 1,
        author,
        body: 'first sample comment',
        createdAt: '2017-11-06T06:16:07.445Z',
        updatedAt: '2017-11-06T06:16:07.445Z',
      },
      {
        id: 2,
        author,
        body: 'second sample comment',
        createdAt: '2017-11-06T06:16:07.445Z',
        updatedAt: '2017-11-06T06:16:07.445Z',
      },
    ];
    const component = shallow(<Comments fetching={false} comments={comments} />);
    const expectedComponent = (
      <div>
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardBody>
              <CardText>{comment.body}</CardText>
            </CardBody>
            <CardFooter>
              <AuthorCard
                author={comment.author}
                createdAt={new Date(comment.createdAt).toDateString()}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    );

    expect(component.contains(expectedComponent)).toEqual(true);
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
});
