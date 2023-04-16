import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Paper, TextField, useTheme } from '@mui/material';
import PasswordIcon from '@mui/icons-material/Password';

function AccountValidation() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState();

  React.useEffect(() => {
    document.title = 'Validasi Akun Admin';
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
          {/* Main Content */}
          <Paper
            elevation={3}
            sx={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '800px' }}
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
                <div style={{ textAlign: 'center' }}>Masukan 4 digit code yang telah dikirim ke nomor 08123456789</div>
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
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  navigate('/Admin/UbahPassword');
                }}
                style={{ width: '100%', fontWeight: 'bold' }}
              >
                verifikasi
              </Button>
              {verificationCode}
            </Box>
          </Paper>
        </div>
      </Box>
    </>
  );
}

export default AccountValidation;
