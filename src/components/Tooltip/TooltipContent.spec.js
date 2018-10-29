import React from 'react';
import { mount, shallow } from 'enzyme';

import TooltipContent from './TooltipContent';
import styles from './Tooltip.module.scss';

const rootSelector = `.${styles['content-container']}`;
const contentSelector = `.${styles['tooltip-content']}`;
const defaultTooltip = (text = 'MyTooltip') =>
  shallow(<TooltipContent>{text}</TooltipContent>);

it('Render TooltipContainer with children', () => {
  const wrapper = mount(<TooltipContent>MyTooltip</TooltipContent>);
  expect(wrapper.find(rootSelector).length).toBe(1);
  expect(
    wrapper
      .find(contentSelector)
      .first()
      .text()
  ).toBe('MyTooltip');
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = shallow(
      <TooltipContent className="my-class">
        Styled TooltipContent
      </TooltipContent>
    );
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('color', () => {
  it('Color is default by default', () => {
    const wrapper = defaultTooltip();
    expect(wrapper.find(rootSelector).hasClass(styles.default)).toBe(true);
  });

  it('Sets the color', () => {
    const wrapper = shallow(
      <TooltipContent color="primary">Primary Tooltip</TooltipContent>
    );
    expect(wrapper.find(rootSelector).hasClass(styles.primary)).toBe(true);

    const wrapper2 = shallow(
      <TooltipContent color="danger">Danger Tooltip</TooltipContent>
    );
    expect(wrapper2.find(rootSelector).hasClass(styles.danger)).toBe(true);
  });
});

describe('size', () => {
  it('Is md by default', () => {
    const wrapper = defaultTooltip();
    expect(wrapper.find(rootSelector).hasClass(styles.md)).toBe(true);
  });

  it('Sets the size', () => {
    const wrapper = shallow(
      <TooltipContent size="lg">Large TooltipContent</TooltipContent>
    );
    expect(wrapper.find(rootSelector).hasClass(styles.lg)).toBe(true);
  });
});

describe('position', () => {
  it('Is top by default', () => {
    const wrapper = defaultTooltip();
    expect(wrapper.find(rootSelector).hasClass(styles.top)).toBe(true);
  });

  it('Sets the position', () => {
    const wrapper = shallow(
      <TooltipContent position="topLeft">Tooltip</TooltipContent>
    );
    expect(wrapper.find(rootSelector).hasClass(styles.topLeft)).toBe(true);

    const wrapper2 = shallow(
      <TooltipContent position="bottomRight">Tooltip</TooltipContent>
    );
    expect(wrapper2.find(rootSelector).hasClass(styles.bottomRight)).toBe(true);
  });

  it('Sets the position icon', () => {
    const wrapper = defaultTooltip();
    expect(wrapper.find(`.${styles.caret}`).prop('icon')).toBe(
      '@bui-caret-down'
    );

    const wrapper2 = shallow(
      <TooltipContent position="bottomRight">Tooltip</TooltipContent>
    );
    expect(wrapper2.find(`.${styles.caret}`).prop('icon')).toBe(
      '@bui-caret-up'
    );
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = shallow(
      <TooltipContent id="tt-id" data-text="tt Text">
        Click Me
      </TooltipContent>
    );

    expect(wrapper.find('#tt-id').length).toBe(1);
    expect(wrapper.find(rootSelector).prop('data-text')).toBe('tt Text');
  });
});
