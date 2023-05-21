import { Container, Paper } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Gallery() {
  const navigate = useNavigate();

  return (
    <>
      <Container sx={{ mt: '75px', mb: '50px' }}>
        <h3 style={{ textAlign: 'center' }}>Galeri</h3>
      </Container>
    </>
  );
}

export default Gallery;
