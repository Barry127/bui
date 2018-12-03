import React from 'react';
import { shallow, render, mount } from 'enzyme';

import Link from './Link';
import styles from './Anchor.module.scss';

const rootSelector = 'li';
const linkSelector = `.${styles.link}`;
const testProps = {
  title: 'Root Title',
  to: '#RootTitle'
};

const defaultLink = (props = {}, method = shallow) => {
  const allProps = Object.assign({}, testProps, props);

  return method(
    <Link {...allProps}>
      <Link title="A" to="#a" />
      <Link title="B" to="#b" />
      <p>C</p>
    </Link>
  );
};

it('Renders Link with children', () => {
  const wrapper = defaultLink();
  expect(wrapper.find(rootSelector).length).toBe(1);

  const wrapper2 = defaultLink({}, render);
  expect(wrapper2.find(rootSelector).text()).toBe('AB');
});

describe('active', () => {
  it('Sets active state', () => {
    const wrapper = defaultLink();
    expect(wrapper.find(linkSelector).hasClass(styles.active)).toBe(false);

    const wrapper2 = defaultLink({ active: '#RootTitle' });
    expect(wrapper2.find(linkSelector).hasClass(styles.active)).toBe(true);

    const wrapper3 = defaultLink({ active: '#b' }, render);
    expect(
      wrapper3
        .find('a')
        .last()
        .hasClass(styles.active)
    ).toBe(true);
  });
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultLink({ className: 'my-class' });
    expect(wrapper.find(linkSelector).hasClass('my-class')).toBe(true);
  });
});

describe('color', () => {
  it('Is link by default', () => {
    const wrapper = defaultLink();
    expect(wrapper.find('Text').prop('color')).toBe('link');
  });

  it('Sets the color', () => {
    const wrapper = defaultLink({ color: 'green700' });
    expect(wrapper.find('Text').prop('color')).toBe('green700');
  });
});

describe('onClick', () => {
  let originalGetElementById;

  beforeAll(() => {
    originalGetElementById = document.getElementById;
  });

  afterAll(() => {
    document.getElementById = originalGetElementById;
  });

  it('Calls onClick handler', () => {
    const onClick = jest.fn();

    const wrapper = defaultLink({ onClick }, mount);
    wrapper
      .find('a')
      .first()
      .simulate('click');

    expect(onClick.mock.calls.length).toBe(1);
  });

  it('Scrolls to target', () => {
    const targetMock = {
      scrollIntoView: jest.fn()
    };

    document.getElementById = () => targetMock;

    const wrapper = defaultLink({}, mount);
    wrapper
      .find('a')
      .first()
      .simulate('click');

    expect(targetMock.scrollIntoView.mock.calls.length).toBe(1);
    expect(targetMock.scrollIntoView.mock.calls[0][0]).toEqual({
      behavior: 'smooth',
      block: 'start'
    });

    wrapper
      .find('a')
      .first()
      .simulate('click');

    expect(targetMock.scrollIntoView.mock.calls.length).toBe(2);
  });
});

describe('title', () => {
  it('Sets title', () => {
    const wrapper = defaultLink({}, render);
    expect(
      wrapper
        .find('a')
        .first()
        .text()
    ).toBe('Root Title');

    const wrapper2 = defaultLink({ title: 'my-title' }, render);
    expect(
      wrapper2
        .find('a')
        .first()
        .text()
    ).toBe('my-title');
  });
});

describe('to', () => {
  it('Sets to', () => {
    const wrapper = defaultLink({}, render);
    expect(
      wrapper
        .find('a')
        .first()
        .attr('href')
    ).toBe('#RootTitle');

    const wrapper2 = defaultLink({ to: '#my-to' }, render);
    expect(
      wrapper2
        .find('a')
        .first()
        .attr('href')
    ).toBe('#my-to');
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultLink({ 'data-text': 'text' });
    expect(wrapper.find(linkSelector).prop('data-text')).toBe('text');
  });
});
