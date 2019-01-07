import React from 'react';
import { Anchor } from '@barry127/bui';

const Demo = () => (
  <Anchor>
    <Anchor.Link to="#basic" title="Basic" />
    <Anchor.Link to="#nested" title="Nested">
      <Anchor.Link to="#nested-1" title="Nested Link 1" />
      <Anchor.Link to="#nested-2" title="Nested Link 2" />
    </Anchor.Link>
    <Anchor.Link to="#colors" title="Colors" />
  </Anchor>
);

export default Demo;
