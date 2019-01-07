import React, { Component } from 'react';
import { Alert } from '@barry127/bui';

class Demo extends Component {
  state = {
    showSuccess: true,
    showWarning: true
  };

  onCloseSuccess = () => {
    console.log('onCloseSuccess');
  };

  afterCloseSuccess = () => {
    alert('afterCloseSuccess');
    this.setState({ showSuccess: false });
  };

  onCloseWarning = ev => {
    ev.preventDefault();
    alert('Warning will not be closed. Event is prevented');
  };

  afterCloseWarning = () => {
    alert('This message will never appear');
    this.setState({ showWarning: false });
  };

  render() {
    const { showSuccess, showWarning } = this.state;

    return (
      <React.Fragment>
        {showSuccess && (
          <Alert
            type="success"
            onClose={this.onCloseSuccess}
            afterClose={this.afterCloseSuccess}
          >
            Success Alert with hooks
          </Alert>
        )}
        {showWarning && (
          <Alert
            type="warning"
            onClose={this.onCloseWarning}
            afterClose={this.afterCloseWarning}
          >
            Warning Alert with a hook that prevent closing
          </Alert>
        )}
      </React.Fragment>
    );
  }
}

export default Demo;
