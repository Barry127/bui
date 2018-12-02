import React, { Component } from 'react';
import p from 'prop-types';
import cx from 'classnames';
import { Transition, config } from 'react-spring';

import styles from './Alert.module.scss';
import '../icons';

import Button from '../Button';
import Header from '../Header';
import Icon from '../Icon';
import Text from '../Text';

class Alert extends Component {
  state = {
    open: true
  };

  onClose = ev => {
    const { onClose } = this.props;

    onClose(ev);

    if (ev.defaultPrevented) return;

    this.setState({
      open: false
    });
  };

  afterClose = () => {
    const { afterClose } = this.props;
    setTimeout(afterClose, 1);
  };

  render() {
    const {
      afterClose,
      children,
      className,
      closable,
      icon,
      onClose,
      showIcon,
      style,
      title,
      transitionConfig,
      type,
      ...props
    } = this.props;

    const { open } = this.state;

    const classes = cx(
      styles.alert,
      styles[type],
      {
        [styles.hasTitle]: title
      },
      className,
      'bui-Alert'
    );

    const iconName = icon || `bui-${type === 'danger' ? 'error' : type}`;

    return (
      <Transition
        items={open}
        from={{ opacity: 1, transform: 'scale(1)' }}
        enter={{ opacity: 1, transform: 'scale(1)' }}
        leave={{ opacity: 0, transform: 'scale(0.5)' }}
        config={transitionConfig || config.stiff}
        onDestroyed={this.afterClose}
      >
        {show =>
          show &&
          (cssStyle => (
            <div
              className={classes}
              style={{ ...style, ...cssStyle }}
              {...props}
              aria-live="assertive"
              role="alert"
            >
              {showIcon && (
                <Text className={styles.iconContainer}>
                  <Icon icon={iconName} />
                </Text>
              )}
              <Text className={styles.text}>
                {title && <Header level={5}>{title}</Header>}
                {children}
              </Text>
              {closable && (
                <Text className={styles.closeContainer}>
                  <Button icon color="flat" onClick={this.onClose}>
                    <Icon icon="bui-close" />
                  </Button>
                </Text>
              )}
            </div>
          ))
        }
      </Transition>
    );
  }

  static propTypes = {
    /** Called when close animation is finished */
    afterClose: p.func,
    /** Alert content */
    children: p.node,
    /** Classname for the Alert component */
    className: p.string,
    /** Is the Alert closable */
    closable: p.bool,
    /** Icon for the alert, empty = default icon */
    icon: p.string,
    /** Called directly when close button is clicked */
    onClose: p.func,
    /** Show icon */
    showIcon: p.bool,
    /** Title for the alert empty=no title */
    title: p.string,
    /** Type of Alert */
    type: p.oneOf(['success', 'info', 'warning', 'danger'])
  };

  static defaultProps = {
    afterClose: () => null,
    closable: true,
    onClose: () => null,
    showIcon: true,
    type: 'success'
  };
}

export default Alert;
