import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Grid, Paper, TextField, useTheme } from '@mui/material';

function RegisterNewCustomer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formRegisterNewCustomer, setFormRegisterNewCustomer] = useState({
    customerName: '',
    contact: {
      phoneNumber: '',
      email: '',
    },
    birthDate: '',
    profilePicture: {},
    mainAddress: {
      region: {
        subDistrict: '',
        urbanVillage: '',
        hamlet: '',
        neighbourhood: '',
      },
      buildingDetails: {
        buildingType: '',
        buildingName_Or_Number: '',
      },
      addressDetails: '',
      buildingPhoto: {},
      mainAddress: false,
    },
  });

  React.useEffect(() => {
    document.title = 'Registrasi Pelanggan Baru';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Pelanggan"
          currentPage={{
            title: 'Registrasi Pelanggan Baru',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Registrasi Pelanggan Baru</h2>
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.8} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Nama Pelanggan</span>
              </Grid>

              <Grid
                item
                xs
                lg
                sx={{
                  display: 'flex',
                  [theme.breakpoints.down('md')]: {
                    paddingTop: '8px !important',
                  },
                }}
              >
                <TextField required label="Nama Administator" sx={{ width: '100%' }} />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.8} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Kontak</span>
              </Grid>
              <Grid
                item
                xs
                lg
                sx={{
                  display: 'flex',
                  [theme.breakpoints.down('md')]: {
                    paddingTop: '8px !important',
                  },
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm>
                    <TextField required label="Nama Barang" sx={{ width: '100%' }} />
                  </Grid>
                  <Grid item xs={12} sm>
                    <TextField required label="Kuantitas" type="number" sx={{ width: '100%' }} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.8} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Tanggal Lahir</span>
              </Grid>

              <Grid
                item
                xs
                lg
                sx={{
                  display: 'flex',
                  [theme.breakpoints.down('md')]: {
                    paddingTop: '8px !important',
                  },
                }}
              >
                <TextField required label="Nama Administator" sx={{ width: '100%' }} />
              </Grid>
            </Grid>

            <div style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>Alamat Utama</div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.8} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Daerah</span>
              </Grid>
              <Grid
                item
                xs
                lg
                sx={{
                  display: 'flex',
                  [theme.breakpoints.down('md')]: {
                    paddingTop: '8px !important',
                  },
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm md lg>
                    <TextField required label="Nama Barang" sx={{ width: '100%' }} />
                  </Grid>
                  <Grid item xs={5} sm={3} md={2} lg={1.2}>
                    <TextField required label="Kuantitas" type="number" sx={{ width: '100%' }} />
                  </Grid>
                  <Grid item xs sm={12} md={3} lg={2}>
                    <TextField required label="Harga per Unit" type="number" sx={{ width: '100%' }} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.8} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Detail Bangunan</span>
              </Grid>
              <Grid
                item
                xs
                lg
                sx={{
                  display: 'flex',
                  [theme.breakpoints.down('md')]: {
                    paddingTop: '8px !important',
                  },
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm>
                    <TextField required label="Nama Barang" sx={{ width: '100%' }} />
                  </Grid>
                  <Grid item xs={12} sm>
                    <TextField required label="Kuantitas" type="number" sx={{ width: '100%' }} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.8} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Rincian Alamat</span>
              </Grid>

              <Grid
                item
                xs
                lg
                sx={{
                  display: 'flex',
                  [theme.breakpoints.down('md')]: {
                    paddingTop: '8px !important',
                  },
                }}
              >
                <TextField required label="Nama Administator" sx={{ width: '100%' }} />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              size="large"
              style={{ width: '100%', fontWeight: 'bold' }}
              onClick={() => navigate('/Pelanggan')}
            >
              Registrasi Pelanggan
            </Button>
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default RegisterNewCustomer;
