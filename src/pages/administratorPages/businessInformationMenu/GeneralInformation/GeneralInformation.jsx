import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Chip, Grid, Paper, TextField, useTheme } from '@mui/material';
import LoadDecisions from '../../../../components/LoadDecisions/LoadDecisions';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import axios from 'axios';

function GeneralInformation() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formGeneralInformation, setFormGeneralInformation] = useState({
    logo: { img: null, fileName: '' },
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
  });
  const [operatingHours, setOperatingHours] = useState({
    monday: {
      openingHour: '',
      closingHour: '',
    },
    tuesday: {
      openingHour: '',
      closingHour: '',
    },
    wednesday: {
      openingHour: '',
      closingHour: '',
    },
    thursday: {
      openingHour: '',
      closingHour: '',
    },
    friday: {
      openingHour: '',
      closingHour: '',
    },
    saturday: {
      openingHour: '',
      closingHour: '',
    },
    sunday: {
      openingHour: '',
      closingHour: '',
    },
  });
  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Edit Informasi Umum';
    getApiHandler();
  }, []);

  const getApiHandler = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/infoumum',
      });
      console.log('Response GET');
      console.log(res);
      setFormGeneralInformation({
        logo: { img: null, fileName: res.data.data[0].logo },
        slogan: res.data.data[0].slogan,
        location: {
          location: res.data.data[0].lokasi,
          googleMapsEmbed: res.data.data[0].koordinat,
        },
        contact: {
          phoneNumber: res.data.data[0].noTelp,
          fax: res.data.data[0].fax,
          whatsApp: '',
          telegram: '',
          email: res.data.data[0].email,
        },
        socialMedia: {
          instagram: res.data.data[0].instagram,
          facebook: res.data.data[0].facebook,
          twitter: res.data.data[0].twitter,
          youtube: res.data.data[0].youtube,
          tikTok: res.data.data[0].tiktok,
        },
      });
    } catch (error) {
      // if (error.response.status === 404) {
      // }
      console.log(error);
    }
  };

  const putApiHandler = async (data) => {
    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'PUT',
        url: `https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/infoumum/${data.id}`,
        data: {
          pertanyaan: data.question,
          jawaban: data.answer,
        },
      });
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Berhasil di Edit!',
          statusType: 'success',
        });
      }
      console.log('Response DELETE');
      console.log(res);
      getApiHandler();
    } catch (error) {
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Informasi Bisnis"
          currentPage={{
            title: 'Informasi Umum',
          }}
        />

        <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} />

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
                  value={formGeneralInformation.slogan}
                  onChange={(e) => {
                    setFormGeneralInformation({ ...formGeneralInformation, slogan: e.target.value });
                  }}
                  autoComplete="off"
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
                      value={formGeneralInformation.location.location}
                      onChange={(e) => {
                        setFormGeneralInformation({
                          ...formGeneralInformation,
                          location: { ...formGeneralInformation.location, location: e.target.value },
                        });
                      }}
                      autoComplete="off"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg>
                    <TextField
                      required
                      label="Google Maps Embed"
                      multiline
                      maxRows={4}
                      value={formGeneralInformation.location.googleMapsEmbed}
                      onChange={(e) => {
                        setFormGeneralInformation({
                          ...formGeneralInformation,
                          location: { ...formGeneralInformation.location, googleMapsEmbed: e.target.value },
                        });
                      }}
                      autoComplete="off"
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
                      value={formGeneralInformation.contact.phoneNumber}
                      onChange={(e) => {
                        setFormGeneralInformation({
                          ...formGeneralInformation,
                          contact: { ...formGeneralInformation.contact, phoneNumber: e.target.value },
                        });
                      }}
                      autoComplete="off"
                      onWheel={(e) => e.target.blur()}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md lg>
                    <TextField
                      required
                      type="number"
                      label="Fax"
                      value={formGeneralInformation.contact.fax}
                      onChange={(e) => {
                        setFormGeneralInformation({
                          ...formGeneralInformation,
                          contact: { ...formGeneralInformation.contact, fax: e.target.value },
                        });
                      }}
                      autoComplete="off"
                      onWheel={(e) => e.target.blur()}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md lg>
                    <TextField
                      required
                      type="number"
                      label="WhatsApp"
                      value={formGeneralInformation.contact.whatsApp}
                      onChange={(e) => {
                        setFormGeneralInformation({
                          ...formGeneralInformation,
                          contact: { ...formGeneralInformation.contact, whatsApp: e.target.value },
                        });
                      }}
                      autoComplete="off"
                      onWheel={(e) => e.target.blur()}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md lg>
                    <TextField
                      required
                      type="number"
                      label="Telegram"
                      value={formGeneralInformation.contact.telegram}
                      onChange={(e) => {
                        setFormGeneralInformation({
                          ...formGeneralInformation,
                          contact: { ...formGeneralInformation.contact, telegram: e.target.value },
                        });
                      }}
                      autoComplete="off"
                      onWheel={(e) => e.target.blur()}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md lg>
                    <TextField
                      required
                      label="Email"
                      value={formGeneralInformation.contact.email}
                      onChange={(e) => {
                        setFormGeneralInformation({
                          ...formGeneralInformation,
                          contact: { ...formGeneralInformation.contact, email: e.target.value },
                        });
                      }}
                      autoComplete="off"
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
                      value={formGeneralInformation.socialMedia.instagram}
                      onChange={(e) => {
                        setFormGeneralInformation({
                          ...formGeneralInformation,
                          socialMedia: { ...formGeneralInformation.socialMedia, instagram: e.target.value },
                        });
                      }}
                      autoComplete="off"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md lg>
                    <TextField
                      required
                      label="Facebook"
                      value={formGeneralInformation.socialMedia.facebook}
                      onChange={(e) => {
                        setFormGeneralInformation({
                          ...formGeneralInformation,
                          socialMedia: { ...formGeneralInformation.socialMedia, facebook: e.target.value },
                        });
                      }}
                      autoComplete="off"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md lg>
                    <TextField
                      required
                      label="Twitter"
                      value={formGeneralInformation.socialMedia.twitter}
                      onChange={(e) => {
                        setFormGeneralInformation({
                          ...formGeneralInformation,
                          socialMedia: { ...formGeneralInformation.socialMedia, twitter: e.target.value },
                        });
                      }}
                      autoComplete="off"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md lg>
                    <TextField
                      required
                      label="Youtube"
                      value={formGeneralInformation.socialMedia.youtube}
                      onChange={(e) => {
                        setFormGeneralInformation({
                          ...formGeneralInformation,
                          socialMedia: { ...formGeneralInformation.socialMedia, youtube: e.target.value },
                        });
                      }}
                      autoComplete="off"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md lg>
                    <TextField
                      required
                      label="TikTok"
                      value={formGeneralInformation.socialMedia.tikTok}
                      onChange={(e) => {
                        setFormGeneralInformation({
                          ...formGeneralInformation,
                          socialMedia: { ...formGeneralInformation.socialMedia, tikTok: e.target.value },
                        });
                      }}
                      autoComplete="off"
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

            <Button variant="contained" size="large" style={{ width: '100%', fontWeight: 'bold' }} onClick={() => {}}>
              Simpan
            </Button>

            {formGeneralInformation.slogan}
            <br />
            {formGeneralInformation.location.location + ' ' + formGeneralInformation.location.googleMapsEmbed}
            <br />
            {formGeneralInformation.contact.phoneNumber +
              ' ' +
              formGeneralInformation.contact.fax +
              ' ' +
              formGeneralInformation.contact.whatsApp +
              ' ' +
              formGeneralInformation.contact.telegram +
              ' ' +
              formGeneralInformation.contact.email}
            <br />
            {formGeneralInformation.socialMedia.instagram +
              ' ' +
              formGeneralInformation.socialMedia.facebook +
              ' ' +
              formGeneralInformation.socialMedia.twitter +
              ' ' +
              formGeneralInformation.socialMedia.youtube +
              ' ' +
              formGeneralInformation.socialMedia.tikTok}
            <br />
            {formGeneralInformation.slogan}
            <br />
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default GeneralInformation;
