import React from 'react';
import { storiesOf } from '@storybook/react';
import TaggedInput from '../app/components/TaggedInput';
import { Wrapper } from './utilities/styling';

storiesOf('TaggedInput', module)
  .add('default', () => (
    <Wrapper>
      <TaggedInput />
    </Wrapper>
  ))
  .add('with initialized values', () => (
    <Wrapper>
      <TaggedInput
        tags={['foo', 'bar', 'baz']}
      />
    </Wrapper>
  ));
