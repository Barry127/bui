import React from 'react';
import { Alert } from '@barry127/bui';

const Demo = () => (
  <React.Fragment>
    <Alert>This Alert has an icon</Alert>
    <Alert showIcon={false}>This Alert has no icon</Alert>
  </React.Fragment>
);

export default Demo;
