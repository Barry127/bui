import React from 'react';
import { shallow, render } from 'enzyme';

import FormRow from './FormRow';
import styles from './Form.module.scss';

const rootSelector = `.${styles.row}`;
const defaultFormRow = ({ ...props }) =>
  shallow(<FormRow {...props}>Content</FormRow>);

it('Renders FormRow with children', () => {
  const wrapper = defaultFormRow({ label: 'yes', htmlFor: 'id' });
  expect(wrapper.find(rootSelector).length).toBe(1);
  expect(wrapper.find('FormLabel').length).toBe(1);

  const wrapper2 = render(<FormRow>Content</FormRow>);
  expect(
    wrapper
      .find('div')
      .at(1)
      .text()
  ).toBe('Content');
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultFormRow({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('disabled', () => {
  it('Is not disabled default', () => {
    const wrapper = defaultFormRow({ label: 'yes', htmlFor: 'id' });
    expect(wrapper.find(rootSelector).hasClass(styles.disabled)).toBe(false);
    expect(wrapper.find('FormLabel').prop('disabled')).toBe(false);
  });

  it('Sets the disabled state', () => {
    const wrapper = defaultFormRow({
      label: 'yes',
      htmlFor: 'id',
      disabled: true
    });
    expect(wrapper.find(rootSelector).hasClass(styles.disabled)).toBe(true);
    expect(wrapper.find('FormLabel').prop('disabled')).toBe(true);
  });
});

describe('hasError', () => {
  it('Is has no error default', () => {
    const wrapper = defaultFormRow({ label: 'yes', htmlFor: 'id' });
    expect(wrapper.find(rootSelector).hasClass(styles.error)).toBe(false);
    expect(wrapper.find('FormLabel').prop('hasError')).toBe(false);
  });

  it('Sets the error state', () => {
    const wrapper = defaultFormRow({
      hasError: true,
      label: 'yes',
      htmlFor: 'id'
    });
    expect(wrapper.find(rootSelector).hasClass(styles.error)).toBe(true);
    expect(wrapper.find('FormLabel').prop('hasError')).toBe(true);
  });
});

describe('htmlFor', () => {
  it('Passes htmlFor to FormLabel', () => {
    const wrapper = defaultFormRow({ label: 'yes', htmlFor: 'id' });
    expect(wrapper.find('FormLabel').prop('htmlFor')).toBe('id');
  });
});

describe('id', () => {
  it('Sets the id', () => {
    const wrapper = defaultFormRow({
      id: 'label-id',
      label: 'yes',
      htmlFor: 'id'
    });
    expect(wrapper.find('#label-id').length).toBe(1);
    expect(wrapper.find('FormLabel').prop('id')).toBe('label-id');
  });
});

describe('label', () => {
  it('Renders no label by default', () => {
    const wrapper = defaultFormRow();
    expect(wrapper.find('FormLabel').length).toBe(0);
  });

  it('Renders label from string', () => {
    const wrapper = render(
      <FormRow htmlFor="id" label="my-label">
        Content
      </FormRow>
    );
    expect(wrapper.find('label').text()).toBe('my-label');
  });

  it('Renders label from function', () => {
    const wrapper = render(
      <FormRow htmlFor="id" label={() => <div>my-function-label</div>}>
        Content
      </FormRow>
    );
    expect(wrapper.find('label').text()).toBe('my-function-label');
  });
});

describe('size', () => {
  it('Is md by default', () => {
    const wrapper = defaultFormRow({ label: 'yes', htmlFor: 'id' });
    expect(wrapper.find(rootSelector).hasClass(styles.md)).toBe(true);
    expect(wrapper.find('FormLabel').prop('size')).toBe('md');
  });

  it('Sets the size', () => {
    const wrapper = defaultFormRow({
      size: 'lg',
      label: 'yes',
      htmlFor: 'id'
    });
    expect(wrapper.find(rootSelector).hasClass(styles.lg)).toBe(true);
    expect(wrapper.find('FormLabel').prop('size')).toBe('lg');
  });
});
