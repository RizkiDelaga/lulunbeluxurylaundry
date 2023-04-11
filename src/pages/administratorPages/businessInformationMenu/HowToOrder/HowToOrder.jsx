import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Chip, Grid, Paper, TextField, useTheme } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

function HowToOrder() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formHowToOrder, setFormHowToOrder] = useState({
    viaOnline: {
      stepTitle: '',
      description: '',
      photo: {},
    },
    viaOutlet: {
      stepTitle: '',
      description: '',
      photo: {},
    },
  });

  React.useEffect(() => {
    document.title = 'Edit Cara Pemesanan';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Informasi Bisnis"
          currentPage={{
            title: 'Cara Pemesanan',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Cara Pemesanan (Via Online)</h2>
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={1.9} lg={1.4} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Judul Langkah</span>
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
                  label="Judul Langkah"
                  value={formHowToOrder.viaOnline.stepTitle}
                  onChange={(e) => {
                    setFormHowToOrder({
                      ...formHowToOrder,
                      viaOnline: { ...formHowToOrder.viaOnline, stepTitle: e.target.value },
                    });
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={1.9} lg={1.4} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Deskripsi</span>
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
                  label="Deskripsi"
                  multiline
                  maxRows={4}
                  value={formHowToOrder.viaOnline.description}
                  onChange={(e) => {
                    setFormHowToOrder({
                      ...formHowToOrder,
                      viaOnline: { ...formHowToOrder.viaOnline, description: e.target.value },
                    });
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={1.9} lg={1.4}>
                <span>Foto</span>
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
                          setFormHowToOrder({
                            ...formHowToOrder,
                            viaOnline: {
                              ...formHowToOrder.viaOnline,
                              photo: {
                                img: e.target.files[0],
                                fileName: !e.target.files[0] ? null : e.target.files[0].name,
                              },
                            },
                          });
                          // console.log(image);
                        }}
                        hidden
                      />
                    </Button>
                  </Grid>
                  <Grid item xs="auto">
                    {formHowToOrder.viaOnline.photo.img ? (
                      <img
                        id="output"
                        src={
                          formHowToOrder.viaOnline.photo.img
                            ? URL.createObjectURL(formHowToOrder.viaOnline.photo.img)
                            : ''
                        }
                        width={70}
                        alt="Preview"
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs>
                    {formHowToOrder.viaOnline.photo.fileName ? (
                      <Chip
                        label={formHowToOrder.viaOnline.photo.fileName}
                        onDelete={() =>
                          setFormHowToOrder({
                            ...formHowToOrder,
                            viaOnline: { ...formHowToOrder.viaOnline, photo: {} },
                          })
                        }
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

            {formHowToOrder.viaOnline.stepTitle}
            <br />
            {formHowToOrder.viaOnline.description}
            <br />
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Cara Pemesanan (Via Outlet)</h2>
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={1.9} lg={1.4} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Judul Langkah</span>
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
                  label="Judul Langkah"
                  value={formHowToOrder.viaOutlet.stepTitle}
                  onChange={(e) => {
                    setFormHowToOrder({
                      ...formHowToOrder,
                      viaOutlet: { ...formHowToOrder.viaOutlet, stepTitle: e.target.value },
                    });
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={1.9} lg={1.4} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Deskripsi</span>
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
                  label="Deskripsi"
                  multiline
                  maxRows={4}
                  value={formHowToOrder.viaOutlet.description}
                  onChange={(e) => {
                    setFormHowToOrder({
                      ...formHowToOrder,
                      viaOutlet: { ...formHowToOrder.viaOutlet, description: e.target.value },
                    });
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={1.9} lg={1.4}>
                <span>Foto</span>
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
                          setFormHowToOrder({
                            ...formHowToOrder,
                            viaOutlet: {
                              ...formHowToOrder.viaOutlet,
                              photo: {
                                img: e.target.files[0],
                                fileName: !e.target.files[0] ? null : e.target.files[0].name,
                              },
                            },
                          });
                          // console.log(image);
                        }}
                        hidden
                      />
                    </Button>
                  </Grid>
                  <Grid item xs="auto">
                    {formHowToOrder.viaOutlet.photo.img ? (
                      <img
                        id="output"
                        src={
                          formHowToOrder.viaOutlet.photo.img
                            ? URL.createObjectURL(formHowToOrder.viaOutlet.photo.img)
                            : ''
                        }
                        width={70}
                        alt="Preview"
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs>
                    {formHowToOrder.viaOutlet.photo.fileName ? (
                      <Chip
                        label={formHowToOrder.viaOutlet.photo.fileName}
                        onDelete={() =>
                          setFormHowToOrder({
                            ...formHowToOrder,
                            viaOutlet: { ...formHowToOrder.viaOutlet, photo: {} },
                          })
                        }
                        sx={{ maxWidth: '250px' }}
                      />
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Button variant="contained" size="large" style={{ width: '100%', fontWeight: 'bold' }}>
              Tambah
            </Button>

            {formHowToOrder.viaOutlet.stepTitle}
            <br />
            {formHowToOrder.viaOutlet.description}
            <br />
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default HowToOrder;
