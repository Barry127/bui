import React from 'react';
import p from 'prop-types';

import PasswordInput from '../PasswordInput/PasswordInput';
import FormRow from './FormRow';

/**
 * A FormPasswordInput is a row of password input in a form.
 *
 */
const FormPasswordInput = ({
  children,
  disabled,
  hasError,
  id,
  label,
  size,
  ...props
}) => (
  <FormRow
    className="bui-FormPasswordInput"
    disabled={disabled}
    hasError={hasError}
    htmlFor={id}
    label={label}
    size={size}
  >
    <PasswordInput
      disabled={disabled}
      hasError={hasError}
      id={id}
      size={size}
      {...props}
    />
    {children}
  </FormRow>
);

FormPasswordInput.propTypes = {
  /** Children to render under PasswordInput container */
  children: p.node,
  /** Is the PasswordInput disabled */
  disabled: p.bool,
  /** Does the input contains an error */
  hasError: p.bool,
  /** id (will be passed to InputControl) */
  id: p.string.isRequired,
  /** label */
  label: p.oneOfType([p.string, p.func]),
  /** FormPasswordInput size */
  size: p.oneOf(['sm', 'md', 'lg'])
};

FormPasswordInput.defaultProps = {
  disabled: false,
  hasError: false,
  size: 'md'
};

export default FormPasswordInput;
