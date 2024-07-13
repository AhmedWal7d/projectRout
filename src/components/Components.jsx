import React from 'react';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: ' Customer Name',

    selector: row => row?.customerName, 
        sortable: true,
  },
  {
    name: 'Date',
    selector: row => row?.date,  
    sortable: true,
  },
  {
    name: ' Amount',  
    selector: row => row?.amount,
    sortable: true,
  },
];

const DataTableComponent = ({ data }) => {
  return (
  
    <div>
        <DataTable
      title="Display data"
      columns={columns}
      data={data}
      pagination
    />
    </div>
  );
};

export default DataTableComponent;
