import React from 'react';
import { shallow } from 'enzyme';

import Item from './Item';
import styles from './SideNav.module.scss';

const rootSelector = `.${styles.item}`;
const linkSelector = 'a';

const defaultItem = (props = {}, children = 'ItemText') =>
  shallow(<Item {...props}>{children}</Item>);

it('Renders Item with children', () => {
  const wrapper = defaultItem();

  expect(wrapper.find(rootSelector).length).toBe(1);
  expect(wrapper.find(linkSelector).length).toBe(1);
  expect(wrapper.text()).toBe('ItemText');
});

describe('active', () => {
  it('Is not active by default', () => {
    const wrapper = defaultItem();
    expect(wrapper.find(rootSelector).hasClass(styles.active)).toBe(false);
  });

  it('Sets active', () => {
    const wrapper = defaultItem({ active: true });
    expect(wrapper.find(rootSelector).hasClass(styles.active)).toBe(true);
  });
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultItem({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('to', () => {
  it('Is # by default', () => {
    const wrapper = defaultItem();
    expect(wrapper.find(linkSelector).prop('href')).toBe('#');
  });

  it('Sets to', () => {
    const wrapper = defaultItem({ to: 'index.html' });
    expect(wrapper.find(linkSelector).prop('href')).toBe('index.html');
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultItem({ 'data-text': 'text' });
    expect(wrapper.find(linkSelector).prop('data-text')).toBe('text');
  });
});
