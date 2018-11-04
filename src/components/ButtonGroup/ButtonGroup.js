import React from 'react';
import p from 'prop-types';
import cx from 'classnames';

import styles from './ButtonGroup.module.scss';

import InputGroup from '../InputGroup';

/**
 * ButtonGroup groups multiple Button components
 */
const ButtonGroup = ({ children, className, ...props }) => {
  const classes = cx(styles.buttons, 'bui-ButtonGroup', className);

  return (
    <InputGroup className={classes} {...props}>
      {children}
    </InputGroup>
  );
};

ButtonGroup.propTypes = {
  /** Buttons */
  children: p.node,
  /** Classname for the ButtonGroup */
  className: p.string,
  /** Size for all child Buttons */
  size: p.oneOf(['sm', 'md', 'lg'])
};

ButtonGroup.defaultProps = {
  size: 'md'
};

export default ButtonGroup;
