import React, { Component } from 'react';
import p from 'prop-types';

import PasswordInput from '../PasswordInput/PasswordInput';
import FormRow from './FormRow';
import uniqueId from '../../lib/uniqueId';

/**
 * A FormPasswordInput is a row of password input in a form.
 *
 */
class FormPasswordInput extends Component {
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
        className="bui-FormPasswordInput"
        disabled={disabled}
        hasError={hasError}
        htmlFor={id}
        id={this.labelId}
        label={label}
        size={size}
      >
        <PasswordInput
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

  static defaultProps = {
    disabled: false,
    hasError: false,
    size: 'md'
  };
}

export default FormPasswordInput;
