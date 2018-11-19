import React from 'react';
import { shallow, render } from 'enzyme';

import ProgressDash, { BARSIZE } from './ProgressDash';
import styles from './Progress.module.scss';

const rootSelector = `.${styles.dash}`;
const defaultProgressDash = props => shallow(<ProgressDash {...props} />);

it('Renders ProgressDash with children', () => {
  const wrapper = defaultProgressDash();
  expect(wrapper.find(rootSelector).length).toBe(1);

  const wrapper2 = render(<ProgressDash>Content</ProgressDash>);
  expect(wrapper2.find(`.${styles.content}`).text()).toBe('Content');
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultProgressDash({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('color', () => {
  it('Is primary default', () => {
    const wrapper = defaultProgressDash();
    expect(wrapper.find(rootSelector).hasClass(styles.primary)).toBe(true);
  });

  it('Sets the color', () => {
    const wrapper = defaultProgressDash({ color: 'danger' });
    expect(wrapper.find(rootSelector).hasClass(styles.danger)).toBe(true);
  });
});

describe('max', () => {
  it('Is 100 by default', () => {
    const wrapper = defaultProgressDash();
    expect(wrapper.find(`.${styles.ring}`).prop('aria-valuemax')).toBe(100);
  });

  it('Sets the max', () => {
    const wrapper = defaultProgressDash({ max: 200 });
    expect(wrapper.find(`.${styles.ring}`).prop('aria-valuemax')).toBe(200);
  });
});

describe('min', () => {
  it('Is 0 by default', () => {
    const wrapper = defaultProgressDash();
    expect(wrapper.find(`.${styles.ring}`).prop('aria-valuemin')).toBe(0);
  });

  it('Sets the min', () => {
    const wrapper = defaultProgressDash({ min: 200 });
    expect(wrapper.find(`.${styles.ring}`).prop('aria-valuemin')).toBe(200);
  });
});

describe('size', () => {
  it('Is 128 by default', () => {
    const wrapper = defaultProgressDash();
    const style = wrapper.find(`.${styles.ring}`).prop('style');
    expect(style.width).toBe(128);
    expect(style.height).toBe(128);
  });

  it('Sets the size', () => {
    const wrapper = defaultProgressDash({ size: 256 });
    const style = wrapper.find(`.${styles.ring}`).prop('style');
    expect(style.width).toBe(256);
    expect(style.height).toBe(256);
  });
});

describe('value', () => {
  it('Is 0 by default', () => {
    const wrapper = defaultProgressDash();
    expect(wrapper.find(`.${styles.ring}`).prop('aria-valuenow')).toBe(0);
    expect(wrapper.find('Spring').prop('to')).toHaveProperty('dash', 0);
  });

  it('Sets the value', () => {
    const wrapper = defaultProgressDash({ value: 30 });
    expect(wrapper.find(`.${styles.ring}`).prop('aria-valuenow')).toBe(30);
    expect(wrapper.find('Spring').prop('to')).toHaveProperty(
      'dash',
      0.3 * BARSIZE
    );
  });
});

describe('width', () => {
  it('Is 6 by default', () => {
    const wrapper = defaultProgressDash();
    expect(wrapper.find(`.${styles.track}`).prop('strokeWidth')).toBe(6);
  });

  it('Sets the width', () => {
    const wrapper = defaultProgressDash({ width: 20 });
    expect(wrapper.find(`.${styles.track}`).prop('strokeWidth')).toBe(20);
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultProgressDash({ 'data-text': 'text' });
    expect(wrapper.find(`.${styles.ring}`).prop('data-text')).toBe('text');
  });
});
