import React, { Component } from 'react';
import p from 'prop-types';
import cx from 'classnames';
import { Spring, config } from 'react-spring';

import styles from './Progress.module.scss';
import { getAriaProps, getPercentage } from './helpers';

import Text from '../Text';

export const CIRCUMFERENCE = Math.PI * 90;

/**
 * A progress circle is a linear indicator for providing feedback about an ongoing, user-initiated process.
 */
class ProgressCircle extends Component {
  state = {
    indeterminateLarge: false
  };

  componentDidMount() {
    const { indeterminate } = this.props;

    if (indeterminate) this.nextIndeterminateLarge();
  }

  nextIndeterminateLarge = () => {
    const { indeterminateLarge } = this.state;
    const { indeterminate } = this.props;

    const INTERVAL = 5000;

    this.setState({ indeterminateLarge: !indeterminateLarge }, () => {
      if (indeterminate) {
        this.timeout = setTimeout(this.nextIndeterminateLarge, INTERVAL);
      }
    });
  };

  componentDidUpdate(prevProps) {
    const { indeterminate } = this.props;

    if (prevProps.indeterminate !== indeterminate && indeterminate) {
      this.nextIndeterminateLarge();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const {
      active, // strip active prop
      children,
      className,
      color,
      indeterminate,
      max,
      min,
      size,
      style,
      value,
      width,
      ...props
    } = this.props;

    const { indeterminateLarge } = this.state;

    const classes = cx(
      styles.progress,
      styles.circle,
      styles[color],
      {
        [styles.indeterminate]: indeterminate
      },
      'bui-Progress',
      'bui-ProgressCircle',
      className
    );

    const ariaProps = getAriaProps({ indeterminate, max, min, value });

    return (
      <div className={classes}>
        <svg
          {...props}
          viewBox="0 0 100 100"
          className={styles.ring}
          {...ariaProps}
          style={{
            height: size,
            width: size,
            ...(style || {})
          }}
        >
          <path
            className={styles.track}
            d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
            strokeWidth={width}
          />
          <Spring
            from={{ dash: 0, indeterminateDash: 0 }}
            to={{
              dash: (getPercentage(value, min, max) / 100) * CIRCUMFERENCE,
              indeterminateDash: indeterminateLarge
                ? 0.8 * CIRCUMFERENCE
                : 0.2 * CIRCUMFERENCE
            }}
            config={
              indeterminate
                ? indeterminateLarge
                  ? { duration: 5000 }
                  : { duration: 5000 }
                : config.molasses
            }
          >
            {({ dash, indeterminateDash }) => {
              return (
                <path
                  className={styles.bar}
                  d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
                  strokeWidth={width}
                  strokeDasharray={`${
                    indeterminate ? indeterminateDash : dash
                  }px ${CIRCUMFERENCE}px`}
                  style={{ opacity: dash === 0 ? 0 : 1 }}
                />
              );
            }}
          </Spring>
        </svg>
        <Text className={styles.content}>{children}</Text>
      </div>
    );
  }

  static propTypes = {
    /** ProgressCircle (text) content */
    children: p.node,
    /** Classname for the ProgressCircle component */
    className: p.string,
    /** ProgressCircle color variant */
    color: p.oneOf(['primary', 'success', 'info', 'warning', 'danger']),
    /** Is the progress indeterminate (overwrites value) */
    indeterminate: p.bool,
    /** Maximum value */
    max: p.number,
    /** Minimum value */
    min: p.number,
    /** Size of circle */
    size: p.oneOfType([p.string, p.number]),
    /** Current value */
    value: p.number,
    /** Width of stroke */
    width: p.number
  };

  static defaultProps = {
    color: 'primary',
    indeterminate: false,
    max: 100,
    min: 0,
    size: 128,
    value: 0,
    width: 6
  };
}

export default ProgressCircle;
