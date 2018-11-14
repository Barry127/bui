import React from 'react';
import { shallow } from 'enzyme';

import styles from './Form.module.scss';

import FormRadioGroup from './FormRadioGroup';

const defaultFormRadioGroup = ({ ...props }) =>
  shallow(
    <FormRadioGroup
      value="b"
      name="name"
      onChange={() => null}
      options={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]}
      {...props}
    />
  );

it('Renders FormRadioGroup with children', () => {
  const wrapper = defaultFormRadioGroup();
  expect(wrapper.find('RadioGroup').length).toBe(1);
  expect(wrapper.find('FormRow').length).toBe(1);
});

describe('disabled', () => {
  it('Is not disabled default', () => {
    const wrapper = defaultFormRadioGroup();
    expect(wrapper.find('FormRow').prop('disabled')).toBe(false);
    expect(
      wrapper
        .find('RadioGroup')
        .prop('options')
        .map(opt => opt.disabled)
    ).toEqual([false, false]);
  });

  it('Sets the disabled state', () => {
    const wrapper = defaultFormRadioGroup({ disabled: true });
    expect(wrapper.find('FormRow').prop('disabled')).toBe(true);
    expect(
      wrapper
        .find('RadioGroup')
        .prop('options')
        .map(opt => opt.disabled)
    ).toEqual([true, true]);
  });
});

describe('hasError', () => {
  it('Has no error by default', () => {
    const wrapper = defaultFormRadioGroup();
    expect(wrapper.find('FormRow').prop('hasError')).toBe(false);
    expect(
      wrapper
        .find('RadioGroup')
        .prop('options')
        .map(opt => opt.hasError)
    ).toEqual([false, false]);
  });

  it('Sets the error state', () => {
    const wrapper = defaultFormRadioGroup({ hasError: true });
    expect(wrapper.find('FormRow').prop('hasError')).toBe(true);
    expect(
      wrapper
        .find('RadioGroup')
        .prop('options')
        .map(opt => opt.hasError)
    ).toEqual([true, true]);
  });
});

describe('inline', () => {
  it('Is not inline by default', () => {
    const wrapper = defaultFormRadioGroup();
    expect(wrapper.find('FormRow').prop('className')).not.toMatch(
      styles.radioInline
    );
    expect(wrapper.find('RadioGroup').prop('inline')).toBe(false);
  });

  it('Sets inline', () => {
    const wrapper = defaultFormRadioGroup({ inline: true });
    expect(wrapper.find('FormRow').prop('className')).toMatch(
      styles.radioInline
    );
    expect(wrapper.find('RadioGroup').prop('inline')).toBe(true);
  });
});

describe('label', () => {
  it('Passes label to FormRow', () => {
    const wrapper = defaultFormRadioGroup({ label: 'my-label' });
    expect(wrapper.find('FormRow').prop('label')).toBe('my-label');
  });

  it('Sets htmlFor to the selected radio', () => {
    const wrapper = defaultFormRadioGroup();
    expect(wrapper.find('FormRow').prop('htmlFor')).toBe('bui-radio-name-b');
  });

  it('Sets htmlFor to the first radio if no value is selected', () => {
    const wrapper = defaultFormRadioGroup({ value: '' });
    expect(wrapper.find('FormRow').prop('htmlFor')).toBe('bui-radio-name-a');
  });

  it('Sets htmlFor to _ if there are no options', () => {
    const wrapper = defaultFormRadioGroup({ options: [] });
    expect(wrapper.find('FormRow').prop('htmlFor')).toBe('_');
  });
});

describe('size', () => {
  it('Is md by default', () => {
    const wrapper = defaultFormRadioGroup();
    expect(wrapper.find('FormRow').prop('size')).toBe('md');
    expect(wrapper.find('RadioGroup').prop('size')).toBe('md');
  });

  it('Sets the size', () => {
    const wrapper = defaultFormRadioGroup({ size: 'lg' });
    expect(wrapper.find('FormRow').prop('size')).toBe('lg');
    expect(wrapper.find('RadioGroup').prop('size')).toBe('lg');
  });
});
