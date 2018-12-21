import React from 'react';
import { mount } from 'enzyme';

import Modal from './Modal';
import styles from './Modal.module.scss';

const rootSelector = `.${styles.modal}`;
const overlaySelector = `.${styles.overlay}`;
const titleSelector = `.${styles.title}`;
const footerSelector = `.${styles.footer}`;
const closeSelector = `.${styles.close}`;
const maximizeSelector = `.${styles.maximize}`;
const defaultModal = (props = {}, children = 'Hello from Modal') => {
  const allProps = Object.assign(
    {},
    {
      onClose: () => null,
      title: 'Modal Title',
      visible: true
    },
    props
  );

  return mount(<Modal {...allProps}>{children}</Modal>);
};

it('Renders Modal with children', () => {
  const wrapper = defaultModal();

  expect(wrapper.find(rootSelector).length).toBe(1);
  expect(wrapper.find(overlaySelector).length).toBe(1);

  expect(wrapper.find(rootSelector).text()).toBe(
    ' Modal TitleHello from Modal'
  );
});

describe('afterClose', () => {
  it('Calls afterClose when the Modal is closed', done => {
    const afterClose = jest.fn();
    const wrapper = defaultModal({ afterClose });

    wrapper
      .find(closeSelector)
      .first()
      .simulate('click');

    wrapper.setProps({ visible: false });

    // does not close immediately
    expect(afterClose.mock.calls.length).toBe(0);

    setTimeout(() => {
      expect(afterClose.mock.calls.length).toBe(1);
      done();
    }, 1000);
  });
});

describe('afterOpen', () => {
  it('Calls afterOpen when the Modal is opened', done => {
    const afterOpen = jest.fn();
    const wrapper = defaultModal({
      afterOpen,
      visible: false
    });

    wrapper.setProps({
      visible: true
    });

    // does not open immediately
    expect(afterOpen.mock.calls.length).toBe(0);

    setTimeout(() => {
      expect(afterOpen.mock.calls.length).toBe(1);
      done();
    }, 1500);
  });
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultModal({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('closable', () => {
  it('Is closable by default', () => {
    const onClose = jest.fn();
    const wrapper = defaultModal({ onClose });
    expect(wrapper.find(closeSelector).length).toBeGreaterThan(0);

    wrapper.find(overlaySelector).simulate('click');
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('Sets closable', () => {
    const onClose = jest.fn();
    const wrapper = defaultModal({ closable: false, onClose });
    expect(wrapper.find(closeSelector).length).toBe(0);

    wrapper.find(overlaySelector).simulate('click');
    expect(onClose.mock.calls.length).toBe(0);
  });
});

describe('Color', () => {
  it('Is default by default', () => {
    const wrapper = defaultModal();
    expect(wrapper.find(rootSelector).hasClass(styles.default)).toBe(true);
  });

  it('Sets color', () => {
    const wrapper = defaultModal({ color: 'danger' });
    expect(wrapper.find(rootSelector).hasClass(styles.danger)).toBe(true);
  });
});

describe('Flat', () => {
  it('Is not flat by default', () => {
    const wrapper = defaultModal();
    expect(wrapper.find(rootSelector).hasClass(styles.flat)).toBe(false);
  });

  it('Sets flat', () => {
    const wrapper = defaultModal({ flat: true });
    expect(wrapper.find(rootSelector).hasClass(styles.flat)).toBe(true);
  });
});

describe('Footer', () => {
  it('Has no footer by default', () => {
    const wrapper = defaultModal();
    expect(wrapper.find(footerSelector).length).toBe(0);
  });

  it('Sets footer', () => {
    const wrapper = defaultModal({ footer: <div>Footer</div> });
    expect(wrapper.find(footerSelector).length).toBeGreaterThan(0);
    expect(
      wrapper
        .find(footerSelector)
        .first()
        .text()
    ).toBe('Footer');

    expect(wrapper.find(rootSelector).text()).toBe(
      ' Modal TitleHello from ModalFooter'
    );
  });
});

describe('Icon', () => {
  it('Has no icon by default', () => {
    const wrapper = defaultModal();
    expect(wrapper.find('Header Icon').length).toBe(0);
  });

  it('Sets icon', () => {
    const wrapper = defaultModal({ icon: 'my-icon' });
    expect(wrapper.find('Header Icon').length).toBe(1);
    expect(wrapper.find('Header Icon').prop('icon')).toBe('my-icon');
  });
});

describe('Maximizable', () => {
  it('Is not maximizable by default', () => {
    const wrapper = defaultModal();
    expect(wrapper.find(maximizeSelector).length).toBe(0);
  });

  it('Sets maximizable', () => {
    const wrapper = defaultModal({ maximizable: true });
    expect(wrapper.find(maximizeSelector).length).toBeGreaterThan(0);
  });

  it('Handles maximizing', () => {
    const wrapper = defaultModal({ maximizable: true });
    expect(wrapper.find(maximizeSelector + ' Icon').prop('icon')).toBe(
      'bui-maximize'
    );
    expect(wrapper.state('maximized')).toBe(false);

    wrapper
      .find(maximizeSelector)
      .first()
      .simulate('click');

    expect(wrapper.find(maximizeSelector + ' Icon').prop('icon')).toBe(
      'bui-minimize'
    );
    expect(wrapper.state('maximized')).toBe(true);

    wrapper
      .find(maximizeSelector)
      .first()
      .simulate('click');

    expect(wrapper.find(maximizeSelector + ' Icon').prop('icon')).toBe(
      'bui-maximize'
    );
    expect(wrapper.state('maximized')).toBe(false);
  });
});

describe('onClose', () => {
  it('Calls onClose when clicking close button', () => {
    const onClose = jest.fn();
    const wrapper = defaultModal({ onClose });
    wrapper
      .find(closeSelector)
      .first()
      .simulate('click');
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('Calls onClose when clicking overlay', () => {
    const onClose = jest.fn();
    const wrapper = defaultModal({ onClose });
    wrapper.find(overlaySelector).simulate('click');
    expect(onClose.mock.calls.length).toBe(1);
  });
});

describe('Size', () => {
  it('Is md by default', () => {
    const wrapper = defaultModal();
    expect(wrapper.find(rootSelector).hasClass(styles.md)).toBe(true);
  });

  it('Sets size', () => {
    const wrapper = defaultModal({ size: 'xl' });
    expect(wrapper.find(rootSelector).hasClass(styles.xl)).toBe(true);
  });
});

describe('Title', () => {
  it('Has no title by default', () => {
    const wrapper = defaultModal({ title: undefined });
    expect(wrapper.find(titleSelector).length).toBe(0);
  });

  it('Sets title', () => {
    const wrapper = defaultModal({ title: 'MyTitle' });
    expect(wrapper.find(titleSelector).text()).toBe(' MyTitle');
  });
});

describe('Visible', () => {
  it('Is not visible by default', () => {
    const wrapper = defaultModal({ visible: undefined });
    expect(wrapper.find(rootSelector).length).toBe(0);
    expect(wrapper.find(overlaySelector).length).toBe(0);
  });

  it('Sets visible', () => {
    const wrapper = defaultModal({ visible: true });
    expect(wrapper.find(rootSelector).length).toBe(1);
    expect(wrapper.find(overlaySelector).length).toBe(1);
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultModal({ 'data-text': 'text' });
    expect(wrapper.find(rootSelector).prop('data-text')).toBe('text');
  });
});
