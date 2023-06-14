import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SingleWave from '../../../assets/images/SingleWave.png';
import DoubleWave from '../../../assets/images/DoubleWave.png';
import SquareWave from '../../../assets/images/SquareWave.png';
import style from './HomePage.module.css';
import parse from 'html-react-parser';
import InstagramIcon from '../../../assets/icons/icons8-instagram.svg';
import FacebookIcon from '../../../assets/icons/icons8-facebook.svg';
import TwitterIcon from '../../../assets/icons/icons8-twitter.svg';
import YoutubeIcon from '../../../assets/icons/icons8-youtube.svg';
import TiktokIcon from '../../../assets/icons/icons8-tiktok.svg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DevicesIcon from '@mui/icons-material/Devices';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import FaxIcon from '@mui/icons-material/Fax';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper';
import RatingComponent from '../../../components/Ratings/RatingComponent';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFAQ,
  getGallery,
  getGeneralInformation,
  getHowToOrder,
  getReasonWhyChooseUs,
  getTestimony,
} from '../../../redux/actions/getBusinessInformationAction';
import { BigPlayButton, LoadingSpinner, Player } from 'video-react';

function HeroSection({ generalInformation }) {
  return (
    <span>
      <Box sx={{ backgroundColor: '#FFFFFF', py: '100px' }}>
        <Container>
          <Grid container spacing={3}>
            <Grid item sm={6} md={5} lg={4}>
              {generalInformation ? <img src={generalInformation.logo} width="100%" alt="" /> : null}
            </Grid>
            <Grid
              item
              sm={6}
              md={7}
              lg={8}
              sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px 0px' }}
            >
              {generalInformation ? <h2>{generalInformation.slogan}</h2> : null}

              <span>
                Lulu ’N Be Luxury Laundry hadir dengan menawarkan pelayanan laundry “One Stop Service” yaitu Laundry,
                Wet Cleaning, dan Dry Cleaning dengan menggunakan teknologi terkini dan chemical terbaik, sehingga
                memberikan perawatan sempurna untuk pakaian dan cucian anda. Ayo daftar sekarang juga untuk dapat
                merasakan pelayanan laundry yang elegan, berkualitas, serta ramah dikantong.
              </span>
              <Button variant="outlined" className="button-outlined-primary" sx={{ width: 'fit-content' }}>
                Bergabung sekarang
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <img src={DoubleWave} width={'100%'} draggable="false" style={{ position: 'relative', top: '-10px' }} alt="" />
    </span>
  );
}

