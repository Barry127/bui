import React from 'react';
import { Alert } from '@barry127/bui';

const Demo = () => (
  <React.Fragment>
    <Alert type="success">This Alert is closable</Alert>
    <Alert type="info" closable={false} title="Not closable">
      This Alert has no close button.
    </Alert>
  </React.Fragment>
);

export default Demo;
