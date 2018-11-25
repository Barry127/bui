import React, { Component } from 'react';
import p from 'prop-types';
import throttle from 'lodash/throttle';

/**
 * Affix makes an element stick to viewport.
 */
class Affix extends Component {
  state = {
    originalTop: 0,
    scrollTop: 0
  };

  constructor() {
    super();

    this.scroll = throttle(this._scroll, 10);
  }

  componentDidMount() {
    const { top } = this.affix.getBoundingClientRect();
    this.setState({
      orignalTop: window.pageYOffset + top
    });
    window.addEventListener('scroll', this.scroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scroll);
  }

  _scroll = () => {
    const scrollTop = window.pageYOffset;
    this.setState({ scrollTop });
  };

  setRef = ref => {
    const { innerRef } = this.props;
    this.affix = ref;

    if (typeof innerRef === 'function') {
      innerRef(ref);
    }
  };

  render() {
    const { children, innerRef, offsetTop, style, ...props } = this.props;
    const { orignalTop, scrollTop } = this.state;

    const translate = Math.max(0, scrollTop - orignalTop + offsetTop);

    const styles = {
      verticalAlign: 'middle',
      display: 'inline-block',
      position: 'relative',
      transform: `translateY(${translate}px)`
    };

    if (translate > 0) {
      styles.zIndex = 10;
    }

    return (
      <div ref={this.setRef} style={{ ...style, ...styles }} {...props}>
        {children}
      </div>
    );
  }

  static propTypes = {
    /** Content to stick */
    children: p.node,
    /** Offset from top when sticky */
    offsetTop: p.number
  };

  static defaultProps = {
    offsetTop: 12
  };
}

export default Affix;
