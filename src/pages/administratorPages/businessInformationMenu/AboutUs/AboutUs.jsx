import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Grid, Paper, TextField, useTheme } from '@mui/material';

function AboutUs() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formAboutUs, setFormAboutUs] = useState({
    explanationParagraph: '',
  });

  React.useEffect(() => {
    document.title = 'Edit Tentang Kami';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Informasi Bisnis"
          currentPage={{
            title: 'Tentang Kami',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Tentang Kami</h2>
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.6} lg={1.9} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Paragraf Penjelasan</span>
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
                <TextField required label="Nama Administator" sx={{ width: '100%' }} />
              </Grid>
            </Grid>

            <Button variant="contained" size="large" style={{ width: '100%', fontWeight: 'bold' }}>
              Tambah
            </Button>
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default AboutUs;
