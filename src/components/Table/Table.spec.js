import React from 'react';
import { shallow } from 'enzyme';

import Table from './Table';
import styles from './Table.module.scss';

const rootSelector = `.${styles.table}`;

const columns = [
  {
    key: '#',
    dataField: 'place',
    title: '#'
  },
  {
    key: 'song',
    dataField: 'artist',
    title: 'Song',
    render: (artist, row) => `${artist} - ${row.title}`
  },
  {
    key: 'year',
    dataField: 'year',
    title: 'Year'
  }
];

const data = [
  {
    id: 0,
    key: 0,
    place: 1,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    year: 1975
  },
  {
    id: 0,
    key: 0,
    place: 2,
    title: 'Hotel California',
    artist: 'Eagles',
    year: 1978
  },
  {
    id: 0,
    key: 0,
    place: 3,
    title: 'Piano Man',
    artist: 'Billy Joel',
    year: 1974
  }
];

const defaultProps = {
  columns,
  dataSource: data
};

const defaultTable = (props = {}) => {
  const allProps = Object.assign({}, defaultProps, props);
  return shallow(<Table {...allProps} />);
};

it('Renders Table', () => {
  const wrapper = defaultTable();
  expect(wrapper.find(rootSelector).length).toBe(1);

  expect(wrapper.find('thead').text()).toBe('#SongYear');

  expect(wrapper.find('tbody tr').length).toBe(3);

  expect(
    wrapper
      .find('tbody tr')
      .last()
      .text()
  ).toBe('3Billy Joel - Piano Man1974');
});

describe('borders', () => {
  it('Is true by default', () => {
    const wrapper = defaultTable();
    expect(wrapper.find(rootSelector).hasClass(styles.borders)).toBe(true);
  });

  it('Sets borders', () => {
    const wrapper = defaultTable({ borders: false });
    expect(wrapper.find(rootSelector).hasClass(styles.borders)).toBe(false);
  });
});

describe('className', () => {
  it('Sets the className', () => {
    const wrapper = defaultTable({ className: 'my-class' });
    expect(wrapper.find(rootSelector).hasClass('my-class')).toBe(true);
  });
});

describe('size', () => {
  it('Is md by default', () => {
    const wrapper = defaultTable();
    expect(wrapper.find(rootSelector).hasClass(styles.md)).toBe(true);
  });

  it('Sets size', () => {
    const wrapper = defaultTable({ size: 'lg' });
    expect(wrapper.find(rootSelector).hasClass(styles.lg)).toBe(true);
  });
});

describe('props', () => {
  it('Passes props', () => {
    const wrapper = defaultTable({ 'data-text': 'text' });
    expect(wrapper.find(rootSelector).prop('data-text')).toBe('text');
  });
});
