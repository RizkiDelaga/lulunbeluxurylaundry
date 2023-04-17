import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Weekly financial statistics',
    },
  },
};

// const labels = ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Today'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       fill: true,
//       label: 'Income',
//       data: [598884, 819838, 674452, 454919, 925132, 759443, 767332],
//       borderColor: 'rgb(31, 48, 92)',
//       backgroundColor: 'rgb(31, 48, 92, 0.5)',
//     },
//     {
//       fill: false,
//       label: 'Expenses',
//       data: [218828, 53563, 221413, 54946, 91714, 80128, 279408],
//       borderColor: 'rgb(211, 47, 47)',
//       backgroundColor: 'rgb(211, 47, 47, 0.5)',
//     },
//   ],
// };

function AreaChart(props) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Line options={options} data={props.data}  />
    </Fragment>
  );
}

export default AreaChart;
