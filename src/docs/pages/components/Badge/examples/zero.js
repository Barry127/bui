import React from 'react';
import { Badge, Icon, Text } from '@barry127/bui';

const Demo = () => (
  <React.Fragment>
    <Text inline style={{ marginRight: '1em' }}>
      <Badge count={0}>
        <Icon icon="feather-mail" size="3em" />
      </Badge>
    </Text>
    <Text inline style={{ marginRight: '1em' }}>
      <Badge count={0} showZero>
        <Icon icon="feather-mail" size="3em" />
      </Badge>
    </Text>
  </React.Fragment>
);

export default Demo;
