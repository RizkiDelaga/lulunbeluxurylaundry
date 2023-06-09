import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// export const data = {
//   labels: ['Income', 'Expenses'],
//   datasets: [
//     {
//       label: 'Weekly financial statistics',
//       data: [5000000, 1000000],
//       backgroundColor: ['rgb(31, 48, 92)', 'rgb(211, 47, 47)'],
//       borderColor: ['rgb(31, 48, 92)', 'rgb(211, 47, 47)'],
//       borderWidth: 1,
//     },
//   ],
// };

function PieChart({ dataset }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Pie data={dataset} />
    </Fragment>
  );
}

export default PieChart;
