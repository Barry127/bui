import React from 'react';
import { mount } from 'enzyme';

import Affix from './Affix';

it('Renders Affix with Children', () => {
  const wrapper = mount(
    <Affix>
      <p>Content</p>
    </Affix>
  );

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

    expect(wrapper.state().floating).toBe(false);

    window.pageYOffset = 100;

    /* manually scroll instead of window scrolling event */
    wrapper.instance()._scroll();
    wrapper.update();

    expect(wrapper.state().floating).toBe(true);
  });

  it('Handles scrolling with custom offset', () => {
    const wrapper = mount(
      <Affix offsetTop={50}>
        <p>Content</p>
      </Affix>
    );

    expect(wrapper.state().floating).toBe(false);

    window.pageYOffset = 180;

    /* manually scroll instead of window scrolling event */
    wrapper.instance()._scroll();
    wrapper.update();

    expect(wrapper.state().floating).toBe(true);
  });
});
