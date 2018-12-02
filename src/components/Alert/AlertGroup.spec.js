import React from 'react';
import { mount } from 'enzyme';

import Alert from './Alert';
import AlertGroup from './AlertGroup';
import styles from './Alert.module.scss';

const rootSelector = `.${styles.group}`;
const navSelector = `.${styles.nav}`;
const alertSelector = `.${styles.alert}`;
const defaultAlertGroup = (props = {}) =>
  mount(
    <AlertGroup {...props}>
      <Alert type="info" closable={false} title="My Title">
        Alert 1
      </Alert>
      <Alert type="success">Alert 2</Alert>
      <p>Alert 3</p>
    </AlertGroup>
  );

it('Renders AlertGroup with children', () => {
  const wrapper = defaultAlertGroup();
  expect(wrapper.find(rootSelector).length).toBe(1);

  expect(wrapper.find(alertSelector).length).toBe(1);
  expect(wrapper.find(alertSelector).text()).toBe('Alert 1');
});

it('Changes closable and title for children', () => {
  const wrapper = defaultAlertGroup();
  expect(wrapper.find('Alert').prop('title')).toBe(null);
  expect(wrapper.find('Alert').prop('closable')).toBe(true);
});

it('Navigates between alerts', () => {
  const wrapper = defaultAlertGroup();
  expect(wrapper.find(alertSelector).text()).toBe('Alert 1');
  wrapper
    .find('button')
    .at(1)
    .simulate('click');
  expect(wrapper.find(alertSelector).text()).toBe('Alert 2');
  wrapper
    .find('button')
    .at(1)
    .simulate('click');
  expect(wrapper.find(alertSelector).text()).toBe('Alert 1');
  wrapper
    .find('button')
    .at(0)
    .simulate('click');
  expect(wrapper.find(alertSelector).text()).toBe('Alert 2');
});

it('Does not count non-Alert children', () => {
  const wrapper = defaultAlertGroup();
  expect(
    wrapper
      .find(navSelector)
      .first()
      .text()
  ).toBe(' 1 / 2 ');
});

it('Does not render nav with one child', () => {
  const wrapper = mount(
    <AlertGroup>
      <Alert>One Child</Alert>
    </AlertGroup>
  );

  expect(wrapper.find(alertSelector).text()).toBe('One Child');
  expect(wrapper.find(navSelector).length).toBe(0);
});

it('Does not render anything with no children', () => {
  const wrapper = mount(<AlertGroup />);
  expect(wrapper.find(rootSelector).length).toBe(0);
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultAlertGroup({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultAlertGroup({ 'data-text': 'text' });
    expect(wrapper.find(rootSelector).prop('data-text')).toBe('text');
  });
});
