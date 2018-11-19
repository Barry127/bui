import React from 'react';
import p from 'prop-types';
import cx from 'classnames';
import { Spring, config } from 'react-spring';

import styles from './Progress.module.scss';
import { getAriaProps, getPercentage } from './helpers';

import Text from '../Text';

/**
 * A progress bar is a linear indicator for providing feedback about an ongoing, user-initiated process.
 */
const ProgressBar = ({
  active,
  children,
  className,
  color,
  indeterminate,
  max,
  min,
  style,
  value,
  width,
  ...props
}) => {
  const classes = cx(
    styles.progress,
    styles.bar,
    styles[color],
    {
      [styles.active]: active && !indeterminate,
      [styles.indeterminate]: indeterminate
    },
    'bui-Progress',
    'bui-ProgressBar',
    className
  );

  const ariaProps = getAriaProps({ indeterminate, max, min, value });

  return (
    <div className={classes}>
      <div
        {...props}
        className={styles.outer}
        {...ariaProps}
        style={{
          height: width,
          borderRadius: width / 2,
          ...(style || {})
        }}
      >
        <Spring
          from={{ x: 0 }}
          to={{ x: getPercentage(value, min, max) }}
          config={config.molasses}
        >
          {({ x }) => (
            <div
              className={styles.inner}
              style={
                indeterminate
                  ? {}
                  : {
                      transform: `scaleX(${x / 100})`
                    }
              }
            />
          )}
        </Spring>
      </div>
      {children && <Text className={styles.content}>{children}</Text>}
    </div>
  );
};

ProgressBar.propTypes = {
  /** Is the progress animated */
  active: p.bool,
  /** ProgressBar (text) content */
  children: p.node,
  /** Classname for the ProgressBar component */
  className: p.string,
  /** ProgressBar color variant */
  color: p.oneOf(['primary', 'success', 'info', 'warning', 'danger']),
  /** Is the progress indeterminate (overwrites value) */
  indeterminate: p.bool,
  /** Maximum value */
  max: p.number,
  /** Minimum value */
  min: p.number,
  /** Current value */
  value: p.number,
  /** Width of stroke */
  width: p.number
};

ProgressBar.defaultProps = {
  active: false,
  color: 'primary',
  indeterminate: false,
  max: 100,
  min: 0,
  value: 0,
  width: 10
};

export default ProgressBar;
