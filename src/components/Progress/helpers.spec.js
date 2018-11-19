import { getAriaProps, getPercentage } from './helpers';

describe('getAriaProps', () => {
  it('Returns role, aria-valuemax ariavaluemin', () => {
    const aria = getAriaProps({ max: 10, min: 0 });
    expect(aria).toHaveProperty('role', 'progressbar');
    expect(aria).toHaveProperty('aria-valuemax', 10);
    expect(aria).toHaveProperty('aria-valuemin', 0);
  });

  it('Returns aria-valuenow', () => {
    const aria = getAriaProps({ max: 10, min: 0, value: 5 });
    expect(aria).toHaveProperty('aria-valuenow', 5);
  });

  it('Does not return aria-valuenow when indeterminate', () => {
    const aria = getAriaProps({
      max: 10,
      min: 0,
      value: 5,
      indeterminate: true
    });
    expect(aria).not.toHaveProperty('aria-valuenow');
  });

  it('Returns aria-valuetext as indeterminate', () => {
    const aria = getAriaProps({
      max: 10,
      min: 0,
      value: 5,
      indeterminate: true
    });
    expect(aria).toHaveProperty('aria-valuetext', 'indeterminate');
  });

  it('Does not return aria-valuetext when not indeterminate', () => {
    const aria = getAriaProps({ max: 10, min: 0, value: 5 });
    expect(aria).not.toHaveProperty('aria-valuetext');
  });
});

describe('getPercentage', () => {
  it('value 50 min 0, max 100 returns 50', () => {
    expect(getPercentage(50, 0, 100)).toBe(50);
  });

  it('value 150 min 100, max 250 returns 33', () => {
    expect(getPercentage(150, 100, 250)).toBeCloseTo(33.33);
  });

  it('value 50 min 200, max 100 returns 0 (min greater than max = 0)', () => {
    expect(getPercentage(50, 2000, 100)).toBe(0);
  });
});
