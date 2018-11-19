export const getAriaProps = ({ indeterminate, max, min, value }) => {
  const ariaProps = {
    role: 'progressbar',
    'aria-valuemax': max,
    'aria-valuemin': min
  };

  if (indeterminate) {
    ariaProps['aria-valuetext'] = 'indeterminate';
  } else {
    ariaProps['aria-valuenow'] = value;
  }

  return ariaProps;
};

export const getPercentage = (value, min, max) => {
  if (min > max) return 0;
  if (value > max) return 100;
  if (value < min) return 0;

  return ((value - min) * 100) / (max - min);
};
