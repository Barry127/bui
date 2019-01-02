import React from 'react';

import { Text, Header } from '../../../components';
import Anchor from '../../Anchor';
import Code from '../../Code';

const GettingStarted = () => (
  <Text>
    <Header id="gettingStarted">Getting Started</Header>
    <p>
      To get started using BUI in your React App just add @barry127/bui to your
      dependencies.
    </p>
    <Header level={2} id="installation">
      Installation
    </Header>
    <p>Install BUI with yarn or npm:</p>
    <Code language="bash">{`$ yarn add @barry127/bui`}</Code>
    <Code language="bash">{`$ npm install -s @barry127/bui`}</Code>

    <p>In your project import the Components as needed:</p>
    <Code language="jsx">{`import { Button, TextInput } from '@barry127/bui'`}</Code>

    <Anchor
      list={[
        { to: '#gettingStarted', title: 'Getting Started' },
        { to: '#installation', title: 'Installation' }
      ]}
    />
  </Text>
);

export default GettingStarted;
