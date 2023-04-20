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
import style from './HomePage.module.css';
import { display } from '@mui/system';

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

function HomePage() {
  const theme = useTheme();
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = 'Beranda | Lulu n Be Luxury Laundry';
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '50px 0px' }}>
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
                      width={120}
                      height={120}
                      style={{ borderRadius: '16px', objectFit: 'cover' }}
                      alt=""
                    />
                    <span>
                      {/* {index === 2
                        ? 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum amet ut quis laborum saepe iure magnam dignissimos aliquid qui laudantium porro nobis autem tenetur iusto.'
                        : null} */}
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum amet ut quis laborum saepe iure
                      magnam dignissimos aliquid qui laudantium porro nobis autem tenetur iusto, dicta atque officia
                      ipsam illo.
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
      <Container>
        <h4 className={`${style['section-title']}`}>Jenis Layanan Kami</h4>
        <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item>
            <Grid item>
              <Paper
                elevation={8}
                className="gap-16"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 2,
                  borderRadius: '16px',
                }}
              >
                <Grid container spacing={1}>
                  <Grid item>
                    <h5>Lorem, ipsum dolor.</h5>
                  </Grid>
                  <Grid item>
                    <h5>Lorem, ipsum dolor.</h5>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <OperatingHoursAndHowToOrderSection />

      <button onClick={() => navigate('/dashboard')}>Navbar & Sidebar Admin</button>
    </div>
  );
}

export default HomePage;
