import React, { Component } from 'react';
import p from 'prop-types';
import cx from 'classnames';

import styles from './TextInput.module.scss';

import Icon from '../Icon';
import Tooltip from '../Tooltip';
import uniqueId from '../../lib/uniqueId';

/**
 * Inputs are the most commonly used form control and allow for text input
 *
 */
class Input extends Component {
  state = {
    hasFocus: false
  };

  constructor() {
    super();
    this.id = uniqueId();
    this.tooltipId = uniqueId();
  }

  onBlur = ev => {
    const { onBlur } = this.props;

    this.setState({ hasFocus: false });
    if (onBlur) onBlur(ev);
  };

  onFocus = ev => {
    const { onFocus } = this.props;

    this.setState({ hasFocus: true });
    if (onFocus) onFocus(ev);
  };

  render() {
    const {
      children,
      className,
      errorMessage,
      errorPosition,
      hasError,
      icon,
      onBlur,
      onFocus,
      size,
      ...props
    } = this.props;

    const { hasFocus } = this.state;

    const classes = cx(
      styles.input,
      styles[size],
      {
        [styles.error]: hasError,
        [styles.icon]: icon
      },
      'bui-TextInput',
      className
    );

    if (errorMessage && hasFocus) {
      props['aria-describedby'] = this.tooltipId;
    }

    return (
      <div id={this.id} className={classes}>
        <input onBlur={this.onBlur} onFocus={this.onFocus} {...props} />
        {errorMessage && (
          <Tooltip
            targetId={this.id}
            color="danger"
            position={errorPosition}
            visible={hasFocus}
            id={this.tooltipId}
          >
            {typeof errorMessage === 'function' ? errorMessage() : errorMessage}
          </Tooltip>
        )}
        {icon && (
          <div className={styles['icon-container']}>
            <Icon icon={icon} />
          </div>
        )}
        {children}
      </div>
    );
  }

  static propTypes = {
    /** Children to render inside TextInput container */
    children: p.node,
    /** Classname for TextInput component */
    className: p.string,
    /** Is the TextInput disabled */
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
    /** Does the input contains an error */
    hasError: p.bool,
    /** Icon for TextInput */
    icon: p.string,
    /** id for input */
    id: p.string.isRequired,
    /** name for textInput */
    name: p.string.isRequired,
    /** TextInput size */
    size: p.oneOf(['sm', 'md', 'lg']),
    /** TextInput type */
    type: p.oneOf(['text', 'email', 'password', 'url', 'search'])
  };

  static defaultProps = {
    disabled: false,
    errorMessage: null,
    errorPosition: 'bottom',
    hasError: false,
    size: 'md',
    type: 'text'
  };
}

export default Input;
