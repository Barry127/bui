import React from 'react';
import p from 'prop-types';

import TextInput from '../TextInput/TextInput';
import FormRow from './FormRow';

/**
 * A FormTextInput is a row of text input in a form.
 *
 */
const FormTextInput = ({
  children,
  disabled,
  hasError,
  id,
  label,
  size,
  ...props
}) => (
  <FormRow
    className="bui-FormTextInput"
    disabled={disabled}
    hasError={hasError}
    htmlFor={id}
    label={label}
    size={size}
  >
    <TextInput
      disabled={disabled}
      hasError={hasError}
      id={id}
      size={size}
      {...props}
    />
    {children}
  </FormRow>
);

FormTextInput.propTypes = {
  /** Children to render under TextInput container */
  children: p.node,
  /** Is the TextInput disabled */
  disabled: p.bool,
  /** Does the input contains an error */
  hasError: p.bool,
  /** id (will be passed to InputControl) */
  id: p.string.isRequired,
  /** label */
  label: p.oneOfType([p.string, p.func]),
  /** FormTextInput size */
  size: p.oneOf(['sm', 'md', 'lg'])
};

FormTextInput.defaultProps = {
  disabled: false,
  hasError: false,
  size: 'md'
};

export default FormTextInput;
