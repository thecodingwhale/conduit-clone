import React from 'react';
import { shallow, mount } from 'enzyme';
import { Alert, Card, CardBody, CardFooter, CardText } from 'reactstrap';
import Loader from 'components/Loader';
import { Comments, CardWrapper, AuthorCardStyled } from '../Comments';
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
                <AuthorCardStyled
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

  it('should match the expected number of delete buttons', () => {
    const component = mount(
      <Comments
        fetching={false}
        comments={fixture.comments}
        enableAuthorToDelete={fixture.author.username}
      />
    );
    const button = component.find('button[name="delete-comment"]');
    expect(button.length).toEqual(2);

    expect(button.at(0).text()).toEqual('Delete');
    component.setProps({
      deleting: true,
    });
    expect(button.at(0).text()).toEqual('Deleting...');
  });

  it('should call this.props.deleteComment when a delete button is pressed', () => {
    const deleteCommentSpy = jest.fn();
    const component = mount(
      <Comments
        fetching={false}
        comments={fixture.comments}
        enableAuthorToDelete={fixture.author.username}
        deleteComment={deleteCommentSpy}
      />
    );
    const index = 1;
    const button = component.find('button[name="delete-comment"]');
    expect(button.length).toEqual(2);

    button.at(index).simulate('click');
    expect(deleteCommentSpy).toHaveBeenCalled();
    expect(deleteCommentSpy).toHaveBeenCalledWith(fixture.comments[index].id);
  });
});
