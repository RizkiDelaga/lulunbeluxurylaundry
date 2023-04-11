import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Chip, Grid, Paper, TextField, useTheme } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

function ReasonsWhyChooseUs() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formReasonsWhyChooseUs, setFormReasonsWhyChooseUs] = useState({
    reasonTitle: '',
    description: '',
    photo: {},
  });

  React.useEffect(() => {
    document.title = 'Edit Alasan Mengapa Memilih Kita';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Informasi Bisnis"
          currentPage={{
            title: 'Alasan Mengapa Memilih Kami',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Alasan Mengapa Memilih Kami</h2>
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={1.8} lg={1.3} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Judul Alasan</span>
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
                  required
                  label="Judul Alasan"
                  multiline
                  maxRows={4}
                  value={formReasonsWhyChooseUs.reasonTitle}
                  onChange={(e) => {
                    setFormReasonsWhyChooseUs({ ...formReasonsWhyChooseUs, reasonTitle: e.target.value });
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={1.8} lg={1.3} sx={{ display: 'flex', alignItems: 'center' }}>
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
                  required
                  label="Deskripsi"
                  multiline
                  maxRows={4}
                  value={formReasonsWhyChooseUs.description}
                  onChange={(e) => {
                    setFormReasonsWhyChooseUs({ ...formReasonsWhyChooseUs, description: e.target.value });
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={1.8} lg={1.3}>
                <span>Foto</span>
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
                          setFormReasonsWhyChooseUs({
                            ...formReasonsWhyChooseUs,
                            photo: {
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
                    {formReasonsWhyChooseUs.photo.img ? (
                      <img
                        id="output"
                        src={
                          formReasonsWhyChooseUs.photo.img ? URL.createObjectURL(formReasonsWhyChooseUs.photo.img) : ''
                        }
                        width={70}
                        alt="Preview"
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs>
                    {formReasonsWhyChooseUs.photo.fileName ? (
                      <Chip
                        label={formReasonsWhyChooseUs.photo.fileName}
                        onDelete={() => setFormReasonsWhyChooseUs({ ...formReasonsWhyChooseUs, photo: {} })}
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

            {formReasonsWhyChooseUs.reasonTitle}
            <br />
            {formReasonsWhyChooseUs.description}
            <br />
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default ReasonsWhyChooseUs;
