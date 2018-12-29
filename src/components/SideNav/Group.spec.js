import React from 'react';
import { shallow, mount } from 'enzyme';

import Group from './Group';
import Item from './Item';
import styles from './SideNav.module.scss';

const rootSelector = `.${styles.group}`;
const linkSelector = 'a';

const defaultProps = {
  title: 'myGroup'
};

const defaultGroup = (props = {}, method = shallow) => {
  const allProps = Object.assign({}, defaultProps, props);
  return method(
    <Group {...allProps}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Group>
  );
};

it('Renders Item with children', () => {
  const wrapper = defaultGroup({}, mount);

  expect(wrapper.find(rootSelector).length).toBe(1);
  expect(
    wrapper
      .find(linkSelector)
      .first()
      .text()
  ).toBe('myGroup');
  expect(wrapper.text()).toBe('myGroupOneTwoThree');
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultGroup({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('collapsible', () => {
  it('Is collapsible by default', () => {
    const wrapper = defaultGroup({}, mount);
    expect(wrapper.state().open).toBe(true);

    wrapper
      .find(linkSelector)
      .first()
      .simulate('click');

    expect(wrapper.state().open).toBe(false);
  });

  it('Sets collapsible', () => {
    const wrapper = defaultGroup({ collapsible: false }, mount);
    expect(wrapper.state().open).toBe(true);

    wrapper
      .find(linkSelector)
      .first()
      .simulate('click');

    expect(wrapper.state().open).toBe(true);
  });
});

describe('Open', () => {
  it('Is Open by default', () => {
    const wrapper = defaultGroup({}, mount);

    expect(wrapper.find('ul a').length).toBe(3);
  });
  it('Sets open', () => {
    const wrapper = defaultGroup({ open: false }, mount);

    expect(wrapper.find('ul a').length).toBe(0);
  });
  it('Is always open if not collapsible', () => {
    const wrapper = defaultGroup({ open: false, collapsible: false }, mount);

    expect(wrapper.find('ul a').length).toBe(3);

    const wrapper2 = defaultGroup({ open: false, collapsible: true }.mount);
    expect(wrapper2.find('ul a').length).toBe(0);

    wrapper2.setProps({ collapsible: false });
    expect(wrapper.find('ul a').length).toBe(3);
  });
});

describe('Title', () => {
  it('Has no title by default', () => {
    const wrapper = defaultGroup({ title: undefined });
    expect(wrapper.find(linkSelector).length).toBe(0);
  });

  it('Sets title', () => {
    const wrapper = defaultGroup({ title: 'Hello' }, mount);
    expect(wrapper.find(linkSelector).length).toBe(4);
    expect(
      wrapper
        .find(linkSelector)
        .first()
        .text()
    ).toBe('Hello');
  });
});

describe('to', () => {
  it('Is # by default', () => {
    const wrapper = defaultGroup();
    expect(wrapper.find(linkSelector).prop('href')).toBe('#');
  });

  it('Sets to', () => {
    const wrapper = defaultGroup({ to: 'index.html' });
    expect(wrapper.find(linkSelector).prop('href')).toBe('index.html');
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultGroup({ 'data-text': 'text' });
    expect(wrapper.find(rootSelector).prop('data-text')).toBe('text');
  });
});
