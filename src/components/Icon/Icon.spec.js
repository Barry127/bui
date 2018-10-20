import React from 'react';
import { shallow } from 'enzyme';

import Icon from './Icon';
import styles from './Icon.module.scss';

import icons, { registerIcon } from './library';

registerIcon({
  name: 'circle',
  icon: {
    tag: 'svg',
    attrs: { viewBox: '0 0 24 24' },
    children: [
      {
        tag: 'circle',
        attrs: {
          cx: 12,
          cy: 12,
          r: 10
        }
      }
    ]
  }
});

const rootSelector = `.${styles.icon}`;
const defaultIcon = (icon = 'circle') => shallow(<Icon icon={icon} />);

it('Renders Icon', () => {
  const wrapper = defaultIcon();
  expect(wrapper.find(rootSelector).length).toBe(1);
  expect(wrapper.find(rootSelector).prop('role')).toBe('icon');
});

it('Renders a red square when icon is not registered', () => {
  const wrapper = defaultIcon('this_icon_does_not_exist');
  expect(wrapper.find(`span.${styles.icon}`).hasClass(styles.none)).toBe(true);
});

describe('accessibilityLabel', () => {
  it('Defaults to icon name', () => {
    const wrapper = defaultIcon();
    expect(wrapper.find(rootSelector).prop('aria-labelledby')).toBe('circle');
  });

  it('Sets accessibilityLabel', () => {
    const wrapper = shallow(
      <Icon icon="circle" accessibilityLabel="A big circle icon" />
    );
    expect(wrapper.find(rootSelector).prop('aria-labelledby')).toBe(
      'A big circle icon'
    );
  });
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = shallow(<Icon icon="circle" className="my-class" />);
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('color', () => {
  it('Color is inherit by default', () => {
    const wrapper = defaultIcon();
    expect(wrapper.find(rootSelector).hasClass(styles.inherit)).toBe(true);
  });

  it('Sets the color class', () => {
    const wrapper = shallow(<Icon icon="circle" color="blue" />);
    expect(wrapper.find(rootSelector).hasClass(styles.blue)).toBe(true);

    const wrapper2 = shallow(<Icon icon="circle" color="red50" />);
    expect(wrapper2.find(rootSelector).hasClass(styles.red50)).toBe(true);
  });
});

describe('size', () => {
  it('Is 1em by default', () => {
    const wrapper = defaultIcon();
    expect(wrapper.find(rootSelector).prop('style')).toHaveProperty(
      'fontSize',
      '1em'
    );
  });

  it('Sets the size', () => {
    const wrapper = shallow(<Icon icon="circle" size={96} />);
    expect(wrapper.find(rootSelector).prop('style')).toHaveProperty(
      'fontSize',
      96
    );
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = shallow(
      <Icon icon="circle" id="my-icon" data-text="my-circle" />
    );

    expect(wrapper.find('#my-icon').length).toBe(1);
    expect(wrapper.find(rootSelector).prop('data-text')).toBe('my-circle');
  });
});
