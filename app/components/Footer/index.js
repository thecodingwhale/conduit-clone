/**
*
* Footer
*
*/

import React from 'react';
import { Container } from 'reactstrap';
import Wrapper from './Wrapper';

function Footer() {
  return (
    <Wrapper>
      <Container>
        You can check the repo project details here: <a href="https://github.com/thecodingwhale/conduit-clone" target="_blank">https://github.com/thecodingwhale/conduit-clone</a>
      </Container>
    </Wrapper>
  );
}

export default Footer;
