import React from 'react';
import getComponent from '../../../helpers/getComponent';

import { Badge, Icon, Header, Text } from '../../../../components';

import Anchor from '../../../Anchor';
import PropsTable from '../PropsTable';
import Example from '../Example';
import Playground from '../Playground';

const component = getComponent('Badge');

component.props.title.defaultValue = { value: 'count', computed: false };

const BadgeDocs = () => (
  <Text>
    <Header id="component">{component.displayName}</Header>
    <p>{component.description}</p>
    <Header level={2} id="api">
      API
    </Header>
    <PropsTable props={component.props} />
    <Example example={component.examples.basic} title="Basic">
      <p>Basic usage of a Badge on a component.</p>
    </Example>
    <Example example={component.examples.inline} title="Inline Badge">
      <p>Badges can be used inline.</p>
    </Example>
    <Example example={component.examples.overflow} title="Count Overflow">
      <p>
        <code>countOverflow</code>+ is displayed when <code>count</code> is
        greater than <code>countOverflow</code>.
      </p>
    </Example>
    <Example example={component.examples.colors} title="Colors">
      <p>Badges can be styled in different colors.</p>
    </Example>
    <Example example={component.examples.zero} title="Show Zero">
      <p>
        Badges hide when <code>count</code> is <code>0</code> unless{' '}
        <code>showZero</code> is set to <code>true</code>.
      </p>
    </Example>
    <Header level={1} id="design">
      Design Guidelines
    </Header>
    <p>{component.description}</p>
    <div id="dodont" className="doc-cols dd">
      <div>
        <Header level={2} color="green700">
          Do
        </Header>
        <ul>
          <li>
            Use <code>countOverflow</code> to prevent too large numbers inside
            badges.
          </li>
        </ul>
      </div>
      <div>
        <Header level={2} color="red700">
          Don{"'"}t
        </Header>
        <ul>
          <li>Don{"'"}t use too many badges per page.</li>
          <li>
            Don{"'"}t use inline badges when the badge can be placed over a
            component (e.g. Icon)
          </li>
        </ul>
      </div>
    </div>
    <Playground
      Component={Badge}
      content={<Icon icon="feather-mail" size="3em" />}
      props={[
        {
          name: 'className',
          type: 'string',
          value: ''
        },
        {
          name: 'color',
          type: 'enum',
          value: 'default',
          options: ['default', 'success', 'warning', 'danger', 'info']
        },
        {
          name: 'count',
          type: 'number',
          value: 5
        },
        {
          name: 'countOverflow',
          type: 'number',
          value: 99
        },
        {
          name: 'showZero',
          type: 'boolean',
          value: false
        },
        {
          name: 'title',
          type: 'string',
          value: ''
        }
      ]}
    />
    <Anchor
      list={[
        { to: '#component', title: component.displayName },
        { to: '#api', title: 'API' },
        {
          to: '#examples',
          title: 'Examples',
          children: [
            { to: '#basic', title: 'Basic' },
            { to: '#inline', title: 'Inline Badge' },
            { to: '#overflow', title: 'Count Overflow' },
            { to: '#colors', title: 'Colors' },
            { to: '#zero', title: 'Show Zero' }
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

export default BadgeDocs;
