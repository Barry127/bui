import React from 'react';
import p from 'prop-types';
import cx from 'classnames';

import styles from './Header.module.scss';

/**
 * The Header component renders headings in a larger size than regular text.
 */
const Header = ({ children, className, color, level, truncate, ...props }) => {
  const classes = cx(
    styles.header,
    styles[color],
    styles[`h${level}`],
    {
      [styles.truncate]: truncate
    },
    className
  );

  const Tag = `h${level}`;

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
};

Header.propTypes = {
  /** Heading content */
  children: p.node,
  /** ClassName for the Header component */
  ClassName: p.string,
  /** Text color */
  color: p.oneOf([
    'black',
    'white',
    'inherit',
    'red',
    'red50',
    'red100',
    'red200',
    'red300',
    'red400',
    'red500',
    'red600',
    'red700',
    'red800',
    'red900',
    'pink',
    'pink50',
    'pink100',
    'pink200',
    'pink300',
    'pink400',
    'pink500',
    'pink600',
    'pink700',
    'pink800',
    'pink900',
    'purple',
    'purple50',
    'purple100',
    'purple200',
    'purple300',
    'purple400',
    'purple500',
    'purple600',
    'purple700',
    'purple800',
    'purple900',
    'marine',
    'marine50',
    'marine100',
    'marine200',
    'marine300',
    'marine400',
    'marine500',
    'marine600',
    'marine700',
    'marine800',
    'marine900',
    'blue',
    'blue50',
    'blue100',
    'blue200',
    'blue300',
    'blue400',
    'blue500',
    'blue600',
    'blue700',
    'blue800',
    'blue900',
    'cyan',
    'cyan50',
    'cyan100',
    'cyan200',
    'cyan300',
    'cyan400',
    'cyan500',
    'cyan600',
    'cyan700',
    'cyan800',
    'cyan900',
    'teal',
    'teal50',
    'teal100',
    'teal200',
    'teal300',
    'teal400',
    'teal500',
    'teal600',
    'teal700',
    'teal800',
    'teal900',
    'green',
    'green50',
    'green100',
    'green200',
    'green300',
    'green400',
    'green500',
    'green600',
    'green700',
    'green800',
    'green900',
    'yellow',
    'yellow50',
    'yellow100',
    'yellow200',
    'yellow300',
    'yellow400',
    'yellow500',
    'yellow600',
    'yellow700',
    'yellow800',
    'yellow900',
    'orange',
    'orange50',
    'orange100',
    'orange200',
    'orange300',
    'orange400',
    'orange500',
    'orange600',
    'orange700',
    'orange800',
    'orange900',
    'darkorange',
    'darkorange50',
    'darkorange100',
    'darkorange200',
    'darkorange300',
    'darkorange400',
    'darkorange500',
    'darkorange600',
    'darkorange700',
    'darkorange800',
    'darkorange900',
    'warmgrey',
    'warmgrey50',
    'warmgrey100',
    'warmgrey200',
    'warmgrey300',
    'warmgrey400',
    'warmgrey500',
    'warmgrey600',
    'warmgrey700',
    'warmgrey800',
    'warmgrey900',
    'grey',
    'grey50',
    'grey100',
    'grey200',
    'grey300',
    'grey400',
    'grey500',
    'grey600',
    'grey700',
    'grey800',
    'grey900',
    'coolgray',
    'coolgray50',
    'coolgray100',
    'coolgray200',
    'coolgray300',
    'coolgray400',
    'coolgray500',
    'coolgray600',
    'coolgray700',
    'coolgray800',
    'coolgray900'
  ]),
  /** Heading level 1-6 */
  level: p.oneOf([1, 2, 3, 4, 5, 6]),
  /** Should the text truncate */
  truncate: p.bool
};

Header.defaultProps = {
  level: 1,
  truncate: false
};

export default Header;
