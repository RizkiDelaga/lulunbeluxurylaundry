import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Paper, TextField, useTheme } from '@mui/material';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import axios from 'axios';
import LoadDecisions from '../../../../../components/LoadDecisions/LoadDecisions';
import { Link } from 'react-router-dom';

function RegisterAccount() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState();
  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Registrasi Akun';
  }, []);

  const handleForgotPasswordRequest = async () => {
    setOpenLoadDecision({ ...openLoadDecision, isLoad: true });

    try {
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_KEY}/user/register/send-otp`,
        data: {
          noTelp: phoneNumber,
        },
      });

      if (res.status === 201) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Kode Verifikasi Berhasil Terkirim!',
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
      <LoadDecisions
        setOpenLoad={setOpenLoadDecision}
        openLoad={openLoadDecision}
        redirect={`/Registrasi/ValidasiAkun/${phoneNumber}`}
      />

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
          {/* Main Content */}
          <Paper
            elevation={3}
            sx={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '800px' }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (phoneNumber) {
                  handleForgotPasswordRequest();
                }
              }}
            >
              <Box className="gap-16">
                <div style={{ width: '100%', textAlign: 'center', paddingTop: '8px', paddingBottom: '8px' }}>
                  <h2 style={{ margin: 0 }}>Registrasi Akun</h2>
                  <div style={{ textAlign: 'center', width: '100%' }}>
                    Masukan nomer WhatsApp yang akan digunakan sebagai validasi akun anda
                  </div>
                </div>

                <Grid container>
                  <Grid item xs={12} sm={12} md={2.3} lg={2.5} sx={{ display: 'flex', alignItems: 'center' }}>
                    Nomer WhatsApp
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
                      label="Nomer WhatsApp"
                      placeholder="628xxxxxxxxxxx"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                      }}
                      autoComplete="off"
                      onWheel={(e) => e.target.blur()}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
                <Button variant="contained" size="large" type="submit" style={{ width: '100%', fontWeight: 'bold' }}>
                  Validasi Nomer
                </Button>
              </Box>
            </form>
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

export default RegisterAccount;
