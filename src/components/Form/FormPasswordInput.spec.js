import React from 'react';
import { shallow, render } from 'enzyme';

import FormPasswordInput from './FormPasswordInput';

const defaultFormPasswordInput = ({ ...props }) =>
  shallow(
    <FormPasswordInput id="id" name="name" {...props}>
      Content
    </FormPasswordInput>
  );

it('Renders FormPasswordInput with children', () => {
  const wrapper = defaultFormPasswordInput();
  expect(wrapper.find('PasswordInput').length).toBe(1);
  expect(wrapper.find('FormRow').length).toBe(1);

  const wrapper2 = render(
    <FormPasswordInput id="id" name="name">
      Content
    </FormPasswordInput>
  );
  expect(wrapper2.find('div').text()).toBe('Content');
});

describe('disabled', () => {
  it('Is not disabled default', () => {
    const wrapper = defaultFormPasswordInput();
    expect(wrapper.find('FormRow').prop('disabled')).toBe(false);
    expect(wrapper.find('PasswordInput').prop('disabled')).toBe(false);
  });

  it('Sets the disabled state', () => {
    const wrapper = defaultFormPasswordInput({ disabled: true });
    expect(wrapper.find('FormRow').prop('disabled')).toBe(true);
    expect(wrapper.find('PasswordInput').prop('disabled')).toBe(true);
  });
});

describe('hasError', () => {
  it('Is has no error default', () => {
    const wrapper = defaultFormPasswordInput();
    expect(wrapper.find('FormRow').prop('hasError')).toBe(false);
    expect(wrapper.find('PasswordInput').prop('hasError')).toBe(false);
  });

  it('Sets the error state', () => {
    const wrapper = defaultFormPasswordInput({ hasError: true });
    expect(wrapper.find('FormRow').prop('hasError')).toBe(true);
    expect(wrapper.find('PasswordInput').prop('hasError')).toBe(true);
  });
});

describe('id', () => {
  it('Passes id to htmlFor in FormRow', () => {
    const wrapper = defaultFormPasswordInput();
    expect(wrapper.find('FormRow').prop('htmlFor')).toBe('id');
  });

  it('Passes id to PasswordInput', () => {
    const wrapper = defaultFormPasswordInput();
    expect(wrapper.find('PasswordInput').prop('id')).toBe('id');
  });
});

describe('label', () => {
  it('Passes label to FormRow', () => {
    const wrapper = defaultFormPasswordInput({ label: 'my-label' });
    expect(wrapper.find('FormRow').prop('label')).toBe('my-label');
  });
});

describe('size', () => {
  it('Is md by default', () => {
    const wrapper = defaultFormPasswordInput();
    expect(wrapper.find('FormRow').prop('size')).toBe('md');
    expect(wrapper.find('PasswordInput').prop('size')).toBe('md');
  });

  it('Sets the size', () => {
    const wrapper = defaultFormPasswordInput({ size: 'lg' });
    expect(wrapper.find('FormRow').prop('size')).toBe('lg');
    expect(wrapper.find('PasswordInput').prop('size')).toBe('lg');
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultFormPasswordInput({
      name: 'my-input',
      icon: 'my-icon'
    });

    expect(wrapper.find('PasswordInput').prop('name')).toBe('my-input');
    expect(wrapper.find('PasswordInput').prop('icon')).toBe('my-icon');
  });
});
