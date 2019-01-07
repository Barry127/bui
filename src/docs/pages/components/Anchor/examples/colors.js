import React from 'react';
import { Anchor } from '@barry127/bui';

const Demo = () => (
  <Anchor>
    <Anchor.Link color="red700" to="#basic" title="Basic (red)" />
    <Anchor.Link color="purple700" to="#nested" title="Nested (purple)" />
    <Anchor.Link color="green700" to="#colors" title="Colors (green)" />
  </Anchor>
);

export default Demo;
