import React from 'react';
import { shallow } from 'enzyme';
import { Alert, Card, CardBody, CardFooter, CardText } from 'reactstrap';
import Loader from 'components/Loader';
import AuthorCard from 'components/AuthorCard';
import { Comments, CardWrapper } from '../Comments';
import { fixture } from './sampleData';

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

  it('should display an alert message if there comments throws an error', () => {
    const component = shallow(<Comments error fetching={false} comment={[]} />);
    const expectedComponent = (
      <div>
        <Alert color="danger">
          Something Went Wrong
        </Alert>
      </div>
    );
    expect(component.contains(expectedComponent)).toEqual(true);
  });

  it('should display a comments', () => {
    const component = shallow(
      <Comments
        fetching={false}
        comments={fixture.comments}
      />
    );
    const expectedComponent = (
      <div>
        {fixture.comments.map((comment) => (
          <CardWrapper key={comment.id}>
            <Card>
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
          </CardWrapper>
        ))}
      </div>
    );
    expect(component.contains(expectedComponent)).toEqual(true);
  });
});
