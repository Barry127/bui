import React from 'react';
import { mount } from 'enzyme';

import Alert from './Alert';
import styles from './Alert.module.scss';

const rootSelector = `.${styles.alert}`;
const defaultAlert = (props = {}, children = 'Hello World') =>
  mount(<Alert {...props}>{children}</Alert>);

it('Renders Alert with children', () => {
  const wrapper = defaultAlert();
  expect(wrapper.find(rootSelector).length).toBe(1);

  expect(wrapper.find(rootSelector).text()).toBe('Hello World');
});

describe('afterClose', () => {
  it('calls afterClose when the alert is closed', done => {
    const afterClose = jest.fn();
    const wrapper = defaultAlert({ afterClose });
    wrapper.find('button').simulate('click');

    // does not close immediately
    expect(afterClose.mock.calls.length).toBe(0);

    setTimeout(() => {
      expect(afterClose.mock.calls.length).toBe(1);
      done();
    }, 1000);
  });

  it('does not call afterClose when onClose calls ev.preventDefault', done => {
    const afterClose = jest.fn();
    const onClose = ev => ev.preventDefault();
    const wrapper = defaultAlert({ afterClose, onClose });
    wrapper.find('button').simulate('click');

    expect(afterClose.mock.calls.length).toBe(0);

    setTimeout(() => {
      expect(afterClose.mock.calls.length).toBe(0);
      done();
    }, 1000);
  });
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultAlert({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('closable', () => {
  it('Is closable default', () => {
    const wrapper = defaultAlert();
    expect(wrapper.find('button').length).toBe(1);
  });

  it('Sets closable', () => {
    const wrapper = defaultAlert({ closable: false });
    expect(wrapper.find('button').length).toBe(0);
  });
});

describe('icon', () => {
  it('is by default bui-success for success', () => {
    const wrapper = defaultAlert({ closable: false, type: 'success' });
    expect(wrapper.find('Icon').prop('icon')).toBe('bui-success');
  });

  it('is by default bui-warning for warning', () => {
    const wrapper = defaultAlert({ closable: false, type: 'warning' });
    expect(wrapper.find('Icon').prop('icon')).toBe('bui-warning');
  });

  it('is by default bui-error for danger', () => {
    const wrapper = defaultAlert({ closable: false, type: 'danger' });
    expect(wrapper.find('Icon').prop('icon')).toBe('bui-error');
  });

  it('is by default bui-info for info', () => {
    const wrapper = defaultAlert({ closable: false, type: 'info' });
    expect(wrapper.find('Icon').prop('icon')).toBe('bui-info');
  });

  it('sets the icon', () => {
    const wrapper = defaultAlert({ closable: false, icon: 'my-icon' });
    expect(wrapper.find('Icon').prop('icon')).toBe('my-icon');
  });
});

describe('onClose', () => {
  it('Calls onClose', () => {
    const onClose = jest.fn();
    const wrapper = defaultAlert({ onClose });
    expect(wrapper.instance().state.open).toBe(true);
    wrapper.find('button').simulate('click');
    expect(onClose.mock.calls.length).toBe(1);
    expect(wrapper.instance().state.open).toBe(false);
  });

  it('Does not close when ev.preventDefault is called in onClose', () => {
    const onClose = ev => ev.preventDefault();
    const wrapper = defaultAlert({ onClose });
    expect(wrapper.instance().state.open).toBe(true);
    wrapper.find('button').simulate('click');
    expect(wrapper.instance().state.open).toBe(true);
  });
});

describe('showIcon', () => {
  it('It shows icon by default', () => {
    const wrapper = defaultAlert({ closable: false });
    expect(wrapper.find('Icon').length).toBe(1);
  });

  it('Sets showIcon', () => {
    const wrapper = defaultAlert({ closable: false, showIcon: false });
    expect(wrapper.find('Icon').length).toBe(0);
  });
});

describe('title', () => {
  it('Has no title by default', () => {
    const wrapper = defaultAlert();
    expect(wrapper.find(rootSelector).hasClass(styles.hasTitle)).toBe(false);
    expect(wrapper.find('Header').length).toBe(0);
  });

  it('Sets the title', () => {
    const wrapper = defaultAlert({ title: 'My Title' });
    expect(wrapper.find(rootSelector).hasClass(styles.hasTitle)).toBe(true);
    expect(wrapper.find('Header').length).toBe(1);
    expect(wrapper.find('Header').text()).toBe('My Title');
  });
});

describe('type', () => {
  it('Is succes default', () => {
    const wrapper = defaultAlert();
    expect(wrapper.find(rootSelector).hasClass(styles.success)).toBe(true);
  });

  it('Sets the type', () => {
    const wrapper = defaultAlert({ type: 'danger' });
    expect(wrapper.find(rootSelector).hasClass(styles.danger)).toBe(true);
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultAlert({ 'data-text': 'text' });
    expect(wrapper.find(rootSelector).prop('data-text')).toBe('text');
  });
});
