import React, { cloneElement, Fragment } from 'react';
import p from 'prop-types';
import cx from 'classnames';

import styles from './Breadcrumb.module.scss';

import Item from './Item';
import Text from '../Text';

/**
 * A Breadcrumb is used to show hierarchy between content
 *
 */
const Breadcrumb = ({ children, className, separator, ...props }) => {
  const classes = cx(styles.breadcrumb, 'bui-Breadcrumb', className);

  return (
    <Text highlightLinks className={classes} {...props}>
      {React.Children.map(
        children,
        (child, index) =>
          child.type === Item && (
            <Fragment>
              {cloneElement(child, {
                active: index === children.length - 1
              })}
              {index !== children.length - 1 && (
                <Text inline className={styles.separator}>
                  {separator}
                </Text>
              )}
            </Fragment>
          )
      )}
    </Text>
  );
};

Breadcrumb.Item = Item;

Breadcrumb.propTypes = {
  /** Breadcrumb items */
  children: p.node,
  /** Classname for Breadcrumb component */
  className: p.string,
  /** Separator between Breadcrumb Items */
  separator: p.oneOfType([p.string, p.node])
};

Breadcrumb.defaultProps = {
  separator: '/'
};

export default Breadcrumb;
