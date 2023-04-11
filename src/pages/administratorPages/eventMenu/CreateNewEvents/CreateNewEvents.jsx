import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Chip, Grid, Paper, TextField, useTheme } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

function CreateNewEvents() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formCreateNewEvents, setFormCreateNewEvents] = useState({
    eventName: '',
    dateStart: '',
    dateEnd: '',
    description: '',
    reward: [],
    criteria: [],
    poster: {},
  });

  React.useEffect(() => {
    document.title = 'Buat Event Baru';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Event"
          currentPage={{
            title: 'Buat Event Baru',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Buat Event Baru</h2>
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.6} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Nama Event</span>
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
                  label="Nama Event"
                  value={formCreateNewEvents.eventName}
                  onChange={(e) => {
                    setFormCreateNewEvents({
                      ...formCreateNewEvents,
                      eventName: e.target.value,
                    });
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.6} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Tanggal Mulai</span>
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
              <Grid item xs={12} sm={12} md={2.2} lg={1.6} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Tanggal Berakhir</span>
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
              <Grid item xs={12} sm={12} md={2.2} lg={1.6} sx={{ display: 'flex', alignItems: 'center' }}>
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
                  value={formCreateNewEvents.description}
                  onChange={(e) => {
                    setFormCreateNewEvents({
                      ...formCreateNewEvents,
                      description: e.target.value,
                    });
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.6}>
                <span>Reward / Benefit</span>
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
                      label="Reward / Benefit"
                      multiline
                      maxRows={4}
                      value={formCreateNewEvents.reward}
                      onChange={(e) => {
                        setFormCreateNewEvents({
                          ...formCreateNewEvents,
                          reward: e.target.value,
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
              <Grid item xs={12} sm={12} md={2.2} lg={1.6}>
                <span>Kriteria</span>
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
                      label="Kriteria"
                      multiline
                      maxRows={4}
                      value={formCreateNewEvents.criteria}
                      onChange={(e) => {
                        setFormCreateNewEvents({
                          ...formCreateNewEvents,
                          criteria: e.target.value,
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
              <Grid item xs={12} sm={12} md={2.2} lg={1.6}>
                <span>Poster</span>
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
                          setFormCreateNewEvents({
                            ...formCreateNewEvents,
                            poster: {
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
                    {formCreateNewEvents.poster.img ? (
                      <img
                        id="output"
                        src={formCreateNewEvents.poster.img ? URL.createObjectURL(formCreateNewEvents.poster.img) : ''}
                        width={70}
                        alt="Preview"
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs>
                    {formCreateNewEvents.poster.fileName ? (
                      <Chip
                        label={formCreateNewEvents.poster.fileName}
                        onDelete={() => setFormCreateNewEvents({ ...formCreateNewEvents, poster: {} })}
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
              onClick={() => navigate('/Event')}
            >
              Buat Event
            </Button>

            {formCreateNewEvents.eventName}
            <br />
            {formCreateNewEvents.description}
            <br />
            {formCreateNewEvents.reward}
            <br />
            {formCreateNewEvents.criteria}
            <br />
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default CreateNewEvents;
