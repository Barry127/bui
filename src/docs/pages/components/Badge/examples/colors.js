import React from 'react';
import { Badge, Icon, Text } from '@barry127/bui';

const Demo = () => (
  <React.Fragment>
    <Text inline style={{ marginRight: '1em' }}>
      <Badge count={10} color="default">
        <Icon icon="feather-mail" size="3em" />
      </Badge>
    </Text>
    <Text inline style={{ marginRight: '1em' }}>
      <Badge count={10} color="success">
        <Icon icon="feather-mail" size="3em" />
      </Badge>
    </Text>
    <Text inline style={{ marginRight: '1em' }}>
      <Badge count={10} color="warning">
        <Icon icon="feather-mail" size="3em" />
      </Badge>
    </Text>
    <Text inline style={{ marginRight: '1em' }}>
      <Badge count={10} color="danger">
        <Icon icon="feather-mail" size="3em" />
      </Badge>
    </Text>
    <Text inline style={{ marginRight: '1em' }}>
      <Badge count={10} color="info">
        <Icon icon="feather-mail" size="3em" />
      </Badge>
    </Text>
  </React.Fragment>
);

export default Demo;
