import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
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

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper';
import RatingComponent from '../../../components/Ratings/RatingComponent';
import axios from 'axios';

function HeroSection() {
  return (
    <span>
      <Box sx={{ backgroundColor: '#FFFFFF', py: '100px' }}>
        <Container>
          <Grid container spacing={3}>
            <Grid item sm={6} md={5} lg={4}>
              <img src="https://katapopuler.com/wp-content/uploads/2020/11/dummy.png" width="100%" alt="" />
            </Grid>
            <Grid
              item
              sm={6}
              md={7}
              lg={8}
              sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px 0px' }}
            >
              <h2>Give More Than Your Hope</h2>
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

function OperatingHoursAndHowToOrderSection() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [howToOrderType, setHowToOrderType] = React.useState('Online');

  // const ToggleButton = styled(MuiToggleButton)({
  //   '&.Mui-selected, &.Mui-selected:hover': {
  //     backgroundColor: '#1F305C',
  //   },
  // })

  const steps = [
    {
      label: 'Select campaign settings',
      description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
      img: 'https://loremflickr.com/cache/resized/65535_52496308828_4dac1ce096_b_640_480_nofilter.jpg',
    },
    {
      label: 'Create an ad group',
      description: 'An ad group contains one or more ads which target a shared set of keywords.',
      img: 'https://katapopuler.com/wp-content/uploads/2020/11/dummy.png',
    },
    {
      label: 'Create an ad',
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
      img: 'https://loremflickr.com/cache/resized/65535_52302919685_7002b85a5b_c_640_480_nofilter.jpg',
    },
  ];

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
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#1F305C' }}>
                <div style={{ width: '100%' }}>
                  <hr
                    style={{
                      border: 'none',
                      height: '3px',
                      background:
                        'repeating-linear-gradient(90deg, #1F305C, #1F305C 12px,transparent 6px,transparent 24px)',
                    }}
                  />
                </div>

                <DryCleaningIcon />

                <div style={{ width: '100%' }}>
                  <hr
                    style={{
                      border: 'none',
                      height: '3px',
                      background:
                        'repeating-linear-gradient(90deg, #1F305C, #1F305C 12px,transparent 6px,transparent 24px)',
                    }}
                  />
                </div>
              </div>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((item, index) => {
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
                      <span>08:00 ~ 20:00</span>
                    </div>
                  );
                })}
              </Box>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#1F305C' }}>
                <div style={{ width: '100%' }}>
                  <hr
                    style={{
                      border: 'none',
                      height: '3px',
                      background:
                        'repeating-linear-gradient(90deg, #1F305C, #1F305C 12px,transparent 6px,transparent 24px)',
                    }}
                  />
                </div>

                <DryCleaningIcon />

                <div style={{ width: '100%' }}>
                  <hr
                    style={{
                      border: 'none',
                      height: '3px',
                      background:
                        'repeating-linear-gradient(90deg, #1F305C, #1F305C 12px,transparent 6px,transparent 24px)',
                    }}
                  />
                </div>
              </div>
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
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel>
                        <span style={{ fontWeight: 'bold' }}> {step.label}</span>
                      </StepLabel>
                      <StepContent>
                        <img src={step.img} width={'100%'} style={{ borderRadius: '4px' }} alt="" />
                        <Typography>{step.description}</Typography>
                        <Box sx={{ mb: 2 }}>
                          <div>
                            <Button
                              variant="contained"
                              onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              {index === steps.length - 1 ? 'Selesai' : 'Lanjut'}
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
                {activeStep === steps.length && (
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
                  className={`gap-10 ${style['shadow-card']}`}
                  sx={{
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: '24px',
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
                    <div style={{ wordWrap: 'break-word' }}>{reasonItem.deskripsi}</div>
                  </div>

                  <div
                    style={{
                      padding: '16px',
                      paddingTop: '0px',
                      width: 'fit-content',

                      alignSelf: 'center',
                    }}
                  >
                    <img
                      src={reasonItem.gambar || 'https://katapopuler.com/wp-content/uploads/2020/11/dummy.png'}
                      width="100%"
                      style={{ maxHeight: '240px', objectFit: 'contain' }}
                      alt=""
                    />
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

function TestimonySection() {
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
          // className="mySwiper"
        >
          {[1, 2, 3, 4, 5, 6, 7].map((eventItem, index) => {
            return (
              <SwiperSlide>
                <Paper
                  // elevation={8}
                  // className={` gap-10 ${style['shadow-card']}`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '16px',
                    padding: '16px',
                    borderRadius: '24px',
                    border: '2px solid black',
                    textAlign: 'center',
                  }}
                  // sx={{ borderRadius: '4px', height: '100%', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <h5>Ahmad Yusuf Pangestu</h5>
                  <img
                    src="https://katapopuler.com/wp-content/uploads/2020/11/dummy.png"
                    width="100"
                    height="100"
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                    alt=""
                  />

                  <RatingComponent readOnly={true} />

                  <div className="small-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium amet nisi maxime ducimus ab
                    molestias provident magnam sunt illum, numquam fugiat odio aperiam cupiditate exercitationem
                    obcaecati esse beatae saepe reprehenderit!
                  </div>

                  <img
                    src="https://katapopuler.com/wp-content/uploads/2020/11/dummy.png"
                    width="120"
                    height="120"
                    style={{ objectFit: 'cover' }}
                    alt=""
                  />
                  <div className="small-text">25/04/2023</div>
                </Paper>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>
    </>
  );
}

function FAQSection() {
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
                {[1, 2, 3, 4, 5, 6, 7]
                  .filter((filterItem, filterIndex) => {
                    let lengthArr = 7;
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
                          <Typography>Accordion {FAQitem}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                            amet blandit leo lobortis eget.
                          </Typography>
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

function ContactAndLocationSection() {
  let mapsEmbed =
    '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15825.291613002777!2d109.2421518!3d-7.429474!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655e8428463883%3A0x8def4a2d764422a!2sLULU%20N&#39;BE%20LUXURY%20LAUNDRY%20PURWOKERTO!5e0!3m2!1sid!2sid!4v1682649257806!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';

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
                    <span>0851 0290 9999</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <FaxIcon sx={{ color: '#1F305C' }} />
                    <h6>(No Telepon)</h6>
                    <span>0851 0290 9999</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <EmailIcon sx={{ color: '#1F305C' }} />
                    <h6>(No Telepon)</h6>
                    <span>0851 0290 9999</span>
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
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, maiores, commodi quasi distinctio
                    ducimus natus voluptate ipsa soluta, porro maxime accusantium sint fugiat! Sapiente nostrum minus ut
                    harum placeat totam.
                  </span>
                </span>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </span>
    </>
  );
}

function FooterSection() {
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
            <div>Beranda</div>
            <div>Galeri</div>
            <div>Pemesanan Laundry</div>
            <div>Tentang Kami</div>
          </Grid>
          <Grid item xs={12} md="auto">
            <Grid container spacing={4}>
              <Grid item xs className="gap-10" style={{ flexDirection: 'column' }}>
                <h4>Kontak</h4>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <CallIcon />
                  <h6>(No Telepon)</h6>
                  <span>0851 0290 9999</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <FaxIcon />
                  <h6>(No Telepon)</h6>
                  <span>0851 0290 9999</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <EmailIcon />
                  <h6>(No Telepon)</h6>
                  <span>0851 0290 9999</span>
                </div>
              </Grid>
              <Grid item xs={12} sm="auto" className="gap-10" style={{ flexDirection: 'column' }}>
                <h4>Sosial Media</h4>
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
  const [event, setEvent] = React.useState([]);
  const [reason, setReason] = React.useState([]);
  const [position, setPosition] = React.useState(window.pageYOffset);

  React.useEffect(() => {
    document.title = 'Beranda | Lulu n Be Luxury Laundry';
    handleGetLaundryType();
    handleGetServiceType();
    handleGetEvent();
    handleGetReason();
  }, []);

  const handleGetLaundryType = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/jenislaundry',
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
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/jenislayanan',
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
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/acara',
      });
      console.log('Response GET Data Event');
      console.log(res);
      setEvent(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetReason = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/alasan',
      });
      console.log('Response GET Data Reason');
      console.log(res);
      setReason(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px 0px' }}>
      <HeroSection />

      <LaundryTypeSection listLaundryType={laundryType} />

      <ServiceTypeSection listServiceType={serviceType} />

      <OperatingHoursAndHowToOrderSection />

      <EventSection listEvent={event} />

      <ReasonSection listReason={reason} />

      <TestimonySection />
      <FAQSection />

      <span>
        <ContactAndLocationSection />
        <FooterSection />
      </span>

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
