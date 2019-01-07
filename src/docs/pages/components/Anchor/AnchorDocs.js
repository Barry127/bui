import React from 'react';
import getComponent from '../../../helpers/getComponent';

import { Alert, Header, Text } from '../../../../components';

import DocsAnchor from '../../../Anchor';
import PropsTable from '../PropsTable';
import Example from '../Example';

const component = getComponent('Anchor');

const AnchorDocs = () => (
  <Text>
    <Header id="component">{component.displayName}</Header>
    <p>{component.description}</p>
    <Header level={2} id="api">
      API
    </Header>
    <Header level={3} id="api-1">
      Anchor
    </Header>
    <PropsTable props={component.props} />
    <Header level={3} id="api-2">
      Anchor.Link
    </Header>
    <PropsTable props={anchorLinkProps} />
    <Header level={2} id="examples">
      Examples
    </Header>
    <p>
      The example Anchors are not placed in an Affix and will not stick in view.
    </p>
    <Example example={component.examples.basic} title="Basic">
      <p>The most basic usage of Anchor.</p>
    </Example>
    <Example example={component.examples.import} title="Import AnchorLink">
      <p>
        The Link can also be directly imported as <code>AnchorLink</code>. The
        example from above with the import.
      </p>
    </Example>
    <Example example={component.examples.nested} title="Nested">
      <p>Anchor Links can be nested to show hierarchy.</p>
    </Example>
    <Example example={component.examples.colors} title="Colors">
      <p>Anchor Links can be styled in different colors.</p>
    </Example>
    <Header level={1} id="design">
      Design Guidelines
    </Header>
    <p>
      Anchors should be used as a table of content for pages with a lot of text.
    </p>
    <div id="dodont" className="doc-cols dd">
      <div>
        <Header level={2} color="green700">
          Do
        </Header>
        <ul>
          <li>Use Anchor on a page with a lot of text.</li>
          <li>
            Place the Anchor fixed on the page or in an <code>Affix</code>
          </li>
        </ul>
      </div>
      <div>
        <Header level={2} color="red700">
          Don{"'"}t
        </Header>
        <ul>
          <li>Don{"'"}t place more than one Anchor per page.</li>
          <li>
            Don{"'"}t use the Anchor in a (overflow) container, this is
            currently not supported.
          </li>
        </ul>
      </div>
    </div>
    <Header id="playground">Playground</Header>
    <Alert type="info" closable={false}>
      Anchor is currently not supported in frames or containers
    </Alert>
    <DocsAnchor
      list={[
        { to: '#component', title: component.displayName },
        {
          to: '#api',
          title: 'API',
          children: [
            { to: '#api-1', title: 'Anchor' },
            { to: '#api-2', title: 'Anchor.Link' }
          ]
        },
        {
          to: '#examples',
          title: 'Examples',
          children: [
            { to: '#basic', title: 'Basic' },
            { to: '#import', title: 'Import AnchorLink' },
            { to: '#nested', title: 'Nested links' },
            { to: '#colors', title: 'Colors' }
          ]
        },
        {
          to: '#design',
          title: 'Design Guidelines',
          children: [{ to: '#dodont', title: "Do's & Don'ts" }]
        },
        { to: '#playground', title: 'Playground' }
      ]}
    />
  </Text>
);

