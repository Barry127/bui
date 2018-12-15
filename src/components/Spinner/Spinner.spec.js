import React from 'react';
import { shallow, mount } from 'enzyme';

import Spinner from './Spinner';
import styles from './Spinner.module.scss';

const rootSelector = `.${styles.spinner}`;
const containerSelector = `.${styles.container}`;
const defaultSpinner = (props, children = null) =>
  shallow(<Spinner {...props}>{children}</Spinner>);

it('Renders Spinner', () => {
  const wrapper = defaultSpinner();
  expect(wrapper.find(containerSelector).length).toBe(0);
  expect(wrapper.find(rootSelector).length).toBe(1);
});

it('Renders Spinner with children', () => {
  const wrapper = defaultSpinner({}, <div className="content">Content</div>);
  expect(wrapper.find(containerSelector).length).toBe(1);
  expect(wrapper.find(containerSelector).text()).toBe('Content<Circle />');
  expect(wrapper.find(rootSelector).length).toBe(1);
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultSpinner({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });

  it('Sets the className with a container Spinner', () => {
    const wrapper = defaultSpinner(
      { className: 'my-class' },
      <div>Content</div>
    );
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('color', () => {
  it('Color is primary by default', () => {
    const wrapper = defaultSpinner();
    expect(wrapper.find(rootSelector).hasClass(styles.primary)).toBe(true);
  });

  it('Sets the color', () => {
    const wrapper = defaultSpinner({ color: 'info' });
    expect(wrapper.find(rootSelector).hasClass(styles.info)).toBe(true);

    const wrapper2 = defaultSpinner({ color: 'danger' }, <div>Content</div>);
    expect(wrapper2.find(rootSelector).hasClass(styles.danger)).toBe(true);
  });
});

describe('delay', () => {
  it('Has no delay by default', () => {
    const wrapper = defaultSpinner({ spinning: false }, <div>Content</div>);

    expect(wrapper.find(containerSelector).hasClass(styles.spinning)).toBe(
      false
    );

    wrapper.setProps({ spinning: true });

    expect(wrapper.find(containerSelector).hasClass(styles.spinning)).toBe(
      true
    );

    wrapper.setProps({ spinning: false });
    expect(wrapper.find(containerSelector).hasClass(styles.spinning)).toBe(
      false
    );
  });

  it('Sets and adds delay', done => {
    const wrapper = defaultSpinner(
      { delay: 500, spinning: false },
      <div>Content</div>
    );

    expect(wrapper.find(containerSelector).hasClass(styles.spinning)).toBe(
      false
    );

    wrapper.setProps({ spinning: true });

    expect(wrapper.find(containerSelector).hasClass(styles.spinning)).toBe(
      false
    );

    setTimeout(() => {
      expect(wrapper.find(containerSelector).hasClass(styles.spinning)).toBe(
        false
      );
    }, 400);

    setTimeout(() => {
      expect(wrapper.find(containerSelector).hasClass(styles.spinning)).toBe(
        true
      );

      wrapper.setProps({ spinning: false });
      expect(wrapper.find(containerSelector).hasClass(styles.spinning)).toBe(
        false
      );

      done();
    }, 500);
  });
});

describe('size', () => {
  it('Is md by default', () => {
    const wrapper = defaultSpinner();
    expect(wrapper.find(rootSelector).hasClass(styles.md)).toBe(true);
  });

  it('Sets the size', () => {
    const wrapper = defaultSpinner({ size: 'lg' });
    expect(wrapper.find(rootSelector).hasClass(styles.lg)).toBe(true);
  });
});

describe('spinning', () => {
  it('Is true by default', () => {
    const wrapper = defaultSpinner();
    expect(wrapper.find(rootSelector).length).toBe(1);

    const wrapper2 = defaultSpinner({}, <div>content</div>);
    expect(wrapper2.find(containerSelector).hasClass(styles.spinning)).toBe(
      true
    );
  });

  it('Sets spinning', () => {
    const wrapper = defaultSpinner({ spinning: false });
    expect(wrapper.find(rootSelector).length).toBe(0);
    expect(wrapper.html()).toBe(null);

    const wrapper2 = defaultSpinner({ spinning: false }, <div>Content</div>);
    expect(wrapper2.find(containerSelector).hasClass(styles.spinning)).toBe(
      false
    );
  });
});

describe('tip', () => {
  it('Has no tip by default', () => {
    const wrapper = mount(
      <Spinner>
        <div>Content</div>
      </Spinner>
    );
    expect(wrapper.find('Text').length).toBe(0);
  });

  it('Sets the tip', () => {
    const wrapper = mount(
      <Spinner tip="Loading">
        <div>Content</div>
      </Spinner>
    );
    expect(wrapper.find('Text').text()).toBe('Loading');
  });

  it('Does not set tip on a spinner without children', () => {
    const wrapper = mount(<Spinner tip="Loading" />);
    expect(wrapper.find('Text').length).toBe(0);
  });
});

describe('type', () => {
  it('Is circle by default', () => {
    const wrapper = defaultSpinner();
    expect(wrapper.find('Circle').length).toBe(1);
    expect(wrapper.find('Dots').length).toBe(0);
  });

  it('Sets the size', () => {
    const wrapper = defaultSpinner({ type: 'dots' });
    expect(wrapper.find('Dots').length).toBe(1);
    expect(wrapper.find('Circle').length).toBe(0);
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultSpinner({ 'data-text': 'text' });
    expect(wrapper.find(rootSelector).prop('data-text')).toBe('text');
  });
});
