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

function LoginCustomer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formLoginCustomer, setFormLoginCustomer] = useState({
    noTelp: '',
    password: '',
  });

  React.useEffect(() => {
    document.title = 'Login Pelanggan';
  }, []);

  const loginCustomerHandler = async (data) => {
    try {
      const res = await axios({
        method: 'POST',
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/user/login',
        data: {
          noTelp: data.noTelp,
          password: data.password,
        },
      });
      console.log('Response POST Login Customer');
      console.log(res);
      navigate('/AreaPelanggan');
      localStorage.setItem('access_token', res.data.accessToken);
      handleGetMyProfile();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetMyProfile = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/user',
      });
      console.log('Response GET My Profile');
      console.log(res);

      localStorage.setItem('customer_name', res.data.data.nama);
      localStorage.setItem('customer_profile_picture', res.data.data.profilePic);
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
                <h2 style={{ margin: 0 }}>Login Pelanggan</h2>
                <div>Masuk ke dalam akun anda</div>
              </div>
              <Grid container>
                <Grid item xs={12} sm={12} md={2.3} lg={2.5} sx={{ display: 'flex', alignItems: 'center' }}>
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
                    value={formLoginCustomer.noTelp}
                    onChange={(e) => {
                      setFormLoginCustomer({ ...formLoginCustomer, noTelp: e.target.value });
                    }}
                    autoComplete="off"
                    sx={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={12} md={2.3} lg={2.5} sx={{ display: 'flex', alignItems: 'center' }}>
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
                      setFormLoginCustomer({ ...formLoginCustomer, password: e.target.value });
                    }}
                    sx={{ width: '100%' }}
                  >
                    <InputLabel htmlFor="input-password">Password *</InputLabel>
                    <OutlinedInput
                      required
                      label="Password"
                      id="input-password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" color="primary">
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <div style={{ fontSize: '12px', opacity: '0.6', width: '100%', textAlign: 'right' }}>
                <Link to={'/LupaPassword'} className="disable-link-style">
                  Lupa Password?
                </Link>
              </div>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  loginCustomerHandler(formLoginCustomer);
                }}
                style={{ width: '100%', fontWeight: 'bold' }}
              >
                Masuk
              </Button>
              {formLoginCustomer.noTelp}
              <br />
              {formLoginCustomer.password}
            </Box>
          </Paper>

          <br />

          <div>
            Belum memiliki akun?{' '}
            <Link to={'/Registrasi'} className="disable-link-style" style={{ color: '#1F305C' }}>
              REGISTRASI
            </Link>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default LoginCustomer;
