import React from 'react';
import p from 'prop-types';
import cx from 'classnames';
import find from 'lodash/find';

import styles from './Form.module.scss';

import RadioGroup from '../RadioGroup';
import FormRow from './FormRow';

/**
 * A FormRadioGroup is a row of radio input in a form.
 *
 */
const FormRadioGroup = ({
  children,
  disabled,
  hasError,
  inline,
  label,
  name,
  options,
  size,
  value,
  ...props
}) => {
  const currentOption = find(options, { value });
  const htmlFor = currentOption
    ? `bui-radio-${name}-${value}`
    : options.length === 0
      ? '_'
      : `bui-radio-${name}-${options[0].value}`;

  return (
    <FormRow
      className={cx(
        styles.radioGroup,
        { [styles.radioInline]: inline },
        'bui-FormRadioGroup'
      )}
      disabled={disabled}
      hasError={hasError}
      htmlFor={htmlFor}
      label={label}
      size={size}
    >
      <RadioGroup
        inline={inline}
        name={name}
        size={size}
        options={options.map(option => ({ ...option, disabled, hasError }))}
        value={value}
        {...props}
      />
      {children}
    </FormRow>
  );
};

FormRadioGroup.propTypes = {
  /** Is the RadioGroup disabled */
  disabled: p.bool,
  /** Does the input contains an error */
  hasError: p.bool,
  /** should the group row be inline */
  inline: p.bool,
  /** label */
  label: p.oneOfType([p.string, p.func]),
  /** FormRadioGroup size */
  size: p.oneOf(['sm', 'md', 'lg'])
};

FormRadioGroup.defaultProps = {
  disabled: false,
  hasError: false,
  inline: false,
  options: [],
  size: 'md'
};

export default FormRadioGroup;
