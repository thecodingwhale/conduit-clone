import React from 'react';
import { shallow } from 'enzyme';
import { Container } from 'reactstrap';
import Wrapper from '../Wrapper';
import Footer from '../index';

describe('<Footer />', () => {
  it('should match the expected footer', () => {
    const renderedComponent = shallow(<Footer />);
    const expectedComponent = (
      <Wrapper>
        <Container>
          You can check the repo project details here: <a href="https://github.com/thecodingwhale/conduit-clone" target="_blank">https://github.com/thecodingwhale/conduit-clone</a>
        </Container>
      </Wrapper>
    );
    expect(renderedComponent.contains(expectedComponent)).toEqual(true);
  });
});
