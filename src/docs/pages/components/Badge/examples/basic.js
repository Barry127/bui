import React, { Component } from 'react';
import { Badge, Icon, ButtonGroup, Button } from '@barry127/bui';

class Demo extends Component {
  state = {
    count: 5
  };

  updateCount(n) {
    this.setState(({ count }) => ({ count: count + n }));
  }

  render() {
    const { count } = this.state;

    return (
      <React.Fragment>
        <Badge count={count}>
          <Icon icon="feather-mail" size="3em" />
        </Badge>
        <div style={{ display: 'inline-block', width: 24 }} />
        <ButtonGroup size="sm">
          <Button
            icon
            outline
            color="primary"
            onClick={() => this.updateCount(-1)}
          >
            -
          </Button>
          <Button
            icon
            outline
            color="primary"
            onClick={() => this.updateCount(1)}
          >
            +
          </Button>
        </ButtonGroup>
      </React.Fragment>
    );
  }
}

export default Demo;