function LaundryTypeSection({ listLaundryType }) {
  return (
    <Container>
      <h4 className={`${style['section-title']}`} id="PilihanLaundry">
        Pilihan Laundry
      </h4>
      <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        {listLaundryType.map((item, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Paper elevation={8} className={`${style['shadow-card']}`}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px 0px',
                    px: 2,
                    pt: 2,
                  }}
                >
                  <h5>{item.nama}</h5>
                  <img
                    src={item.gambar || 'https://katapopuler.com/wp-content/uploads/2020/11/dummy.png'}
                    width={100}
                    height={100}
                    style={{ borderRadius: '16px', objectFit: 'cover', backgroundColor: '#EEEEEE' }}
                    alt=""
                  />
                  <span>{item.deskripsi}</span>
                </Box>
                <Box sx={{ mx: 2, mb: 2 }}>
                  <Button variant="contained" sx={{ width: '100%' }}>
                    Pesan Sekarang
                  </Button>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

function ServiceTypeSection({ listServiceType }) {
  return (
    <Container>
      <h4 className={`${style['section-title']}`} id="JenisLayanan">
        Jenis Layanan Kami
      </h4>
      <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        {listServiceType.map((item, index) => {
          return (
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Paper elevation={8} className={`${style['shadow-card']}`}>
                <Grid container sx={{ p: 2, height: '100%', display: 'flex', gap: '20px 0px' }}>
                  <Grid item xs="auto" sm="auto" md="auto" lg="auto" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      src={item.gamber || 'https://katapopuler.com/wp-content/uploads/2020/11/dummy.png'}
                      width={100}
                      height={100}
                      style={{
                        borderRadius: '16px',
                        objectFit: 'cover',
                        backgroundColor: '#EEEEEE',
                      }}
                      alt=""
                    />
                  </Grid>
                  <Grid item xs sx={{ display: 'flex', flexDirection: 'column', gap: '5px 0px' }}>
                    <span
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px 0px',
                        height: '100%',
                        marginLeft: '10px',
                      }}
                    >
                      <h5>{item.layanan}</h5>
                      <h6>
                        {item.hari ? `${item.hari} Hari` : null} {item.jam ? `${item.jam} Jam` : null}{' '}
                        {item.menit ? `${item.menit} Menit` : null} Penyelesaian
                      </h6>
                      <span>{item.deskripsi}</span>
                    </span>
                    <Button variant="contained" sx={{ width: '100%' }}>
                      Pesan sekarang
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

function OperatingHoursAndHowToOrderSection({ generalInformation, listHowToOrder }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [howToOrderType, setHowToOrderType] = React.useState('Online');

  const LineDashLaundry = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#1F305C' }}>
        <div style={{ width: '100%' }}>
          <hr
            style={{
              border: 'none',
              height: '3px',
              background: 'repeating-linear-gradient(90deg, #1F305C, #1F305C 12px,transparent 6px,transparent 24px)',
            }}
          />
        </div>

        <DryCleaningIcon />

        <div style={{ width: '100%' }}>
          <hr
            style={{
              border: 'none',
              height: '3px',
              background: 'repeating-linear-gradient(90deg, #1F305C, #1F305C 12px,transparent 6px,transparent 24px)',
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <img src={SingleWave} width={'100%'} draggable="false" style={{ position: 'relative', bottom: '-10px' }} alt="" />
      <Box sx={{ backgroundColor: '#ffffff', py: 2 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={5}>
              <h4 className={`${style['section-title']}`} id="JamOperasional">
                Jam Operasional
              </h4>

              <LineDashLaundry />

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {generalInformation.hari.map((item, index) => {
                  return (
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        width: '100%',
                        maxWidth: '180px',
                        gap: '16px',
                        justifyContent: 'space-between',
                      }}
                    >
                      <strong>{item}</strong>
                      <span>
                        {generalInformation.jamMulai[index]} ~ {generalInformation.jamSelesai[index]}
                      </span>
                    </div>
                  );
                })}
              </Box>

              <LineDashLaundry />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={7}
              sx={{
                [theme.breakpoints.down('md')]: {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                },
              }}
            >
              <h4 className={`${style['section-title']}`} id="CaraPemesanan">
                Cara Pemesanan
              </h4>

              <ToggleButtonGroup
                value={howToOrderType}
                color="primary"
                exclusive
                onChange={(event, value) => {
                  if (value) {
                    setHowToOrderType(value);
                  }
                }}
                sx={{
                  width: '100% !important',
                  [theme.breakpoints.down('sm')]: {
                    height: '35px !important',
                  },
                }}
              >
                <ToggleButton
                  value="Online"
                  sx={{
                    width: '100%',
                    border: '1px solid #1F305C',
                    fontWeight: 'bold',
                    color: howToOrderType === 'Online' ? '#ffffff !important' : '#1F305C',
                    backgroundColor: howToOrderType === 'Online' ? '#1F305C !important' : '#ffffff',
                  }}
                >
                  <DevicesIcon sx={{ mr: 1 }} /> Via Online
                </ToggleButton>
                <ToggleButton
                  value="Outlet"
                  sx={{
                    width: '100%',
                    border: '1px solid #1F305C',
                    fontWeight: 'bold',
                    color: howToOrderType === 'Outlet' ? '#ffffff !important' : '#1F305C',
                    backgroundColor: howToOrderType === 'Outlet' ? '#1F305C !important' : '#ffffff',
                  }}
                >
                  <StorefrontIcon sx={{ mr: 1 }} /> Via Outlet
                </ToggleButton>
              </ToggleButtonGroup>

              <Box sx={{ maxWidth: 400 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {listHowToOrder
                    .filter((element) => element.status === howToOrderType)
                    .map((step, index) => (
                      <Step key={index + 1}>
                        <StepLabel>
                          <span style={{ fontWeight: 'bold' }}> {step.judul}</span>
                        </StepLabel>
                        <StepContent>
                          <img src={step.gambar} width={'100%'} style={{ borderRadius: '4px' }} alt="" />
                          <Typography>{step.deskripsi}</Typography>
                          <Box sx={{ mb: 2 }}>
                            <div>
                              <Button
                                variant="contained"
                                onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
                                sx={{ mt: 1, mr: 1 }}
                              >
                                {index ===
                                listHowToOrder.filter((element) => element.status === howToOrderType).length - 1
                                  ? 'Selesai'
                                  : 'Lanjut'}
                              </Button>
                              <Button
                                disabled={index === 0}
                                onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
                                sx={{ mt: 1, mr: 1 }}
                              >
                                Kembali
                              </Button>
                            </div>
                          </Box>
                        </StepContent>
                      </Step>
                    ))}
                </Stepper>
                {activeStep === listHowToOrder.filter((element) => element.status === howToOrderType).length && (
                  <Box sx={{ px: 3, py: 1 }}>
                    <Button onClick={() => setActiveStep(0)} sx={{ mt: 1, mr: 1 }}>
                      Reset
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <img
        src={SingleWave}
        width={'100%'}
        draggable="false"
        style={{ transform: 'rotate(-180deg)', position: 'relative', top: '-10px' }}
        alt=""
      />
    </div>
  );
}

function EventSection({ listEvent }) {
  const [openEventDetail, setOpenEventDetail] = React.useState([]);
  // let openEventDetail = [];

  useEffect(() => {
    // [1, 2, 3, 4, 5, 6, 7].map((eventItem, index) => setOpenEventDetail((stateA) => [...stateA, 'false']));
    // listEvent.map((eventItem, index) => openEventDetail.push(false));
    console.log(openEventDetail);
  }, []);
  return (
    <>
      <Container>
        <div id="Event" style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginTop: '26px' }}>
          Event
        </div>
        <Swiper
          grabCursor={true}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination]}
          // className="mySwiper"
        >
          {listEvent.map((eventItem, index) => {
            return (
              <SwiperSlide style={{ height: 'auto' }}>
                <Paper
                  elevation={8}
                  className={` gap-10 ${style['carousell-card']}`}
                  sx={{ borderRadius: '4px', height: '100%', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    <img
                      src={eventItem.gambar || 'https://katapopuler.com/wp-content/uploads/2020/11/dummy.png'}
                      width="100%"
                      height={320}
                      alt=""
                      style={{ borderRadius: '4px 4px 0px 0px', objectFit: 'cover' }}
                    />
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <h5>{eventItem.nama}</h5>

                      <span>{eventItem.deskripsi}</span>

                      <span>
                        {index === 2
                          ? 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, eaque debitis nemo, sed placeat doloribus beatae ipsa quibusdam temporibus blanditiis reiciendis soluta aliquam veritatis libero rerum quas, ipsam veniam voluptate.'
                          : null}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <Button
                      variant="contained"
                      onClick={async () => {
                        let newStatus = await [...openEventDetail];

                        newStatus[index] = !newStatus[index];
                        console.log(newStatus);
                        setOpenEventDetail([...newStatus]);
                      }}
                      sx={{ width: '100%', zIndex: openEventDetail[index] ? 100 : 'none' }}
                    >
                      {openEventDetail[index] ? 'Tutup detail' : 'Lihat Detail'}
                    </Button>
                  </div>
                  {/* Open Event Detail */}
                  {openEventDetail[index] === true ? (
                    <Box
                      sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(31, 48, 92, 0.8)',
                        borderRadius: '4px',
                        overflowY: 'auto',
                        color: '#ffffff',
                      }}
                    >
                      <div style={{ padding: '16px' }}>
                        <h6>Kriteria</h6>
                        <ol style={{ paddingLeft: '20px', marginTop: '0px' }}>
                          {eventItem.kriteria.map((kriteriaItem, index) => {
                            return <li>{kriteriaItem}</li>;
                          })}
                        </ol>

                        <h6>Reward</h6>
                        <ol style={{ paddingLeft: '20px', marginTop: '0px' }}>
                          {eventItem.reward.map((rewardItem, index) => {
                            return <li>{rewardItem}</li>;
                          })}
                        </ol>
                      </div>
                    </Box>
                  ) : null}
                </Paper>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>
    </>
  );
}

function ReasonSection({ listReason }) {
  return (
    <>
      <Container>
        <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginTop: '26px' }}>
          Alasan Memilih Kami
        </div>

        <Swiper
          grabCursor={true}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination]}
          // className="mySwiper"
        >
          {listReason.map((reasonItem, index) => {
            return (
              <SwiperSlide style={{ height: 'auto' }}>
                <Paper
                  elevation={8}
                  className={`${style['shadow-card']}`}
                  sx={{
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: '24px',
                    gap: '0px !important',
                  }}
                >
                  <div
                    style={{ padding: '16px', paddingBottom: '0px', width: 'fit-content', flexDirection: 'column' }}
                    className="gap-10"
                  >
                    <div style={{ display: 'flex', gap: '0px 10px' }}>
                      <div
                        style={{
                          height: '30px',
                          minWidth: '30px',
                          backgroundColor: '#1F305C',
                          borderRadius: '50%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontWeight: 'bold',
                          color: '#ffffff',
                        }}
                      >
                        {index + 1}
                      </div>
                      <h5>{reasonItem.judul}</h5>
                    </div>
                    <div style={{ wordWrap: 'break-word', marginBottom: '10px' }}>{reasonItem.deskripsi}</div>
                  </div>

                  <div
                    style={{
                      padding: '16px',
                      paddingTop: '0px',
                      width: 'fit-content',
                      alignSelf: 'center',
                    }}
                  >
                    {reasonItem.gambar ? (
                      <img
                        src={reasonItem.gambar}
                        width="100%"
                        style={{ maxHeight: '240px', objectFit: 'contain' }}
                        alt=""
                      />
                    ) : null}
                  </div>
                </Paper>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>
    </>
  );
}

function GallerySection({ listGallery }) {
  const theme = useTheme();
  const navigate = useNavigate();
  // const [dataGallery, setDatagallery] = React.useState([]);
  const [openDescription, setOpenDescription] = React.useState(false);

  const [openPreviewGallery, setOpenPreviewGallery] = React.useState({
    isOpen: false,
    data: null,
  });

  const handleClickOpen = (data) => {
    setOpenPreviewGallery({ ...openPreviewGallery, isOpen: true, data: data });
  };

  const handleClose = () => {
    setOpenPreviewGallery({ ...openPreviewGallery, isOpen: false });
  };

  const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Fragment>
      <Container sx={{ marginTop: '26px' }}>
        <h3 style={{ textAlign: 'center' }}>Galeri</h3>
        <Grid container spacing={1} sx={{ mt: 2 }}>
          {listGallery.map((item, index) => {
            if (index < (isMobileSize ? 5 : listGallery.length)) {
              if (item.status === 'video') {
                return (
                  <Grid item xs={4} sm={4} md={3} lg={2}>
                    <Box
                      onClick={() => handleClickOpen(item)}
                      sx={{ cursor: 'pointer', position: 'relative', backgroundColor: '#ffffff' }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                          height: '100%',
                          zIndex: 1,
                        }}
                      >
                        <div style={{ width: '100%' }}>
                          <PlayCircleOutlineIcon fontSize="large" sx={{ width: '100%', color: 'white' }} />
                        </div>
                      </div>

                      <Player playsInline fluid={false} width="100%" height={isMobileSize ? 180 : 240} src={item.media}>
                        <LoadingSpinner />
                        <BigPlayButton position="center" />
                      </Player>
                    </Box>
                  </Grid>
                );
              } else {
                return (
                  <Grid item xs={4} sm={4} md={3} lg={2}>
                    <Box onClick={() => handleClickOpen(item)} sx={{ cursor: 'pointer', backgroundColor: '#ffffff' }}>
                      <div
                        style={{
                          width: '100%',
                          height: isMobileSize ? 180 : 240,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          overflow: 'hidden',
                        }}
                      >
                        <img src={item.media} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                      </div>
                    </Box>
                  </Grid>
                );
              }
            } else if (index === 5) {
              return (
                <Grid item xs={4} sm={4} md={3} lg={2}>
                  <Box
                    onClick={() => navigate('/Galeri')}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      height: '100%',
                      backgroundColor: '#ffffff',
                      textAlign: 'center',
                    }}
                  >
                    Lihat Lebih Banyak
                    {/* <NavigateNextIcon /> */}
                  </Box>
                </Grid>
              );
            } else {
              return null;
            }
          })}
        </Grid>

        <Dialog
          fullWidth
          open={openPreviewGallery.isOpen}
          onClose={handleClose}
          aria-describedby="alert-dialog-description"
        >
          <h4
            style={{ padding: '0px 24px', paddingTop: '16px', display: 'flex', alignItems: 'center' }}
            onClick={() => setOpenDescription(!openDescription)}
          >
            {openPreviewGallery.data ? openPreviewGallery.data.judul : null}{' '}
            {openDescription ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </h4>

          <Box sx={{ px: 3, display: openDescription ? 'block' : 'none' }}>
            {openPreviewGallery.data ? openPreviewGallery.data.deskripsi : null}
          </Box>

          <DialogContent sx={{ display: 'flex', justifyContent: 'center', pb: 0 }}>
            {openPreviewGallery.data ? (
              openPreviewGallery.data.status === 'video' ? (
                <Player playsInline fluid={false} aspectRatio="16:9" height={280} src={openPreviewGallery.data.media}>
                  <LoadingSpinner />
                  <BigPlayButton position="center" />
                </Player>
              ) : (
                <img
                  src={openPreviewGallery.data.media}
                  width={'100%'}
                  // height={'100%'}
                  style={{ objectFit: 'contain' }}
                  alt=""
                />
              )
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Tutup
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Fragment>
  );
}

function TestimonySection({ listTestimony }) {
  return (
    <>
      <Container>
        <div
          id="TestimoniPelanggan"
          style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginTop: '26px' }}
        >
          Testimoni Pelanggan
        </div>

        <Swiper
          grabCursor={true}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            600: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination]}
        >
          {[1, 2, 3, 4, 21, 12, 12].map((item, index) => {
            return (
              // <>
              <SwiperSlide
                style={{
                  height: 'auto',
                }}
              >
                <div
                  style={{
                    borderRadius: '24px',
                    border: '2px solid black',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    textAlign: 'center',
                    height: '100%',
                  }}
                >
                  <div
                    style={{
                      marginTop: '16px',
                      marginLeft: '10px',
                      marginRight: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                    }}
                  >
                    <h5>Ahmad Yusuf Pangestu</h5>
                    <img
                      src="https://katapopuler.com/wp-content/uploads/2020/11/dummy.png"
                      width="100"
                      height="100"
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                      alt=""
                    />

                    <RatingComponent readOnly={true} ratingValue={item} />

                    <div className="small-text">
                      {item}{' '}
                      {item === 2
                        ? 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt doloremque nihil doloribus animi atque, perferendis cupiditate explicabo dolore nemo maxime vel impedit ex! Reprehenderit sapiente velit sit consequatur eligendi ipsa!'
                        : null}
                    </div>

                    <img
                      src="https://katapopuler.com/wp-content/uploads/2020/11/dummy.png"
                      width="120"
                      height="120"
                      style={{ objectFit: 'cover' }}
                      alt=""
                    />
                  </div>
                  <div
                    className="small-text"
                    style={{
                      marginBottom: '16px',
                    }}
                  >
                    25/04/2023
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>
    </>
  );
}

function FAQSection({ listFAQ }) {
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setCurrentWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <>
      <Container>
        <h4 className={`${style['section-title']}`}>Pertanyaan Yang Sering Diajukan</h4>

        <Grid container spacing={4}>
          {(currentWidth < 900 ? [1] : [1, 2]).map((gridTotal, gridIndex) => {
            return (
              <Grid item xs={12} md={6}>
                {listFAQ
                  .filter((filterItem, filterIndex) => {
                    let lengthArr = listFAQ.length;
                    // console.log(currentWidth);
                    if (currentWidth < 900) {
                      return filterIndex <= lengthArr;
                    } else {
                      if (gridIndex + 1 === 1) {
                        return filterIndex < lengthArr / 2;
                      } else {
                        return filterIndex >= lengthArr / 2;
                      }
                    }
                  })
                  .map((FAQitem, index) => {
                    return (
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ color: '#000000' }}>
                          <Typography>{FAQitem.pertanyaan}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{FAQitem.jawaban}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

function ContactAndLocationSection({ generalInformation }) {
  let mapsEmbed = generalInformation.koordinat;

  let mapsTag = mapsEmbed
    .replace('width="600"', 'width="100%"')
    .replace(' height="450"', ' height="400"')
    .replace('style="border:0;"', 'style="border: 2px solid #1F305C; border-radius: 4px"');

  return (
    <>
      <span>
        <img
          src={SquareWave}
          width={'100%'}
          draggable="false"
          style={{ position: 'relative', bottom: '-10px' }}
          alt=""
        />
        <Box sx={{ backgroundColor: '#FFFFFF', py: '20px' }}>
          <Container>
            <h4 className={`${style['section-title']}`} id="KontakDanLokasi">
              Kontak & Lokasi
            </h4>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={5} lg={5}>
                {parse(mapsTag)}
              </Grid>
              <Grid item xs={12} sm={6} md={7} lg={7} className="gap-16" sx={{ flexDirection: 'column' }}>
                <span className="gap-10" style={{ flexDirection: 'column' }}>
                  <h6>Kontak</h6>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <CallIcon sx={{ color: '#1F305C' }} />
                    <h6>(No Telepon)</h6>
                    <span>{generalInformation.noTelp}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <FaxIcon sx={{ color: '#1F305C' }} />
                    <h6>(Fax)</h6>
                    <span>{generalInformation.fax}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <EmailIcon sx={{ color: '#1F305C' }} />
                    <h6>(Email)</h6>
                    <span>{generalInformation.email}</span>
                  </div>
                </span>
                <span className="gap-10" style={{ flexDirection: 'column' }}>
                  <h6>Sosial Media</h6>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Link to={''}>
                      <img src={InstagramIcon} height="40" alt="" />
                    </Link>
                    <Link to={''}>
                      <img src={FacebookIcon} height="40" alt="" />
                    </Link>
                    <Link to={''}>
                      <img src={TwitterIcon} height="40" alt="" />
                    </Link>
                    <Link to={''}>
                      <img src={YoutubeIcon} height="40" alt="" />
                    </Link>
                    <Link to={''}>
                      <img src={TiktokIcon} height="40" alt="" />
                    </Link>
                  </div>
                </span>
                <span className="gap-10" style={{ flexDirection: 'column' }}>
                  <h6>Lokasi</h6>
                  <span>{generalInformation.lokasi}</span>
                </span>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </span>
    </>
  );
}

function FooterSection({ generalInformation }) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px 0px',
          alignItems: 'center',
          backgroundColor: '#1F305C',
          padding: '24px',
          color: '#FFFFFF',
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs className="gap-10" style={{ flexDirection: 'column' }}>
            <h4>Navigasi</h4>
            <Link to={''} className={`${style['disable-link-style-white']}`}>
              <div>Beranda</div>
            </Link>
            <Link to={'/Galeri'} className={`${style['disable-link-style-white']}`}>
              <div>Galeri</div>
            </Link>
            <Link to={'/'} className={`${style['disable-link-style-white']}`}>
              <div>Pemesanan Laundry</div>
            </Link>
            <Link to={'/TentangKami'} className={`${style['disable-link-style-white']}`}>
              <div>Tentang Kami</div>
            </Link>
          </Grid>
          <Grid item xs={12} md="auto">
            <Grid container spacing={4}>
              <Grid item xs className="gap-10" style={{ flexDirection: 'column' }}>
                <h4>Kontak</h4>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <CallIcon />
                  <h6>(No Telepon)</h6>
                  <span>{generalInformation.noTelp}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <FaxIcon />
                  <h6>(Fax)</h6>
                  <span>{generalInformation.fax}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  <EmailIcon />
                  <h6>(Email)</h6>
                  <span>{generalInformation.email}</span>
                </div>
              </Grid>
              <Grid item xs={12} sm="auto" className="gap-10" style={{ flexDirection: 'column' }}>
                <h4>Sosial Media</h4>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {generalInformation.instagram ? (
                    <Link to={generalInformation.instagram}>
                      <img src={InstagramIcon} height="40" alt="" />
                    </Link>
                  ) : null}
                  {generalInformation.facebook ? (
                    <Link to={generalInformation.facebook}>
                      <img src={FacebookIcon} height="40" alt="" />
                    </Link>
                  ) : null}
                  {generalInformation.twitter ? (
                    <Link to={generalInformation.twitter}>
                      <img src={TwitterIcon} height="40" alt="" />
                    </Link>
                  ) : null}
                  {generalInformation.youtube ? (
                    <Link to={generalInformation.youtube}>
                      <img src={YoutubeIcon} height="40" alt="" />
                    </Link>
                  ) : null}
                  {generalInformation.tiktok ? (
                    <Link to={generalInformation.tiktok}>
                      <img src={TiktokIcon} height="40" alt="" />
                    </Link>
                  ) : null}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <span style={{ textAlign: 'center' }}>Copyright ©2023 Lulu 'N Be Luxury Laundry Purwokerto</span>
      </Box>
    </>
  );
}

function HomePage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [laundryType, setLaundryType] = React.useState([]);
  const [serviceType, setServiceType] = React.useState([]);
  // const [howToOrder, setHowToOrder] = React.useState([]);
  const [event, setEvent] = React.useState([]);
  // const [reason, setReason] = React.useState([]);
  const [position, setPosition] = React.useState(window.pageYOffset);

  const dispatch = useDispatch();
  const { isLoading: loadingGetGeneralInformation, data: dataGetGeneralInformation } = useSelector(
    (state) => state.getGeneralInformation
  );
  const { isLoading: loadingGetReasonWhyChooseUs, data: dataGetReasonWhyChooseUs } = useSelector(
    (state) => state.getReasonWhyChooseUs
  );
  const { isLoading: loadingGetHowToOrder, data: dataGetHowToOrder } = useSelector((state) => state.getHowToOrder);
  const { isLoading: loadingGetTestimony, data: dataGetTestimony } = useSelector((state) => state.getTestimony);
  const { isLoading: loadingGetFAQ, data: dataGetFAQ } = useSelector((state) => state.getFAQ);
  const { isLoading: loadingGetGallery, data: dataGetGallery } = useSelector((state) => state.getGallery);

  React.useEffect(() => {
    document.title = 'Beranda | Lulu n Be Luxury Laundry';
    dispatchGetGeneralInformation();
    dispatchGetHowToOrder();
    dispatchGetReasonWhyChooseUs();
    dispatchGetGallery();
    dispatchGetTestimony();
    dispatchGetFAQ();

    handleGetLaundryType();
    handleGetServiceType();
    handleGetEvent();
  }, []);

  const dispatchGetGeneralInformation = async () => {
    return await dispatch(getGeneralInformation());
  };

  const dispatchGetHowToOrder = async () => {
    return await dispatch(getHowToOrder());
  };

  const dispatchGetReasonWhyChooseUs = async () => {
    return await dispatch(getReasonWhyChooseUs());
  };

  const dispatchGetGallery = async () => {
    return await dispatch(getGallery());
  };

  const dispatchGetTestimony = async () => {
    return await dispatch(getTestimony());
  };

  const dispatchGetFAQ = async () => {
    return await dispatch(getFAQ());
  };

  const handleGetLaundryType = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_KEY}/jenislaundry`,
      });
      console.log('Response GET Data Laundry Type');
      console.log(res);
      setLaundryType(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetServiceType = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_KEY}/jenislayanan`,
      });
      console.log('Response GET Data Service Type');
      console.log(res);
      setServiceType(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetEvent = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_KEY}/acara`,
      });
      console.log('Response GET Data Event');
      console.log(res);
      setEvent(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px 0px' }}>
      {!loadingGetGeneralInformation && sessionStorage.getItem('business_information') ? (
        <HeroSection generalInformation={dataGetGeneralInformation} />
      ) : null}

      {laundryType ? <LaundryTypeSection listLaundryType={laundryType} /> : null}
      {serviceType ? <ServiceTypeSection listServiceType={serviceType} /> : null}

      {!loadingGetGeneralInformation && !loadingGetHowToOrder ? (
        <OperatingHoursAndHowToOrderSection
          generalInformation={dataGetGeneralInformation}
          listHowToOrder={dataGetHowToOrder}
        />
      ) : null}

      {event ? <EventSection listEvent={event} /> : null}
      {!loadingGetReasonWhyChooseUs && !dataGetReasonWhyChooseUs ? (
        <ReasonSection listReason={dataGetReasonWhyChooseUs} />
      ) : null}
      {!loadingGetGallery && !dataGetGallery ? <GallerySection listGallery={dataGetGallery} /> : null}
      {!loadingGetTestimony && !dataGetTestimony ? <TestimonySection listTestimony={dataGetTestimony} /> : null}
      {!loadingGetFAQ && !dataGetFAQ ? <FAQSection listFAQ={dataGetFAQ} /> : null}

      {!loadingGetGeneralInformation && sessionStorage.getItem('business_information') ? (
        <span>
          <ContactAndLocationSection generalInformation={dataGetGeneralInformation} />
          <FooterSection generalInformation={dataGetGeneralInformation} />
        </span>
      ) : null}

      <div
        style={{
          position: 'fixed',
          right: '20px',
          bottom: '50px',
          // display: window.pageYOffset <= 500 ? 'none' : 'initial',
        }}
      >
        Top
        {/* {window.pageYOffset} */}
        {position}
      </div>

      <button onClick={() => navigate('/dashboard')}>Navbar & Sidebar Admin</button>
    </div>
  );
}

export default HomePage;
