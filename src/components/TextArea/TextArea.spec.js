import { EventEmitter } from 'events';

import React from 'react';
import { shallow, mount } from 'enzyme';

import TextArea from './TextArea';
import styles from './TextArea.module.scss';

const originalGetElementById = document.getElementById;

const rootSelector = `.${styles.textarea}`;
const defaultTextArea = (props = {}) =>
  shallow(<TextArea id="my-text" name="my-text" {...props} />);

it('Renders TextArea with children', () => {
  const wrapper = defaultTextArea();
  expect(wrapper.find(rootSelector).length).toBe(1);

  const wrapper2 = mount(
    <TextArea id="my-text" name="my-text">
      Child
    </TextArea>
  );
  expect(wrapper2.find(rootSelector).text()).toBe('Child');
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultTextArea({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('disabled', () => {
  it('Is not disabled by default', () => {
    const wrapper = defaultTextArea();
    expect(wrapper.find('TextareaAutosize').prop('disabled')).toBe(false);
  });

  it('Sets the disabled state', () => {
    const wrapper = defaultTextArea({ disabled: true });
    expect(wrapper.find('TextareaAutosize').prop('disabled')).toBe(true);
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
    const wrapper = defaultTextArea({ errorMessage: 'error' });
    expect(wrapper.find('Tooltip').prop('visible')).toBe(false);
    expect(wrapper.find('TextareaAutosize').prop('aria-describedby')).toBe(
      undefined
    );
  });

  it('Renders an errorMessage tooltip on focus', () => {
    const wrapper = defaultTextArea({ errorMessage: 'error' });
    expect(wrapper.find('Tooltip').prop('visible')).toBe(false);
    wrapper.find('TextareaAutosize').simulate('focus');
    expect(wrapper.find('Tooltip').prop('visible')).toBe(true);
    expect(wrapper.find('TextareaAutosize').prop('aria-describedby')).toBe(
      wrapper.instance().tooltipId
    );
  });

  it('Renders the errorMessage as string', () => {
    const wrapper = mount(
      <TextArea id="my-text" name="my-text" errorMessage="error" />
    );
    wrapper.setState({ hasFocus: true });
    expect(wrapper.find('Tooltip').text()).toBe('error');
  });

  it('Renders the errorMessage as function', () => {
    const wrapper = mount(
      <TextArea
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
    const wrapper = defaultTextArea();
    expect(wrapper.find(rootSelector).hasClass(styles.error)).toBe(false);
  });

  it('Sets the error state', () => {
    const wrapper = defaultTextArea({ hasError: true });
    expect(wrapper.find(rootSelector).hasClass(styles.error)).toBe(true);
  });
});

describe('id', () => {
  it('Sets the id', () => {
    const wrapper = defaultTextArea({ id: 'my-text' });
    expect(wrapper.find('#my-text').length).toBe(1);
    expect(wrapper.find('TextareaAutosize').prop('id')).toBe('my-text');
  });
});

describe('maxRows', () => {
  it('Sets maxRows', () => {
    const wrapper = defaultTextArea({ maxRows: 5 });
    expect(wrapper.find('TextareaAutosize').prop('maxRows')).toBe(5);
  });
});

describe('name', () => {
  it('Sets the name', () => {
    const wrapper = defaultTextArea({ name: 'my-text' });
    expect(wrapper.find('TextareaAutosize').prop('name')).toBe('my-text');
  });
});

describe('rows', () => {
  it('Is 3 by default', () => {
    const wrapper = defaultTextArea();
    expect(wrapper.find('TextareaAutosize').prop('rows')).toBe(3);
  });

  it('Sets the rows', () => {
    const wrapper = defaultTextArea({ rows: 10 });
    expect(wrapper.find('TextareaAutosize').prop('rows')).toBe(10);
  });
});

describe('size', () => {
  it('Is md by default', () => {
    const wrapper = defaultTextArea();
    expect(wrapper.find(rootSelector).hasClass(styles.md)).toBe(true);
  });

  it('Sets the size', () => {
    const wrapper = defaultTextArea({ size: 'lg' });
    expect(wrapper.find(rootSelector).hasClass(styles.lg)).toBe(true);
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultTextArea({ value: 'Hello World', autoFocus: true });
    expect(wrapper.find('TextareaAutosize').prop('value')).toBe('Hello World');
    expect(wrapper.find('TextareaAutosize').prop('autoFocus')).toBe(true);
  });
});
