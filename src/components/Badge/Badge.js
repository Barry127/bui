/* eslint react/display-name: 0 */

import React from 'react';
import p from 'prop-types';
import cx from 'classnames';
import { Spring, Transition, config } from 'react-spring';

import styles from './Badge.module.scss';

/**
 * Badges provide a method to highlight a count of an element either next to it or inside the element itself.
 */
const Badge = ({
  children,
  className,
  color,
  count,
  countOverflow,
  showZero,
  style, // eslint-disable-line react/prop-types
  title,
  ...props
}) => {
  const classes = cx(
    styles.badge,
    styles[color],
    {
      [styles.inline]: !children
    },
    className,
    'bui-Badge'
  );
  const min = showZero ? 0 : 1;
  const label = title || count;

  const badge = (
    <Transition
      items={count >= min}
      from={{ scale: 0 }}
      enter={{ scale: 1 }}
      leave={{ scale: 0 }}
      config={config.wobbly}
    >
      {show =>
        show &&
        (({ scale }) => (
          <Spring from={{ count }} to={{ count }} config={config.slow}>
            {({ count }) => {
              const c = Math.min(countOverflow, Math.round(count));
              return (
                <span
                  className={classes}
                  role="status"
                  aria-label={label}
                  title={label}
                  style={{
                    transform: children
                      ? `translate(50%, -50%) scale(${scale}) `
                      : null,
                    ...(style || {})
                  }}
                  {...props}
                >
                  <span>
                    {c}
                    {count > countOverflow && '+'}
                  </span>
                </span>
              );
            }}
          </Spring>
        ))
      }
    </Transition>
  );

  return children ? (
    <div className={styles.container}>
      {children}
      {badge}
    </div>
  ) : (
    badge
  );
};

Badge.propTypes = {
  /** Content Badge attaches to no children = inline */
  children: p.node,
  /** Classname for the Badge component */
  className: p.string,
  /** Badge color variant */
  color: p.oneOf(['default', 'success', 'warning', 'danger', 'info']),
  /** Number to show in badge */
  count: p.number.isRequired,
  /** Maximum count to show */
  countOverflow: p.number,
  /** Whether to show the Badge when count is zero */
  showZero: p.bool,
  /** Text to show when hovering over Badge */
  title: p.string
};

Badge.defaultProps = {
  color: 'default',
  countOverflow: 99,
  showZero: false
};

export default Badge;
