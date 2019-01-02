import React from 'react';
import p from 'prop-types';

import { Anchor } from '../components';

const renderList = list =>
  list.map(({ children, title, to }) => (
    <Anchor.Link key={to} to={to} title={title}>
      {children && renderList(children)}
    </Anchor.Link>
  ));

const A = ({ list }) => (
  <Anchor offsetTop={12} className="doc-anchor">
    {renderList(list)}
  </Anchor>
);

A.propTypes = { list: p.array };

export default A;