const anchorLinkProps = {
  children: {
    description: 'Anchor Links',
    required: false,
    type: { name: 'node' }
  },
  className: {
    description: 'Classname for the AnchorLink',
    required: false,
    type: { name: 'string' }
  },
  color: {
    defaultValue: { value: 'link', computed: false },
    description: 'Color for active element',
    type: {
      name: 'enum',
      value: [
        { value: 'black', computed: false },
        { value: 'white', computed: false },
        { value: 'inherit', computed: false },
        { value: 'link', computed: false },
        { value: 'red', computed: false },
        { value: 'red50', computed: false },
        { value: 'red100', computed: false },
        { value: 'red200', computed: false },
        { value: 'red300', computed: false },
        { value: 'red400', computed: false },
        { value: 'red500', computed: false },
        { value: 'red600', computed: false },
        { value: 'red700', computed: false },
        { value: 'red800', computed: false },
        { value: 'red900', computed: false },
        { value: 'pink', computed: false },
        { value: 'pink50', computed: false },
        { value: 'pink100', computed: false },
        { value: 'pink200', computed: false },
        { value: 'pink300', computed: false },
        { value: 'pink400', computed: false },
        { value: 'pink500', computed: false },
        { value: 'pink600', computed: false },
        { value: 'pink700', computed: false },
        { value: 'pink800', computed: false },
        { value: 'pink900', computed: false },
        { value: 'purple', computed: false },
        { value: 'purple50', computed: false },
        { value: 'purple100', computed: false },
        { value: 'purple200', computed: false },
        { value: 'purple300', computed: false },
        { value: 'purple400', computed: false },
        { value: 'purple500', computed: false },
        { value: 'purple600', computed: false },
        { value: 'purple700', computed: false },
        { value: 'purple800', computed: false },
        { value: 'purple900', computed: false },
        { value: 'marine', computed: false },
        { value: 'marine50', computed: false },
        { value: 'marine100', computed: false },
        { value: 'marine200', computed: false },
        { value: 'marine300', computed: false },
        { value: 'marine400', computed: false },
        { value: 'marine500', computed: false },
        { value: 'marine600', computed: false },
        { value: 'marine700', computed: false },
        { value: 'marine800', computed: false },
        { value: 'marine900', computed: false },
        { value: 'blue', computed: false },
        { value: 'blue50', computed: false },
        { value: 'blue100', computed: false },
        { value: 'blue200', computed: false },
        { value: 'blue300', computed: false },
        { value: 'blue400', computed: false },
        { value: 'blue500', computed: false },
        { value: 'blue600', computed: false },
        { value: 'blue700', computed: false },
        { value: 'blue800', computed: false },
        { value: 'blue900', computed: false },
        { value: 'cyan', computed: false },
        { value: 'cyan50', computed: false },
        { value: 'cyan100', computed: false },
        { value: 'cyan200', computed: false },
        { value: 'cyan300', computed: false },
        { value: 'cyan400', computed: false },
        { value: 'cyan500', computed: false },
        { value: 'cyan600', computed: false },
        { value: 'cyan700', computed: false },
        { value: 'cyan800', computed: false },
        { value: 'cyan900', computed: false },
        { value: 'teal', computed: false },
        { value: 'teal50', computed: false },
        { value: 'teal100', computed: false },
        { value: 'teal200', computed: false },
        { value: 'teal300', computed: false },
        { value: 'teal400', computed: false },
        { value: 'teal500', computed: false },
        { value: 'teal600', computed: false },
        { value: 'teal700', computed: false },
        { value: 'teal800', computed: false },
        { value: 'teal900', computed: false },
        { value: 'green', computed: false },
        { value: 'green50', computed: false },
        { value: 'green100', computed: false },
        { value: 'green200', computed: false },
        { value: 'green300', computed: false },
        { value: 'green400', computed: false },
        { value: 'green500', computed: false },
        { value: 'green600', computed: false },
        { value: 'green700', computed: false },
        { value: 'green800', computed: false },
        { value: 'green900', computed: false },
        { value: 'yellow', computed: false },
        { value: 'yellow50', computed: false },
        { value: 'yellow100', computed: false },
        { value: 'yellow200', computed: false },
        { value: 'yellow300', computed: false },
        { value: 'yellow400', computed: false },
        { value: 'yellow500', computed: false },
        { value: 'yellow600', computed: false },
        { value: 'yellow700', computed: false },
        { value: 'yellow800', computed: false },
        { value: 'yellow900', computed: false },
        { value: 'orange', computed: false },
        { value: 'orange50', computed: false },
        { value: 'orange100', computed: false },
        { value: 'orange200', computed: false },
        { value: 'orange300', computed: false },
        { value: 'orange400', computed: false },
        { value: 'orange500', computed: false },
        { value: 'orange600', computed: false },
        { value: 'orange700', computed: false },
        { value: 'orange800', computed: false },
        { value: 'orange900', computed: false },
        { value: 'darkorange', computed: false },
        { value: 'darkorange50', computed: false },
        { value: 'darkorange100', computed: false },
        { value: 'darkorange200', computed: false },
        { value: 'darkorange300', computed: false },
        { value: 'darkorange400', computed: false },
        { value: 'darkorange500', computed: false },
        { value: 'darkorange600', computed: false },
        { value: 'darkorange700', computed: false },
        { value: 'darkorange800', computed: false },
        { value: 'darkorange900', computed: false },
        { value: 'warmgrey', computed: false },
        { value: 'warmgrey50', computed: false },
        { value: 'warmgrey100', computed: false },
        { value: 'warmgrey200', computed: false },
        { value: 'warmgrey300', computed: false },
        { value: 'warmgrey400', computed: false },
        { value: 'warmgrey500', computed: false },
        { value: 'warmgrey600', computed: false },
        { value: 'warmgrey700', computed: false },
        { value: 'warmgrey800', computed: false },
        { value: 'warmgrey900', computed: false },
        { value: 'grey', computed: false },
        { value: 'grey50', computed: false },
        { value: 'grey100', computed: false },
        { value: 'grey200', computed: false },
        { value: 'grey300', computed: false },
        { value: 'grey400', computed: false },
        { value: 'grey500', computed: false },
        { value: 'grey600', computed: false },
        { value: 'grey700', computed: false },
        { value: 'grey800', computed: false },
        { value: 'grey900', computed: false },
        { value: 'coolgray', computed: false },
        { value: 'coolgray50', computed: false },
        { value: 'coolgray100', computed: false },
        { value: 'coolgray200', computed: false },
        { value: 'coolgray300', computed: false },
        { value: 'coolgray400', computed: false },
        { value: 'coolgray500', computed: false },
        { value: 'coolgray600', computed: false },
        { value: 'coolgray700', computed: false },
        { value: 'coolgray800', computed: false },
        { value: 'coolgray900', computed: false }
      ]
    }
  },
  title: {
    description: 'Link title',
    required: true,
    type: { name: 'string' }
  },
  to: {
    description: 'Target',
    required: true,
    type: { name: 'string' }
  }
};

export default AnchorDocs;
