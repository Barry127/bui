import React from 'react';
import p from 'prop-types';
import cx from 'classnames';

import styles from './SideNav.module.scss';

const SideNavItem = ({ active, children, className, to, ...props }) => {
  const classes = cx(
    styles.item,
    { [styles.active]: active },
    'bui-SideNavItem',
    className
  );

  return (
    <li className={classes}>
      <a href={to} {...props}>
        {children}
      </a>
    </li>
  );
};

SideNavItem.propTypes = {
  /** Wether this item is active */
  active: p.bool,
  /** Item content */
  children: p.node,
  /** Classname for the item */
  className: p.string,
  /** Target */
  to: p.string
};

SideNavItem.defaultProps = {
  active: false,
  to: '#'
};

export default SideNavItem;
