import React from 'react';
import { shallow } from 'enzyme';

import RadioGroup from './RadioGroup';
import styles from './RadioGroup.module.scss';

const rootSelector = `.${styles.group}`;
const defaultRadioGroup = (props = {}) => {
  const allProps = Object.assign(
    {},
    {
      name: 'radio',
      value: 'a',
      onChange: () => null,
      options: [{ value: 'a', label: 'a' }, { value: 'b', label: 'b' }]
    },
    props
  );
  return shallow(<RadioGroup {...allProps}>Label</RadioGroup>);
};

it('Renders RadioGroup with children', () => {
  const wrapper = defaultRadioGroup();
  expect(wrapper.find(rootSelector).length).toBe(1);
  expect(wrapper.find('RadioButton').length).toBe(2);
});

describe('inline', () => {
  it('Is not inline by default', () => {
    const wrapper = defaultRadioGroup();
    expect(wrapper.find(rootSelector).hasClass(styles.inline)).toBe(false);
  });

  it('Sets the inline state', () => {
    const wrapper = defaultRadioGroup({ inline: true });
    expect(wrapper.find(rootSelector).hasClass(styles.inline)).toBe(true);
  });
});

describe('name', () => {
  it('Sets the name', () => {
    const wrapper = defaultRadioGroup({ name: 'my-radio' });
    expect(
      wrapper
        .find('RadioButton')
        .first()
        .prop('name')
    ).toBe('my-radio');
    expect(
      wrapper
        .find('RadioButton')
        .at(1)
        .prop('name')
    ).toBe('my-radio');
  });
});

describe('onChange', () => {
  it('Sets the onChange', () => {
    const onChange = () => null;
    const wrapper = defaultRadioGroup({ onChange });
    expect(
      wrapper
        .find('RadioButton')
        .first()
        .prop('onChange')
    ).toBe(onChange);
    expect(
      wrapper
        .find('RadioButton')
        .at(1)
        .prop('onChange')
    ).toBe(onChange);
  });
});

describe('options', () => {
  it('Passes options to RadioButton', () => {
    const wrapper = defaultRadioGroup({
      options: [
        { className: 'my-class', hasError: true, disabled: true, value: 1 }
      ]
    });

    expect(
      wrapper
        .find('RadioButton')
        .first()
        .prop('className')
    ).toBe('my-class');
    expect(
      wrapper
        .find('RadioButton')
        .first()
        .prop('hasError')
    ).toBe(true);
    expect(
      wrapper
        .find('RadioButton')
        .first()
        .prop('disabled')
    ).toBe(true);
  });
});

describe('size', () => {
  it('Is md by default', () => {
    const wrapper = defaultRadioGroup();
    expect(
      wrapper
        .find('RadioButton')
        .first()
        .prop('size')
    ).toBe('md');
    expect(
      wrapper
        .find('RadioButton')
        .at(1)
        .prop('size')
    ).toBe('md');
  });

  it('Sets the size', () => {
    const wrapper = defaultRadioGroup({ size: 'lg' });
    expect(
      wrapper
        .find('RadioButton')
        .first()
        .prop('size')
    ).toBe('lg');
    expect(
      wrapper
        .find('RadioButton')
        .at(1)
        .prop('size')
    ).toBe('lg');
  });
});

describe('value', () => {
  it('Sets the value', () => {
    const wrapper = defaultRadioGroup({ value: 'b' });
    expect(
      wrapper
        .find('RadioButton')
        .first()
        .prop('checked')
    ).toBe(false);
    expect(
      wrapper
        .find('RadioButton')
        .at(1)
        .prop('checked')
    ).toBe(true);
  });
});
