/* eslint-disable react/display-name */
import React from 'react';
import p from 'prop-types';
import cx from 'classnames';
import { Transition, config } from 'react-spring';

import styles from './RadioGroup.module.scss';

import Text from '../Text';

/**
 * A RadioButton is one option in a RadioGroup
 *
 */
const RadioButton = ({
  checked,
  children,
  className,
  hasError,
  innerRef,
  size,
  ...props
}) => {
  const classes = cx(
    styles.radio,
    styles[size],
    {
      [styles.error]: hasError
    },
    'bui-RadioButton',
    className
  );

  return (
    <label className={classes}>
      <input type="radio" checked={checked} ref={innerRef} {...props} />
      <span className={styles.circle}>
        <Transition
          items={checked}
          from={{ opacity: 0, transform: 'scale(0.3)' }}
          enter={{ opacity: 1, transform: 'scale(0.7)' }}
          leave={{ opacity: 0, transform: 'scale(0.3)' }}
          config={config.stiff}
        >
          {show =>
            show &&
            (style => <span className={styles.innerCircle} style={style} />)
          }
        </Transition>
      </span>
      <Text inline>{children}</Text>
    </label>
  );
};

RadioButton.propTypes = {
  /** Is the RadioButton checked */
  checked: p.bool,
  /** Children to render inside RadioButtons label */
  children: p.node,
  /** Classname for RadioButton component */
  className: p.string,
  /** Is the RadioButton disabled */
  disabled: p.bool,
  /** Does the input contains an error */
  hasError: p.bool,
  /** id for input */
  id: p.string,
  /** name for RadioButton */
  name: p.string.isRequired,
  /** RadioButton size */
  size: p.oneOf(['sm', 'md', 'lg']),
  /** RadioButton value */
  value: p.any.isRequired
};

RadioButton.defaultProps = {
  checked: false,
  disabled: false,
  hasError: false,
  size: 'md'
};

export default RadioButton;
