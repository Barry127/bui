import React from 'react';
import p from 'prop-types';
import cx from 'classnames';

import styles from './Form.module.scss';

import FormLabel from './FormLabel';

/**
 * A FormRow is a row in a form with or without a label
 */
const FormRow = ({
  children,
  className,
  disabled,
  hasError,
  htmlFor,
  id,
  label,
  size
}) => {
  const classes = cx(
    styles.row,
    styles[size],
    {
      [styles.disabled]: disabled,
      [styles.error]: hasError
    },
    'bui-FormRow',
    className
  );

  return (
    <div className={classes}>
      {label ? (
        <FormLabel
          disabled={disabled}
          hasError={hasError}
          htmlFor={htmlFor}
          id={id}
          size={size}
        >
          {typeof label === 'function' ? label() : label}
        </FormLabel>
      ) : (
        <div className={styles.label} />
      )}
      <div className={styles.input}>{children}</div>
    </div>
  );
};

FormRow.propTypes = {
  /** Children form elements to render */
  children: p.node,
  /** className for row */
  className: p.string,
  /** Is the Label style disabled */
  disabled: p.bool,
  /** is the Label styled as error */
  hasError: p.bool,
  /** id for the label field */
  id: p.string,
  /** id of input control the label is pointed to */
  htmlFor: p.string,
  /** label (empty is no label) */
  label: p.oneOfType([p.string, p.func]),
  /** FormRow size (not automatically passed to children) */
  size: p.oneOf(['sm', 'md', 'lg'])
};

FormRow.defaultProps = {
  disabled: false,
  hasError: false,
  size: 'md'
};

export default FormRow;
