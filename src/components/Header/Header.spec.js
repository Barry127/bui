import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header';
import styles from './Header.module.scss';

const rootSelector = `.${styles.header}`;
const defaultHeader = (text = 'DefaultHeader') =>
  shallow(<Header>{text}</Header>);

it('Renders Header with children', () => {
  const wrapper = defaultHeader('MyHeader');
  expect(wrapper.find(rootSelector).length).toBe(1);
  expect(wrapper.find(rootSelector).text()).toBe('MyHeader');
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = shallow(
      <Header className="my-class">Styled Header</Header>
    );
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('color', () => {
  it('Sets the color', () => {
    const wrapper = shallow(<Header color="blue">I'm blue</Header>);
    expect(wrapper.find(rootSelector).hasClass(styles.blue)).toBe(true);

    const wrapper2 = shallow(<Header color="inherit">I'm inheritted</Header>);
    expect(wrapper2.find(rootSelector).hasClass(styles.inherit)).toBe(true);
  });
});

describe('level', () => {
  it('Is level 1 by default', () => {
    const wrapper = defaultHeader();
    expect(wrapper.is('h1')).toBe(true);
  });

  it('Sets the level', () => {
    const h3Wrapper = shallow(<Header level={3}>Hello World</Header>);
    expect(h3Wrapper.is('h3')).toBe(true);
    expect(h3Wrapper.find(rootSelector).hasClass(styles.h3)).toBe(true);

    const h6Wrapper = shallow(<Header level={6}>Hello World</Header>);
    expect(h6Wrapper.is('h6')).toBe(true);
    expect(h6Wrapper.find(rootSelector).hasClass(styles.h6)).toBe(true);
  });
});

describe('truncate', () => {
  it('Does not truncate by default', () => {
    const wrapper = defaultHeader();
    expect(wrapper.find(rootSelector).hasClass(styles.truncate)).toBe(false);
  });

  it('Sets truncate', () => {
    const wrapper = shallow(<Header truncate>I'm truncated</Header>);
    expect(wrapper.find(rootSelector).hasClass(styles.truncate)).toBe(true);
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = shallow(
      <Header id="header-id" data-text="hello">
        Hello World
      </Header>
    );

    expect(wrapper.find('#header-id').length).toBe(1);
    expect(wrapper.find(rootSelector).prop('data-text')).toBe('hello');
  });
});
