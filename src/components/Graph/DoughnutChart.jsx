import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ dataset }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Doughnut data={dataset} />
    </Fragment>
  );
}

export default DoughnutChart;
