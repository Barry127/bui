import React from 'react';
import p from 'prop-types';

import ProgressBar from './ProgressBar';
import ProgressCircle from './ProgressCircle';
import ProgressDash from './ProgressDash';

/**
 * A progress bar is a linear indicator for providing feedback about an ongoing, user-initiated process.
 */
const Progress = ({ type, ...props }) => {
  switch (type) {
    case 'circle':
      return <ProgressCircle {...props} />;

    case 'dash':
      return <ProgressDash {...props} />;

    default:
      return <ProgressBar {...props} />;
  }
};

Progress.propTypes = {
  /** Is the progress animated (bar only) */
  active: p.bool,
  /** Progress (text) content */
  children: p.node,
  /** Classname for the Progress component */
  className: p.string,
  /** Progress color variant */
  color: p.oneOf(['primary', 'success', 'info', 'warning', 'danger']),
  /** Is the progress indeterminate (overwrites value, bar and circle only) */
  indeterminate: p.bool,
  /** Maximum value */
  max: p.number,
  /** Minimum value */
  min: p.number,
  /** Size (for circle and dash progress) */
  size: p.oneOfType([p.string, p.number]),
  /** Type of progress */
  type: p.oneOf(['bar', 'circle', 'dash']),
  /** Current value */
  value: p.number,
  /** Width of stroke */
  width: p.number
};

Progress.defaultProps = {
  active: false,
  color: 'primary',
  indeterminate: false,
  max: 100,
  min: 0,
  size: 128,
  type: 'bar',
  value: 0
};

export default Progress;
