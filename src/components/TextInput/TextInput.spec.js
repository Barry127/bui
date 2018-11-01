import { EventEmitter } from 'events';

import React from 'react';
import { shallow, mount } from 'enzyme';

import TextInput from './TextInput';
import styles from './Text.module.scss';

const originalGetElementById = document.getElementById;

const rootSelector = `.${styles.input}`;
const defaultTextInput = (props = {}) =>
  shallow(<TextInput id="my-text" name="my-text" {...props} />);

it('Renders TextInput with children', () => {
  const wrapper = defaultTextInput();
  expect(wrapper.find(rootSelector).length).toBe(1);

  const wrapper2 = shallow(
    <TextInput id="my-text" name="my-text">
      Child
    </TextInput>
  );
  expect(wrapper2.find(rootSelector).text()).toBe('Child');
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultTextInput({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('disabled', () => {
  it('Is not disabled by default', () => {
    const wrapper = defaultTextInput();
    expect(wrapper.find('input').prop('disabled')).toBe(false);
  });

  it('Sets the disabled state', () => {
    const wrapper = defaultTextInput({ disabled: true });
    expect(wrapper.find('input').prop('disabled')).toBe(true);
  });
});

describe('errorMessage', () => {
  beforeAll(() => {
    document.getElementById = () => {
      const elemMock = new EventEmitter();
      elemMock.addEventListener = elemMock.on;
      elemMock.getBoundingClientRect = () => ({
        top: 50,
        left: 50,
        height: 100,
        width: 100
      });
      return elemMock;
    };
  });

  afterAll(() => {
    document.getElementById = originalGetElementById;
  });

  it('Does not render an errorMessage when not focussed', () => {
    const wrapper = defaultTextInput({ errorMessage: 'error' });
    expect(wrapper.find('Tooltip').prop('visible')).toBe(false);
    expect(wrapper.find('input').prop('aria-describedby')).toBe(undefined);
  });

  it('Renders an errorMessage tooltip on focus', () => {
    const wrapper = defaultTextInput({ errorMessage: 'error' });
    expect(wrapper.find('Tooltip').prop('visible')).toBe(false);
    wrapper.find('input').simulate('focus');
    expect(wrapper.find('Tooltip').prop('visible')).toBe(true);
    expect(wrapper.find('input').prop('aria-describedby')).toBe(
      wrapper.instance().tooltipId
    );
  });

  it('Renders the errorMessage as string', () => {
    const wrapper = mount(
      <TextInput id="my-text" name="my-text" errorMessage="error" />
    );
    wrapper.setState({ hasFocus: true });
    expect(wrapper.find('Tooltip').text()).toBe('error');
  });

  it('Renders the errorMessage as function', () => {
    const wrapper = mount(
      <TextInput
        id="my-text"
        name="my-text"
        errorMessage={() => <div>MyError</div>}
      />
    );
    wrapper.setState({ hasFocus: true });
    expect(wrapper.find('Tooltip').text()).toBe('MyError');
  });
});

describe('hasError', () => {
  it('Is has no error default', () => {
    const wrapper = defaultTextInput();
    expect(wrapper.find(rootSelector).hasClass(styles.error)).toBe(false);
  });

  it('Sets the error state', () => {
    const wrapper = defaultTextInput({ hasError: true });
    expect(wrapper.find(rootSelector).hasClass(styles.error)).toBe(true);
  });
});

describe('icon', () => {
  it('has no icon by default', () => {
    const wrapper = defaultTextInput();
    expect(wrapper.find('Icon').length).toBe(0);
    expect(wrapper.find(rootSelector).hasClass(styles.icon)).toBe(false);
  });

  it('Sets the icon', () => {
    const wrapper = defaultTextInput({ icon: 'my-icon' });
    expect(wrapper.find('Icon').length).toBe(1);
    expect(wrapper.find('Icon').prop('icon')).toBe('my-icon');
    expect(wrapper.find(rootSelector).hasClass(styles.icon)).toBe(true);
  });
});

describe('id', () => {
  it('Sets the id', () => {
    const wrapper = defaultTextInput({ id: 'my-text' });
    expect(wrapper.find('#my-text').length).toBe(1);
    expect(wrapper.find('input').prop('id')).toBe('my-text');
  });
});

describe('name', () => {
  it('Sets the name', () => {
    const wrapper = defaultTextInput({ name: 'my-text' });
    expect(wrapper.find('input').prop('name')).toBe('my-text');
  });
});

describe('size', () => {
  it('Is md by default', () => {
    const wrapper = defaultTextInput();
    expect(wrapper.find(rootSelector).hasClass(styles.md)).toBe(true);
  });

  it('Sets the size', () => {
    const wrapper = defaultTextInput({ size: 'lg' });
    expect(wrapper.find(rootSelector).hasClass(styles.lg)).toBe(true);
  });
});

describe('type', () => {
  it('has type text by default', () => {
    const wrapper = defaultTextInput();
    expect(wrapper.find('input').prop('type')).toBe('text');
  });

  it('Sets the type', () => {
    const wrapper = defaultTextInput({ type: 'email' });
    expect(wrapper.find('input').prop('type')).toBe('email');
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultTextInput({ value: 'Hello World', autoFocus: true });
    expect(wrapper.find('input').prop('value')).toBe('Hello World');
    expect(wrapper.find('input').prop('autoFocus')).toBe(true);
  });
});
