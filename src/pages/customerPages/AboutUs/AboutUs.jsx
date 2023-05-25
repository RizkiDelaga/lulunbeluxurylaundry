import { Container, Grid, Paper } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AboutUs() {
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const [aboutUs, setAboutUs] = React.useState([]);

  React.useEffect(() => {
    document.title = 'Tentang Kami';
    handleGetAboutUs();
  }, []);

  const handleGetAboutUs = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/about',
      });
      console.log('Response GET Data About Us');
      console.log(res);
      setAboutUs(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

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
              {aboutUs.map((item, index) => {
                return <div>{item.deskripsi}</div>;
              })}
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
