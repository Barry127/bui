import React from 'react';
import { shallow } from 'enzyme';

import SideNav from './SideNav';
import Group from './Group';
import Item from './Item';
import styles from './SideNav.module.scss';

const rootSelector = `.${styles.nav}`;

const defaultSideNav = (props = {}) =>
  shallow(
    <SideNav {...props}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </SideNav>
  );

const resize = (wrapper, amount) => {
  const originalAddEventListener = document.addEventListener;
  const originalRemoveEventListener = document.removeEventListener;

  const listeners = {};
  document.addEventListener = (ev, cb) => {
    listeners[ev] = cb;
  };
  document.removeEventListener = jest.fn();

  wrapper
    .find(`.${styles.handle}`)
    .simulate('mousedown', { clientX: 200, preventDefault: () => null });

  // Only if resizable
  if (Object.keys(listeners).length > 0) {
    listeners.mousemove({ clientX: 200 + amount });
    listeners.mouseup({ preventDefault: () => null });

    // Cleanup mousemove and mouseup
    expect(document.removeEventListener.mock.calls.length).toBe(2);
  }

  document.addEventListener = originalAddEventListener;
  document.removeEventListener = originalRemoveEventListener;
};

it('Renders SideNav with children', () => {
  const wrapper = defaultSideNav();
  expect(wrapper.find(rootSelector).length).toBe(1);

  expect(wrapper.find('SideNavItem').length).toBe(3);
});

it('Exports Group as static property', () => {
  expect(SideNav.Group).toBe(Group);
});

it('Exports Item as static property', () => {
  expect(SideNav.Item).toBe(Item);
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultSideNav({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('maxWidth', () => {
  it('Sets maxWidth', () => {
    const wrapper = defaultSideNav({ maxWidth: 300 });
    expect(wrapper.state().width).toBe(200);

    resize(wrapper, 150);
    expect(wrapper.state().width).toBe(300);
  });
});

describe('minWidth', () => {
  it('Is 128 by default', () => {
    const wrapper = defaultSideNav();
    expect(wrapper.state().width).toBe(200);

    resize(wrapper, -100);
    expect(wrapper.state().width).toBe(128);
  });

  it('Sets minWidth', () => {
    const wrapper = defaultSideNav({ minWidth: 250 });
    expect(wrapper.state().width).toBe(250);

    resize(wrapper, 100);
    expect(wrapper.state().width).toBe(350);

    resize(wrapper, -300);
    expect(wrapper.state().width).toBe(250);
  });
});

describe('onResize', () => {
  it('Calls onResize once with the new size after resizing', () => {
    const onResize = jest.fn();
    const wrapper = defaultSideNav({ onResize });
    expect(wrapper.state().width).toBe(200);

    expect(onResize.mock.calls.length).toBe(0);

    resize(wrapper, 300);
    expect(wrapper.state().width).toBe(500);
    expect(onResize.mock.calls.length).toBe(1);
    expect(onResize.mock.calls[0][0]).toBe(500);
  });
});

describe('resizeable', () => {
  it('Is resizable by default', () => {
    const wrapper = defaultSideNav();
    expect(wrapper.find(rootSelector).hasClass(styles.resizable)).toBe(true);
    expect(wrapper.state().width).toBe(200);

    resize(wrapper, 50);
    expect(wrapper.state().width).toBe(250);

    resize(wrapper, -100);
    expect(wrapper.state().width).toBe(150);
  });

  it('Sets resizable', () => {
    const wrapper = defaultSideNav({ resizable: false });
    expect(wrapper.find(rootSelector).hasClass(styles.resizable)).toBe(false);
    expect(wrapper.state().width).toBe(200);

    resize(wrapper, 50);
    expect(wrapper.state().width).toBe(200);
  });
});

describe('width', () => {
  it('Is 200 by default', () => {
    const wrapper = defaultSideNav();
    expect(wrapper.state().width).toBe(200);
  });

  it('Sets width', () => {
    const wrapper = defaultSideNav({ width: 300 });
    expect(wrapper.state().width).toBe(300);
  });

  it('Keeps width between min and max', () => {
    const wrapper = defaultSideNav({ width: 200, minWidth: 250 });
    expect(wrapper.state().width).toBe(250);

    const wrapper2 = defaultSideNav({ width: 200, maxWidth: 150 });
    expect(wrapper2.state().width).toBe(150);
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultSideNav({ 'data-text': 'text' });
    expect(wrapper.find(rootSelector).prop('data-text')).toBe('text');
  });
});
