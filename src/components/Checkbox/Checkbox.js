import React, { Component } from 'react';
import p from 'prop-types';
import cx from 'classnames';
import { Transition, config } from 'react-spring';

import styles from './Checkbox.module.scss';
import './icons';

import Icon from '../Icon';
import Text from '../Text';

/**
 * With Checkboxes users can select multiple options in a list
 *
 */
class Checkbox extends Component {
  componentDidMount() {
    this.setIndeterminate();
  }

  componentDidUpdate() {
    this.setIndeterminate();
  }

  setIndeterminate() {
    const { indeterminate } = this.props;
    if (indeterminate) {
      this.input.checked = false;
      this.input.indeterminate = true;
    } else {
      this.input.indeterminate = false;
    }
  }

  setRef = ref => {
    const { innerRef } = this.props;
    this.input = ref;

    if (typeof innerRef === 'function') {
      innerRef(ref);
    }
  };

  render() {
    const {
      checked,
      children,
      className,
      hasError,
      indeterminate,
      size,
      ...props
    } = this.props;

    const classes = cx(
      styles.checkbox,
      styles[size],
      {
        [styles.error]: hasError
      },
      'bui-Checkbox',
      className
    );

    return (
      <label className={classes}>
        <input type="checkbox" checked={checked} ref={this.setRef} {...props} />
        <span className={styles.box}>
          <Transition
            items={checked && !indeterminate}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
            config={config.stiff}
          >
            {show =>
              show &&
              (style => (
                <span className={styles.checked} style={style}>
                  <Icon icon="bui-check" />
                </span>
              ))
            }
          </Transition>
          <Transition
            items={indeterminate}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
            config={config.stiff}
          >
            {show =>
              show &&
              (style => (
                <span className={styles.indeterminate} style={style}>
                  <Icon icon="bui-minus" />
                </span>
              ))
            }
          </Transition>
        </span>
        <Text inline>{children}</Text>
      </label>
    );
  }

  static propTypes = {
    /** Is the Checkbox checked */
    checked: p.bool,
    /** Children to render inside Checkbox label */
    children: p.node,
    /** Classname for Checkbox component */
    className: p.string,
    /** Is the Checkbox disabled */
    disabled: p.bool,
    /** Does the input contains an error */
    hasError: p.bool,
    /** id for input */
    id: p.string,
    /** Is the Checkbox state indeterminate (overwrites checked) */
    indeterminate: p.bool,
    /** name for Checkbox */
    name: p.string.isRequired,
    /** Checkbox size */
    size: p.oneOf(['sm', 'md', 'lg'])
  };

  static defaultProps = {
    checked: false,
    disabled: false,
    hasError: false,
    indeterminate: false,
    size: 'md'
  };
}

export default Checkbox;
