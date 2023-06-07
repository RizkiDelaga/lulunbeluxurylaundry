import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  useTheme,
} from '@mui/material';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

function CustomerRegistration() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });
  const [formRegisterCustomer, setFormRegisterCustomer] = useState({
    customerName: '',
    noTelp: '',
    password: '',
    confirmPassword: '',
  });

  React.useEffect(() => {
    document.title = 'Registrasi Pelanggan Baru';
  }, []);

  const handleCreateCustomer = async () => {
    try {
      const res = await axios({
        method: 'POST',
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/user/register',
        data: {
          nama: formRegisterCustomer.customerName,
          noTelp: formRegisterCustomer.noTelp,
          email: 'rizki11223@gmail.com',
          password: formRegisterCustomer.password,
        },
      });
      console.log('Response POST Register Customer');
      console.log(res);
      // navigate('/Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box component="main" sx={{ marginX: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 'calc(100vh - 64px)',
            [theme.breakpoints.down('md')]: {
              my: '25px',
              height: 'fit-content',
            },
          }}
        >
          <img src={'https://katapopuler.com/wp-content/uploads/2020/11/dummy.png'} alt="logo" height={80} />

          <br />

          {/* Main Content */}
          <Paper
            elevation={3}
            sx={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '800px' }}
          >
            <Box className="gap-16">
              <div style={{ width: '100%', textAlign: 'center', paddingTop: '8px', paddingBottom: '8px' }}>
                <h2 style={{ margin: 0 }}>Buat Akun</h2>
              </div>
              <Grid container>
                <Grid item xs={12} sm={12} md={2.6} lg={3} sx={{ display: 'flex', alignItems: 'center' }}>
                  Nama Lengkap
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
                  <TextField
                    required
                    label="Nama Lengkap"
                    value={formRegisterCustomer.customerName}
                    onChange={(e) => {
                      setFormRegisterCustomer({ ...formRegisterCustomer, customerName: e.target.value });
                    }}
                    autoComplete="off"
                    sx={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={12} md={2.6} lg={3} sx={{ display: 'flex', alignItems: 'center' }}>
                  Nomer Telepon
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
                  <TextField
                    required
                    type="number"
                    label="Nomer Telepon"
                    value={formRegisterCustomer.noTelp}
                    onChange={(e) => {
                      setFormRegisterCustomer({ ...formRegisterCustomer, noTelp: e.target.value });
                    }}
                    autoComplete="off"
                    sx={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={12} md={2.6} lg={3} sx={{ display: 'flex', alignItems: 'center' }}>
                  Password
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
                  <FormControl
                    variant="outlined"
                    onChange={(e) => {
                      setFormRegisterCustomer({ ...formRegisterCustomer, password: e.target.value });
                    }}
                    sx={{ width: '100%' }}
                  >
                    <InputLabel htmlFor="input-password">Password *</InputLabel>
                    <OutlinedInput
                      required
                      label="Password"
                      id="input-password"
                      type={showPassword.password ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              setShowPassword({ ...showPassword, password: !showPassword.password });
                            }}
                            edge="end"
                            color="primary"
                          >
                            {showPassword.password ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={12} md={2.6} lg={3} sx={{ display: 'flex', alignItems: 'center' }}>
                  Konfirmasi Password
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
                  <FormControl
                    variant="outlined"
                    onChange={(e) => {
                      setFormRegisterCustomer({ ...formRegisterCustomer, confirmPassword: e.target.value });
                    }}
                    sx={{ width: '100%' }}
                  >
                    <InputLabel htmlFor="input-confirm-password">Konfirmasi Password *</InputLabel>
                    <OutlinedInput
                      required
                      label="Konfirmasi Password"
                      id="input-confirm-password"
                      type={showPassword.confirmPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword });
                            }}
                            edge="end"
                            color="primary"
                          >
                            {showPassword.confirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  if (formRegisterCustomer.password === formRegisterCustomer.confirmPassword) {
                    handleCreateCustomer();
                  } else {
                    alert('Password tidak match!');
                  }
                }}
                style={{ width: '100%', fontWeight: 'bold' }}
              >
                Registrasi
              </Button>
              {formRegisterCustomer.customerName}
              <br />
              {formRegisterCustomer.noTelp}
              <br />
              {formRegisterCustomer.password}
              <br />
              {formRegisterCustomer.confirmPassword}
            </Box>
          </Paper>

          <br />

          <div>
            Sudah memiliki akun?{' '}
            <Link to={'/Login'} className="disable-link-style" style={{ color: '#1F305C' }}>
              LOGIN
            </Link>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default CustomerRegistration;
