import React from 'react';
import p from 'prop-types';
import cx from 'classnames';

import styles from './Form.module.scss';

import Text from '../Text';

/**
 * A FormLabel is a label for a form input.
 *
 */
const FormLabel = ({
  children,
  className,
  disabled,
  hasError,
  htmlFor,
  size,
  ...props
}) => {
  const classes = cx(
    styles.label,
    styles[size],
    {
      [styles.disabled]: disabled,
      [styles.error]: hasError
    },
    'bui-FormLabel',
    className
  );

  return (
    <Text className={classes} truncate>
      <label htmlFor={htmlFor} {...props}>
        {children}
      </label>
    </Text>
  );
};

FormLabel.propTypes = {
  /** Children to render inside the Label */
  children: p.node,
  /** Classname for FormLabel */
  className: p.string,
  /** Is the input disabled */
  disabled: p.bool,
  /** Does the input contains an error */
  hasError: p.bool,
  /** id for targeted form element */
  htmlFor: p.string.isRequired,
  /** FormLabel size */
  size: p.oneOf(['sm', 'md', 'lg'])
};

FormLabel.defaultProps = {
  disabled: false,
  hasError: false,
  size: 'md'
};

export default FormLabel;
