import { Container, Grid, Paper } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AboutUs() {
  const navigate = useNavigate();

  const [openSidebar, setOpenSidebar] = React.useState(false);

  return (
    <>
      <Container sx={{ mt: '50px', mb: '25px' }}>
        <Paper
          elevation={3}
          sx={{ padding: 3, borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          <h3 style={{ textAlign: 'center' }}>Tentang Kami</h3>
          <Grid container spacing={4}>
            <Grid item xs>
              <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium expedita culpa voluptates, rem
                eligendi facere dolor nulla iure eius, pariatur doloremque quidem quae aliquam modi quam facilis ducimus
                ab maiores!
              </div>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src="https://katapopuler.com/wp-content/uploads/2020/11/dummy.png"
                width={'100%'}
                alt=""
                style={{ maxWidth: '400px' }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

export default AboutUs;
