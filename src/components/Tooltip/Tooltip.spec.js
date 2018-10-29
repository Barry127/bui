import { EventEmitter } from 'events';

import React from 'react';
import { mount } from 'enzyme';

import Tooltip from './Tooltip';
import styles from './Tooltip.module.scss';

const originalGetElementById = document.getElementById;
let elemMock;

const containerSelector = `.${styles.tooltip}`;
const rootSelector = `.${styles['content-container']}`;
const contentSelector = `.${styles['tooltip-content']}`;

const defaultTooltip = (visible = true, text = 'MyTooltip', props = {}) =>
  mount(
    <Tooltip visible={visible} targetId="target" {...props}>
      {text}
    </Tooltip>
  );

beforeAll(() => {
  document.getElementById = () => {
    elemMock = new EventEmitter();
    elemMock.addEventListener = elemMock.on;
    elemMock.getBoundingClientRect = () => ({
      top: 50,
      left: 50,
      height: 100,
      width: 100
    });
    return elemMock;
  };
});

afterAll(() => {
  document.getElementById = originalGetElementById;
});

it('Renders Tooltip with children', () => {
  const wrapper = defaultTooltip();
  expect(wrapper.find(rootSelector).length).toBe(1);
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultTooltip(true, '', { className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('color', () => {
  it('Color is default by default', () => {
    const wrapper = defaultTooltip();
    expect(wrapper.find(rootSelector).hasClass(styles.default)).toBe(true);
  });

  it('Sets the color', () => {
    const wrapper = defaultTooltip(true, '', { color: 'primary' });
    expect(wrapper.find(rootSelector).hasClass(styles.primary)).toBe(true);

    const wrapper2 = defaultTooltip(true, '', { color: 'danger' });
    expect(wrapper2.find(rootSelector).hasClass(styles.danger)).toBe(true);
  });
});

describe('position', () => {
  it('Is top by default', () => {
    const wrapper = defaultTooltip();
    expect(wrapper.find(rootSelector).hasClass(styles.top)).toBe(true);
    expect(wrapper.find(containerSelector).prop('style')).toHaveProperty(
      'left',
      100
    );
  });

  it('Sets the position', () => {
    const wrapper = defaultTooltip(true, '', { position: 'topLeft' });
    expect(wrapper.find(rootSelector).hasClass(styles.topLeft)).toBe(true);
    expect(wrapper.find(containerSelector).prop('style')).toHaveProperty(
      'left',
      50
    );

    const wrapper2 = defaultTooltip(true, '', { position: 'bottomRight' });
    expect(wrapper2.find(rootSelector).hasClass(styles.bottomRight)).toBe(true);
    expect(wrapper2.find(containerSelector).prop('style')).toHaveProperty(
      'left',
      150
    );
  });
});

describe('size', () => {
  it('Is md by default', () => {
    const wrapper = defaultTooltip();
    expect(wrapper.find(rootSelector).hasClass(styles.md)).toBe(true);
  });

  it('Sets the size', () => {
    const wrapper = defaultTooltip(true, '', { size: 'lg' });
    expect(wrapper.find(rootSelector).hasClass(styles.lg)).toBe(true);
  });
});

describe('visible', () => {
  it('Is hidden by default', () => {
    const wrapper = mount(<Tooltip targetId="">TT</Tooltip>);
    expect(wrapper.find(containerSelector).length).toBe(0);
  });

  it('Is visible after mouse enter', () => {
    const wrapper = mount(<Tooltip targetId="">TT</Tooltip>);
    expect(wrapper.state().visible).toBe(false);
    expect(wrapper.find(containerSelector).length).toBe(0);
    elemMock.emit('mouseenter');
    wrapper.update();
    expect(wrapper.state().visible).toBe(true);
    expect(wrapper.find(containerSelector).length).toBe(1);
  });

  it('Is hidden after mouse leave', done => {
    const wrapper = mount(<Tooltip targetId="">TT</Tooltip>);
    expect(wrapper.state().visible).toBe(false);
    expect(wrapper.find(containerSelector).length).toBe(0);

    elemMock.emit('mouseenter');
    wrapper.update();
    expect(wrapper.state().visible).toBe(true);
    expect(wrapper.find(containerSelector).length).toBe(1);

    elemMock.emit('mouseleave');
    wrapper.update();
    expect(wrapper.state().visible).toBe(false);
    // SetTimeout to wait for transition
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find(containerSelector).length).toBe(0);
      done();
    }, 800);
  });

  it('Sets true', () => {
    const wrapper = defaultTooltip(true);
    expect(wrapper.state().visible).toBe(true);
    expect(wrapper.find(containerSelector).length).toBe(1);
  });

  it('Sets false', () => {
    const wrapper = defaultTooltip(false);
    expect(wrapper.state().visible).toBe(false);
    expect(wrapper.find(containerSelector).length).toBe(0);
  });
});
