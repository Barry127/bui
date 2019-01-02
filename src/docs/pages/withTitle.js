import React, { Component } from 'react';

export default (title, Child) =>
  class Title extends Component {
    componentDidMount() {
      if (title.length === 0) {
        document.title = 'BUI';
      } else {
        document.title = `BUI - ${title}`;
      }
    }

    render() {
      return <Child {...this.props} />;
    }
  };
