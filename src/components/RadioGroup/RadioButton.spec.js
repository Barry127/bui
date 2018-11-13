import React from 'react';
import { shallow, mount } from 'enzyme';

import RadioButton from './RadioButton';
import styles from './RadioGroup.module.scss';

const rootSelector = `.${styles.radio}`;
const defaultRadioButton = (props = {}) => {
  const allProps = Object.assign(
    {},
    {
      name: 'radio',
      value: 'my-radio',
      onChange: () => null
    },
    props
  );
  return shallow(<RadioButton {...allProps}>Label</RadioButton>);
};

it('Renders RadioButton with children', () => {
  const wrapper = defaultRadioButton();
  expect(wrapper.find(rootSelector).length).toBe(1);
  const wrapper2 = mount(
    <RadioButton name="radio" value="my-radio" onChange={() => null}>
      Label
    </RadioButton>
  );
  expect(wrapper2.find(rootSelector).text()).toBe('Label');
});

describe('checked', () => {
  it('Is not checked by default', () => {
    const wrapper = defaultRadioButton();
    expect(wrapper.find('input').prop('checked')).toBe(false);
  });

  it('Sets the checked state', () => {
    const wrapper = defaultRadioButton({ checked: true });
    expect(wrapper.find('input').prop('checked')).toBe(true);
  });
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultRadioButton({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('disabled', () => {
  it('Is not disabled by default', () => {
    const wrapper = defaultRadioButton();
    expect(wrapper.find('input').prop('disabled')).toBe(false);
  });

  it('Sets the disabled state', () => {
    const wrapper = defaultRadioButton({ disabled: true });
    expect(wrapper.find('input').prop('disabled')).toBe(true);
  });
});

describe('hasError', () => {
  it('Is has no error default', () => {
    const wrapper = defaultRadioButton();
    expect(wrapper.find(rootSelector).hasClass(styles.error)).toBe(false);
  });

  it('Sets the error state', () => {
    const wrapper = defaultRadioButton({ hasError: true });
    expect(wrapper.find(rootSelector).hasClass(styles.error)).toBe(true);
  });
});

describe('id', () => {
  it('Sets the id', () => {
    const wrapper = defaultRadioButton({ id: 'my-radio' });
    expect(wrapper.find('#my-radio').length).toBe(1);
    expect(wrapper.find('input').prop('id')).toBe('my-radio');
  });
});

describe('name', () => {
  it('Sets the name', () => {
    const wrapper = defaultRadioButton({ name: 'my-radio' });
    expect(wrapper.find('input').prop('name')).toBe('my-radio');
  });
});

describe('size', () => {
  it('Is md by default', () => {
    const wrapper = defaultRadioButton();
    expect(wrapper.find(rootSelector).hasClass(styles.md)).toBe(true);
  });

  it('Sets the size', () => {
    const wrapper = defaultRadioButton({ size: 'lg' });
    expect(wrapper.find(rootSelector).hasClass(styles.lg)).toBe(true);
  });
});

describe('value', () => {
  it('Sets the value', () => {
    const wrapper = defaultRadioButton({ value: 'my-radio' });
    expect(wrapper.find('input').prop('value')).toBe('my-radio');
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultRadioButton({
      'data-info': 'Hello World',
      autoFocus: true
    });
    expect(wrapper.find('input').prop('data-info')).toBe('Hello World');
    expect(wrapper.find('input').prop('autoFocus')).toBe(true);
  });
});
