import React from 'react';
import { shallow } from 'enzyme';

import Form from './Form';
import styles from './Form.module.scss';

const rootSelector = `.${styles.form}`;
const defaultForm = ({ ...props }) =>
  shallow(<Form {...props}>FormContent</Form>);

it('Renders Form with children', () => {
  const wrapper = defaultForm();
  expect(wrapper.find(rootSelector).length).toBe(1);
  expect(wrapper.find(rootSelector).text()).toBe('FormContent');
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultForm({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('layout', () => {
  it('Is horizontal by default', () => {
    const wrapper = defaultForm();
    expect(wrapper.find(rootSelector).hasClass(styles.horizontal)).toBe(true);
  });

  it('Sets the layout', () => {
    const wrapper = defaultForm({ layout: 'vertical' });
    expect(wrapper.find(rootSelector).hasClass(styles.vertical)).toBe(true);
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultForm({ id: 'myForm', method: 'post' });

    expect(wrapper.find('#myForm').length).toBe(1);
    expect(wrapper.find(rootSelector).prop('method')).toBe('post');
  });
});
