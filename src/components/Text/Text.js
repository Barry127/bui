import React from 'react';
import p from 'prop-types';
import cx from 'classnames';

import styles from './Text.module.scss';

/**
 * The Text component is a low level component to handle text.
 *
 */
const Text = ({
  align,
  children,
  className,
  color,
  highlightLinks,
  inline,
  italic,
  size,
  style,
  truncate,
  underline,
  weight,
  ...props
}) => {
  const classes = cx(
    styles.text,
    styles[align],
    styles[color],
    styles[weight],
    {
      [styles.highlightLinks]: highlightLinks,
      [styles.italic]: italic,
      [styles.truncate]: truncate,
      [styles.underline]: underline
    },
    'bui-Text',
    className
  );

  const cssStyle = {
    fontSize: size,
    ...style
  };

  const Tag = inline ? 'span' : 'div';
  return (
    <Tag className={classes} style={cssStyle} {...props}>
      {children}
    </Tag>
  );
};

Text.propTypes = {
  /** Alignment of the text */
  align: p.oneOf(['left', 'right', 'center', 'justify']),
  /** Text content */
  children: p.node,
  /** Classname for Text component */
  className: p.string,
  /** Text color */
  color: p.oneOf([
    'black',
    'white',
    'inherit',
    'link',
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
  /** Should links (a tags) be styled in link color */
  highlightLinks: p.bool,
  /** Should the text be inline (<span>) or block (<div>) */
  inline: p.bool,
  /** Should text be italic */
  italic: p.bool,
  /** Should the text truncate (block only) */
  truncate: p.bool,
  /** Should text be underlined */
  underline: p.bool,
  /** Text weight */
  weight: p.oneOf(['bold', 'medium', 'light'])
};

Text.defaultProps = {
  highlightLinks: false,
  inline: false,
  italic: false,
  truncate: false,
  underline: false
};

export default Text;
