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
  // const [pickOpeningHourMonday, setPickOpeningHourMonday] = useState(dayjs('0000-00-00 00:00:00'));
  // const [pickOpeningHourTuesday, setPickOpeningHourTuesday] = useState(dayjs('0000-00-00 00:00:00'));
  // const [pickOpeningHourWednesday, setPickOpeningHourWednesday] = useState(dayjs('0000-00-00 00:00:00'));
  // const [pickOpeningHourThursday, setPickOpeningHourThursday] = useState(dayjs('0000-00-00 00:00:00'));
  // const [pickOpeningHourFriday, setPickOpeningHourFriday] = useState(dayjs('0000-00-00 00:00:00'));
  // const [pickOpeningHourSaturday, setPickOpeningHourSaturday] = useState(dayjs('0000-00-00 00:00:00'));
  // const [pickOpeningHourSunday, setPickOpeningHourSunday] = useState(dayjs('0000-00-00 00:00:00'));

  const [pickClosingHourMonday, setPickClosingHourMonday] = useState(dayjs());
  const [pickClosingHourTuesday, setPickClosingHourTuesday] = useState(dayjs());
  const [pickClosingHourWednesday, setPickClosingHourWednesday] = useState(dayjs());
  const [pickClosingHourThursday, setPickClosingHourThursday] = useState(dayjs());
  const [pickClosingHourFriday, setPickClosingHourFriday] = useState(dayjs());
  const [pickClosingHourSaturday, setPickClosingHourSaturday] = useState(dayjs());
  const [pickClosingHourSunday, setPickClosingHourSunday] = useState(dayjs());
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
      dayNameInIndonesia: 'Senin',
      openingHour: '',
      closingHour: '',
      openTime: dayjs,
      setOpenTime: dayjs,
      closeTime: pickClosingHourMonday,
      setCloseTime: setPickClosingHourMonday,
    },
    tuesday: {
      dayNameInIndonesia: 'Selasa',
      openingHour: '',
      closingHour: '',
      openTime: dayjs,
      setOpenTime: dayjs,
      closeTime: pickClosingHourTuesday,
      setCloseTime: setPickClosingHourTuesday,
    },
    wednesday: {
      dayNameInIndonesia: 'Rabu',
      openingHour: '',
      closingHour: '',
      openTime: dayjs,
      setOpenTime: dayjs,
      closeTime: pickClosingHourWednesday,
      setCloseTime: setPickClosingHourWednesday,
    },
    thursday: {
      dayNameInIndonesia: 'Kamis',
      openingHour: '',
      closingHour: '',
      openTime: dayjs,
      setOpenTime: dayjs,
      closeTime: pickClosingHourThursday,
      setCloseTime: setPickClosingHourThursday,
    },
    friday: {
      dayNameInIndonesia: 'Jumat',
      openingHour: '',
      closingHour: '',
      openTime: dayjs,
      setOpenTime: dayjs,
      closeTime: pickClosingHourFriday,
      setCloseTime: setPickClosingHourFriday,
    },
    saturday: {
      dayNameInIndonesia: 'Sabtu',
      openingHour: '',
      closingHour: '',
      openTime: dayjs,
      setOpenTime: dayjs,
      closeTime: pickClosingHourSaturday,
      setCloseTime: setPickClosingHourSaturday,
    },
    sunday: {
      dayNameInIndonesia: 'Minggu',
      openingHour: '',
      closingHour: '',
      openTime: dayjs,
      setOpenTime: dayjs,
      closeTime: pickClosingHourSunday,
      setCloseTime: setPickClosingHourSunday,
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

      ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((item, index) => {
        // operatingHours[item].setOpenTime((timeItem) => dayjs('0000-00-00 ' + res.data.data[0].jamMulai[index] + ':00'));
        setOperatingHours((prev) => ({
          ...prev,
          [item]: {
            ...prev[item],
            openingHour: res.data.data[0].jamMulai[index],
            setOpenTime: dayjs('0000-00-00 ' + res.data.data[0].jamMulai[index] + ':00'),
            setCloseTime: dayjs('0000-00-00 ' + res.data.data[0].jamSelesai[index] + ':00'),
          },
        }));
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
                            {/* Input Time */}
                            <MobileTimePicker
                              label="Jam Buka"
                              value={operatingHours[item].setOpenTime}
                              onChange={(value) => {
                                setOperatingHours({
                                  ...operatingHours,
                                  [item]: {
                                    ...operatingHours[item],
                                    openingHour: value.$H + ':' + value.$m,
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
                                  // helperText: 'MM / DD / YYYY',
                                },
                              }}
                              sx={{ width: '100%' }}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6} sm>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            {/* Input Time */}
                            <MobileTimePicker
                              label="Jam Buka"
                              value={operatingHours[item].setCloseTime}
                              onChange={(value) => {
                                setOperatingHours({
                                  ...operatingHours,
                                  [item]: {
                                    ...operatingHours[item],
                                    openingHour: value.$H + ':' + value.$m,
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
                                  // helperText: 'MM / DD / YYYY',
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
