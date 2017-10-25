/**
 *
 * Home
 *
 */

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Articles from 'containers/Articles';
import PopularTags from 'containers/PopularTags';

export class Home extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Container>
        <Row>
          <Col xs="8">
            <Articles {...this.props} />
          </Col>
          <Col xs="4">
            <PopularTags {...this.props} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
