import React from 'react';
import { shallow, render } from 'enzyme';

import Anchor from './Anchor';
import Link from './Link';
import styles from './Anchor.module.scss';

import { getActive } from './helpers';

jest.mock('./helpers');

const rootSelector = `.${styles.anchor}`;

const defaultAnchor = (props = {}, method = shallow) =>
  method(
    <Anchor {...props}>
      <Link title="A" to="#a" />
      <Link title="B" to="#b" />
      <p>C</p>
    </Anchor>
  );

beforeEach(() => {
  getActive.mockReset();
});

it('Renders Anchor with children', () => {
  const wrapper = defaultAnchor();
  expect(wrapper.find(rootSelector).length).toBe(1);

  const wrapper2 = defaultAnchor({}, render);
  expect(wrapper2.text()).toBe('AB');
});

it('Exports Link as static property', () => {
  expect(Anchor.Link).toBe(Link);
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultAnchor({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('offsetTop', () => {
  it('Is 0 by default', () => {
    const wrapper = defaultAnchor();
    expect(getActive.mock.calls[0][1]).toBe(0);
  });

  it('Sets offsetTop', () => {
    const wrapper = defaultAnchor({ offsetTop: 50 });
    expect(getActive.mock.calls[0][1]).toBe(50);
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultAnchor({ 'data-text': 'text' });
    expect(wrapper.find(rootSelector).prop('data-text')).toBe('text');
  });
});
