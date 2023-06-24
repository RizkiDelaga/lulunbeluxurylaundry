import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Paper, TextField, useTheme } from '@mui/material';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import axios from 'axios';
import LoadDecisions from '../../../../../components/LoadDecisions/LoadDecisions';

function ForgotPasswordRequest() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState();
  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Pengajuan Lupa Password';
  }, []);

  const handleForgotPasswordRequest = async () => {
    setOpenLoadDecision({ ...openLoadDecision, isLoad: true });

    try {
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_KEY}/user/send-otp`,
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
        redirect={`/LupaPassword/ValidasiAkun/${phoneNumber}`}
      />

      <Box component="main" sx={{ marginX: 3 }}>
        <Box
          sx={{
            display: 'flex',
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
                  <h2 style={{ margin: 0 }}>Lupa Password?</h2>
                </div>
                <div
                  className="gap-16"
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
                >
                  <div
                    className="centerXY"
                    style={{ width: '180px', height: '180px', backgroundColor: '#eeeeee', borderRadius: '16px' }}
                  >
                    <LockPersonIcon color="primary" sx={{ fontSize: 80 }} />
                  </div>
                  <div style={{ textAlign: 'center' }}>Masukan nomer WhatsApp yang terkait dengan akun anda</div>
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
                  Kirim
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default ForgotPasswordRequest;
