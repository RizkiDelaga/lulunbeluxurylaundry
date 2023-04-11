import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Chip, Grid, Paper, TextField, useTheme } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

function ServiceType() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formServiceType, setFormServiceType] = useState({
    serviceTypeName: '',
    serviceDuration: {
      days: null,
      hours: null,
      minutes: null,
    },
    description: '',
    photo: {},
  });

  React.useEffect(() => {
    document.title = 'Edit Jenis Layanan';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Informasi Bisnis"
          currentPage={{
            title: 'Jenis Layanan',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Jenis Layanan</h2>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.4} lg={1.9} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Nama Jenis Layanan</span>
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
                  label="Nama Jenis Layanan"
                  value={formServiceType.serviceTypeName}
                  onChange={(e) => {
                    setFormServiceType({ ...formServiceType, serviceTypeName: e.target.value });
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.4} lg={1.9} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Durasi Layanan *</span>
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
                    <TextField
                      type="number"
                      label="Hari"
                      value={formServiceType.serviceDuration.days}
                      onChange={(e) => {
                        setFormServiceType({
                          ...formServiceType,
                          serviceDuration: { ...formServiceType.serviceDuration, days: e.target.value },
                        });
                      }}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={6} sm>
                    <TextField
                      type="number"
                      label="Jam"
                      value={formServiceType.serviceDuration.hours}
                      onChange={(e) => {
                        setFormServiceType({
                          ...formServiceType,
                          serviceDuration: { ...formServiceType.serviceDuration, hours: e.target.value },
                        });
                      }}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={6} sm>
                    <TextField
                      type="number"
                      label="Menit"
                      value={formServiceType.serviceDuration.minutes}
                      onChange={(e) => {
                        setFormServiceType({
                          ...formServiceType,
                          serviceDuration: { ...formServiceType.serviceDuration, minutes: e.target.value },
                        });
                      }}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.4} lg={1.9} sx={{ display: 'flex', alignItems: 'center' }}>
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
                  label="Deskripsi"
                  multiline
                  maxRows={4}
                  value={formServiceType.description}
                  onChange={(e) => {
                    setFormServiceType({
                      ...formServiceType,
                      description: e.target.value,
                    });
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.4} lg={1.9}>
                <span>Foto/Icon/Illustrasi</span>
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
                          setFormServiceType({
                            ...formServiceType,
                            photo: {
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
                    {formServiceType.photo.img ? (
                      <img
                        id="output"
                        src={formServiceType.photo.img ? URL.createObjectURL(formServiceType.photo.img) : ''}
                        width={70}
                        alt="Preview"
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs>
                    {formServiceType.photo.fileName ? (
                      <Chip
                        label={formServiceType.photo.fileName}
                        onDelete={() => setFormServiceType({ ...formServiceType, photo: {} })}
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

            {formServiceType.serviceTypeName}
            <br />
            {formServiceType.serviceDuration.days +
              ' ' +
              formServiceType.serviceDuration.hours +
              ' ' +
              formServiceType.serviceDuration.minutes}
            <br />
            {formServiceType.description}
            <br />
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default ServiceType;
