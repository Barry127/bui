import React from 'react';
import { shallow, render } from 'enzyme';

import ProgressBar from './ProgressBar';
import styles from './Progress.module.scss';

const rootSelector = `.${styles.bar}`;
const defaultProgressBar = props => shallow(<ProgressBar {...props} />);

it('Renders ProgressBar with children', () => {
  const wrapper = defaultProgressBar();
  expect(wrapper.find(rootSelector).length).toBe(1);

  const wrapper2 = render(<ProgressBar>Content</ProgressBar>);
  expect(wrapper2.find(`.${styles.content}`).text()).toBe('Content');
});

describe('active', () => {
  it('Is not active default', () => {
    const wrapper = defaultProgressBar();
    expect(wrapper.find(rootSelector).hasClass(styles.active)).toBe(false);
  });

  it('Sets active', () => {
    const wrapper = defaultProgressBar({ active: true });
    expect(wrapper.find(rootSelector).hasClass(styles.active)).toBe(true);
  });

  it('Does not set active on an indeterminate bar', () => {
    const wrapper = defaultProgressBar({ active: true, indeterminate: true });
    expect(wrapper.find(rootSelector).hasClass(styles.active)).toBe(false);
  });
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultProgressBar({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('color', () => {
  it('Is primary default', () => {
    const wrapper = defaultProgressBar();
    expect(wrapper.find(rootSelector).hasClass(styles.primary)).toBe(true);
  });

  it('Sets the color', () => {
    const wrapper = defaultProgressBar({ color: 'danger' });
    expect(wrapper.find(rootSelector).hasClass(styles.danger)).toBe(true);
  });
});

describe('indeterminate', () => {
  it('Is not indeterminate default', () => {
    const wrapper = defaultProgressBar();
    expect(wrapper.find(rootSelector).hasClass(styles.indeterminate)).toBe(
      false
    );
    expect(wrapper.find(`.${styles.outer}`).prop('aria-valuetext')).toBe(
      undefined
    );
  });

  it('Sets indeterminate', () => {
    const wrapper = defaultProgressBar({ indeterminate: true });
    expect(wrapper.find(rootSelector).hasClass(styles.indeterminate)).toBe(
      true
    );
  });

  it('Sets aria-valuetext to indeterminate', () => {
    const wrapper = defaultProgressBar({ indeterminate: true });
    expect(wrapper.find(`.${styles.outer}`).prop('aria-valuetext')).toBe(
      'indeterminate'
    );
  });
});

describe('max', () => {
  it('Is 100 by default', () => {
    const wrapper = defaultProgressBar();
    expect(wrapper.find(`.${styles.outer}`).prop('aria-valuemax')).toBe(100);
  });

  it('Sets the max', () => {
    const wrapper = defaultProgressBar({ max: 200 });
    expect(wrapper.find(`.${styles.outer}`).prop('aria-valuemax')).toBe(200);
  });
});

describe('min', () => {
  it('Is 0 by default', () => {
    const wrapper = defaultProgressBar();
    expect(wrapper.find(`.${styles.outer}`).prop('aria-valuemin')).toBe(0);
  });

  it('Sets the min', () => {
    const wrapper = defaultProgressBar({ min: 200 });
    expect(wrapper.find(`.${styles.outer}`).prop('aria-valuemin')).toBe(200);
  });
});

describe('value', () => {
  it('Is 0 by default', () => {
    const wrapper = defaultProgressBar();
    expect(wrapper.find(`.${styles.outer}`).prop('aria-valuenow')).toBe(0);
    expect(wrapper.find('Spring').prop('to')).toHaveProperty('x', 0);
  });

  it('Sets the value', () => {
    const wrapper = defaultProgressBar({ value: 30 });
    expect(wrapper.find(`.${styles.outer}`).prop('aria-valuenow')).toBe(30);
    expect(wrapper.find('Spring').prop('to')).toHaveProperty('x', 30);
  });

  it('Does not set area-valuenow when bar is indeterminate', () => {
    const wrapper = defaultProgressBar({ indeterminate: true });
    expect(wrapper.find(`.${styles.outer}`).prop('aria-valuenow')).toBe(
      undefined
    );
  });
});

describe('width', () => {
  it('Is 10 by default', () => {
    const wrapper = defaultProgressBar();
    expect(wrapper.find(`.${styles.outer}`).prop('style')).toHaveProperty(
      'height',
      10
    );
  });

  it('Sets the width', () => {
    const wrapper = defaultProgressBar({ width: 20 });
    expect(wrapper.find(`.${styles.outer}`).prop('style')).toHaveProperty(
      'height',
      20
    );
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultProgressBar({ 'data-text': 'text' });
    expect(wrapper.find(`.${styles.outer}`).prop('data-text')).toBe('text');
  });
});
