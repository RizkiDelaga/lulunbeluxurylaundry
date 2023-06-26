import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import LoadDecisions from '../../../../../components/LoadDecisions/LoadDecisions';
import { getGeneralInformation } from '../../../../../redux/actions/getBusinessInformationAction';
import { useDispatch, useSelector } from 'react-redux';

function CompleteRegistration() {
  const theme = useTheme();
  let { phoneNumber, verificationCode } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });
  const [formCompleteRegisterCustomer, setFormCompleteRegisterCustomer] = useState({
    customerName: '',
    password: '',
    confirmPassword: '',
  });
  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  const dispatch = useDispatch();
  const { isLoading: loadingGetGeneralInformation, data: dataGetGeneralInformation } = useSelector(
    (state) => state.getGeneralInformation
  );

  React.useEffect(() => {
    document.title = 'Registrasi Pelanggan Baru';
    dispatchGetGeneralInformation();
  }, []);

  const dispatchGetGeneralInformation = async () => {
    return await dispatch(getGeneralInformation());
  };

  const handleCreateCustomer = async () => {
    setOpenLoadDecision({ ...openLoadDecision, isLoad: true });

    try {
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_KEY}/user/register`,
        data: {
          otp: verificationCode,
          noTelp: phoneNumber,
          nama: formCompleteRegisterCustomer.customerName,
          password: formCompleteRegisterCustomer.password,
        },
      });

      if (res.status === 201) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Registrasi Berhasil!',
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
      <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} redirect="/Login" />

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
          {loadingGetGeneralInformation ? null : <img src={dataGetGeneralInformation.logo} alt="logo" height={80} />}

          <br />

          {/* Main Content */}
          <Paper
            elevation={3}
            sx={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '800px' }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (formCompleteRegisterCustomer.password === formCompleteRegisterCustomer.confirmPassword) {
                  handleCreateCustomer();
                } else {
                  alert('Password tidak match!');
                }
              }}
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
                      value={formCompleteRegisterCustomer.customerName}
                      onChange={(e) => {
                        setFormCompleteRegisterCustomer({
                          ...formCompleteRegisterCustomer,
                          customerName: e.target.value,
                        });
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
                        setFormCompleteRegisterCustomer({ ...formCompleteRegisterCustomer, password: e.target.value });
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
                        setFormCompleteRegisterCustomer({
                          ...formCompleteRegisterCustomer,
                          confirmPassword: e.target.value,
                        });
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

                <Button variant="contained" size="large" type="submit" sx={{ width: '100%', fontWeight: 'bold' }}>
                  Registrasi
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default CompleteRegistration;
