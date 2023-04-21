import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SingleWave from '../../../assets/images/SingleWave.png';
import DoubleWave from '../../../assets/images/DoubleWave.png';
import SquareWave from '../../../assets/images/SquareWave.png';
import style from './HomePage.module.css';
import { display } from '@mui/system';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper';

function HeroSection() {
  return (
    <span>
      <Box sx={{ backgroundColor: '#FFFFFF', py: '100px' }}>
        <Container>
          <Grid container spacing={3}>
            <Grid item sm={6} md={5} lg={4}>
              <img
                src="https://loremflickr.com/cache/resized/65535_52104205072_e260b47a8e_c_640_480_nofilter.jpg"
                width="100%"
                alt=""
              />
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
      <img src={DoubleWave} width={'100%'} draggable="false" style={{ position: 'relative', top: '-5px' }} alt="" />
    </span>
  );
}

function LaundryTypeSection() {
  return (
    <Container>
      <h4 className={`${style['section-title']}`}>Pilihan Laundry</h4>
      <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        {[1, 2, 3, 4].map((item, index) => {
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
                  <h5>Lorem, ipsum dolor.</h5>
                  <img
                    src="https://loremflickr.com/cache/resized/65535_52104205072_e260b47a8e_c_640_480_nofilter.jpg"
                    width={100}
                    height={100}
                    style={{ borderRadius: '16px', objectFit: 'cover', backgroundColor: '#EEEEEE' }}
                    alt=""
                  />
                  <span>
                    {/* {index === 2
                    ? 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum amet ut quis laborum saepe iure magnam dignissimos aliquid qui laudantium porro nobis autem tenetur iusto.'
                    : null} */}
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum amet ut quis laborum saepe iure magnam
                    dignissimos aliquid qui laudantium porro nobis autem tenetur iusto, dicta atque officia ipsam illo.
                  </span>
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

function ServiceTypeSection() {
  return (
    <Container>
      <h4 className={`${style['section-title']}`}>Jenis Layanan Kami</h4>
      <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        {[1, 2, 3, 4].map((item, index) => {
          return (
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Paper elevation={8} className={`${style['shadow-card']}`}>
                <Grid container sx={{ p: 2, height: '100%', display: 'flex', gap: '20px 0px' }}>
                  <Grid item xs="auto" sm="auto" md="auto" lg="auto" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      src="https://loremflickr.com/cache/resized/65535_52104205072_e260b47a8e_c_640_480_nofilter.jpg"
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
                      <h5>Express</h5>
                      <h6>2 Jam Penyelesaian</h6>
                      <span>
                        {index === 2
                          ? 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum amet ut quis laborum saepe iure magnam dignissimos aliquid qui laudantium porro nobis autem tenetur iusto.'
                          : null}
                        Waktu pencucian dilakukan dengan singkat mulai dari 2-5 jam untuk kategori barang seperti
                        pakaian, bedcover, sepatu, tas, sajadah, jas, dan boneka.
                      </span>
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
      img: 'https://loremflickr.com/cache/resized/65535_52104205072_e260b47a8e_c_640_480_nofilter.jpg',
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
      <img src={SingleWave} width={'100%'} draggable="false" style={{ position: 'relative', bottom: '-5px' }} alt="" />
      <Box sx={{ backgroundColor: '#ffffff', py: 2 }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item sm={6} md={5}>
              <h4 className={`${style['section-title']}`}>Jam Operasional</h4>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo beatae sunt mollitia tempore, eligendi
              praesentium repellendus porro aperiam sapiente libero, asperiores assumenda quod vero dignissimos esse
              omnis. Error, repellendus eligendi.
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
              <h4 className={`${style['section-title']}`}>Cara Pemesanan</h4>
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
        style={{ transform: 'rotate(-180deg)', position: 'relative', top: '-5px' }}
        alt=""
      />
    </div>
  );
}

function EventSection() {
  return (
    <>
      <Container>
        <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginTop: '26px' }}>Event</div>

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
                <Box className={`${style['shadow-card']}`}>
                  <img
                    src="https://loremflickr.com/cache/resized/65535_52104205072_e260b47a8e_c_640_480_nofilter.jpg"
                    width="100%"
                    alt=""
                  />
                </Box>
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
        <h4 className={`${style['section-title']}`}>Testimoni Pelanggan</h4>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam!
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam!
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

function ContactAndLocationSection() {
  return (
    <>
      <span>
        <img
          src={SquareWave}
          width={'100%'}
          draggable="false"
          style={{ position: 'relative', bottom: '-5px' }}
          alt=""
        />
        <Box sx={{ backgroundColor: '#FFFFFF', py: '20px' }}>
          <Container>
            <h4 className={`${style['section-title']}`}>Kontak & Lokasi</h4>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={5} lg={5}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus possimus velit inventore repudiandae
                obcaecati corrupti officiis laboriosam saepe cum, quod cupiditate vel, soluta doloribus rerum aperiam
                illo? Corrupti, debitis minus.
              </Grid>
              <Grid item xs={12} sm={6} md={7} lg={7}>
                <h3>Lorem ipsum dolor sit.</h3>
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
        <Grid container>
          <Grid item xs>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam.
          </Grid>
          <Grid item xs={12} md="auto">
            <Grid container>
              <Grid item xs>
                Lorem ipsum dolor sit amet.
              </Grid>
              <Grid item xs={12} sm="auto">
                Lorem ipsum dolor sit amet.
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <span>Copyright ©2023 Lulu 'N Be Luxury Laundry Purwokerto</span>
      </Box>
    </>
  );
}

function HomePage() {
  const theme = useTheme();
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = 'Beranda | Lulu n Be Luxury Laundry';
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px 0px' }}>
      <HeroSection />

      <LaundryTypeSection />

      <ServiceTypeSection />

      <OperatingHoursAndHowToOrderSection />

      <EventSection />

      <TestimonySection />

      <span>
        <ContactAndLocationSection />
        <FooterSection />
      </span>

      <button onClick={() => navigate('/dashboard')}>Navbar & Sidebar Admin</button>
    </div>
  );
}

export default HomePage;
