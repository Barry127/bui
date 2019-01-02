import React from 'react';
import p from 'prop-types';

import { Header } from '../../../components';

import Code from '../../Code';

const Example = ({ children, example, title }) => {
  const Demo = require(`./${example.component}/examples/${example.file}`)
    .default;

  return (
    <React.Fragment>
      <Header level={3} id={example.name}>
        {title}
      </Header>
      {children}
      <Demo />
      <Code language="jsx">{example.code}</Code>
    </React.Fragment>
  );
};

Example.propTypes = {
  children: p.node,
  example: p.object.isRequired,
  title: p.string.isRequired
};

export default Example;
