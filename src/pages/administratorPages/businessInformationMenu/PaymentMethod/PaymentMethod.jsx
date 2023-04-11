import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Chip, Grid, Paper, TextField, useTheme } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

function PaymentMethod() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formPaymentMethod, setFormPaymentMethod] = useState({
    paymentName: '',
    iD_Or_Number: '',
    instructions: [],
    paymentLogo: {},
  });

  React.useEffect(() => {
    document.title = 'Edit Metode Pembayaran';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Informasi Bisnis"
          currentPage={{
            title: 'Metode Pembayaran',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Metode Pembayaran</h2>
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.4} lg={2.1} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Nama Pembayaran</span>
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
                  label="Nama Pembayaran"
                  value={formPaymentMethod.paymentName}
                  onChange={(e) => {
                    setFormPaymentMethod({
                      ...formPaymentMethod,
                      paymentName: e.target.value,
                    });
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.4} lg={2.1} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>ID/Nomer Pembayaran</span>
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
                  label="ID / Nomer"
                  value={formPaymentMethod.iD_Or_Number}
                  onChange={(e) => {
                    setFormPaymentMethod({
                      ...formPaymentMethod,
                      iD_Or_Number: e.target.value,
                    });
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.4} lg={2.1}>
                <span>Instruksi</span>
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
                <Grid container spacing={2}>
                  <Grid item xs={12} lg>
                    <TextField
                      required
                      label="Instruksi"
                      multiline
                      maxRows={4}
                      value={formPaymentMethod.instructions}
                      onChange={(e) => {
                        setFormPaymentMethod({
                          ...formPaymentMethod,
                          instructions: e.target.value,
                        });
                      }}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} lg>
                    <TextField required label="Kuantitas" type="number" sx={{ width: '100%' }} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.4} lg={2.1}>
                <span>Logo Pembayaran</span>
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
                <Grid container spacing={2}>
                  <Grid item xs="auto">
                    <Button
                      variant="contained"
                      size="small"
                      component="label"
                      startIcon={<InsertPhotoIcon />}
                      sx={{ height: 'fit-content' }}
                    >
                      Pilih Foto
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          console.log(e.target.files);
                          setFormPaymentMethod({
                            ...formPaymentMethod,
                            paymentLogo: {
                              img: e.target.files[0],
                              fileName: !e.target.files[0] ? null : e.target.files[0].name,
                            },
                          });
                          // console.log(image);
                        }}
                        hidden
                      />
                    </Button>
                  </Grid>
                  <Grid item xs="auto">
                    {formPaymentMethod.paymentLogo.img ? (
                      <img
                        id="output"
                        src={
                          formPaymentMethod.paymentLogo.img
                            ? URL.createObjectURL(formPaymentMethod.paymentLogo.img)
                            : ''
                        }
                        width={70}
                        alt="Preview"
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs>
                    {formPaymentMethod.paymentLogo.fileName ? (
                      <Chip
                        label={formPaymentMethod.paymentLogo.fileName}
                        onDelete={() => setFormPaymentMethod({ ...formPaymentMethod, paymentLogo: {} })}
                        sx={{ maxWidth: '250px' }}
                      />
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Button variant="contained" size="large" style={{ width: '100%', fontWeight: 'bold' }}>
              Simpan
            </Button>

            {formPaymentMethod.paymentName}
            <br />
            {formPaymentMethod.iD_Or_Number}
            <br />
            {formPaymentMethod.instructions}
            <br />
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default PaymentMethod;
