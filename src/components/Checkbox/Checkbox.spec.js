import React from 'react';
import { mount } from 'enzyme';

import Checkbox from './Checkbox';
import styles from './Checkbox.module.scss';

const rootSelector = `.${styles.checkbox}`;
const defaultCheckbox = (props = {}) => {
  const allProps = Object.assign(
    {},
    {
      name: 'cb',
      onChange: () => null
    },
    props
  );
  const wrapper = mount(<Checkbox {...allProps}>Label</Checkbox>);
  return wrapper;
};

it('Renders Checkbox with children', () => {
  const wrapper = defaultCheckbox();
  expect(wrapper.find(rootSelector).length).toBe(1);
  expect(wrapper.find(rootSelector).text()).toBe('Label');
});

describe('checked', () => {
  it('Is not checked by default', () => {
    const wrapper = defaultCheckbox();
    expect(wrapper.find('input').prop('checked')).toBe(false);
  });

  it('Sets the checked state', () => {
    const wrapper = defaultCheckbox({ checked: true });
    expect(wrapper.find('input').prop('checked')).toBe(true);
  });
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultCheckbox({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('disabled', () => {
  it('Is not disabled by default', () => {
    const wrapper = defaultCheckbox();
    expect(wrapper.find('input').prop('disabled')).toBe(false);
  });

  it('Sets the disabled state', () => {
    const wrapper = defaultCheckbox({ disabled: true });
    expect(wrapper.find('input').prop('disabled')).toBe(true);
  });
});

describe('hasError', () => {
  it('Is has no error default', () => {
    const wrapper = defaultCheckbox();
    expect(wrapper.find(rootSelector).hasClass(styles.error)).toBe(false);
  });

  it('Sets the error state', () => {
    const wrapper = defaultCheckbox({ hasError: true });
    expect(wrapper.find(rootSelector).hasClass(styles.error)).toBe(true);
  });
});

describe('id', () => {
  it('Sets the id', () => {
    const wrapper = defaultCheckbox({ id: 'my-radio' });
    expect(wrapper.find('input').prop('id')).toBe('my-radio');
  });
});

describe('name', () => {
  it('Sets the name', () => {
    const wrapper = defaultCheckbox({ name: 'my-radio' });
    expect(wrapper.find('input').prop('name')).toBe('my-radio');
  });
});

describe('size', () => {
  it('Is md by default', () => {
    const wrapper = defaultCheckbox();
    expect(wrapper.find(rootSelector).hasClass(styles.md)).toBe(true);
  });

  it('Sets the size', () => {
    const wrapper = defaultCheckbox({ size: 'lg' });
    expect(wrapper.find(rootSelector).hasClass(styles.lg)).toBe(true);
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultCheckbox({
      'data-info': 'Hello World',
      autoFocus: true
    });
    expect(wrapper.find('input').prop('data-info')).toBe('Hello World');
    expect(wrapper.find('input').prop('autoFocus')).toBe(true);
  });
});
