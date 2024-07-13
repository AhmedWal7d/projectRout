import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Customer Name',
    selector: row => row?.customerName,
    sortable: true,
  },
  {
    name: 'Date',
    selector: row => row?.date,
    sortable: true,
  },
  {
    name: 'Amount',
    selector: row => row?.amount,
    sortable: true,
  },
];

const DataTableComponent = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // حالة التحميل

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:300/mydata');
        const jsonData = await response?.json();
        const transactions = jsonData?.flatMap(customer =>
          customer?.transactions?.map(transaction => ({
            ...transaction,
            customerName: customer.name 
          }))
        );
        setFilteredData(transactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); 
      }
    }

    fetchData();
  }, []);   

  const handleSearch = event => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    if (value === '') {
      setFilteredData(data);
    } else {
      const filtered = filteredData.filter(item =>
        item.customerName.toLowerCase().includes(value) ||
        item.date.toLowerCase().includes(value) ||
        item.amount.toString().includes(value)
      );
      setFilteredData(filtered);
    }
    setIsLoading(false);
  };

  return (
    <div className='mt-5'>
    
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        className='Search'
        onChange={handleSearch}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      {!isLoading && (
        <DataTable
          title=" "
          columns={columns}
          data={filteredData}
          pagination
        />
      )}
    </div>
  );
};

export default DataTableComponent;
