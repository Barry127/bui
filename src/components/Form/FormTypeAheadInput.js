import React from 'react';
import p from 'prop-types';

import TypeAheadInput from '../TypeAheadInput/TypeAheadInput';
import FormRow from './FormRow';

/**
 * A FormTypeAheadInput is a row of text input in a form.
 *
 */
const FormTypeAheadInput = ({
  children,
  disabled,
  hasError,
  id,
  label,
  size,
  ...props
}) => (
  <FormRow
    className="bui-FormTypeAheadInput"
    disabled={disabled}
    hasError={hasError}
    htmlFor={id}
    label={label}
    size={size}
  >
    <TypeAheadInput
      disabled={disabled}
      hasError={hasError}
      id={id}
      size={size}
      {...props}
    />
    {children}
  </FormRow>
);

FormTypeAheadInput.propTypes = {
  /** Children to render under TypeAheadInput container */
  children: p.node,
  /** Is the TypeAheadInput disabled */
  disabled: p.bool,
  /** Does the input contains an error */
  hasError: p.bool,
  /** id (will be passed to InputControl) */
  id: p.string.isRequired,
  /** label */
  label: p.oneOfType([p.string, p.func]),
  /** FormTypeAheadInput size */
  size: p.oneOf(['sm', 'md', 'lg'])
};

FormTypeAheadInput.defaultProps = {
  disabled: false,
  hasError: false,
  size: 'md'
};

export default FormTypeAheadInput;
