import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Chip, Grid, Paper, TextField, useTheme } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

function Gallery() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formGallery, setFormGallery] = useState({
    title: '',
    description: '',
    file: {},
  });

  React.useEffect(() => {
    document.title = 'Edit Galeri';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Informasi Bisnis"
          currentPage={{
            title: 'Geleri',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Geleri</h2>
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={1.4} lg={1} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Judul</span>
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
                <TextField
                  label="Judul"
                  value={formGallery.title}
                  onChange={(e) => {
                    setFormGallery({ ...formGallery, title: e.target.value });
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={1.4} lg={1} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Deskripsi</span>
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
                <TextField
                  label="Deskripsi"
                  multiline
                  maxRows={4}
                  value={formGallery.description}
                  onChange={(e) => {
                    setFormGallery({ ...formGallery, description: e.target.value });
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={1.4} lg={1}>
                <span>Foto/Video</span>
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
                <Grid container spacing={2}>
                  <Grid item xs="auto">
                    <Button
                      variant="contained"
                      size="small"
                      component="label"
                      startIcon={<InsertPhotoIcon />}
                      sx={{ height: 'fit-content' }}
                    >
                      Pilih Foto
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          console.log(e.target.files);
                          setFormGallery({
                            ...formGallery,
                            file: {
                              img: e.target.files[0],
                              fileName: !e.target.files[0] ? null : e.target.files[0].name,
                            },
                          });
                          // console.log(image);
                        }}
                        hidden
                      />
                    </Button>
                  </Grid>
                  <Grid item xs="auto">
                    {formGallery.file.img ? (
                      <img
                        id="output"
                        src={formGallery.file.img ? URL.createObjectURL(formGallery.file.img) : ''}
                        width={70}
                        alt="Preview"
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs>
                    {formGallery.file.fileName ? (
                      <Chip
                        label={formGallery.file.fileName}
                        onDelete={() => setFormGallery({ ...formGallery, file: {} })}
                        sx={{ maxWidth: '250px' }}
                      />
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Button variant="contained" size="large" style={{ width: '100%', fontWeight: 'bold' }}>
              Tambah
            </Button>

            {formGallery.title}
            <br />
            {formGallery.description}
            <br />
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default Gallery;
