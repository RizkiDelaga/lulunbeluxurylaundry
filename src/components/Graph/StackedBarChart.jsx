import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Weekly financial statistics',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Today'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Income',
//       data: [598884, 819838, 674452, 454919, 925132, 759443, 767332],
//       backgroundColor: 'rgb(31, 48, 92)',
//     },
//     {
//       label: 'Expenses',
//       data: [218828, 53563, 221413, 54946, 91714, 80128, 279408],
//       backgroundColor: 'rgb(211, 47, 47)',
//     },
//   ],
// };

function StackedBarChart({ dataset }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Bar options={options} data={dataset} />
    </Fragment>
  );
}

export default StackedBarChart;
