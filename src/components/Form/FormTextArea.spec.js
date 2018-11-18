import React from 'react';
import { shallow, render } from 'enzyme';

import FormTextArea from './FormTextArea';

const defaultFormTextArea = ({ ...props }) =>
  shallow(
    <FormTextArea id="id" name="name" {...props}>
      Content
    </FormTextArea>
  );

it('Renders FormTextArea with children', () => {
  const wrapper = defaultFormTextArea();
  expect(wrapper.find('TextArea').length).toBe(1);
  expect(wrapper.find('FormRow').length).toBe(1);

  const wrapper2 = render(
    <FormTextArea id="id" name="name">
      Content
    </FormTextArea>
  );
  expect(wrapper2.find('div').text()).toBe('Content');
});

describe('aria', () => {
  it('sets FormRow id', () => {
    const wrapper = defaultFormTextArea();
    expect(wrapper.find('FormRow').prop('id')).toBe(wrapper.instance().labelId);
  });

  it('sets TextArea aria-labelledby', () => {
    const wrapper = defaultFormTextArea();
    expect(wrapper.find('TextArea').prop('aria-labelledby')).toBe(
      wrapper.instance().labelId
    );
  });
});

describe('disabled', () => {
  it('Is not disabled default', () => {
    const wrapper = defaultFormTextArea();
    expect(wrapper.find('FormRow').prop('disabled')).toBe(false);
    expect(wrapper.find('TextArea').prop('disabled')).toBe(false);
  });

  it('Sets the disabled state', () => {
    const wrapper = defaultFormTextArea({ disabled: true });
    expect(wrapper.find('FormRow').prop('disabled')).toBe(true);
    expect(wrapper.find('TextArea').prop('disabled')).toBe(true);
  });
});

describe('hasError', () => {
  it('Is has no error default', () => {
    const wrapper = defaultFormTextArea();
    expect(wrapper.find('FormRow').prop('hasError')).toBe(false);
    expect(wrapper.find('TextArea').prop('hasError')).toBe(false);
  });

  it('Sets the error state', () => {
    const wrapper = defaultFormTextArea({ hasError: true });
    expect(wrapper.find('FormRow').prop('hasError')).toBe(true);
    expect(wrapper.find('TextArea').prop('hasError')).toBe(true);
  });
});

describe('id', () => {
  it('Passes id to htmlFor in FormRow', () => {
    const wrapper = defaultFormTextArea();
    expect(wrapper.find('FormRow').prop('htmlFor')).toBe('id');
  });

  it('Passes id to TextArea', () => {
    const wrapper = defaultFormTextArea();
    expect(wrapper.find('TextArea').prop('id')).toBe('id');
  });
});

describe('label', () => {
  it('Passes label to FormRow', () => {
    const wrapper = defaultFormTextArea({ label: 'my-label' });
    expect(wrapper.find('FormRow').prop('label')).toBe('my-label');
  });
});

describe('size', () => {
  it('Is md by default', () => {
    const wrapper = defaultFormTextArea();
    expect(wrapper.find('FormRow').prop('size')).toBe('md');
    expect(wrapper.find('TextArea').prop('size')).toBe('md');
  });

  it('Sets the size', () => {
    const wrapper = defaultFormTextArea({ size: 'lg' });
    expect(wrapper.find('FormRow').prop('size')).toBe('lg');
    expect(wrapper.find('TextArea').prop('size')).toBe('lg');
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultFormTextArea({ name: 'my-input', rows: 4 });

    expect(wrapper.find('TextArea').prop('name')).toBe('my-input');
    expect(wrapper.find('TextArea').prop('rows')).toBe(4);
  });
});
