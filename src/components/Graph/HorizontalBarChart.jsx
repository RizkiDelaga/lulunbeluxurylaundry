import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
  },
};

const labels = ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Today'];

function HorizontalBarChart({ dataset }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Bar options={options} data={dataset} />
    </Fragment>
  );
}

export default HorizontalBarChart;
