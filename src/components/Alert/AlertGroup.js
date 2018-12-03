import React, { Component, cloneElement } from 'react';
import p from 'prop-types';
import cx from 'classnames';

import styles from './Alert.module.scss';
import '../icons';

import Alert from './Alert';
import Button from '../Button';
import Icon from '../Icon';
import Text from '../Text';

/**
 * AlertGroup groups several Alerts in one group.
 */
class AlertGroup extends Component {
  state = {
    index: 0
  };

  next = () => {
    const alerts = this.getAlerts();
    const index = Math.min(this.state.index, alerts.length - 1);

    this.setState({
      index: (index + 1) % alerts.length
    });
  };

  prev = () => {
    const alerts = this.getAlerts();
    const index = Math.min(this.state.index, alerts.length - 1);

    this.setState({
      index: (index + alerts.length - 1) % alerts.length
    });
  };

  getAlerts() {
    const { children } = this.props;

    if (!children) return [];

    const childrenArray = Array.isArray(children) ? children : [children];

    return childrenArray.filter(child => child.type === Alert);
  }

  render() {
    const { className, children, ...props } = this.props;

    const alerts = this.getAlerts();

    if (alerts.length === 0) return null;

    const index = Math.min(this.state.index, alerts.length - 1);

    const classes = cx(
      styles.group,
      styles[alerts[index].props.type],
      'bui-AlertGroup',
      className
    );

    return (
      <div className={classes} {...props}>
        {alerts.length > 1 && (
          <Text className={styles.nav} align="center" color="white">
            <Button icon size="sm" color="flat" onClick={this.prev}>
              <Icon icon="bui-chevron-left" />
            </Button>{' '}
            {index + 1} / {alerts.length}{' '}
            <Button icon size="sm" color="flat" onClick={this.next}>
              <Icon icon="bui-chevron-right" />
            </Button>
          </Text>
        )}
        {cloneElement(alerts[index], {
          closable: true,
          transitionConfig: { duration: 1 },
          title: null,
          key: alerts.length
        })}
      </div>
    );
  }

  static propTypes = {
    /** Alerts the group contains */
    children: p.node,
    /** Classname for the AlertGroup component */
    className: p.string
  };
}

export default AlertGroup;

/**
 * No title
 * Closable always true
 */
