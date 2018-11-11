import React from 'react';
import { shallow } from 'enzyme';

import FormLabel from './FormLabel';
import styles from './Form.module.scss';

const rootSelector = `.${styles.label}`;
const defaultFormLabel = ({ ...props }, htmlFor = 'target') =>
  shallow(
    <FormLabel htmlFor={htmlFor} {...props}>
      Content
    </FormLabel>
  );

it('Renders FormLabel with children', () => {
  const wrapper = defaultFormLabel();
  expect(wrapper.find(rootSelector).length).toBe(1);
  expect(wrapper.find('label').text()).toBe('Content');
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultFormLabel({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('disabled', () => {
  it('Is not disabled default', () => {
    const wrapper = defaultFormLabel();
    expect(wrapper.find(rootSelector).hasClass(styles.disabled)).toBe(false);
  });

  it('Sets the disabled state', () => {
    const wrapper = defaultFormLabel({ disabled: true });
    expect(wrapper.find(rootSelector).hasClass(styles.disabled)).toBe(true);
  });
});

describe('hasError', () => {
  it('Is has no error default', () => {
    const wrapper = defaultFormLabel();
    expect(wrapper.find(rootSelector).hasClass(styles.error)).toBe(false);
  });

  it('Sets the error state', () => {
    const wrapper = defaultFormLabel({ hasError: true });
    expect(wrapper.find(rootSelector).hasClass(styles.error)).toBe(true);
  });
});

describe('htmlFor', () => {
  it('Sets htmlFor', () => {
    const wrapper = defaultFormLabel();
    expect(wrapper.find('label').prop('htmlFor')).toBe('target');

    const wrapper2 = defaultFormLabel({}, 'text');
    expect(wrapper2.find('label').prop('htmlFor')).toBe('text');
  });
});

describe('size', () => {
  it('Is md by default', () => {
    const wrapper = defaultFormLabel();
    expect(wrapper.find(rootSelector).hasClass(styles.md)).toBe(true);
  });

  it('Sets the size', () => {
    const wrapper = defaultFormLabel({ size: 'lg' });
    expect(wrapper.find(rootSelector).hasClass(styles.lg)).toBe(true);
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultFormLabel({ id: 'label-id', 'data-text': 'hello' });

    expect(wrapper.find('#label-id').length).toBe(1);
    expect(wrapper.find('label').prop('data-text')).toBe('hello');
  });
});
