import React, { cloneElement } from 'react';
import p from 'prop-types';
import cx from 'classnames';

import styles from './InputGroup.module.scss';

/**
 * InputGroup groups multiple form elements like TextInput and Button
 */
const InputGroup = ({ children, className, size, ...props }) => {
  const classes = cx(styles.group, 'bui-InputGroup', className);

  return (
    <div className={classes} {...props}>
      {React.Children.map(children, child => {
        return cloneElement(child, { size });
      })}
    </div>
  );
};

InputGroup.propTypes = {
  /** Form Elements like TextInput and Button */
  children: p.node,
  /** Classname for the InputGroup */
  className: p.string,
  /** Size for all child Components */
  size: p.oneOf(['sm', 'md', 'lg'])
};

InputGroup.defaultProps = {
  size: 'md'
};

export default InputGroup;
