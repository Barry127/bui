import React from 'react';
import { shallow, render } from 'enzyme';

import FormTextInput from './FormTextInput';

const defaultFormTextInput = ({ ...props }) =>
  shallow(
    <FormTextInput id="id" name="name" {...props}>
      Content
    </FormTextInput>
  );

it('Renders FormTextInput with children', () => {
  const wrapper = defaultFormTextInput();
  expect(wrapper.find('TextInput').length).toBe(1);
  expect(wrapper.find('FormRow').length).toBe(1);

  const wrapper2 = render(
    <FormTextInput id="id" name="name">
      Content
    </FormTextInput>
  );
  expect(wrapper2.find('div').text()).toBe('Content');
});

describe('disabled', () => {
  it('Is not disabled default', () => {
    const wrapper = defaultFormTextInput();
    expect(wrapper.find('FormRow').prop('disabled')).toBe(false);
    expect(wrapper.find('TextInput').prop('disabled')).toBe(false);
  });

  it('Sets the disabled state', () => {
    const wrapper = defaultFormTextInput({ disabled: true });
    expect(wrapper.find('FormRow').prop('disabled')).toBe(true);
    expect(wrapper.find('TextInput').prop('disabled')).toBe(true);
  });
});

describe('hasError', () => {
  it('Is has no error default', () => {
    const wrapper = defaultFormTextInput();
    expect(wrapper.find('FormRow').prop('hasError')).toBe(false);
    expect(wrapper.find('TextInput').prop('hasError')).toBe(false);
  });

  it('Sets the error state', () => {
    const wrapper = defaultFormTextInput({ hasError: true });
    expect(wrapper.find('FormRow').prop('hasError')).toBe(true);
    expect(wrapper.find('TextInput').prop('hasError')).toBe(true);
  });
});

describe('id', () => {
  it('Passes id to htmlFor in FormRow', () => {
    const wrapper = defaultFormTextInput();
    expect(wrapper.find('FormRow').prop('htmlFor')).toBe('id');
  });

  it('Passes id to TextInput', () => {
    const wrapper = defaultFormTextInput();
    expect(wrapper.find('TextInput').prop('id')).toBe('id');
  });
});

describe('label', () => {
  it('Passes label to FormRow', () => {
    const wrapper = defaultFormTextInput({ label: 'my-label' });
    expect(wrapper.find('FormRow').prop('label')).toBe('my-label');
  });
});

describe('size', () => {
  it('Is md by default', () => {
    const wrapper = defaultFormTextInput();
    expect(wrapper.find('FormRow').prop('size')).toBe('md');
    expect(wrapper.find('TextInput').prop('size')).toBe('md');
  });

  it('Sets the size', () => {
    const wrapper = defaultFormTextInput({ size: 'lg' });
    expect(wrapper.find('FormRow').prop('size')).toBe('lg');
    expect(wrapper.find('TextInput').prop('size')).toBe('lg');
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultFormTextInput({ name: 'my-input', icon: 'my-icon' });

    expect(wrapper.find('TextInput').prop('name')).toBe('my-input');
    expect(wrapper.find('TextInput').prop('icon')).toBe('my-icon');
  });
});
