import React from 'react';
import { Badge, Icon, Text } from '@barry127/bui';

const Demo = () => (
  <React.Fragment>
    <Text inline style={{ marginRight: '1em' }}>
      <Badge count={99}>
        <Icon icon="feather-mail" size="3em" />
      </Badge>
    </Text>
    <Text inline style={{ marginRight: '1em' }}>
      <Badge count={100}>
        <Icon icon="feather-mail" size="3em" />
      </Badge>
    </Text>
    <Text inline style={{ marginRight: '1em' }}>
      <Badge count={12} countOverflow={10}>
        <Icon icon="feather-mail" size="3em" />
      </Badge>
    </Text>
    <Text inline style={{ marginRight: '1em' }}>
      <Badge count={1000} countOverflow={999}>
        <Icon icon="feather-mail" size="3em" />
      </Badge>
    </Text>
  </React.Fragment>
);

export default Demo;
