import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, Paper, TextField, useTheme } from '@mui/material';
import PasswordIcon from '@mui/icons-material/Password';
import axios from 'axios';

import { Link } from 'react-router-dom';
import LoadDecisions from '../../../../components/LoadDecisions/LoadDecisions';

function AccountValidation() {
  const theme = useTheme();
  let { typeOfUse, phoneNumber } = useParams();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState();
  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Validasi Akun Admin';
  }, []);

  const handleAccountValidation = async () => {
    setOpenLoadDecision({ ...openLoadDecision, isLoad: true });

    try {
      const res = await axios({
        method: typeOfUse === 'LupaPassword' ? 'PUT' : null,
        url: `${process.env.REACT_APP_API_KEY}${typeOfUse === 'LupaPassword' ? '/admin/verify-otp' : null}`,
        data: {
          noTelp: phoneNumber,
          otp: verificationCode,
        },
      });

      if (res.status === 201) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Verifikasi Berhasil!',
          statusType: 'success',
        });
      }
    } catch (error) {
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
        redirect={
          typeOfUse === 'LupaPassword' ? `/Admin/LupaPassword/UbahPassword/${phoneNumber}/${verificationCode}` : null
        }
      />

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
                if (verificationCode) {
                  handleAccountValidation();
                }
              }}
            >
              <Box className="gap-16">
                <div style={{ width: '100%', textAlign: 'center', paddingTop: '8px', paddingBottom: '8px' }}>
                  <h2 style={{ margin: 0 }}>Verifikasi Akun</h2>
                </div>
                <div
                  className="gap-16"
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
                >
                  <div
                    className="centerXY"
                    style={{ width: '180px', height: '180px', backgroundColor: '#eeeeee', borderRadius: '16px' }}
                  >
                    <PasswordIcon color="primary" sx={{ fontSize: 80 }} />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    Masukan 6 digit kode yang telah dikirim ke nomor WhatsApp {phoneNumber}
                  </div>
                </div>
                <Grid container>
                  <Grid item xs={12} sm={12} md={2} lg={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    Kode Verifikasi
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
                      label="Kode Verifikasi"
                      value={verificationCode}
                      onChange={(e) => {
                        setVerificationCode(e.target.value);
                      }}
                      autoComplete="off"
                      onWheel={(e) => e.target.blur()}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
                <div style={{ textAlign: 'center', width: '100%' }}>
                  Tidak mendapatkan kode?{' '}
                  <Link
                    to={typeOfUse === 'LupaPassword' ? '/Admin/LupaPassword' : null}
                    style={{ textDecoration: 'none', cursor: 'pointer', color: '#1F305C' }}
                  >
                    Kirim ulang kode
                  </Link>
                </div>
                <Button variant="contained" size="large" type="submit" style={{ width: '100%', fontWeight: 'bold' }}>
                  Verifikasi
                </Button>
              </Box>
            </form>
          </Paper>
        </div>
      </Box>
    </>
  );
}

export default AccountValidation;
