import React from 'react';
import { shallow, render, mount } from 'enzyme';

import Breadcrumb from './Breadcrumb';
import Item from './Item';
import styles from './Breadcrumb.module.scss';

const rootSelector = `.${styles.breadcrumb}`;
const itemSelector = `.${styles.item}`;
const separatorSelector = `.${styles.separator}`;

const defaultBreadcrumb = (props = {}, method = shallow) =>
  method(
    <Breadcrumb {...props}>
      <Item>A</Item>
      <p>B</p>
      <Item active>C</Item>
      <Item>D</Item>
    </Breadcrumb>
  );

it('Renders Breadcrumb with children', () => {
  const wrapper = defaultBreadcrumb();
  expect(wrapper.find(rootSelector).length).toBe(1);

  const wrapper2 = defaultBreadcrumb({}, render);
  expect(wrapper2.text()).toBe('A/C/D');
});

it('Exports Item as static property', () => {
  expect(Breadcrumb.Item).toBe(Item);
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultBreadcrumb({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('separator', () => {
  it('Is / by default', () => {
    const wrapper = defaultBreadcrumb();
    expect(wrapper.find(separatorSelector).length).toBe(2);
  });

  it('Sets separator as string', () => {
    const wrapper = defaultBreadcrumb({ separator: '>' });
    expect(wrapper.find(separatorSelector).length).toBe(2);

    const wrapper2 = defaultBreadcrumb({ separator: '>' }, render);
    expect(wrapper2.text()).toBe('A>C>D');
  });

  it('Sets separator as node', () => {
    const separator = <div className="s">.</div>;
    const wrapper = defaultBreadcrumb({ separator });
    expect(wrapper.find(separatorSelector).length).toBe(2);
    expect(wrapper.find('.s').length).toBe(2);

    const wrapper2 = defaultBreadcrumb({ separator }, render);
    expect(wrapper2.text()).toBe('A.C.D');
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultBreadcrumb({ 'data-text': 'text' });
    expect(wrapper.find(rootSelector).prop('data-text')).toBe('text');
  });
});
