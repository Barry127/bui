import React from 'react';
import { shallow } from 'enzyme';

import PasswordInput from './PasswordInput';
import styles from './PasswordInput.module.scss';

const rootSelector = `.${styles.password}`;
const defaultPasswordInput = (props = {}) =>
  shallow(<PasswordInput id="password" name="password" {...props} />);

it('Renders PasswordInput with children', () => {
  const wrapper = defaultPasswordInput();
  expect(wrapper.find(rootSelector).length).toBe(1);

  const wrapper2 = shallow(
    <PasswordInput id="my-text" name="my-text">
      Child
    </PasswordInput>
  );
  expect(wrapper2.find('TextInput').prop('children')[1]).toBe('Child');
});

describe('className', () => {
  it('Passes the className to TextInput', () => {
    const wrapper = defaultPasswordInput({ className: 'my-class' });
    expect(wrapper.find('TextInput').hasClass('my-class')).toBe(true);
  });
});

describe('disabled', () => {
  it('Is not disabled by default', () => {
    const wrapper = defaultPasswordInput();
    expect(wrapper.find('TextInput').prop('disabled')).toBe(false);
  });

  it('Passes disabled state to TextInput', () => {
    const wrapper = defaultPasswordInput({ disabled: true });
    expect(wrapper.find('TextInput').prop('disabled')).toBe(true);
  });
});

describe('errorMessage', () => {
  it('Passes errorMessage to TextInput', () => {
    const wrapper = defaultPasswordInput({ errorMessage: 'My error' });
    expect(wrapper.find('TextInput').prop('errorMessage')).toBe('My error');
  });
});

describe('errorPosition', () => {
  it('It is bottom by default', () => {
    const wrapper = defaultPasswordInput();
    expect(wrapper.find('TextInput').prop('errorPosition')).toBe('bottom');
  });

  it('Passes errorPosition to TextInput', () => {
    const wrapper = defaultPasswordInput({ errorPosition: 'topLeft' });
    expect(wrapper.find('TextInput').prop('errorPosition')).toBe('topLeft');
  });
});

describe('hasError', () => {
  it('It has no error by default', () => {
    const wrapper = defaultPasswordInput();
    expect(wrapper.find('TextInput').prop('hasError')).toBe(false);
  });

  it('Passes hasError to TextInput', () => {
    const wrapper = defaultPasswordInput({ hasError: true });
    expect(wrapper.find('TextInput').prop('hasError')).toBe(true);
  });
});

describe('hideReveal', () => {
  it('It shows the reveal button by default', () => {
    const wrapper = defaultPasswordInput();
    expect(wrapper.find('TextInput').hasClass(styles.reveal)).toBe(true);
    expect(wrapper.find('.button').length).toBe(1);
  });

  it('It hides the reveal button', () => {
    const wrapper = defaultPasswordInput({ hideReveal: true });
    expect(wrapper.find('TextInput').hasClass(styles.reveal)).toBe(false);
    expect(wrapper.find('.button').length).toBe(0);
  });
});

describe('icon', () => {
  it('It has no icon by default', () => {
    const wrapper = defaultPasswordInput();
    expect(wrapper.find('TextInput').prop('icon')).toBe(undefined);
  });

  it('Passes icon to TextInput', () => {
    const wrapper = defaultPasswordInput({ icon: 'my-icon' });
    expect(wrapper.find('TextInput').prop('icon')).toBe('my-icon');
  });
});

describe('name', () => {
  it('Passes the name to TextInput', () => {
    const wrapper = defaultPasswordInput({ name: 'password' });
    expect(wrapper.find('TextInput').prop('name')).toBe('password');
  });
});

describe('id', () => {
  it('Passes the id to TextInput', () => {
    const wrapper = defaultPasswordInput({ id: 'password' });
    expect(wrapper.find('TextInput').prop('id')).toBe('password');
  });
});

describe('size', () => {
  it('It is md by default', () => {
    const wrapper = defaultPasswordInput();
    expect(wrapper.find('TextInput').prop('size')).toBe('md');
  });

  it('Passes size to TextInput', () => {
    const wrapper = defaultPasswordInput({ size: 'lg' });
    expect(wrapper.find('TextInput').prop('size')).toBe('lg');
  });
});

describe('type', () => {
  it('does not pass type to TextInput', () => {
    const wrapper = defaultPasswordInput({ type: 'search' });
    expect(wrapper.find('TextInput').prop('type')).not.toBe('search');
  });

  it('Type is password', () => {
    const wrapper = defaultPasswordInput();
    expect(wrapper.find('TextInput').prop('type')).toBe('password');
  });

  it('Type is text after click eye button', () => {
    const wrapper = defaultPasswordInput();
    expect(wrapper.find('TextInput').prop('type')).toBe('password');
    wrapper.instance().input = { focus: jest.fn() };
    wrapper.find('.button').simulate('click');
    expect(wrapper.find('TextInput').prop('type')).toBe('text');
  });

  it('Type is password after 2nd click eye button', () => {
    const wrapper = defaultPasswordInput();
    expect(wrapper.find('TextInput').prop('type')).toBe('password');
    wrapper.instance().input = { focus: jest.fn() };
    wrapper.find('.button').simulate('click');
    wrapper.find('.button').simulate('click');
    expect(wrapper.find('TextInput').prop('type')).toBe('password');
  });
});

describe('props', () => {
  it('Passes props to TextInput', () => {
    const wrapper = defaultPasswordInput({
      value: 'Hello World',
      autoFocus: true
    });
    expect(wrapper.find('TextInput').prop('value')).toBe('Hello World');
    expect(wrapper.find('TextInput').prop('autoFocus')).toBe(true);
  });
});
