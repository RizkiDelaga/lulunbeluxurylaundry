import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Chip, Grid, Paper, TextField, useTheme } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

function AddIncome() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formAddIncome, setFormAddIncome] = useState({
    title: '',
    nominal: 0,
    entryDate: '',
    notes: '',
    photoEvidence: {},
  });

  React.useEffect(() => {
    document.title = 'Tambah Pemasukan';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Keuangan"
          currentPage={{
            title: 'Input Pemasukan',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Input Pemasukan</h2>
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.7} lg={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Judul</span>
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
                  label="Judul"
                  value={formAddIncome.title}
                  onChange={(e) => {
                    setFormAddIncome({
                      ...formAddIncome,
                      title: e.target.value,
                    });
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.7} lg={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Nominal Pendapatan</span>
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
                  label="Nominal Pendapatan"
                  value={formAddIncome.nominal}
                  onChange={(e) => {
                    setFormAddIncome({
                      ...formAddIncome,
                      nominal: e.target.value,
                    });
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.7} lg={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Tanggal Pendapatan</span>
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
                  <Grid item xs={12} sm>
                    <TextField required label="Nama Barang" sx={{ width: '100%' }} />
                  </Grid>
                  <Grid item xs={12} sm>
                    <TextField required label="Kuantitas" type="number" sx={{ width: '100%' }} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.7} lg={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Catatan</span>
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
                  label="Catatan"
                  multiline
                  maxRows={4}
                  value={formAddIncome.notes}
                  onChange={(e) => {
                    setFormAddIncome({
                      ...formAddIncome,
                      notes: e.target.value,
                    });
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.7} lg={2}>
                <span>Foto Bukti</span>
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
                          setFormAddIncome({
                            ...formAddIncome,
                            photoEvidence: {
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
                    {formAddIncome.photoEvidence.img ? (
                      <img
                        id="output"
                        src={
                          formAddIncome.photoEvidence.img ? URL.createObjectURL(formAddIncome.photoEvidence.img) : ''
                        }
                        width={70}
                        alt="Preview"
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs>
                    {formAddIncome.photoEvidence.fileName ? (
                      <Chip
                        label={formAddIncome.photoEvidence.fileName}
                        onDelete={() => setFormAddIncome({ ...formAddIncome, photoEvidence: {} })}
                        sx={{ maxWidth: '250px' }}
                      />
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              size="large"
              style={{ width: '100%', fontWeight: 'bold' }}
              onClick={() => navigate('/Keuangan')}
            >
              Tambah Pemasukan
            </Button>

            {formAddIncome.title}
            <br />
            {formAddIncome.nominal}
            <br />
            {formAddIncome.notes}
            <br />
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default AddIncome;