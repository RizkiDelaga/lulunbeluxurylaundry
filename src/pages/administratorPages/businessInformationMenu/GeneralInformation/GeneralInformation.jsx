import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Chip, Grid, Paper, TextField, useTheme } from '@mui/material';
import LoadDecisions from '../../../../components/LoadDecisions/LoadDecisions';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

function GeneralInformation() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openLoadDecision, setoOpenLoadDecision] = React.useState(false);
  const [formGeneralInformation, setFormGeneralInformation] = useState({
    logo: {},
    slogan: '',
    location: {
      location: '',
      googleMapsEmbed: '',
    },
    contact: {
      phoneNumber: '',
      fax: '',
      whatsApp: '',
      telegram: '',
      email: '',
    },
    socialMedia: {
      instagram: '',
      facebook: '',
      twitter: '',
      youtube: '',
      tikTok: '',
    },
    operatingHours: [
      {
        day: '',
        openingHours: '',
        closingHours: '',
      },
    ],
  });

  React.useEffect(() => {
    document.title = 'Edit Informasi Umum';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Informasi Bisnis"
          currentPage={{
            title: 'Informasi Umum',
          }}
        />

        <LoadDecisions
          setOpen={setoOpenLoadDecision}
          open={openLoadDecision}
          close={true}
          alertProps={{
            title: 'This is a success alert — check it out!',
            statusType: 'success|error|warning|info',
          }}
          // redirect={'/InformasiBisnis'}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Informasi Umum</h2>
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2} lg={1.5}>
                <span>Logo</span>
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
                          setFormGeneralInformation({
                            ...formGeneralInformation,
                            logo: {
                              img: e.target.files[0],
                              fileName: !e.target.files[0] ? null : e.target.files[0].name,
                            },
                          });
                          console.log(formGeneralInformation.logo.img);
                        }}
                        hidden
                      />
                    </Button>
                  </Grid>
                  <Grid item xs="auto">
                    {formGeneralInformation.logo.img ? (
                      <img
                        id="output"
                        src={
                          formGeneralInformation.logo.img ? URL.createObjectURL(formGeneralInformation.logo.img) : ''
                        }
                        width={70}
                        alt="Preview"
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs>
                    {formGeneralInformation.logo.fileName ? (
                      <Chip
                        label={formGeneralInformation.logo.fileName}
                        onDelete={() => setFormGeneralInformation({ ...formGeneralInformation, logo: {} })}
                        sx={{ maxWidth: '250px' }}
                      />
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2} lg={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Slogan</span>
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
                  label="Slogan"
                  // value={state}
                  // onChange={(e) => {setState(e.target.value)}}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2} lg={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Lokasi</span>
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
                  <Grid item xs={12} md={12} lg>
                    <TextField
                      required
                      label="Lokasi"
                      multiline
                      maxRows={4}
                      // value={state}
                      // onChange={(e) => {setState(e.target.value)}}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg>
                    <TextField
                      required
                      label="Google Maps Embed"
                      multiline
                      maxRows={4}
                      // value={state}
                      // onChange={(e) => {setState(e.target.value)}}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2} lg={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Kontak</span>
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
                  <Grid item xs={12} sm={6} md lg>
                    <TextField
                      required
                      type="number"
                      label="Nomer Telepon"
                      // value={state}
                      // onChange={(e) => {setState(e.target.value)}}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md lg>
                    <TextField
                      required
                      type="number"
                      label="Fax"
                      // value={state}
                      // onChange={(e) => {setState(e.target.value)}}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md lg>
                    <TextField
                      required
                      type="number"
                      label="WhatsApp"
                      // value={state}
                      // onChange={(e) => {setState(e.target.value)}}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md lg>
                    <TextField
                      required
                      type="number"
                      label="Telegram"
                      // value={state}
                      // onChange={(e) => {setState(e.target.value)}}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md lg>
                    <TextField
                      required
                      label="Email"
                      // value={state}
                      // onChange={(e) => {setState(e.target.value)}}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2} lg={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Sosial Media</span>
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
                  <Grid item xs={12} sm={6} md lg>
                    <TextField
                      required
                      label="Instagram"
                      // value={state}
                      // onChange={(e) => {setState(e.target.value)}}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md lg>
                    <TextField
                      required
                      label="Facebook"
                      // value={state}
                      // onChange={(e) => {setState(e.target.value)}}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md lg>
                    <TextField
                      required
                      label="Twitter"
                      // value={state}
                      // onChange={(e) => {setState(e.target.value)}}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md lg>
                    <TextField
                      required
                      label="Youtube"
                      // value={state}
                      // onChange={(e) => {setState(e.target.value)}}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md lg>
                    <TextField
                      required
                      label="TikTok"
                      // value={state}
                      // onChange={(e) => {setState(e.target.value)}}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <div className={`dash-card gap-16`}>
              <div style={{ fontWeight: 'bold' }}>Jam Operasional</div>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={1.3} lg={1} sx={{ display: 'flex', alignItems: 'center' }}>
                  <span>Senin</span>
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
                    <Grid item xs={6} sm>
                      <TextField required label="Nama Barang" sx={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={6} sm>
                      <TextField required label="Kuantitas" type="number" sx={{ width: '100%' }} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>

            <Button
              variant="contained"
              size="large"
              style={{ width: '100%', fontWeight: 'bold' }}
              onClick={() => {
                setoOpenLoadDecision(true);
              }}
            >
              Simpan
            </Button>
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default GeneralInformation;
