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
import axios from 'axios';
import LoadDecisions from '../../../../components/LoadDecisions/LoadDecisions';

function ChangePassword() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formChangePassword, setFormChangePassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Ubah Password';
  }, []);

  const handleUpdatePassword = async () => {
    setOpenLoadDecision({ ...openLoadDecision, isLoad: true });

    try {
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/admin/change/password`,
        data: {
          oldPassword: formChangePassword.oldPassword,
          password: formChangePassword.newPassword,
        },
      });
      console.log('Response Update Password');
      console.log(res);
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Ubah Password Berhasil!',
          statusType: 'success',
        });
      }
    } catch (error) {
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Dashboard"
          currentPage={{
            title: 'Ubah Password',
          }}
        />
        <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} />

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
                    setFormChangePassword({ ...formChangePassword, oldPassword: e.target.value });
                  }}
                  sx={{ width: '100%' }}
                >
                  <InputLabel htmlFor="current-password">Password Saat Ini *</InputLabel>
                  <OutlinedInput
                    required
                    label="Password Saat Ini"
                    id="current-password"
                    type={showPassword.oldPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword({ ...showPassword, oldPassword: !showPassword.oldPassword })}
                          edge="end"
                          color="primary"
                        >
                          {showPassword.oldPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
              onClick={() => {
                if (formChangePassword.newPassword === formChangePassword.confirmNewPassword) {
                  handleUpdatePassword();
                } else {
                  alert('Password tidak macth');
                }
              }}
            >
              Ubah Password
            </Button>

            {formChangePassword.oldPassword}
            <br />
            {formChangePassword.newPassword}
            <br />
            {formChangePassword.confirmNewPassword}
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default ChangePassword;
