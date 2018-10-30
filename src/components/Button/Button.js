import React from 'react';
import p from 'prop-types';
import cx from 'classnames';

import styles from './Button.module.scss';

/**
 * Buttons execute an action or change the state of an application. Button text helps users understand what action will occur when they click or tap.
 */
const Button = ({
  active,
  children,
  className,
  color,
  disabled,
  fluid,
  href,
  icon,
  outline,
  size,
  type,
  ...props
}) => {
  const classes = cx(
    styles.button,
    styles[color],
    styles[size],
    {
      [styles.active]: active,
      [styles.fluid]: fluid,
      [styles.icon]: icon,
      [styles.outline]: outline
    },
    'bui-Button',
    className
  );

  return type === 'link' ? (
    <a className={classes} href={href} role="button" {...props}>
      <span>{children}</span>
    </a>
  ) : (
    <button className={classes} disabled={disabled} type={type} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  /** Style button as active state */
  active: p.bool,
  /** Button content */
  children: p.node,
  /** Classname for the Button component */
  className: p.string,
  /** Button color variant */
  color: p.oneOf([
    'default',
    'primary',
    'success',
    'info',
    'warning',
    'danger',
    'flat'
  ]),
  /** Is the button disabled */
  disabled: p.bool,
  /** Display button at full width */
  fluid: p.bool,
  /** Link target if button type is link */
  href: p.string,
  /** Style button as icon button */
  icon: p.bool,
  /** onClick handler */
  onClick: p.func,
  /** Style button as outlined (secondary) */
  outline: p.bool,
  /** Button size */
  size: p.oneOf(['sm', 'md', 'lg']),
  /** Type of button */
  type: p.oneOf(['button', 'submit', 'reset', 'link'])
};

Button.defaultProps = {
  active: false,
  color: 'default',
  disabled: false,
  fluid: false,
  icon: false,
  outline: false,
  size: 'md',
  type: 'button'
};

export default Button;
