import React, { useEffect, useState } from 'react';
import DataTableComponent from './components/Components';
import ChartComponent from './ChartComponent';

const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:300/mydata');
        const jsonData = await response?.json();
        // console.log(jsonData); // Check if jsonData is retrieved correctly
        
        const transactions = jsonData?.flatMap(customer =>
          customer?.transactions?.map(transaction => ({
            ...transaction,
            customerName: customer.name 
          }))
        );
        // console.log(transactions); 
        
        setData(transactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchData();
  }, []);
  

  // console.log(data);
  return (
    <div>
      <DataTableComponent data={data} />
      <ChartComponent  date={data}/>
    </div>
  );
};

export default App;
