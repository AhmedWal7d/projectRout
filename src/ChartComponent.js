    import React from 'react';
    import { Bar } from 'react-chartjs-2';
    import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    const ChartComponent = ({ date, colors }) => {
    // console.log(date);

    // Ensure date is an array and has data
    const customerData = Array.isArray(date) ? date : [];

    const defaultColors = [
        'rgba(75, 192, 192, 0.4)',
        'rgba(153, 102, 255, 0.4)',
        'rgba(255, 159, 64, 0.4)',
        'rgba(255, 99, 132, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(75, 192, 192, 0.4)',
    ];

    const backgroundColors = customerData.length
        ? customerData.map((_, index) => colors?.backgroundColor[index % colors.backgroundColor.length] || defaultColors[index % defaultColors.length])
        : [defaultColors[0]];

    const borderColors = customerData.length
        ? customerData.map((_, index) => colors?.borderColor[index % colors.borderColor.length] || defaultColors[index % defaultColors.length])
        : [defaultColors[0]];

    const data = {
        labels: customerData.length ? customerData.map(entry => entry.customerName) : ['No Data'], // Fallback to 'No Data' if customerData is empty
        datasets: [
        {
            label: 'Customer Dataset',
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            data: customerData.length ? customerData.map(entry => entry.amount) : [0], // Use the amounts from the API data
        },
        ],
    };

    const options = {
        scales: {
        y: {
            beginAtZero: true,
        },
        },
    };

    return (
        <div className="chart-container">
        <h2>Chart.js in React</h2>
        <Bar data={data} options={options} />
        </div>
    );
    };

    export default ChartComponent;
