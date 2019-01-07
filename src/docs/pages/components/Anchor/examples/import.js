import React from 'react';
import { Anchor, AnchorLink } from '@barry127/bui';

const Demo = () => (
  <Anchor>
    <AnchorLink to="#basic" title="Basic" />
    <AnchorLink to="#nested" title="Nested" />
    <AnchorLink to="#colors" title="Colors" />
  </Anchor>
);

export default Demo;
