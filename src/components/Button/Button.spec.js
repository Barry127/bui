import React from 'react';
import { shallow } from 'enzyme';

import Button from './Button';
import styles from './Button.module.scss';

const rootSelector = `.${styles.button}`;
const defaultButton = (text = 'Default Button', type = 'button') =>
  shallow(<Button type={type}>{text}</Button>);

it('Renders Button with children', () => {
  const wrapper = shallow(<Button>My Button</Button>);
  expect(wrapper.find(rootSelector).length).toBe(1);
  expect(wrapper.find(rootSelector).text()).toBe('My Button');

  const wrapper2 = shallow(<Button type="link">My Button</Button>);
  expect(wrapper2.find(rootSelector).length).toBe(1);
  expect(wrapper2.find(rootSelector).text()).toBe('My Button');
});

describe('active', () => {
  it('Is not active default', () => {
    const wrapper = defaultButton();
    expect(wrapper.find(rootSelector).hasClass(styles.active)).toBe(false);
  });

  it('Sets active', () => {
    const wrapper = shallow(<Button active>Large Button</Button>);
    expect(wrapper.find(rootSelector).hasClass(styles.active)).toBe(true);
  });
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = shallow(
      <Button className="my-class">Styled Button</Button>
    );
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('color', () => {
  it('Color is default by default', () => {
    const wrapper = defaultButton();
    expect(wrapper.find(rootSelector).hasClass(styles.default)).toBe(true);
  });

  it('Sets the color', () => {
    const wrapper = shallow(<Button color="primary">Primary Button</Button>);
    expect(wrapper.find(rootSelector).hasClass(styles.primary)).toBe(true);

    const wrapper2 = shallow(<Button color="danger">Danger Button</Button>);
    expect(wrapper2.find(rootSelector).hasClass(styles.danger)).toBe(true);
  });
});

describe('disabled', () => {
  it('Is not disabled by default', () => {
    const wrapper = defaultButton();
    expect(wrapper.find(rootSelector).prop('disabled')).toBe(false);
  });

  it('Sets the disabled state', () => {
    const wrapper = shallow(<Button disabled>I'm disabled</Button>);
    expect(wrapper.find(rootSelector).prop('disabled')).toBe(true);
  });

  it('Does not set the disabled prop on a type link Button', () => {
    const wrapper = shallow(
      <Button type="link" disabled>
        I'm disabled
      </Button>
    );
    expect(wrapper.find(rootSelector).prop('disabled')).toBe(undefined);
  });
});

describe('fluid', () => {
  it('Is not fluid by default', () => {
    const wrapper = defaultButton();
    expect(wrapper.find(rootSelector).hasClass(styles.fluid)).toBe(false);
  });

  it('Sets the fluid class', () => {
    const wrapper = shallow(<Button fluid>I'm fluid</Button>);
    expect(wrapper.find(rootSelector).hasClass(styles.fluid)).toBe(true);
  });
});

describe('href', () => {
  it('Does not set a href on a button type element', () => {
    const wrapper = shallow(<Button href="https://example.com">Button</Button>);
    expect(wrapper.find(rootSelector).prop('href')).toBe(undefined);
  });

  it('Has no href by default', () => {
    const wrapper = shallow(<Button type="link">Button</Button>);
    expect(wrapper.find(rootSelector).prop('href')).toBe(undefined);
  });

  it('Sets the href prop on a link type button', () => {
    const wrapper = shallow(
      <Button type="link" href="https://example.com">
        Button
      </Button>
    );
    expect(wrapper.find(rootSelector).prop('href')).toBe('https://example.com');
  });
});

describe('icon', () => {
  it('Is no icon button by default', () => {
    const wrapper = defaultButton();
    expect(wrapper.find(rootSelector).hasClass(styles.icon)).toBe(false);
  });

  it('Sets icon styling', () => {
    const wrapper = shallow(<Button icon>*</Button>);
    expect(wrapper.find(rootSelector).hasClass(styles.icon)).toBe(true);
  });
});

describe('outline', () => {
  it('Is not outlined default', () => {
    const wrapper = defaultButton();
    expect(wrapper.find(rootSelector).hasClass(styles.outline)).toBe(false);
  });

  it('Sets outline', () => {
    const wrapper = shallow(<Button outline>Large Button</Button>);
    expect(wrapper.find(rootSelector).hasClass(styles.outline)).toBe(true);
  });
});

describe('size', () => {
  it('Is md by default', () => {
    const wrapper = defaultButton();
    expect(wrapper.find(rootSelector).hasClass(styles.md)).toBe(true);
  });

  it('Sets the size', () => {
    const wrapper = shallow(<Button size="lg">Large Button</Button>);
    expect(wrapper.find(rootSelector).hasClass(styles.lg)).toBe(true);
  });
});

describe('type', () => {
  it('Is of type button by default', () => {
    const wrapper = defaultButton();
    expect(wrapper.find(rootSelector).prop('type')).toBe('button');
    expect(wrapper.is('button')).toBe(true);
  });

  it('Sets the type attribute', () => {
    const wrapper = shallow(<Button type="submit">Submit</Button>);
    expect(wrapper.find(rootSelector).prop('type')).toBe('submit');
    expect(wrapper.is('button')).toBe(true);
  });

  it('Uses an anchor tag for the type of link', () => {
    const wrapper = shallow(<Button type="link">Link Button</Button>);
    expect(wrapper.is('a')).toBe(true);
  });

  it('Sets the aria role to button on the link type', () => {
    const wrapper = shallow(<Button type="link">Link Button</Button>);
    expect(wrapper.find(rootSelector).prop('role')).toBe('button');
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = shallow(
      <Button id="button-id" data-text="Button Text">
        Click Me
      </Button>
    );

    expect(wrapper.find('#button-id').length).toBe(1);
    expect(wrapper.find(rootSelector).prop('data-text')).toBe('Button Text');

    const wrapper2 = shallow(
      <Button type="link" id="link-button" data-text="Button Text">
        Click Me
      </Button>
    );

    expect(wrapper2.find('#link-button').length).toBe(1);
    expect(wrapper2.find(rootSelector).prop('data-text')).toBe('Button Text');
  });
});
