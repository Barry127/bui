import React from 'react';
import { shallow } from 'enzyme';

import Text from './Text';
import styles from './Text.module.scss';

const rootSelector = `.${styles.text}`;
const defaultText = (text = 'DefaultText') => shallow(<Text>{text}</Text>);

it('Renders Text with children', () => {
  const wrapper = defaultText('MyText');
  expect(wrapper.find(rootSelector).length).toBe(1);
  expect(wrapper.find(rootSelector).text()).toBe('MyText');
});

describe('align', () => {
  it('Is has no align by default', () => {
    const wrapper = defaultText();
    expect(wrapper.find(rootSelector).hasClass(styles.left)).toBe(false);
    expect(wrapper.find(rootSelector).hasClass(styles.right)).toBe(false);
    expect(wrapper.find(rootSelector).hasClass(styles.center)).toBe(false);
    expect(wrapper.find(rootSelector).hasClass(styles.justify)).toBe(false);
  });

  it('Sets align left', () => {
    const wrapper = shallow(<Text align="left">I'm left</Text>);
    expect(wrapper.find(rootSelector).hasClass(styles.left)).toBe(true);
  });

  it('Sets align right', () => {
    const wrapper = shallow(<Text align="right">I'm right</Text>);
    expect(wrapper.find(rootSelector).hasClass(styles.right)).toBe(true);
  });

  it('Sets align center', () => {
    const wrapper = shallow(<Text align="center">I'm center</Text>);
    expect(wrapper.find(rootSelector).hasClass(styles.center)).toBe(true);
  });

  it('Sets align justify', () => {
    const wrapper = shallow(<Text align="justify">I'm justify</Text>);
    expect(wrapper.find(rootSelector).hasClass(styles.justify)).toBe(true);
  });
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = shallow(<Text className="my-class">Styled Text</Text>);
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('color', () => {
  it('Sets the color', () => {
    const wrapper = shallow(<Text color="blue">I'm blue</Text>);
    expect(wrapper.find(rootSelector).hasClass(styles.blue)).toBe(true);

    const wrapper2 = shallow(<Text color="inherit">I'm inheritted</Text>);
    expect(wrapper2.find(rootSelector).hasClass(styles.inherit)).toBe(true);
  });
});

describe('Block vs inline', () => {
  it('Is block by default', () => {
    const wrapper = defaultText();
    expect(wrapper.find(`div.${styles.text}`).length).toBe(1);
    expect(wrapper.find(`span.${styles.text}`).length).toBe(0);
  });

  it('Sets inline', () => {
    const wrapper = shallow(<Text inline>Inline Text</Text>);
    expect(wrapper.find(`span.${styles.text}`).length).toBe(1);
    expect(wrapper.find(`div.${styles.text}`).length).toBe(0);
  });
});

describe('italic', () => {
  it('Is not italic by default', () => {
    const wrapper = defaultText();
    expect(wrapper.find(rootSelector).hasClass(styles.italic)).toBe(false);
  });

  it('Sets italic', () => {
    const wrapper = shallow(<Text italic>I'm italic</Text>);
    expect(wrapper.find(rootSelector).hasClass(styles.italic)).toBe(true);
  });
});

describe('size', () => {
  it('Has no size set by default', () => {
    const wrapper = shallow(<Text style={{ color: 'red' }}>MyText</Text>);
    expect(wrapper.find(rootSelector).prop('style')).toHaveProperty(
      'fontSize',
      undefined
    );
    expect(wrapper.find(rootSelector).prop('style')).toHaveProperty(
      'color',
      'red'
    );
  });

  it('Sets the size', () => {
    const wrapper = shallow(
      <Text size="1em" style={{ color: 'red' }}>
        Large Text
      </Text>
    );
    expect(wrapper.find(rootSelector).prop('style')).toHaveProperty(
      'fontSize',
      '1em'
    );
    expect(wrapper.find(rootSelector).prop('style')).toHaveProperty(
      'color',
      'red'
    );
  });
});

describe('truncate', () => {
  it('Does not truncate by default', () => {
    const wrapper = defaultText();
    expect(wrapper.find(rootSelector).hasClass(styles.truncate)).toBe(false);
  });

  it('Sets truncate', () => {
    const wrapper = shallow(<Text truncate>I'm truncated</Text>);
    expect(wrapper.find(rootSelector).hasClass(styles.truncate)).toBe(true);
  });
});

describe('underline', () => {
  it('Is not underlined by default', () => {
    const wrapper = defaultText();
    expect(wrapper.find(rootSelector).hasClass(styles.underline)).toBe(false);
  });

  it('Sets underline', () => {
    const wrapper = shallow(<Text underline>I'm underlined</Text>);
    expect(wrapper.find(rootSelector).hasClass(styles.underline)).toBe(true);
  });
});

describe('weight', () => {
  it('Is regular by default', () => {
    const wrapper = defaultText();
    expect(wrapper.find(rootSelector).hasClass(styles.bold)).toBe(false);
    expect(wrapper.find(rootSelector).hasClass(styles.semibold)).toBe(false);
    expect(wrapper.find(rootSelector).hasClass(styles.light)).toBe(false);
  });

  it('Sets bold', () => {
    const wrapper = shallow(<Text weight="bold">I'm bold</Text>);
    expect(wrapper.find(rootSelector).hasClass(styles.bold)).toBe(true);
  });

  it('Sets medium', () => {
    const wrapper = shallow(<Text weight="medium">I'm medium</Text>);
    expect(wrapper.find(rootSelector).hasClass(styles.medium)).toBe(true);
  });

  it('Sets light', () => {
    const wrapper = shallow(<Text weight="light">I'm light</Text>);
    expect(wrapper.find(rootSelector).hasClass(styles.light)).toBe(true);
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = shallow(
      <Text id="text-id" data-text="hello">
        Hello World
      </Text>
    );

    expect(wrapper.find('#text-id').length).toBe(1);
    expect(wrapper.find(rootSelector).prop('data-text')).toBe('hello');
  });
});
