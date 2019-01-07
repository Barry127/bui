import React from 'react';
import getComponent from '../../../helpers/getComponent';

import { Alert, AlertGroup, Header, Text } from '../../../../components';

import Anchor from '../../../Anchor';
import PropsTable from '../PropsTable';
import Example from '../Example';
import Playground from '../Playground';

const component = getComponent('Alert');

const AlertDocs = () => (
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
      <p>The most basic usage of Alert.</p>
    </Example>
    <Example example={component.examples.types} title="Types">
      <p>Alerts can be styled in four different types.</p>
    </Example>
    <Example example={component.examples.title} title="Title">
      <p>Alerts can have a title.</p>
    </Example>
    <Example example={component.examples.closable} title="Closable">
      <p>
        Alerts with the <code>closable</code> prop set to <code>false</code>{' '}
        have no close button.
      </p>
    </Example>
    <Example example={component.examples.icon} title="Icon">
      <p>Alerts can be shown without an icon.</p>
    </Example>
    <Example example={component.examples.customIcon} title="Custom Icon">
      <p>Alerts can have a custom icon.</p>
    </Example>
    <Example example={component.examples.hooks} title="Hooks">
      <p>
        <code>onClose</code> and <code>afterClose</code> give the option to hook
        into events.
      </p>
      <p>
        The <code>onClose</code> will be called before closing and can be used
        to prevent the Alert from closing.
      </p>
      <p>
        The <code>afterClose</code> hook will be called when the closing
        animation is finished. Use this hook to unmount the component.
      </p>
    </Example>
    <Example example={component.examples.group} title="AlertGroup">
      <p>
        AlertGroups are used for app level Alerts at the top of the screen.
        Alerts inside an AlertGroup are alway closable and cannot have a title.
      </p>
      <Alert type="warning" title="Warning!" closable={false}>
        AlertGroup depends on its children to render correctly. Not unmounting
        an Alert child of AlertGroup in the <code>afterClose</code> hook will
        result in a corrupted layout!
      </Alert>
    </Example>
    <Header level={1} id="design">
      Design Guidelines
    </Header>
    <p>{component.description}</p>
    <Header level={2} id="main-types">
      Main Types
    </Header>
    <p>
      There are two main type of Alerts: <code>Alert</code> and{' '}
      <code>AlertGroup</code>.
    </p>
    <div className="doc-cols">
      <div>
        <Header level={4}>Alert</Header>

        <Alert>Your data has been saved.</Alert>
        <p>A standard alert is used in the context of a form or component.</p>
        <p>Place the message near the relevant item.</p>
      </div>
      <div>
        <Header level={4}>AlertGroup</Header>
        <AlertGroup>
          <Alert type="warning" icon="feather-shield-off">
            Virus protection has been turned off!
          </Alert>
        </AlertGroup>
        <p>
          An <code>AlertGroup</code> is used at the global context of an app.
          They should be placed at the top of the page.
        </p>
      </div>
    </div>
    <Header level={2} id="alert-types">
      Types
    </Header>
    <p>
      There are four types of alerts: <code>success</code>, <code>info</code>,{' '}
      <code>warning</code> and <code>danger</code>. Each one of them with their
      own use.
    </p>
    <div className="doc-cols">
      <div>
        <Header level={4}>Success</Header>
        <Alert type="success">Registration successful.</Alert>
        <p>
          Use success alerts for a result or success confirmation of an user
          action.
        </p>
      </div>
      <div>
        <Header level={4}>Info</Header>
        <Alert type="info">
          You can customize your settings on the settings page.
        </Alert>
        <p>
          Use info alerts to inform users or educate them about a feature. Info
          alerts should be dismissable and not be overused.
        </p>
      </div>
    </div>
    <div className="doc-cols">
      <div>
        <Header level={4}>Warning</Header>
        <Alert type="warning">This feature is still experimental.</Alert>
        <p>
          Use warning alerts to notify users about messages that may need their
          attention but might not cause errors.
        </p>
      </div>
      <div>
        <Header level={4}>danger</Header>
        <Alert type="danger">Login failed, invalid credentials.</Alert>
        <p>Use error alerts for errors, malfunctions and critical issues.</p>
      </div>
    </div>
    <div id="dodont" className="doc-cols dd">
      <div>
        <Header level={2} color="green700">
          Do
        </Header>
        <ul>
          <li>
            Place the alert near the relevant component in a unobtrusive
            location.
          </li>
          <li>
            Place the <code>AlertGroup</code> only at the top of the page.
          </li>
          <li>Keep the content text very brief and to the point.</li>
          <li>Use the right type of alert. (see Types)</li>
        </ul>
      </div>
      <div>
        <Header level={2} color="red700">
          Don{"'"}t
        </Header>
        <ul>
          <li>Don{"'"}t use long paragraphs inside an alert.</li>
          <li>
            Don{"'"}t overuse the number of alerts on a single page, they may
            lose significance.
          </li>
        </ul>
      </div>
    </div>
    <Playground
      Component={Alert}
      props={[
        {
          name: 'type',
          type: 'enum',
          value: 'success',
          options: ['success', 'info', 'warning', 'danger']
        },
        {
          name: 'children',
          type: 'text',
          value: 'Hello I am an Alert!'
        },
        {
          name: 'className',
          type: 'string',
          value: ''
        },
        {
          name: 'closable',
          type: 'boolean',
          value: true
        },
        {
          name: 'icon',
          type: 'string',
          value: 'feather-terminal'
        },
        {
          name: 'showIcon',
          type: 'boolean',
          value: true
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
            { to: '#types', title: 'Types' },
            { to: '#title', title: 'Title' },
            { to: '#closable', title: 'Closable' },
            { to: '#icon', title: 'icon' },
            { to: '#customIcon', title: 'Custom Icon' },
            { to: '#hooks', title: 'Hooks' },
            { to: '#group', title: 'AlertGroup' }
          ]
        },
        {
          to: '#design',
          title: 'Design Guidelines',
          children: [
            { to: '#main-types', title: 'Main Types' },
            { to: '#alert-types', title: 'Types' },
            { to: '#dodont', title: "Do's & Don'ts" }
          ]
        },
        { to: '#playground', title: 'Playground' }
      ]}
    />
  </Text>
);

export default AlertDocs;
