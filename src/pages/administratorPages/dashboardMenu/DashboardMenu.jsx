import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getExample } from '../../../redux/actions/exampleAction';
import EnhancedTable from '../../../components/Table/EnhancedTable';
import ResponsiveTable from '../../../components/Table/ResponsiveTable';
import InformationCard from '../../../components/Card/InformationCard/InformationCard';

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
          <Grid item lg={6} sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid container spacing={2} sx={{ height: '100%' }}>
              <Grid item lg={6} sx={{ height: '100%' }}>
                <InformationCard
                  title="Pesanan sedang Berjalan"
                  content={{ normalText: '19', smallText: '(Small Text)', embedHTML: '' }}
                  navigate={{ text: 'Lihat daftar pesanan', url: '/pesanan' }}
                />
              </Grid>
              <Grid item lg={6} sx={{ height: '100%' }}>
                <InformationCard
                  title="adsasd sadasdsaas asdsa as"
                  content={{ normalText: 'Normal Text', smallText: 'Small Text', embedHTML: '' }}
                  navigate={{ text: 'Lihat daftar pesanan', url: '/pesanan' }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ height: '100%' }}>
              <Grid item lg={6} sx={{ height: '100%' }}>
                <InformationCard
                  title="Pesanan sedang Berjalan"
                  content={{ normalText: '19', smallText: '(Small Text)', embedHTML: '' }}
                  navigate={{ text: 'Lihat daftar pesanan', url: '/pesanan' }}
                />
              </Grid>
              <Grid item lg={6} sx={{ height: '100%' }}>
                <InformationCard
                  title="adsasd sadasdsaas asdsa as"
                  content={{ normalText: 'Normal Text', smallText: 'Small Text', embedHTML: '' }}
                  navigate={{ text: 'Lihat daftar pesanan', url: '/pesanan' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={6}>
            <InformationCard
              title="adsasd sadasdsaas asdsa as"
              content={{
                embedHTML: (
                  <>
                    <h1>Lorem, ipsum dolor.</h1>
                    <h1>Lorem, ipsum dolor.</h1>
                    <h1>Lorem, ipsum dolor.</h1>
                    <h1>Lorem, ipsum dolor.</h1>
                  </>
                ),
              }}
              navigate={{ text: 'Lihat daftar pesanan', url: '/pesanan' }}
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
