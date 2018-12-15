import React, { Component } from 'react';
import p from 'prop-types';
import cx from 'classnames';

import styles from './Spinner.module.scss';

import Circle from './Circle';
import Dots from './Dots';

import Text from '../Text';

/**
 * A spinner is visual indicator of an ongoing, user-initiated process.
 */
class Spinner extends Component {
  state = {
    spinning: true
  };

  componentDidUpdate() {
    const { delay, spinning } = this.props;

    if (delay && delay > 0 && spinning && !this.state.spinning) {
      this.timer = setTimeout(() => this.setState({ spinning: true }), delay);
    }

    if (!spinning) {
      clearTimeout(this.timer);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  static getDerivedStateFromProps(props, state) {
    if (state.spinning && !props.spinning) {
      return { spinning: false };
    }

    if (!state.spinning && !props.delay && props.spinning) {
      return { spinning: true };
    }

    return null;
  }

  spinner(classes, type, props, tip) {
    return (
      <div className={classes} {...props}>
        {type === 'circle' && <Circle />}
        {type === 'dots' && <Dots />}
        {tip && (
          <Text weight="medium" role="alert" aria-busy="true">
            {tip}
          </Text>
        )}
      </div>
    );
  }

  render() {
    const {
      children,
      className,
      color,
      delay,
      size,
      spinning,
      tip,
      type,
      ...props
    } = this.props;

    const classes = cx(
      styles.spinner,
      styles[color],
      styles[size],
      styles[type],
      'bui-Spinner',
      className
    );

    return children ? (
      <div
        className={cx(styles.container, {
          [styles.spinning]: this.state.spinning
        })}
      >
        <div className={styles.content}>{children}</div>
        {this.spinner(classes, type, props, tip)}
      </div>
    ) : (
      spinning && this.spinner(classes, type, props)
    );
  }

  static propTypes = {
    /** Spinner content */
    children: p.node,
    /** Classname for the Progress component */
    className: p.string,
    /** Spinner color variant */
    color: p.oneOf(['primary', 'success', 'info', 'warning', 'danger']),
    /** Delay in ms for spinning state */
    delay: p.number,
    /** Spinner size */
    size: p.oneOf(['sm', 'md', 'lg']),
    /** Wether Spinner is spinning */
    spinning: p.bool,
    /** Description over content when Spinner has children */
    tip: p.string,
    /** Type of Spinner */
    type: p.oneOf(['circle', 'dots'])
  };

  static defaultProps = {
    color: 'primary',
    size: 'md',
    spinning: true,
    type: 'circle'
  };
}

export default Spinner;
