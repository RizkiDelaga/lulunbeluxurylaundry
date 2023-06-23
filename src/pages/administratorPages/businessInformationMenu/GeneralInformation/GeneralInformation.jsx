import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Chip, Grid, Paper, TextField, useTheme } from '@mui/material';
import LoadDecisions from '../../../../components/LoadDecisions/LoadDecisions';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import axios from 'axios';
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function GeneralInformation() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [formGeneralInformation, setFormGeneralInformation] = useState({
    logo: { img: null, fileName: null },
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
      dayNameInIndonesia: 'Senin',
      setOpenTime: dayjs(),
      setCloseTime: dayjs(),
    },
    tuesday: {
      dayNameInIndonesia: 'Selasa',
      setOpenTime: dayjs(),
      setCloseTime: dayjs(),
    },
    wednesday: {
      dayNameInIndonesia: 'Rabu',
      setOpenTime: dayjs(),
      setCloseTime: dayjs(),
    },
    thursday: {
      dayNameInIndonesia: 'Kamis',
      setOpenTime: dayjs(),
      setCloseTime: dayjs(),
    },
    friday: {
      dayNameInIndonesia: 'Jumat',
      setOpenTime: dayjs(),
      setCloseTime: dayjs(),
    },
    saturday: {
      dayNameInIndonesia: 'Sabtu',
      setOpenTime: dayjs(),
      setCloseTime: dayjs(),
    },
    sunday: {
      dayNameInIndonesia: 'Minggu',
      setOpenTime: dayjs(),
      setCloseTime: dayjs(),
    },
  });
  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Edit Informasi Umum';
    handleGetGeneralInformation();
  }, []);

  const handleGetGeneralInformation = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_KEY}/infoumum`,
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
          telegram: res.data.data[0].telegram,
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

      ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((item, index) => {
        setOperatingHours((prev) => ({
          ...prev,
          [item]: {
            ...prev[item],
            setOpenTime: dayjs('0000-00-00 ' + res.data.data[0].jamMulai[index] + ':00'),
            setCloseTime: dayjs('0000-00-00 ' + res.data.data[0].jamSelesai[index] + ':00'),
          },
        }));
      });
      sessionStorage.setItem('business_information', JSON.stringify(res.data.data[0]));
    } catch (error) {
      // if (error.response.status === 404) {
      // }
      console.log(error);
    }
  };

  const handleUpdateGeneralInformation = async () => {
    const formData = new FormData();
    formData.append('logo', formGeneralInformation.logo.img);
    formData.append('slogan', formGeneralInformation.slogan);
    formData.append('lokasi', formGeneralInformation.location.location);
    formData.append('koordinat', formGeneralInformation.location.googleMapsEmbed);
    formData.append('noTelp', formGeneralInformation.contact.phoneNumber);
    formData.append('telegram', formGeneralInformation.contact.telegram);
    formData.append('email', formGeneralInformation.contact.email);
    formData.append('fax', formGeneralInformation.contact.fax);
    formData.append('instagram', formGeneralInformation.socialMedia.instagram);
    formData.append('facebook', formGeneralInformation.socialMedia.facebook);
    formData.append('tiktok', formGeneralInformation.socialMedia.tikTok);
    formData.append('twitter', formGeneralInformation.socialMedia.twitter);
    formData.append('youtube', formGeneralInformation.socialMedia.youtube);
    ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((item, index) => {
      return formData.append(`hari[${index}]`, operatingHours[item].dayNameInIndonesia);
    });
    ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((item, index) => {
      let date = new Date(operatingHours[item].setOpenTime);
      return formData.append(
        `jamMulai[${index}]`,
        `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`
      );
    });
    ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((item, index) => {
      let date = new Date(operatingHours[item].setCloseTime);
      return formData.append(
        `jamSelesai[${index}]`,
        `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`
      );
    });

    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/infoumum/1`,
        data: formData,
      });
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Berhasil di Edit!',
          statusType: 'success',
        });
      }
      console.log('Response Update');
      console.log(res);
      handleGetGeneralInformation();
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response.data.message);
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
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

              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((item) => {
                return (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={1.3} lg={1} sx={{ display: 'flex', alignItems: 'center' }}>
                      <span>{operatingHours[item].dayNameInIndonesia}</span>
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
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileTimePicker
                              label="Jam Buka"
                              value={operatingHours[item].setOpenTime}
                              onChange={(value) => {
                                setOperatingHours({
                                  ...operatingHours,
                                  [item]: {
                                    ...operatingHours[item],
                                    setOpenTime: value,
                                  },
                                });
                                console.log(value);
                                console.log('Jam: ' + value.$H);
                                console.log('Menit: ' + value.$m);
                                console.log('Detik: ' + value.$s);
                              }}
                              renderInput={(params) => <TextField {...params} />}
                              slotProps={{
                                textField: {
                                  error: false,
                                  helperText:
                                    ('0' + operatingHours[item].setOpenTime.$H).slice(-2) +
                                    ':' +
                                    ('0' + operatingHours[item].setOpenTime.$m).slice(-2),
                                },
                              }}
                              sx={{ width: '100%' }}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6} sm>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileTimePicker
                              label="Jam Tutup"
                              value={operatingHours[item].setCloseTime}
                              onChange={(value) => {
                                setOperatingHours({
                                  ...operatingHours,
                                  [item]: {
                                    ...operatingHours[item],
                                    setCloseTime: value,
                                  },
                                });
                                console.log(value);
                                console.log('Jam: ' + value.$H);
                                console.log('Menit: ' + value.$m);
                                console.log('Detik: ' + value.$s);
                              }}
                              renderInput={(params) => <TextField {...params} />}
                              slotProps={{
                                textField: {
                                  error: false,
                                  helperText:
                                    ('0' + operatingHours[item].setCloseTime.$H).slice(-2) +
                                    ':' +
                                    ('0' + operatingHours[item].setCloseTime.$m).slice(-2),
                                },
                              }}
                              sx={{ width: '100%' }}
                            />
                          </LocalizationProvider>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </div>

            <Button
              variant="contained"
              size="large"
              style={{ width: '100%', fontWeight: 'bold' }}
              onClick={() => handleUpdateGeneralInformation()}
            >
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
            {/* {operatingHours.monday.openingHour} */}
            {console.log({ operatingHours })}
            <br />
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default GeneralInformation;

// const OperationalHour = (props) => {
//   return (
//     <div className={`dash-card gap-16`}>
//       <div style={{ fontWeight: 'bold' }}>Jam Operasional</div>

//       {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((item) => {
//         return (
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={12} md={1.3} lg={1} sx={{ display: 'flex', alignItems: 'center' }}>
//               <span>{operatingHours[item].dayNameInIndonesia}</span>
//             </Grid>
//             <Grid
//               item
//               xs
//               lg
//               sx={{
//                 display: 'flex',
//                 [theme.breakpoints.down('md')]: {
//                   paddingTop: '8px !important',
//                 },
//               }}
//             >
//               <Grid container spacing={2}>
//                 <Grid item xs={6} sm>
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     {/* Input Time */}
//                     <MobileTimePicker
//                       label="Pilih Jam Buka"
//                       value={pickOpeningHourMonday}
//                       // value={
//                       // `pickOpeningHour${dayName}`
//                       // '0000-00-00 ' + operatingHours[item].openingHour + ':00'
//                       // item.setTimeOpen
//                       // dayjs('0000-00-00 ' + operatingHours[item].openingHour + ':00')
//                       // operatingHours.monday.openingHour !== null
//                       //   ? `0000-00-00 ` + operatingHours.monday.openingHour + `:00`
//                       //   : '0000-00-00 00:00:00'
//                       // }
//                       onChange={(value) => {
//                         // console.log(
//                         //   `pickOpeningHour${
//                         //     dayName.charAt(0).toUpperCase() + dayName.substr(1, dayName.length)
//                         //   }`
//                         // );
//                         // let joinVariable = () => {
//                         //   let asd ='setPickOpeningHour' +
//                         //   dayName.charAt(0).toUpperCase() +
//                         //   dayName.substr(1, dayName.length)
//                         //   return asd
//                         // };
//                         setOperatingHours({
//                           ...operatingHours,
//                           item: {
//                             ...operatingHours[item],
//                             openingHour: value.$H + ':' + value.$m,
//                           },
//                         });
//                         operatingHours[item].setOpenTime(value);
//                         console.log(operatingHours[item].setOpenTime);
//                         operatingHours[item].setOpenTime(value);
//                         // pickOpeningHour${
//                         //   dayName.charAt(0).toUpperCase() + dayName.substr(1, dayName.length)
//                         // }

//                         // setOperatingHours({
//                         //   dayName: {
//                         //     ...operatingHours[dayName],
//                         //     openingHour: dayjs('0000-00-00 ' + value.$H + ':' + value.$m + ':00'),
//                         //   },
//                         // });

//                         // console.log(joinVariable);
//                         console.log(value);
//                         console.log('Jam: ' + value.$H);
//                         console.log('Menit: ' + value.$m);
//                         console.log('Detik: ' + value.$s);
//                       }}
//                       renderInput={(params) => <TextField {...params} />}
//                       slotProps={{
//                         textField: {
//                           // helperText: 'MM / DD / YYYY',
//                         },
//                       }}
//                       sx={{ width: '100%' }}
//                     />
//                   </LocalizationProvider>
//                 </Grid>
//                 <Grid item xs={6} sm>
//                   <TextField required label="Kuantitas" type="number" sx={{ width: '100%' }} />
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         );
//       })}
//     </div>
//   );
// };
