import React from 'react';
import { mount } from 'enzyme';

import Affix from './Affix';

it('Renders Affix with Children', () => {
  const wrapper = mount(
    <Affix>
      <p>Content</p>
    </Affix>
  );

  expect(wrapper.find('div').length).toBe(1);
  expect(wrapper.find('p').length).toBe(1);
  expect(wrapper.root().text()).toBe('Content');
});

describe('Scrolling', () => {
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

  beforeAll(() => {
    Element.prototype.getBoundingClientRect = () => ({ top: 80 });
  });

  afterAll(() => {
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

  it('Handles scrolling', () => {
    const wrapper = mount(
      <Affix>
        <p>Content</p>
      </Affix>
    );

    expect(wrapper.find('div').prop('style')).not.toHaveProperty('zIndex');
    expect(wrapper.find('div').prop('style')).toHaveProperty(
      'transform',
      'translateY(0px)'
    );

    window.pageYOffset = 100;

    /* manually scroll instead of window scrolling event */
    wrapper.instance()._scroll();
    wrapper.update();

    expect(wrapper.find('div').prop('style')).toHaveProperty('zIndex', 10);
    expect(wrapper.find('div').prop('style')).toHaveProperty(
      'transform',
      'translateY(32px)'
    );
  });

  it('Handles scrolling with custom offset', () => {
    const wrapper = mount(
      <Affix offsetTop={50}>
        <p>Content</p>
      </Affix>
    );

    expect(wrapper.find('div').prop('style')).not.toHaveProperty('zIndex');
    expect(wrapper.find('div').prop('style')).toHaveProperty(
      'transform',
      'translateY(0px)'
    );

    window.pageYOffset = 180;

    /* manually scroll instead of window scrolling event */
    wrapper.instance()._scroll();
    wrapper.update();

    expect(wrapper.find('div').prop('style')).toHaveProperty('zIndex', 10);
    expect(wrapper.find('div').prop('style')).toHaveProperty(
      'transform',
      'translateY(50px)'
    );
  });
});
