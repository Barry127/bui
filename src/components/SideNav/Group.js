import React, { Component } from 'react';
import p from 'prop-types';
import cx from 'classnames';
import { Transition } from 'react-spring';

import styles from './SideNav.module.scss';

import Icon from '../Icon';

class SideNavGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open,
      from: props.open ? 'auto' : 0
    };
  }

  componentDidUpdate(prevProps) {
    const { open } = this.props;
    if (prevProps.open !== open) {
      this.setState({ open });
    }
  }

  toggleOpen = ev => {
    const { collapsible, to } = this.props;
    if (to === '#') {
      ev.preventDefault();
    }

    if (!collapsible) return;

    this.setState(({ open }) => ({ open: !open, from: 0 }));
  };

  render() {
    const {
      children,
      className,
      collapsible,
      open,
      title,
      to,
      ...props
    } = this.props;

    const isOpen = collapsible ? this.state.open : true;

    const classes = cx(
      styles.group,
      {
        [styles.open]: isOpen
      },
      'bui-SideNavGroup',
      className
    );

    return (
      <li className={classes} {...props}>
        {title && (
          <a className={styles.title} onClick={this.toggleOpen} href={to}>
            {title}
            <Icon icon="bui-chevron-right" className={styles.icon} />
          </a>
        )}
        <Transition
          items={isOpen}
          from={{ height: this.state.from }}
          enter={{ height: 'auto' }}
          leave={{ height: 0 }}
        >
          {open =>
            open &&
            (({ height }) => (
              <ul style={{ height, overflow: 'hidden' }}>{children}</ul>
            ))
          }
        </Transition>
      </li>
    );
  }

  static propTypes = {
    /** Group content */
    children: p.node,
    /** Classname for the group */
    className: p.string,
    /** Wether the group is collapsible */
    collapsible: p.bool,
    /** Wether the group is open */
    open: p.bool,
    /** Group title */
    title: p.string,
    /** Target for title */
    to: p.string
  };

  static defaultProps = {
    collapsible: true,
    open: true,
    to: '#'
  };
}

export default SideNavGroup;
