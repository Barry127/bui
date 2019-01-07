import React, { Component } from 'react';
import { Alert, AlertGroup } from '@barry127/bui';

class Demo extends Component {
  state = {
    success: true,
    info: true,
    warning: true,
    danger: true
  };

  afterClose(alert) {
    this.setState({ [alert]: false });
  }

  render() {
    const { success, info, warning, danger } = this.state;
    return (
      <AlertGroup>
        {success && (
          <Alert type="success" afterClose={() => this.afterClose('success')}>
            Success Alert
          </Alert>
        )}
        {info && (
          <Alert type="info" afterClose={() => this.afterClose('info')}>
            Info Alert
          </Alert>
        )}
        {warning && (
          <Alert type="warning" afterClose={() => this.afterClose('warning')}>
            Warning Alert
          </Alert>
        )}
        {danger && (
          <Alert type="danger" afterClose={() => this.afterClose('danger')}>
            Danger Alert
          </Alert>
        )}
      </AlertGroup>
    );
  }
}

export default Demo;
