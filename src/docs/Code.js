import React from 'react';
import p from 'prop-types';
import { Prism as Highlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/styles/prism';

const Code = ({ children, language }) => (
  <Highlighter className="doc-code" language={language} style={okaidia}>
    {children}
  </Highlighter>
);

Code.propTypes = {
  children: p.string,
  language: p.string.isRequired
};

export default Code;
