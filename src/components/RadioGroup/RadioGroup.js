/* eslint-disable react/display-name */
import React from 'react';
import p from 'prop-types';
import cx from 'classnames';
import omit from 'lodash/omit';

import styles from './RadioGroup.module.scss';

import RadioButton from './RadioButton';

/**
 * use a RadioGroup when you have a few options a user can choose from
 *
 */
const RadioGroup = ({
  className,
  inline,
  name,
  onChange,
  options,
  size,
  value
}) => {
  const classes = cx(
    styles.group,
    'bui-RadioGroup',
    { [styles.inline]: inline },
    className
  );

  return (
    <div className={classes}>
      {options.map(option => {
        const { label } = option;
        const props = omit(option, [
          'checked',
          'children',
          'label',
          'id',
          'name',
          'onChange',
          'size',
          'value'
        ]);

        return (
          <RadioButton
            key={option.value}
            checked={value === option.value}
            id={`bui-radio-${name}-${option.value}`}
            name={name}
            onChange={onChange}
            size={size}
            value={option.value}
            {...props}
          >
            {typeof label === 'function' ? label() : label}
          </RadioButton>
        );
      })}
    </div>
  );
};

RadioGroup.propTypes = {
  /** Classname for RadioGroup component */
  className: p.string,
  /** should the group be inline */
  inline: p.bool,
  /** name for RadioButtons */
  name: p.string.isRequired,
  /** onChange handler for the selected Radio value */
  onChange: p.func.isRequired,
  /** List of options for RadioButtons */
  options: p.arrayOf(
    p.shape({
      disabled: p.bool,
      hasError: p.bool,
      label: p.oneOfType([p.string, p.func]),
      value: p.any.isRequired
    })
  ),
  /** RadioGroup size */
  size: p.oneOf(['sm', 'md', 'lg']),
  /** current value value */
  value: p.any.isRequired
};

RadioGroup.defaultProps = {
  inline: false,
  options: [],
  size: 'md'
};

export default RadioGroup;
