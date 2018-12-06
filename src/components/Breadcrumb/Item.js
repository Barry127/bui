import React from 'react';
import p from 'prop-types';
import cx from 'classnames';

import styles from './Breadcrumb.module.scss';

import Text from '../Text';

/**
 * A Breadcrumb Item is a single Item in a Breadcrumb
 *
 */
const BreadcrumbItem = ({ active, children, className }) => {
  const classes = cx(styles.item, 'bui-BreadcrumbItem', className);

  return (
    <Text inline className={classes} weight={active ? 'bold' : null}>
      {children}
    </Text>
  );
};

BreadcrumbItem.propTypes = {
  active: p.bool,
  /** Item content */
  children: p.node,
  /** Classname for BreadcrumbItem */
  className: p.string
};

BreadcrumbItem.defaultProps = {
  active: false
};

export default BreadcrumbItem;
