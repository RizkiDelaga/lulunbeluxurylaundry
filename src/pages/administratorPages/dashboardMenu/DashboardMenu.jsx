import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getExample } from '../../../redux/actions/exampleAction';
import EnhancedTable from '../../../components/Table/EnhancedTable';
import ResponsiveTable from '../../../components/Table/ResponsiveTable';
import InformationCard from '../../../components/Card/InformationCard/InformationCard';
import AreaChart from '../../../components/Graph/AreaChart';

function DashboardMenu() {
  const navigate = useNavigate();

  const [dataTable, setDataTable] = useState([
    {
      name: '',
      code: 0,
      population: 0,
      size: 0,
      description: '',
      elementHTML: 0,
    },
  ]);
  const dispatch = useDispatch();
  const { isLoading: loadingGetExample, data: dataGetExample } = useSelector((state) => state.getExample);

  React.useEffect(() => {
    document.title = 'Menu Dashboard';
    dispatchGetExample();
    if (!loadingGetExample) {
      saveData(dataGetExample);
    }
  }, [loadingGetExample]);

  const dispatchGetExample = async () => {
    return await dispatch(getExample());
  };

  const saveData = (data) => {
    // data.map(() => {
    setDataTable(
      data.map((item) => ({
        name: item.title,
        code: parseInt(item.id),
        population: parseInt(item.price),
        size: parseInt(item.price * item.id),
        description: item.deskripsi,
        elementHTML: 9,
      }))
    );
    // });
  };

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Dashboard"
          directButton={[
            {
              color: 'primary',
              iconType: 'add',
              value: 'Registrasi administrator baru',
              link: '/Dashboard/RegistrasiAdministratorBaru',
            },
          ]}
        />

        {/* Main Content */}
        <Grid container spacing={2}>
          <Grid item md={12} lg={6} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={4} lg={6}>
                <InformationCard
                  title="Pesanan sedang Berjalan"
                  content={{ normalText: '19' }}
                  navigate={{ text: 'Lihat daftar pesanan', url: '/Pesanan' }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={6}>
                <InformationCard
                  title="Event Sedang berlangsung"
                  content={{ normalText: '3' }}
                  navigate={{ text: 'Lihat daftar cara', url: '/Event' }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={6}>
                <InformationCard
                  title="Pesanan selesai"
                  content={{ normalText: '81.235' }}
                  navigate={{ text: 'Lihat daftar pesanan selesai', url: '/Pesanan' }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <InformationCard
                  title="Total pelanggan"
                  content={{ normalText: '1019' }}
                  navigate={{ text: 'Lihat daftar pelanggan', url: '/Pelanggan' }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={12}>
                <InformationCard
                  title="Rating dan Review Pelanggan"
                  content={{ normalText: '5', smallText: '(23.112)', embedHTML: '' }}
                  navigate={{ text: 'Lihat rating dan review pelanggan', url: '/Pesanan/RatingDanReviewPelanggan' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6}>
            <InformationCard
              title="Laporan keuangan mingguan terbaru"
              content={{
                embedHTML: (
                  <>
                    <AreaChart
                      data={{
                        labels: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Today'],
                        datasets: [
                          {
                            fill: true,
                            label: 'Pendapatan',
                            data: [598884, 819838, 674452, 454919, 925132, 791527, 672380],
                            borderColor: 'rgb(31, 48, 92)',
                            backgroundColor: 'rgb(31, 48, 92, 0.5)',
                          },
                          {
                            fill: false,
                            label: 'Pengeluaran',
                            data: [218828, 53563, 221413, 54946, 91714, 891632, 872923],
                            borderColor: 'rgb(211, 47, 47)',
                            backgroundColor: 'rgb(211, 47, 47, 0.5)',
                          },
                        ],
                      }}
                    />
                  </>
                ),
              }}
              navigate={{ text: 'Lihat laporan keuangan', url: '/Keuangan' }}
            />
          </Grid>
        </Grid>

        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <EnhancedTable />
        </Paper>

        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16"></Box>
        </Paper>
      </div>
    </>
  );
}

export default DashboardMenu;
