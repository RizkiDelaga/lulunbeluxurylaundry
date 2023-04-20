import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

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

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
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
  );
}
