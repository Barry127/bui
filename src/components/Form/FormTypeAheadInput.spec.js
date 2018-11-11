import React from 'react';
import { shallow, render } from 'enzyme';

import FormTypeAheadInput from './FormTypeAheadInput';

const defaultFormTypeAheadInput = ({ ...props }) =>
  shallow(
    <FormTypeAheadInput id="id" name="name" {...props}>
      Content
    </FormTypeAheadInput>
  );

it('Renders FormTypeAheadInput with children', () => {
  const wrapper = defaultFormTypeAheadInput();
  expect(wrapper.find('TypeAheadInput').length).toBe(1);
  expect(wrapper.find('FormRow').length).toBe(1);

  const wrapper2 = render(
    <FormTypeAheadInput id="id" name="name">
      Content
    </FormTypeAheadInput>
  );
  expect(wrapper2.find('div').text()).toBe('Content');
});

describe('disabled', () => {
  it('Is not disabled default', () => {
    const wrapper = defaultFormTypeAheadInput();
    expect(wrapper.find('FormRow').prop('disabled')).toBe(false);
    expect(wrapper.find('TypeAheadInput').prop('disabled')).toBe(false);
  });

  it('Sets the disabled state', () => {
    const wrapper = defaultFormTypeAheadInput({ disabled: true });
    expect(wrapper.find('FormRow').prop('disabled')).toBe(true);
    expect(wrapper.find('TypeAheadInput').prop('disabled')).toBe(true);
  });
});

describe('hasError', () => {
  it('Is has no error default', () => {
    const wrapper = defaultFormTypeAheadInput();
    expect(wrapper.find('FormRow').prop('hasError')).toBe(false);
    expect(wrapper.find('TypeAheadInput').prop('hasError')).toBe(false);
  });

  it('Sets the error state', () => {
    const wrapper = defaultFormTypeAheadInput({ hasError: true });
    expect(wrapper.find('FormRow').prop('hasError')).toBe(true);
    expect(wrapper.find('TypeAheadInput').prop('hasError')).toBe(true);
  });
});

describe('id', () => {
  it('Passes id to htmlFor in FormRow', () => {
    const wrapper = defaultFormTypeAheadInput();
    expect(wrapper.find('FormRow').prop('htmlFor')).toBe('id');
  });

  it('Passes id to TypeAheadInput', () => {
    const wrapper = defaultFormTypeAheadInput();
    expect(wrapper.find('TypeAheadInput').prop('id')).toBe('id');
  });
});

describe('label', () => {
  it('Passes label to FormRow', () => {
    const wrapper = defaultFormTypeAheadInput({ label: 'my-label' });
    expect(wrapper.find('FormRow').prop('label')).toBe('my-label');
  });
});

describe('size', () => {
  it('Is md by default', () => {
    const wrapper = defaultFormTypeAheadInput();
    expect(wrapper.find('FormRow').prop('size')).toBe('md');
    expect(wrapper.find('TypeAheadInput').prop('size')).toBe('md');
  });

  it('Sets the size', () => {
    const wrapper = defaultFormTypeAheadInput({ size: 'lg' });
    expect(wrapper.find('FormRow').prop('size')).toBe('lg');
    expect(wrapper.find('TypeAheadInput').prop('size')).toBe('lg');
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultFormTypeAheadInput({
      name: 'my-input',
      icon: 'my-icon'
    });

    expect(wrapper.find('TypeAheadInput').prop('name')).toBe('my-input');
    expect(wrapper.find('TypeAheadInput').prop('icon')).toBe('my-icon');
  });
});
