import React from 'react';
import p from 'prop-types';
import cx from 'classnames';

import styles from './Tooltip.module.scss';

import Icon from '../Icon';
import Text from '../Text';
import './icons';

const ICON_MAP = {
  bottomLeft: '@bui-caret-up',
  bottom: '@bui-caret-up',
  bottomRight: '@bui-caret-up',
  leftTop: '@bui-caret-right',
  left: '@bui-caret-right',
  leftBottom: '@bui-caret-right',
  rightTop: '@bui-caret-left',
  right: '@bui-caret-left',
  rightBottom: '@bui-caret-left',
  topLeft: '@bui-caret-down',
  top: '@bui-caret-down',
  topRight: '@bui-caret-down'
};

const TooltipContent = ({
  children,
  className,
  color,
  position,
  size,
  ...props
}) => {
  const classes = cx(
    styles['content-container'],
    styles[color],
    styles[position],
    styles[size],
    'bui-Tooltip',
    className
  );

  return (
    <div className={classes} {...props}>
      <Text className={styles['tooltip-content']}>{children}</Text>
      <Icon className={styles.caret} icon={ICON_MAP[position]} />
    </div>
  );
};

TooltipContent.propTypes = {
  /** Tooltip content */
  children: p.node,
  /** Classname for Tooltip component */
  className: p.string,
  /** Tooltip color variant */
  color: p.oneOf([
    'default',
    'primary',
    'success',
    'info',
    'warning',
    'danger'
  ]),
  /* position to render Tooltip */
  position: p.oneOf([
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
  /* Width size for Tooltip */
  size: p.oneOf(['sm', 'md', 'lg'])
};

TooltipContent.defaultProps = {
  color: 'default',
  position: 'top',
  size: 'md'
};

export default TooltipContent;
