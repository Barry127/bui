import React from 'react';
import p from 'prop-types';
import cx from 'classnames';
import { Spring, config } from 'react-spring';

import styles from './Progress.module.scss';
import { getAriaProps, getPercentage } from './helpers';

import Text from '../Text';

export const CIRCUMFERENCE = Math.PI * 90;
export const BARSIZE = 0.75 * CIRCUMFERENCE;

/**
 * A progress dash is a linear indicator for providing feedback about an ongoing, user-initiated process.
 */
const ProgressDash = ({
  active, // strip active prop
  children,
  className,
  color,
  indeterminate, // strip indeterminate prop
  max,
  min,
  size,
  style,
  value,
  width,
  ...props
}) => {
  const classes = cx(
    styles.progress,
    styles.dash,
    styles[color],
    'bui-Progress',
    'bui-ProgressDash',
    className
  );

  const ariaProps = getAriaProps({ indeterminate: false, max, min, value });

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
          strokeDasharray={`${BARSIZE}px ${0.25 * CIRCUMFERENCE}px `}
          style={{
            strokeDashoffset: `${CIRCUMFERENCE * 0.375}`
          }}
        />
        <Spring
          from={{ dash: 0 }}
          to={{ dash: (getPercentage(value, min, max) / 100) * BARSIZE }}
          config={config.molasses}
        >
          {({ dash }) => (
            <path
              className={styles.bar}
              d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
              strokeWidth={width}
              strokeDasharray={`${dash}px ${CIRCUMFERENCE - dash}px`}
              style={{
                opacity: dash === 0 ? 0 : 1,
                strokeDashoffset: `${CIRCUMFERENCE * 0.375}`
              }}
            />
          )}
        </Spring>
      </svg>
      <Text className={styles.content}>{children}</Text>
    </div>
  );
};

ProgressDash.propTypes = {
  /** ProgressCircle (text) content */
  children: p.node,
  /** Classname for the ProgressCircle component */
  className: p.string,
  /** ProgressCircle color variant */
  color: p.oneOf(['primary', 'success', 'info', 'warning', 'danger']),
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

ProgressDash.defaultProps = {
  active: false,
  color: 'primary',
  max: 100,
  min: 0,
  size: 128,
  value: 0,
  width: 6
};

export default ProgressDash;
