import React from 'react';
import { Line } from 'react-chartjs-2';
import { Paper } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DataVisualization = ({ data }) => {
  const labels = data.map(entry => new Date(entry.timestamp).toLocaleTimeString());
  const gyroscopeX = data.map(entry => entry.gyroscope.x);

  const chartData = {
    labels, // X-axis labels
    datasets: [
      {
        label: 'Gyroscope X',
        data: gyroscopeX, // Y-axis data
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4, // Make the line smoother
        fill: true, // Optional: Fill area under the curve
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Gyroscope X Data Over Time',
      },
    },
    scales: {
      x: {
        type: 'category',
        ticks: {
          maxTicksLimit: 10, // Limit the number of ticks on the X-axis for better readability
        },
      },
    },
  };

  return (
    <Paper style={{ padding: '16px', marginTop: '16px' }}>
      <Line data={chartData} options={options} />
    </Paper>
  );
};

export default DataVisualization;
