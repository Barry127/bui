import React from 'react';
import p from 'prop-types';

import TextArea from '../TextArea/TextArea';
import FormRow from './FormRow';

/**
 * A FormTextArea is a row of textarea input in a form.
 *
 */
const FormTextArea = ({
  children,
  disabled,
  hasError,
  id,
  label,
  size,
  ...props
}) => (
  <FormRow
    className="bui-FormTextArea"
    disabled={disabled}
    hasError={hasError}
    htmlFor={id}
    label={label}
    size={size}
  >
    <TextArea
      disabled={disabled}
      hasError={hasError}
      id={id}
      size={size}
      {...props}
    />
    {children}
  </FormRow>
);

FormTextArea.propTypes = {
  /** Children to render under TextArea container */
  children: p.node,
  /** Is the TextArea disabled */
  disabled: p.bool,
  /** Does the input contains an error */
  hasError: p.bool,
  /** id (will be passed to InputControl) */
  id: p.string.isRequired,
  /** label */
  label: p.oneOfType([p.string, p.func]),
  /** FormTextArea size */
  size: p.oneOf(['sm', 'md', 'lg'])
};

FormTextArea.defaultProps = {
  disabled: false,
  hasError: false,
  size: 'md'
};

export default FormTextArea;
