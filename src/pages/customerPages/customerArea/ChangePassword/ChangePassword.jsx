import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
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

function ChangePassword() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formChangePassword, setFormChangePassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  React.useEffect(() => {
    document.title = 'Ubah Password';
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '25px',
          my: '25px',
          mx: '75px',
          [theme.breakpoints.down('md')]: {
            mx: '8px',
          },
        }}
      >
        <PageStructureAndDirectButton
          defaultMenu="Area Pelanggan"
          currentPage={{
            title: 'Ubah Password',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Ubah Password</h2>
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2} lg={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Password Saat Ini</span>
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
                    setFormChangePassword({ ...formChangePassword, currentPassword: e.target.value });
                  }}
                  sx={{ width: '100%' }}
                >
                  <InputLabel htmlFor="current-password">Password Saat Ini *</InputLabel>
                  <OutlinedInput
                    required
                    label="Password Saat Ini"
                    id="current-password"
                    type={showPassword.currentPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword({ ...showPassword, currentPassword: !showPassword.currentPassword })
                          }
                          edge="end"
                          color="primary"
                        >
                          {showPassword.currentPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2} lg={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Password Baru</span>
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
                    setFormChangePassword({ ...formChangePassword, newPassword: e.target.value });
                  }}
                  sx={{ width: '100%' }}
                >
                  <InputLabel htmlFor="new-password">Password Baru *</InputLabel>
                  <OutlinedInput
                    required
                    label="Password Baru"
                    id="new-password"
                    type={showPassword.newPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword })}
                          edge="end"
                          color="primary"
                        >
                          {showPassword.newPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2} lg={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Konfirmasi Password Baru</span>
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
                    setFormChangePassword({ ...formChangePassword, confirmNewPassword: e.target.value });
                  }}
                  sx={{ width: '100%' }}
                >
                  <InputLabel htmlFor="confirm-new-password">Confirm Password Baru *</InputLabel>
                  <OutlinedInput
                    required
                    label="Confirm Password Baru"
                    id="confirm-new-password"
                    type={showPassword.confirmNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword({ ...showPassword, confirmNewPassword: !showPassword.confirmNewPassword })
                          }
                          edge="end"
                          color="primary"
                        >
                          {showPassword.confirmNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
              style={{ width: '100%', fontWeight: 'bold' }}
              onClick={() => navigate('/AreaPelanggan')}
            >
              Ubah Password
            </Button>

            {formChangePassword.currentPassword}
            <br />
            {formChangePassword.newPassword}
            <br />
            {formChangePassword.confirmNewPassword}
          </Box>
        </Paper>
        {/* </div> */}
      </Box>
    </>
  );
}

export default ChangePassword;
