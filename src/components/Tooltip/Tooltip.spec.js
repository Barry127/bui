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
  it('Passes the className to TooltipContent', () => {
    const wrapper = defaultTooltip(true, '', { className: 'my-class' });
    expect(wrapper.find('TooltipContent').prop('className')).toBe('my-class');
  });
});

describe('color', () => {
  it('Passes the color to TooltipContent', () => {
    const wrapper = defaultTooltip(true, '', { color: 'primary' });
    expect(wrapper.find('TooltipContent').prop('color')).toBe('primary');

    const wrapper2 = defaultTooltip(true, '', { color: 'danger' });
    expect(wrapper2.find('TooltipContent').prop('color')).toBe('danger');
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
    expect(wrapper.find('TooltipContent').prop('position')).toBe('top');
  });

  it('Sets the position', () => {
    const wrapper = defaultTooltip(true, '', { position: 'topLeft' });
    expect(wrapper.find(rootSelector).hasClass(styles.topLeft)).toBe(true);
    expect(wrapper.find(containerSelector).prop('style')).toHaveProperty(
      'left',
      50
    );
    expect(wrapper.find('TooltipContent').prop('position')).toBe('topLeft');

    const wrapper2 = defaultTooltip(true, '', { position: 'bottomRight' });
    expect(wrapper2.find(rootSelector).hasClass(styles.bottomRight)).toBe(true);
    expect(wrapper2.find(containerSelector).prop('style')).toHaveProperty(
      'left',
      150
    );
    expect(wrapper2.find('TooltipContent').prop('position')).toBe(
      'bottomRight'
    );
  });
});

describe('size', () => {
  it('Passes the size to TooltipContent', () => {
    const wrapper = defaultTooltip(true, '', { size: 'lg' });
    expect(wrapper.find('TooltipContent').prop('size')).toBe('lg');
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

describe('props', () => {
  it('Passes props to TooltipContent', () => {
    const wrapper = defaultTooltip(true, '', {
      id: 'tt-id',
      'data-text': 'tt Text'
    });

    expect(wrapper.find('TooltipContent').prop('id')).toBe('tt-id');
    expect(wrapper.find('TooltipContent').prop('data-text')).toBe('tt Text');
  });
});
