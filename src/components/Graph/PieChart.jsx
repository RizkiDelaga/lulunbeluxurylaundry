import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ dataset }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Pie data={dataset} />
    </Fragment>
  );
}

export default PieChart;
