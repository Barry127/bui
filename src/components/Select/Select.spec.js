import { EventEmitter } from 'events';

import React from 'react';
import { shallow, mount } from 'enzyme';

import Select from './Select';
import styles from './Select.module.scss';

const originalGetElementById = document.getElementById;
const testProps = {
  id: 'select-id',
  name: 'select',
  onChange: () => null,
  options: [{ value: 'a' }, { value: 'b' }, { value: 'ca' }]
};

const rootSelector = `.${styles.select}`;
const defaultSelect = (props = {}) => {
  const allProps = Object.assign({}, testProps, props);
  const wrapper = mount(<Select {...allProps}>Children</Select>);
  return wrapper;
};

it('Renders Select with children', () => {
  const wrapper = defaultSelect();
  expect(wrapper.find(rootSelector).length).toBe(1);
  expect(wrapper.find(rootSelector).text()).toBe('Children');
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultSelect({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('disabled', () => {
  it('Is not disabled by default', () => {
    const wrapper = defaultSelect();
    expect(wrapper.find('input').prop('disabled')).toBe(false);
  });

  it('Sets the disabled state', () => {
    const wrapper = defaultSelect({ disabled: true });
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
    const wrapper = defaultSelect({ errorMessage: 'error' });
    expect(wrapper.find('Tooltip').prop('visible')).toBe(false);
    expect(wrapper.find('input').prop('aria-describedby')).toBe(undefined);
  });

  it('Renders an errorMessage tooltip on focus', () => {
    const wrapper = defaultSelect({ errorMessage: 'error' });
    expect(wrapper.find('Tooltip').prop('visible')).toBe(false);
    wrapper.setState({ hasFocus: true });
    expect(wrapper.find('Tooltip').prop('visible')).toBe(true);
    expect(wrapper.find('input').prop('aria-describedby')).toBe(
      wrapper.instance().tooltipId
    );
  });

  it('Renders the errorMessage as string', () => {
    const wrapper = defaultSelect({ errorMessage: 'error' });
    wrapper.setState({ hasFocus: true });
    expect(wrapper.find('Tooltip').text()).toBe('error');
  });

  it('Renders the errorMessage as function', () => {
    const wrapper = defaultSelect({ errorMessage: () => <div>MyError</div> });
    wrapper.setState({ hasFocus: true });
    expect(wrapper.find('Tooltip').text()).toBe('MyError');
  });
});

describe('filter', () => {
  it('filters by default', () => {
    const wrapper = defaultSelect({ searchable: true });
    wrapper.find('button').simulate('click');
    expect(wrapper.find('li').length).toBe(3);
    wrapper.find('input').simulate('change', { target: { value: 'c' } });
    expect(wrapper.find('li').length).toBe(1);
    expect(wrapper.find('li').text()).toBe('ca');
  });

  it('Sets filter', () => {
    const wrapper = defaultSelect({
      searchable: true,
      /* reversed filter */
      filter: (item, inputValue) =>
        !inputValue || !item.value.includes(inputValue)
    });

    wrapper.find('button').simulate('click');
    expect(wrapper.find('li').length).toBe(3);
    wrapper.find('input').simulate('change', { target: { value: 'c' } });
    expect(wrapper.find('li').length).toBe(2);
    expect(
      wrapper
        .find('li')
        .first()
        .text()
    ).toBe('a');
    expect(
      wrapper
        .find('li')
        .at(1)
        .text()
    ).toBe('b');
  });
});

describe('hasError', () => {
  it('Is has no error default', () => {
    const wrapper = defaultSelect();
    expect(wrapper.find(rootSelector).hasClass(styles.error)).toBe(false);
  });

  it('Sets the error state', () => {
    const wrapper = defaultSelect({ hasError: true });
    expect(wrapper.find(rootSelector).hasClass(styles.error)).toBe(true);
  });
});

describe('icon', () => {
  it('has no icon by default', () => {
    const wrapper = defaultSelect();
    expect(wrapper.find('Icon').length).toBe(1);
    expect(wrapper.find(rootSelector).hasClass(styles.icon)).toBe(false);
  });

  it('Sets the icon', () => {
    const wrapper = defaultSelect({ icon: 'my-icon' });
    expect(wrapper.find('Icon').length).toBe(2);
    expect(
      wrapper
        .find('Icon')
        .first()
        .prop('icon')
    ).toBe('my-icon');
    expect(wrapper.find(rootSelector).hasClass(styles.icon)).toBe(true);
  });
});

describe('id', () => {
  it('Sets the id', () => {
    const wrapper = defaultSelect({ id: 'my-select' });
    expect(wrapper.find('input').prop('id')).toBe('my-select');
  });
});

describe('itemToString', () => {
  it('passes itemToString to Downshift', () => {
    const myItemToString = jest.fn();
    const wrapper = defaultSelect({ itemToString: myItemToString });
    expect(wrapper.find('Downshift').prop('itemToString')).toBe(myItemToString);
  });
});

describe('name', () => {
  it('Sets the name', () => {
    const wrapper = defaultSelect({ name: 'my-select' });
    expect(wrapper.find('input').prop('name')).toBe('my-select');
  });
});

describe('onChange', () => {
  it('Passes onChange to Downshift', () => {
    const myOnChange = jest.fn();
    const wrapper = defaultSelect({ onChange: myOnChange });
    expect(wrapper.find('Downshift').prop('onChange')).toBe(myOnChange);
  });
});

describe('renderItem', () => {
  it('Sets renderItem', () => {
    const wrapper = defaultSelect({
      searchable: true,
      renderItem: () => 'item'
    });
    wrapper.find('button').simulate('click');
    expect(wrapper.find('li').length).toBe(3);
    expect(
      wrapper
        .find('li')
        .first()
        .text()
    ).toBe('item');
    expect(
      wrapper
        .find('li')
        .at(1)
        .text()
    ).toBe('item');
    expect(
      wrapper
        .find('li')
        .at(2)
        .text()
    ).toBe('item');
  });

  it('Passes the right props to renderItem', () => {
    const renderItem = jest.fn();
    const wrapper = defaultSelect({
      searchable: true,
      renderItem
    });
    wrapper.find('input').simulate('change', { target: { value: 'B' } });
    expect(wrapper.find('li').length).toBe(1);
    expect(renderItem.mock.calls[0][0]).toEqual({ value: 'b' });
    expect(renderItem.mock.calls[0][1]).toEqual({
      selected: false,
      highlighted: false,
      inputValue: 'B'
    });
  });
});

describe('searchable', () => {
  it('Is not searchable by default', () => {
    const wrapper = defaultSelect();
    expect(wrapper.find('input').prop('readOnly')).toBe(true);
  });

  it('Sets searchable', () => {
    const wrapper = defaultSelect({ searchable: true });
    expect(wrapper.find('input').prop('readOnly')).toBe(false);
  });
});

describe('size', () => {
  it('Is md by default', () => {
    const wrapper = defaultSelect();
    expect(wrapper.find(rootSelector).hasClass(styles.md)).toBe(true);
  });

  it('Sets the size', () => {
    const wrapper = defaultSelect({ size: 'lg' });
    expect(wrapper.find(rootSelector).hasClass(styles.lg)).toBe(true);
  });
});

describe('value', () => {
  it('Sets the (initial) value', () => {
    const wrapper = defaultSelect({ value: 'ca' });
    expect(wrapper.find('input').prop('value')).toBe('ca');
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultSelect({ autoFocus: true });
    expect(wrapper.find('input').prop('autoFocus')).toBe(true);
  });
});
