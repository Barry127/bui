import React, { Component } from 'react';
import p from 'prop-types';

import TextArea from '../TextArea/TextArea';
import FormRow from './FormRow';
import uniqueId from '../../lib/uniqueId';

/**
 * A FormTextArea is a row of textarea input in a form.
 *
 */
class FormTextArea extends Component {
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
        className="bui-FormTextArea"
        disabled={disabled}
        hasError={hasError}
        htmlFor={id}
        id={this.labelId}
        label={label}
        size={size}
      >
        <TextArea
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

  static defaultProps = {
    disabled: false,
    hasError: false,
    size: 'md'
  };
}

export default FormTextArea;
