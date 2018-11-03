import React from 'react';
import { mount } from 'enzyme';

import InputGroup from './InputGroup';
import styles from './InputGroup.module.scss';

import Button from '../Button/Button';

const rootSelector = `.${styles.group}`;
const defaultInputGroup = (props = {}) =>
  mount(
    <InputGroup {...props}>
      <Button id="one">One</Button>
      <Button id="two">Two</Button>
    </InputGroup>
  );

it('Renders InputGroup with children', () => {
  const wrapper = defaultInputGroup();
  expect(wrapper.find(rootSelector).length).toBe(1);
  expect(wrapper.find('button').length).toBe(2);
  expect(wrapper.find(rootSelector).text()).toBe('OneTwo');
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultInputGroup({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('size', () => {
  it('Is md by default', () => {
    const wrapper = defaultInputGroup();
    expect(
      wrapper
        .find('button')
        .first()
        .hasClass('md')
    ).toBe(true);
  });

  it('sets the size', () => {
    const wrapper = defaultInputGroup({ size: 'lg' });
    expect(
      wrapper
        .find('button')
        .first()
        .hasClass('lg')
    ).toBe(true);
  });

  it('forces size on child components', () => {
    const wrapper = mount(
      <InputGroup>
        <Button size="lg">Lg</Button>
        <Button>Md</Button>
        <Button size="sm">Sm</Button>
      </InputGroup>
    );

    expect(
      wrapper
        .find('button')
        .at(0)
        .hasClass('md')
    ).toBe(true);

    expect(
      wrapper
        .find('button')
        .at(1)
        .hasClass('md')
    ).toBe(true);

    expect(
      wrapper
        .find('button')
        .at(2)
        .hasClass('md')
    ).toBe(true);
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultInputGroup({
      id: 'group',
      'data-text': 'my-text'
    });

    expect(wrapper.find(rootSelector).prop('id')).toBe('group');
    expect(wrapper.find(rootSelector).prop('data-text')).toBe('my-text');
  });
});
