import React, { Component } from 'react';
import p from 'prop-types';

import TextInput from '../TextInput/TextInput';
import FormRow from './FormRow';
import uniqueId from '../../lib/uniqueId';

/**
 * A FormTextInput is a row of text input in a form.
 *
 */
class FormTextInput extends Component {
  constructor() {
    super();
    this.labelId = uniqueId();
  }

  render() {
    const {
      children,
      disabled,
      hasError,
      id,
      label,
      size,
      ...props
    } = this.props;

    return (
      <FormRow
        className="bui-FormTextInput"
        disabled={disabled}
        hasError={hasError}
        htmlFor={id}
        id={this.labelId}
        label={label}
        size={size}
      >
        <TextInput
          aria-labelledby={this.labelId}
          disabled={disabled}
          hasError={hasError}
          id={id}
          size={size}
          {...props}
        />
        {children}
      </FormRow>
    );
  }

  static propTypes = {
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

  static defaultProps = {
    disabled: false,
    hasError: false,
    size: 'md'
  };
}
export default FormTextInput;
