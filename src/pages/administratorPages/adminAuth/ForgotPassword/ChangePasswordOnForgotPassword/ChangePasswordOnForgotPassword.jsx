import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  useTheme,
} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockResetIcon from '@mui/icons-material/LockReset';
import axios from 'axios';
import LoadDecisions from '../../../../../components/LoadDecisions/LoadDecisions';


function ChangePasswordOnForgotPassword() {
  const theme = useTheme();
  let { phoneNumber, verificationCode } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({ newPassword: false, confirmNewPassword: false });
  const [formChangePassword, setFormChangePassword] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });
  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Ubah Password';
  }, []);

  const handleChangePasswordOnForgotPassword = async () => {
    setOpenLoadDecision({ ...openLoadDecision, isLoad: true });

    try {
      const res = await axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_API_KEY}/admin/forget/password`,
        data: {
          noTelp: phoneNumber,
          otp: verificationCode,
          password: formChangePassword.newPassword,
        },
      });
      console.log('Response POST Login Customer');
      console.log(res);

      if (res.status === 201) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Ubah Password Berhasil!',
          statusType: 'success',
        });
      }
    } catch (error) {
      console.log(error);
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
    }
  };

  return (
    <>
      <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} redirect={`/Admin`} />
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
          {/* Main Content */}
          <Paper
            elevation={3}
            sx={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '800px' }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log('click');
                if (formChangePassword.newPassword !== formChangePassword.confirmNewPassword) {
                  alert('Password tidak match!');
                } else {
                  handleChangePasswordOnForgotPassword();
                }
              }}
            >
              <Box className="gap-16">
                <div style={{ width: '100%', textAlign: 'center', paddingTop: '8px', paddingBottom: '8px' }}>
                  <h2 style={{ margin: 0 }}>Buat Password Baru</h2>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    paddingBottom: '8px',
                  }}
                >
                  <div
                    className="centerXY"
                    style={{ width: '180px', height: '180px', backgroundColor: '#eeeeee', borderRadius: '16px' }}
                  >
                    <LockResetIcon color="primary" sx={{ fontSize: 80 }} />
                  </div>
                </div>
                <Grid container>
                  <Grid item xs={12} sm={12} md={3} lg={3} sx={{ display: 'flex', alignItems: 'center' }}>
                    Password Baru
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
                              onClick={() =>
                                setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword })
                              }
                              edge="end"
                              color="primary"
                            >
                              {showPassword.newPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                          </InputAdornment>
                        }
                        inputProps={{
                          pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$', // Minimal delapan karakter (Setidaknya satu huruf besar, satu huruf kecil dan satu angka)
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={12} md={3} lg={3} sx={{ display: 'flex', alignItems: 'center' }}>
                    Konfirmasi Password Baru
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
                      <InputLabel htmlFor="confirm-password">Konfirmasi Password Baru *</InputLabel>
                      <OutlinedInput
                        required
                        label="Konfirmasi Password Baru"
                        id="confirm-password"
                        type={showPassword.confirmNewPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowPassword({
                                  ...showPassword,
                                  confirmNewPassword: !showPassword.confirmNewPassword,
                                })
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

                <Button variant="contained" size="large" type="submit" sx={{ width: '100%', fontWeight: 'bold' }}>
                  Ubah Password
                </Button>

                {formChangePassword.newPassword}
                <br />
                {formChangePassword.confirmNewPassword}
              </Box>
            </form>
          </Paper>
        </div>
      </Box>
    </>
  );
}

export default ChangePasswordOnForgotPassword;
