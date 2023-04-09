import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Grid, Paper, TextField, useTheme } from '@mui/material';

function EditProfile() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formEditProfile, setFormEditProfile] = useState({
    administratorName: '',
    contact: {
      phoneNumber: '',
      email: '',
    },
    role: '',
    profilePicture: {},
  });

  React.useEffect(() => {
    document.title = 'Edit Profile';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Dashboard"
          currentPage={{
            title: 'Edit Profil',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Edit Profil</h2>
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2} lg={1.4} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Nama Lengkap</span>
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
              <Grid item xs={12} sm={12} md={2} lg={1.4} sx={{ display: 'flex', alignItems: 'center' }}>
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
              <Grid item xs={12} sm={12} md={2} lg={1.4} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Role</span>
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
              onClick={() => navigate('/Dashboard')}
            >
              Edit Profil
            </Button>
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default EditProfile;
