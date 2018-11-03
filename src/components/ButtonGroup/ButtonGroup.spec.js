import React from 'react';
import { shallow, mount } from 'enzyme';

import ButtonGroup from './ButtonGroup';
import styles from './ButtonGroup.module.scss';

import Button from '../Button/Button';

const rootSelector = `.${styles.buttons}`;
const defaultButtonGroup = (props = {}) =>
  shallow(
    <ButtonGroup {...props}>
      <Button id="one">One</Button>
      <Button id="two">Two</Button>
    </ButtonGroup>
  );

it('Renders ButtonGroup with children', () => {
  const wrapper = mount(
    <ButtonGroup>
      <Button id="one">One</Button>
      <Button id="two">Two</Button>
    </ButtonGroup>
  );

  expect(wrapper.find('button').length).toBe(2);
  expect(
    wrapper
      .find(rootSelector)
      .first()
      .text()
  ).toBe('OneTwo');
});

describe('props', () => {
  it('Passes props to InputGroup', () => {
    const wrapper = defaultButtonGroup({
      size: 'lg',
      className: 'my-class'
    });

    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
    expect(wrapper.find('InputGroup').prop('size')).toBe('lg');
  });
});
