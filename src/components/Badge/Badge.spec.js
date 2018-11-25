import React from 'react';
import { mount } from 'enzyme';

import Badge from './Badge';
import styles from './Badge.module.scss';

const containerSelector = `.${styles.container}`;
const badgeSelector = `.${styles.badge}`;

const defaultBadge = (props = {}, children) => {
  const allProps = Object.assign({}, { count: 1 }, props);
  return mount(<Badge {...allProps}>{children}</Badge>);
};

it('Renders Badge', () => {
  const wrapper = defaultBadge();
  expect(wrapper.find(containerSelector).length).toBe(0);
  expect(wrapper.find(badgeSelector).length).toBe(1);
  expect(wrapper.find(badgeSelector).text()).toBe('1');
});

it('Renders Badge with children', () => {
  const wrapper = defaultBadge({}, <div className="content">Content</div>);
  expect(wrapper.find(containerSelector).length).toBe(1);
  expect(wrapper.find(badgeSelector).length).toBe(1);
  expect(wrapper.find(badgeSelector).text()).toBe('1');
  expect(wrapper.find('.content').length).toBe(1);
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultBadge({ className: 'my-class' });
    expect(wrapper.find(badgeSelector).hasClass('my-class')).toBe(true);
  });
});

describe('color', () => {
  it('Color is default by default', () => {
    const wrapper = defaultBadge();
    expect(wrapper.find(badgeSelector).hasClass(styles.default)).toBe(true);
  });

  it('Sets the color', () => {
    const wrapper = defaultBadge({ color: 'info' });
    expect(wrapper.find(badgeSelector).hasClass(styles.info)).toBe(true);

    const wrapper2 = defaultBadge({ color: 'danger' });
    expect(wrapper2.find(badgeSelector).hasClass(styles.danger)).toBe(true);
  });
});

describe('count', () => {
  it('Sets count', () => {
    const wrapper = defaultBadge({ count: 3 });
    expect(wrapper.find(badgeSelector).text()).toBe('3');
  });
});

describe('countOverflow', () => {
  it('CountOverflow is 99 by default', () => {
    const wrapper = defaultBadge({ count: 99 });
    const wrapper2 = defaultBadge({ count: 100 });

    expect(wrapper.find(badgeSelector).text()).toBe('99');
    expect(wrapper2.find(badgeSelector).text()).toBe('99+');
  });

  it('Sets countOverflow', () => {
    const wrapper = defaultBadge({ count: 30, countOverflow: 30 });
    const wrapper2 = defaultBadge({ count: 31, countOverflow: 30 });

    expect(wrapper.find(badgeSelector).text()).toBe('30');
    expect(wrapper2.find(badgeSelector).text()).toBe('30+');
  });
});

describe('showZero', () => {
  it('Does not show zero by default', () => {
    const wrapper = defaultBadge({ count: 0 });
    expect(wrapper.find(badgeSelector).length).toBe(0);
  });

  it('Shows zero when showZero is true', () => {
    const wrapper = defaultBadge({ count: 0, showZero: true });
    expect(wrapper.find(badgeSelector).length).toBe(1);
    expect(wrapper.find(badgeSelector).text()).toBe('0');
  });

  it('Does not show negative count values', () => {
    const wrapper = defaultBadge({ count: -1 });
    const wrapper2 = defaultBadge({ count: -1, showZero: true });

    expect(wrapper.find(badgeSelector).length).toBe(0);
    expect(wrapper2.find(badgeSelector).length).toBe(0);
  });
});

describe('title', () => {
  it('Is count by default', () => {
    const wrapper = defaultBadge();
    expect(wrapper.find(badgeSelector).prop('title')).toBe(1);
  });

  it('Sets title', () => {
    const wrapper = defaultBadge({ title: '1 new message' });
    expect(wrapper.find(badgeSelector).prop('title')).toBe('1 new message');
  });
});

describe('props', () => {
  it('Passes props', () => {
    const onClick = jest.fn();

    const wrapper = defaultBadge({ onClick, id: 'my-badge' });
    const wrapper2 = defaultBadge(
      { onClick, id: 'my-badge' },
      <div>With children</div>
    );

    expect(wrapper.find(badgeSelector).prop('onClick')).toBe(onClick);
    expect(wrapper.find(badgeSelector).prop('id')).toBe('my-badge');
    expect(wrapper2.find(badgeSelector).prop('onClick')).toBe(onClick);
    expect(wrapper2.find(badgeSelector).prop('id')).toBe('my-badge');
  });
});
