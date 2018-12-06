import React from 'react';
import { shallow, render } from 'enzyme';

import Item from './Item';
import styles from './Breadcrumb.module.scss';

const rootSelector = `.${styles.item}`;

const defaultItem = (props = {}, children = 'Content') =>
  shallow(<Item {...props}>{children}</Item>);

it('Renders Item with children', () => {
  const wrapper = defaultItem();
  expect(wrapper.find(rootSelector).length).toBe(1);

  const wrapper2 = render(<Item>Content</Item>);
  expect(wrapper2.text()).toBe('Content');
});

describe('active', () => {
  it('Is not active by default', () => {
    const wrapper = defaultItem();
    expect(wrapper.find(rootSelector).prop('weight')).toBe(null);
  });

  it('Sets active', () => {
    const wrapper = defaultItem({ active: true });
    expect(wrapper.find(rootSelector).prop('weight')).toBe('bold');
  });
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultItem({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});
