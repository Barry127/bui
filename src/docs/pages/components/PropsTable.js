/* eslint react/display-name: 0 */
import React from 'react';
import p from 'prop-types';

import { Table } from '../../../components';

const columns = [
  {
    key: 'property',
    dataField: 'property',
    title: 'Property',
    render: (property, { required }) => (
      <code>
        {property}
        {required && <sup>*</sup>}
      </code>
    )
  },
  {
    key: 'description',
    dataField: 'description',
    title: 'Description',
    render: (property, row) => {
      if (row.type === 'enum') {
        return (
          <div className="enum">
            {property}, options:{' '}
            {row.options.map((option, i) => (
              <React.Fragment key={option}>
                <code>{option}</code>
                {i !== row.options.length - 1 && ', '}
              </React.Fragment>
            ))}
          </div>
        );
      }

      return property;
    }
  },
  {
    key: 'type',
    dataField: 'type',
    title: 'Type',
    render: type => <code>{type}</code> // eslint-disable-line react/display-name
  },
  {
    key: 'default',
    dataField: 'default',
    title: 'Default'
  }
];

const PropsTable = ({ props }) => {
  // console.log(props);
  const dataSource = normalizeProps(props);
  // console.log(dataSource[1]);
  return (
    <Table
      className="doc-props-table"
      columns={columns}
      dataSource={dataSource}
      borders={false}
    />
  );
};

PropsTable.propTypes = {
  props: p.object
};

const normalizeProps = props =>
  Object.keys(props).map(property => ({
    key: property,
    property,
    required: props[property].required,
    description: props[property].description,
    type: props[property].type.name,
    options:
      props[property].type.name === 'enum'
        ? props[property].type.value.map(option => option.value)
        : [],
    default: props[property].defaultValue
      ? props[property].defaultValue.value
      : '-'
  }));

export default PropsTable;
