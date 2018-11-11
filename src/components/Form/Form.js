import React from 'react';
import p from 'prop-types';
import cx from 'classnames';

import styles from './Form.module.scss';

/**
 * Forms are grouping of input controls that allow a user to submit information to your application.
 *
 */
const Form = ({ children, className, layout, ...props }) => {
  const classes = cx(styles.form, styles[layout], 'bui-Form', className);

  return (
    <form className={classes} {...props}>
      {children}
    </form>
  );
};

Form.propTypes = {
  /** Children (FormItems) to render inside From */
  children: p.node,
  /** Classname for FormInput component */
  className: p.string,
  /** Form layout */
  layout: p.oneOf(['horizontal', 'vertical', 'inline'])
};

Form.defaultProps = {
  layout: 'horizontal'
};

export default Form;
