import React from 'react';
import { shallow } from 'enzyme';

import Progress from './Progress';
import styles from './Progress.module.scss';

const rootSelector = `.${styles.progress}`;
const defaultProgress = props => shallow(<Progress {...props} />);

it('Renders Progress', () => {
  const wrapper = defaultProgress();
  expect(wrapper.find('ProgressBar').length).toBe(1);
});

describe('type', () => {
  it('is ProgressBar by default', () => {
    const wrapper = defaultProgress();
    expect(wrapper.find('ProgressBar').length).toBe(1);
  });

  it('is sets ProgressCircle for circle', () => {
    const wrapper = defaultProgress({ type: 'circle' });
    expect(wrapper.find('ProgressCircle').length).toBe(1);
  });

  it('is sets ProgressDash for dash', () => {
    const wrapper = defaultProgress({ type: 'dash' });
    expect(wrapper.find('ProgressDash').length).toBe(1);
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultProgress({ color: 'success', value: 25 });
    expect(wrapper.find(`ProgressBar`).prop('color')).toBe('success');
    expect(wrapper.find(`ProgressBar`).prop('value')).toBe(25);

    const wrapper2 = defaultProgress({
      type: 'circle',
      color: 'success',
      value: 25
    });
    expect(wrapper2.find(`ProgressCircle`).prop('color')).toBe('success');
    expect(wrapper2.find(`ProgressCircle`).prop('value')).toBe(25);

    const wrapper3 = defaultProgress({
      type: 'dash',
      color: 'success',
      value: 25
    });
    expect(wrapper3.find(`ProgressDash`).prop('color')).toBe('success');
    expect(wrapper3.find(`ProgressDash`).prop('value')).toBe(25);
  });
});
