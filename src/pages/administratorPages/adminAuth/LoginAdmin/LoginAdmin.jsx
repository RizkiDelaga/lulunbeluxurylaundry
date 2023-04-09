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
import Logo from '../../../../assets/images/Logo.jpg';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

function LoginAdmin() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formLoginAdmin, setFormLoginAdmin] = useState({
    administratorName: '',
    password: '',
  });

  React.useEffect(() => {
    document.title = 'Login Administrator';
  }, []);

  return (
    <>
      <Box component="main" sx={{ marginX: 3 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
          }}
        >
          <img src={Logo} alt="logo" height={80} />
          <br />
          {/* Main Content */}
          <Paper
            elevation={3}
            sx={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '800px' }}
          >
            <Box className="gap-16">
              <div style={{ width: '100%', textAlign: 'center', paddingTop: '8px', paddingBottom: '8px' }}>
                <h2 style={{ margin: 0 }}>Login Administrator</h2>
                <div>Masuk ke dalam akun anda</div>
              </div>
              <Grid container>
                <Grid item xs={12} sm={12} md={2.3} lg={2.5} sx={{ display: 'flex', alignItems: 'center' }}>
                  Nama Administrator
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
                    label="Nama Administrator"
                    value={formLoginAdmin.administratorName}
                    onChange={(e) => {
                      setFormLoginAdmin({ ...formLoginAdmin, administratorName: e.target.value });
                    }}
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
                      setFormLoginAdmin({ ...formLoginAdmin, password: e.target.value });
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
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            color="primary"
                          >
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <div style={{ fontSize: '12px', opacity: '0.6', width: '100%', textAlign: 'right' }}>
                <Link to={'/Admin/LupaPassword'} className="disable-link-style">
                  Lupa Password?
                </Link>
              </div>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  navigate('/Dashboard');
                }}
                style={{ width: '100%', fontWeight: 'bold' }}
              >
                Masuk
              </Button>
              {formLoginAdmin.administratorName}
              <br />
              {formLoginAdmin.password}
            </Box>
          </Paper>
        </div>
      </Box>
    </>
  );
}

export default LoginAdmin;
