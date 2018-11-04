import React, { Component } from 'react';
import p from 'prop-types';
import cx from 'classnames';
import TextareaAutosize from 'react-autosize-textarea';

import styles from './TextArea.module.scss';

import Tooltip from '../Tooltip';
import uniqueId from '../../lib/uniqueId';

/**
 * Textareas allow for multiline input
 */
class TextArea extends Component {
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
      onBlur,
      onFocus,
      size,
      ...props
    } = this.props;

    const { hasFocus } = this.state;

    const classes = cx(
      styles.textarea,
      styles[size],
      {
        [styles.error]: hasError
      },
      'bui-TextArea',
      className
    );

    if (errorMessage && hasFocus) {
      props['aria-describedby'] = this.tooltipId;
    }

    return (
      <div id={this.id} className={classes}>
        <TextareaAutosize
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          {...props}
        />
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
        {children}
      </div>
    );
  }

  static propTypes = {
    /** Children to render inside TextArea container */
    children: p.node,
    /** Classname for TextArea component */
    className: p.string,
    /** Is the TextArea disabled */
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
    /** Does the TextArea contains an error */
    hasError: p.bool,
    /** id for textarea */
    id: p.string.isRequired,
    /** maximum number of rows, infinit by default */
    maxRows: p.number,
    /** name for textarea */
    name: p.string.isRequired,
    /** number of rows */
    rows: p.number,
    /** TextArea size */
    size: p.oneOf(['sm', 'md', 'lg'])
  };

  static defaultProps = {
    disabled: false,
    errorMessage: null,
    errorPosition: 'bottom',
    hasError: false,
    rows: 3,
    size: 'md'
  };
}

export default TextArea;
