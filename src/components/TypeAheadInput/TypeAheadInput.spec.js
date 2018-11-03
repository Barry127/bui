import React from 'react';
import { shallow } from 'enzyme';

import TypeAheadInput from './TypeAheadInput';

const defaultTypeAheadInput = (props = {}) => {
  const wrapper = shallow(
    <TypeAheadInput id="typeahead" name="typeahead" {...props} />
  );
  wrapper.instance().input = {
    setSelectionRange: jest.fn(),
    value: 'a'
  };
  return wrapper;
};

it('Renders TypeAheadInput', () => {
  const wrapper = defaultTypeAheadInput();
  expect(wrapper.find('TextInput').length).toBe(1);
});

describe('items', () => {
  it('Items is an empty array by default', () => {
    const wrapper = defaultTypeAheadInput();
    expect(wrapper.instance().state.items).toEqual([]);
  });

  it('Sets items to state', () => {
    const wrapper = defaultTypeAheadInput({ items: ['a', 'b'] });
    expect(wrapper.instance().state.items).toEqual(['a', 'b']);
  });

  it('Updates state after items are set', () => {
    const wrapper = defaultTypeAheadInput();
    expect(wrapper.instance().state.items).toEqual([]);
    wrapper.setProps({ items: ['a', 'b'] });
    expect(wrapper.instance().state.items).toEqual(['a', 'b']);
  });
});

describe('getItems', () => {
  const getItems = () => Promise.resolve(['a', 'b']);

  it('Updates list from getItems', () => {
    const wrapper = defaultTypeAheadInput({ getItems });
    expect(wrapper.instance().state.items).toEqual([]);
    wrapper
      .find('TextInput')
      .simulate('change', { target: { value: 'val' }, persist: jest.fn() });

    setTimeout(() => {
      expect(wrapper.instance().state.items).toEqual(['a', 'b']);
      done();
    });
  });
});

describe('Type ahead', () => {
  const items = ['JavaScript', 'Java', 'Lua'];
  let value;

  it('types ahead', () => {
    const wrapper = defaultTypeAheadInput({
      items,
      onChange: ev => (value = ev.target.value)
    });

    expect(wrapper.instance().state.items).toEqual([
      'Java',
      'JavaScript',
      'Lua'
    ]);

    wrapper
      .find('TextInput')
      .simulate('change', { target: { value: 'l' }, persist: jest.fn() });

    expect(value).toEqual('Lua');

    wrapper
      .find('TextInput')
      .simulate('change', { target: { value: 'java' }, persist: jest.fn() });

    expect(value).toEqual('Java');

    wrapper
      .find('TextInput')
      .simulate('change', { target: { value: 'javaS' }, persist: jest.fn() });

    expect(value).toEqual('JavaScript');
  });
});
