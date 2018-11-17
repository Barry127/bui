import React, { Component } from 'react';
import p from 'prop-types';
import cx from 'classnames';

import styles from './PasswordInput.module.scss';
import './icons';

import Button from '../Button';
import Icon from '../Icon';
import TextInput from '../TextInput/TextInput';

/**
 * PasswordInput is a TextInput to handle passwords
 *
 */
class PasswordInput extends Component {
  state = {
    visible: false
  };

  toggleVisible = ev => {
    const { visible } = this.state;

    this.input.focus();
    this.setState({ visible: !visible });
  };

  setRef = ref => {
    const { innerRef } = this.props;
    this.input = ref;

    if (typeof innerRef === 'function') {
      innerRef(ref);
    }
  };

  render() {
    const {
      children,
      className,
      hideReveal,
      innerRef,
      size,
      type,
      ...props
    } = this.props;
    const { visible } = this.state;

    const classes = cx(
      styles.password,
      styles[size],
      {
        [styles.reveal]: !hideReveal
      },
      'bui-PasswordInput',
      className
    );

    return (
      <TextInput
        className={classes}
        size={size}
        type={visible ? 'text' : 'password'}
        innerRef={this.setRef}
        {...props}
      >
        {!hideReveal && (
          <Button
            className={styles.button}
            color="flat"
            icon
            size={size}
            onClick={this.toggleVisible}
            tabIndex={-1}
          >
            <Icon icon={visible ? 'bui-eye-slash' : 'bui-eye'} />
          </Button>
        )}
        {children}
      </TextInput>
    );
  }

  static propTypes = {
    /** Children to render inside PasswordInput container */
    children: p.node,
    /** Classname for PasswordInput component */
    className: p.string,
    /** Is the PasswordInput disabled */
    disabled: p.bool,
    /** ErrorMessage for error tooltip, no message = no tooltip */
    errorMessage: p.oneOfType([p.string, p.func]),
    /** Position for the error tooltip */
    errorPosition: p.oneOf([
      'bottomLeft',
      'bottom',
      'bottomRight',
      'leftTop',
      'left',
      'leftBottom',
      'rightTop',
      'right',
      'rightBottom',
      'topLeft',
      'top',
      'topRight'
    ]),
    /** Does the password contains an error */
    hasError: p.bool,
    /** Hide the eye (reveal) icon button */
    hideReveal: p.bool,
    /** Icon for PasswordInput */
    icon: p.string,
    /** id for input */
    id: p.string.isRequired,
    /** name for PasswordInput */
    name: p.string.isRequired,
    /** PasswordInput size */
    size: p.oneOf(['sm', 'md', 'lg'])
  };

  static defaultProps = {
    disabled: false,
    errorMessage: null,
    errorPosition: 'bottom',
    hasError: false,
    hideReveal: false,
    size: 'md'
  };
}

export default PasswordInput;
