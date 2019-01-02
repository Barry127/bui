import React from 'react';
import getComponent from '../../../helpers/getComponent';

import { Alert, Header, Text } from '../../../../components';

import Anchor from '../../../Anchor';
import PropsTable from '../PropsTable';
import Example from '../Example';

const component = getComponent('Affix');

console.log(component.examples);

const AffixDocs = () => (
  <Text>
    <Header id="component">{component.displayName}</Header>
    <p>{component.description}</p>
    <Header level={2} id="api">
      API
    </Header>
    <PropsTable props={component.props} />
    <Header level={2} id="examples">
      Examples
    </Header>
    <Example example={component.examples.basic} title="Basic">
      <p>A basic Affix sticks to the top.</p>
    </Example>
    <Example example={component.examples.offset} title="Offset">
      <p>An offset from the top can be specified.</p>
    </Example>
    <Header level={1} id="design">
      Design Guidelines
    </Header>
    <p>
      When scrolling a long page, some content may need to stick to the
      viewport. Affix can be used mostly for menus and actions.
    </p>
    <p>Affix should be used sparsely and not cover content on the page.</p>
    <Header id="playground">Playground</Header>
    <Alert type="info" closable={false}>
      Affix is currently not supported in frames or containers
    </Alert>
    <Anchor
      list={[
        { to: '#component', title: component.displayName },
        { to: '#api', title: 'API' },
        {
          to: '#examples',
          title: 'Examples',
          children: [
            { to: '#basic', title: 'Basic' },
            { to: '#offset', title: 'Offset' }
          ]
        },
        { to: '#design', title: 'Design Guidelines' },
        { to: '#playground', title: 'Playground' }
      ]}
    />
  </Text>
);

export default AffixDocs;
