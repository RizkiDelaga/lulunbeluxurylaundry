import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Grid, Paper, ToggleButtonGroup, styled, useTheme } from '@mui/material';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import MuiToggleButton from '@mui/material/ToggleButton';
import TimelineIcon from '@mui/icons-material/Timeline';
import BarChartIcon from '@mui/icons-material/BarChart';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import AreaChart from '../../../components/Graph/AreaChart';
import HorizontalBarChart from '../../../components/Graph/HorizontalBarChart';
import VerticalBarChart from '../../../components/Graph/VerticalBarChart';
import StackedBarChart from '../../../components/Graph/StackedBarChart';
import { Height } from '@mui/icons-material';
import PieChart from '../../../components/Graph/PieChart';
import DoughnutChart from '../../../components/Graph/DoughnutChart';

function FinanceMenu() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [lineBarChart, setLineBarChart] = React.useState('Line Chart');
  const [percentageChart, setPercentageChart] = React.useState('Pie Chart');

  React.useEffect(() => {
    document.title = 'Menu Keuangan';
  }, []);

  const ToggleButton = styled(MuiToggleButton)({
    '&.Mui-selected, &.Mui-selected:hover': {
      color: '#1F305C !important',
      backgroundColor: 'rgba(31, 48, 92, 0.25)',
    },
  });

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Keuangan"
          directButton={[
            {
              color: 'primary',
              iconType: 'add',
              value: 'Tambah Pemasukan',
              link: '/Keuangan/InputPemasukan',
            },
            {
              color: 'secondary',
              iconType: 'add',
              value: 'Tambah Pengeluaran',
              link: '/Keuangan/InputPengeluaran',
            },
          ]}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={8}>
              <Grid container>
                <Grid item xs={12} sm sx={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Grafik Keuangan</span>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm
                  sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    [theme.breakpoints.down('sm')]: {
                      display: 'flex',
                      justifyContent: 'center',
                      py: 1,
                    },
                  }}
                >
                  <ToggleButtonGroup
                    value={lineBarChart}
                    color="primary"
                    exclusive
                    onChange={(event, value) => {
                      if (value) {
                        setLineBarChart(value);
                      }
                    }}
                    sx={{
                      // border: '1px solid #1F305C',
                      [theme.breakpoints.down('sm')]: {
                        height: '35px !important',
                      },
                    }}
                  >
                    <ToggleButton value="Line Chart" sx={{ border: '1px solid #1F305C' }}>
                      <TimelineIcon />
                    </ToggleButton>
                    <ToggleButton value="Horizontal Bar Chart" sx={{ border: '1px solid #1F305C' }}>
                      <BarChartIcon />
                    </ToggleButton>
                    <ToggleButton value="Vertical Bar Chart" sx={{ border: '1px solid #1F305C' }}>
                      <BarChartIcon sx={{ transform: 'rotate(90deg)' }} />
                    </ToggleButton>
                    <ToggleButton value="Stacked Bar Chart" sx={{ border: '1px solid #1F305C' }}>
                      <StackedBarChartIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Grid>

              {lineBarChart === 'Line Chart' ? (
                <AreaChart
                  data={{
                    labels: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Today'],
                    datasets: [
                      {
                        fill: true,
                        label: 'Income',
                        data: [598884, 819838, 674452, 454919, 925132],
                        borderColor: 'rgb(31, 48, 92)',
                        backgroundColor: 'rgb(31, 48, 92, 0.5)',
                      },
                      {
                        fill: false,
                        label: 'Expenses',
                        data: [218828, 53563, 221413, 54946, 91714],
                        borderColor: 'rgb(211, 47, 47)',
                        backgroundColor: 'rgb(211, 47, 47, 0.5)',
                      },
                    ],
                  }}
                />
              ) : null}
              {lineBarChart === 'Horizontal Bar Chart' ? <HorizontalBarChart /> : null}
              {lineBarChart === 'Vertical Bar Chart' ? <VerticalBarChart /> : null}
              {lineBarChart === 'Stacked Bar Chart' ? <StackedBarChart /> : null}
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Grid container>
                <Grid item xs={12} sm sx={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Persentase</span>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm
                  sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    [theme.breakpoints.down('sm')]: {
                      display: 'flex',
                      justifyContent: 'center',
                      py: 1,
                    },
                  }}
                >
                  <ToggleButtonGroup
                    value={percentageChart}
                    color="primary"
                    exclusive
                    onChange={(event, value) => {
                      if (value) {
                        setPercentageChart(value);
                      }
                    }}
                    sx={{
                      // border: '1px solid #1F305C',
                      [theme.breakpoints.down('sm')]: {
                        height: '35px !important',
                      },
                    }}
                  >
                    <ToggleButton value="Pie Chart" sx={{ border: '1px solid #1F305C' }}>
                      <PieChartIcon />
                    </ToggleButton>
                    <ToggleButton value="Donut Chart" sx={{ border: '1px solid #1F305C' }}>
                      <DonutSmallIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Grid>

              {percentageChart === 'Pie Chart' ? <PieChart /> : null}
              {percentageChart === 'Donut Chart' ? <DoughnutChart /> : null}
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16"></Box>
        </Paper>
      </div>
    </>
  );
}

export default FinanceMenu;
