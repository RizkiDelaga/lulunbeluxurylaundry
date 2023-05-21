import { Container, Grid, Paper } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function DigitalReceipt() {
  const navigate = useNavigate();

  return (
    <>
      <Container sx={{ mt: '75px', mb: '50px', display: 'flex', justifyContent: 'center' }}>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '100%',
            maxWidth: '800px',
          }}
        >
          <h4 style={{ textAlign: 'center' }}>Lulu N’ Be Luxury Laundry</h4>
        </Paper>
      </Container>
    </>
  );
}

export default DigitalReceipt;
