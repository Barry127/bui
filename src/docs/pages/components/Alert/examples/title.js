import React from 'react';
import { Alert } from '@barry127/bui';

const Demo = () => (
  <React.Fragment>
    <Alert type="success" title="Success Title">
      Success message content
    </Alert>
    <Alert type="info" title="Info Title">
      Info message content
    </Alert>
    <Alert type="warning" title="Warning Title">
      Warning message content
    </Alert>
    <Alert type="danger" title="Danger Title">
      Danger message content
    </Alert>
  </React.Fragment>
);

export default Demo;
