import React from 'react';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'اسم العميل',
    selector: row => row.customerName,
    sortable: true,
  },
  {
    name: 'التاريخ',
    selector: row => row.date,
    sortable: true,
  },
  {
    name: 'المبلغ',
    selector: row => row.amount,
    sortable: true,
  },
];

const DataTableComponent = ({ data }) => {
  return (
    <DataTable
      title=" Title"
      columns={columns}
      data={data}
      pagination
    />
  );
};

export default DataTableComponent;
