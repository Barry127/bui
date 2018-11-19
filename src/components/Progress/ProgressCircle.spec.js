import React from 'react';
import { shallow, render } from 'enzyme';

import ProgressCircle, { CIRCUMFERENCE } from './ProgressCircle';
import styles from './Progress.module.scss';

const rootSelector = `.${styles.circle}`;
const defaultProgressCircle = props => shallow(<ProgressCircle {...props} />);

it('Renders ProgressCircle with children', () => {
  const wrapper = defaultProgressCircle();
  expect(wrapper.find(rootSelector).length).toBe(1);

  const wrapper2 = render(<ProgressCircle>Content</ProgressCircle>);
  expect(wrapper2.find(`.${styles.content}`).text()).toBe('Content');
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultProgressCircle({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('color', () => {
  it('Is primary default', () => {
    const wrapper = defaultProgressCircle();
    expect(wrapper.find(rootSelector).hasClass(styles.primary)).toBe(true);
  });

  it('Sets the color', () => {
    const wrapper = defaultProgressCircle({ color: 'danger' });
    expect(wrapper.find(rootSelector).hasClass(styles.danger)).toBe(true);
  });
});

describe('indeterminate', () => {
  it('Is not indeterminate default', () => {
    const wrapper = defaultProgressCircle();
    expect(wrapper.find(rootSelector).hasClass(styles.indeterminate)).toBe(
      false
    );
    expect(wrapper.find(`.${styles.ring}`).prop('aria-valuetext')).toBe(
      undefined
    );
  });

  it('Sets indeterminate', () => {
    const wrapper = defaultProgressCircle({ indeterminate: true });
    expect(wrapper.find(rootSelector).hasClass(styles.indeterminate)).toBe(
      true
    );
  });

  it('Sets aria-valuetext to indeterminate', () => {
    const wrapper = defaultProgressCircle({ indeterminate: true });
    expect(wrapper.find(`.${styles.ring}`).prop('aria-valuetext')).toBe(
      'indeterminate'
    );
  });
});

describe('max', () => {
  it('Is 100 by default', () => {
    const wrapper = defaultProgressCircle();
    expect(wrapper.find(`.${styles.ring}`).prop('aria-valuemax')).toBe(100);
  });

  it('Sets the max', () => {
    const wrapper = defaultProgressCircle({ max: 200 });
    expect(wrapper.find(`.${styles.ring}`).prop('aria-valuemax')).toBe(200);
  });
});

describe('min', () => {
  it('Is 0 by default', () => {
    const wrapper = defaultProgressCircle();
    expect(wrapper.find(`.${styles.ring}`).prop('aria-valuemin')).toBe(0);
  });

  it('Sets the min', () => {
    const wrapper = defaultProgressCircle({ min: 200 });
    expect(wrapper.find(`.${styles.ring}`).prop('aria-valuemin')).toBe(200);
  });
});

describe('size', () => {
  it('Is 128 by default', () => {
    const wrapper = defaultProgressCircle();
    const style = wrapper.find(`.${styles.ring}`).prop('style');
    expect(style.width).toBe(128);
    expect(style.height).toBe(128);
  });

  it('Sets the size', () => {
    const wrapper = defaultProgressCircle({ size: 256 });
    const style = wrapper.find(`.${styles.ring}`).prop('style');
    expect(style.width).toBe(256);
    expect(style.height).toBe(256);
  });
});

describe('value', () => {
  it('Is 0 by default', () => {
    const wrapper = defaultProgressCircle();
    expect(wrapper.find(`.${styles.ring}`).prop('aria-valuenow')).toBe(0);
    expect(wrapper.find('Spring').prop('to')).toHaveProperty('dash', 0);
  });

  it('Sets the value', () => {
    const wrapper = defaultProgressCircle({ value: 30 });
    expect(wrapper.find(`.${styles.ring}`).prop('aria-valuenow')).toBe(30);
    expect(wrapper.find('Spring').prop('to')).toHaveProperty(
      'dash',
      0.3 * CIRCUMFERENCE
    );
  });

  it('Does not set area-valuenow when bar is indeterminate', () => {
    const wrapper = defaultProgressCircle({ indeterminate: true });
    expect(wrapper.find(`.${styles.ring}`).prop('aria-valuenow')).toBe(
      undefined
    );
  });
});

describe('width', () => {
  it('Is 6 by default', () => {
    const wrapper = defaultProgressCircle();
    expect(wrapper.find(`.${styles.track}`).prop('strokeWidth')).toBe(6);
  });

  it('Sets the width', () => {
    const wrapper = defaultProgressCircle({ width: 20 });
    expect(wrapper.find(`.${styles.track}`).prop('strokeWidth')).toBe(20);
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultProgressCircle({ 'data-text': 'text' });
    expect(wrapper.find(`.${styles.ring}`).prop('data-text')).toBe('text');
  });
});
