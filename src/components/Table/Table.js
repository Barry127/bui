import React from 'react';
import p from 'prop-types';
import cx from 'classnames';

import styles from './Table.module.scss';

/**
 * a Table is used to present static data in tabular format
 */
const Table = ({ borders, className, columns, dataSource, size, ...props }) => {
  const classes = cx(
    styles.table,
    styles[size],
    {
      [styles.borders]: borders
    },
    'bui-Table',
    className
  );

  return (
    <table className={classes} {...props}>
      <thead>
        <tr>
          {columns.map(({ key, title }) => (
            <th key={key}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map(row => (
          <tr key={row.key}>
            {columns.map(({ dataField, key, render }) => (
              <td key={key}>
                {render ? render(row[dataField], row) : row[dataField]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  /** wether Table has outer borders */
  borders: p.bool,
  /** Classname for Table component */
  className: p.string,
  /** Column definition */
  columns: p.arrayOf(
    p.shape({
      dataField: p.string.isRequired,
      key: p.string.isRequired,
      title: p.oneOfType([p.string, p.node]).isRequired,
      render: p.func
    })
  ).isRequired,
  /** Data for table */
  dataSource: p.arrayOf(
    p.shape({
      key: p.any.isRequired
    })
  ).isRequired,
  /** Table size */
  size: p.oneOf(['sm', 'md', 'lg'])
};

Table.defaultProps = {
  borders: true,
  size: 'md'
};

export default Table;
