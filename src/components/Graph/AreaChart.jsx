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
  },
};

function AreaChart({ dataset }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Line options={options} data={dataset} />
    </Fragment>
  );
}

export default AreaChart;
