import React, { Component } from 'react';
import p from 'prop-types';
import throttle from 'lodash/throttle';

/**
 * Affix makes an element stick to viewport.
 */
class Affix extends Component {
  state = {
    floating: false,
    originalHeight: 0,
    originalTop: 0
  };

  constructor() {
    super();

    this.scroll = throttle(this._scroll, 10);
  }

  componentDidMount() {
    const { top, height } = this.affix.getBoundingClientRect();
    this.setState(
      {
        originalHeight: height,
        originalTop: window.pageYOffset + top
      },
      this._scroll
    );
    window.addEventListener('scroll', this.scroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scroll);
  }

  _scroll = () => {
    const { originalTop } = this.state;
    const { offsetTop } = this.props;

    const scrollTop = window.pageYOffset;
    const floating = scrollTop - originalTop + offsetTop > 0;

    this.setState({ floating });
  };

  setRef = ref => {
    const { innerRef } = this.props;
    this.affix = ref;

    if (typeof innerRef === 'function') {
      innerRef(ref);
    }
  };

  render() {
    const { children, innerRef, offsetTop, ...props } = this.props;
    const { floating, originalHeight } = this.state;

    return (
      <div ref={this.setRef} {...props}>
        {floating && <div style={{ height: originalHeight }} />}
        <div
          style={
            floating
              ? {
                  top: offsetTop,
                  position: 'fixed',
                  zIndex: 10
                }
              : {}
          }
        >
          {children}
        </div>
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
