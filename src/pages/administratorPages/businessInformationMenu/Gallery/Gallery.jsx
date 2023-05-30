import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useTheme,
} from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditOffIcon from '@mui/icons-material/EditOff';
import LoadDecisions from '../../../../components/LoadDecisions/LoadDecisions';
import axios from 'axios';
import { BigPlayButton, LoadingSpinner, Player } from 'video-react';

function Gallery() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [listGallery, setListGallery] = useState([]);
  const [formGallery, setFormGallery] = useState({
    id: null,
    title: '',
    description: '',
    file: { img: null, fileName: null },
  });
  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Edit Galeri';
    handleGetGallery();
  }, []);

  const [openPreviewGallery, setOpenPreviewGallery] = React.useState({
    isOpen: false,
    data: null,
  });

  const handleClickOpen = (data) => {
    setOpenPreviewGallery({ ...openPreviewGallery, isOpen: true, data: data });
  };

  const handleClose = () => {
    setOpenPreviewGallery({ ...openPreviewGallery, isOpen: false });
  };

  const handleGetGallery = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/galeri',
      });
      console.log('Response GET');
      console.log(res);
      setListGallery(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setListGallery([]);
      }
      console.log(error);
    }
  };

  const handleCreateGallery = async () => {
    const formData = new FormData();
    formData.append('judul', formGallery.title);
    formData.append('deskripsi', formGallery.description);
    formData.append('media', formGallery.file.img);

    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/galeri',
        data: formData,
        // {
        //   judul: data.title,
        //   deskripsi: data.description,
        //   media: data.file.fileName,
        // },
      });
      console.log('Response POST');
      console.log(res);
      if (res.status === 201) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Berhasil di Tambah!',
          statusType: 'success',
        });
      }
      handleGetGallery();
    } catch (error) {
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });

      console.log(error);
    }
  };

  const handleUpdateGallery = async () => {
    const formData = new FormData();
    formData.append('judul', formGallery.title);
    formData.append('deskripsi', formGallery.description);
    formData.append('media', formGallery.file.img);

    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/galeri/${formGallery.id}`,
        data: formData,
        // {
        //   judul: data.title,
        //   deskripsi: data.description,
        //   media: data.file.fileName,
        // },
      });
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Berhasil di Edit!',
          statusType: 'success',
        });
      }
      console.log('Response DELETE');
      console.log(res);
      handleGetGallery();
    } catch (error) {
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
      console.log(error);
    }
  };

  const deleteApiHandler = async (id) => {
    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/galeri/${id}`,
      });
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Berhasil di Hapus!',
          statusType: 'success',
        });
      }
      handleGetGallery();
      console.log(res);
    } catch (error) {
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Informasi Bisnis"
          currentPage={{
            title: 'Geleri',
          }}
        />

        <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} />

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
                  autoComplete="off"
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
                  autoComplete="off"
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
                      Pilih Foto/Video
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
                        onDelete={() => setFormGallery({ ...formGallery, file: { img: null, fileName: '' } })}
                        sx={{ maxWidth: '250px' }}
                      />
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              size="large"
              onClick={() => {
                if (formGallery.id) {
                  handleUpdateGallery();
                } else {
                  handleCreateGallery();
                }
                setFormGallery({
                  id: null,
                  title: '',
                  description: '',
                  file: { img: null, fileName: '' },
                });
              }}
              style={{ width: '100%', fontWeight: 'bold' }}
            >
              {formGallery.id ? 'Simpan' : 'Tambah'}
            </Button>

            <TableContainer sx={{ width: '100%', borderRadius: '4px', backgroundColor: '#eeeeee' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ width: 0, fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
                      No
                    </TableCell>
                    <TableCell style={{ width: 60, fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
                      Foto/Video
                    </TableCell>
                    <TableCell style={{ width: 'fit-content', fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
                      Judul
                    </TableCell>
                    <TableCell style={{ width: 'fit-content', fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
                      Deskripsi
                    </TableCell>
                    <TableCell style={{ width: 0, fontWeight: 'bold', backgroundColor: '#eeeeee' }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listGallery.map((item, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                        <TableCell align="center">
                          <span>{index + 1}</span>
                        </TableCell>
                        <TableCell>
                          {item.status === 'video' ? (
                            <Box onClick={() => handleClickOpen(item)} sx={{ cursor: 'pointer' }}>
                              <Player playsInline fluid={false} aspectRatio="16:9" width={120} src={item.media}>
                                <LoadingSpinner />
                                <BigPlayButton position="center" />
                              </Player>
                            </Box>
                          ) : (
                            <Box onClick={() => handleClickOpen(item)} sx={{ cursor: 'pointer' }}>
                              <img src={item.media} width={120} style={{ objectFit: 'contain' }} alt={item.media} />
                            </Box>
                          )}

                          <Dialog
                            fullWidth
                            open={openPreviewGallery.isOpen}
                            onClose={handleClose}
                            aria-describedby="alert-dialog-description"
                            sx={{ zIndex: 10000 }}
                          >
                            <DialogContent sx={{ display: 'flex', justifyContent: 'center', pb: 0 }}>
                              {openPreviewGallery.data ? (
                                openPreviewGallery.data.status === 'video' ? (
                                  <Player
                                    playsInline
                                    fluid={false}
                                    aspectRatio="16:9"
                                    height={280}
                                    src={openPreviewGallery.data.media}
                                  >
                                    <LoadingSpinner />
                                    <BigPlayButton position="center" />
                                  </Player>
                                ) : (
                                  <img
                                    src={openPreviewGallery.data.media}
                                    width={'100%'}
                                    style={{ objectFit: 'contain' }}
                                    alt=""
                                  />
                                )
                              ) : null}
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose} autoFocus>
                                Tutup
                              </Button>
                            </DialogActions>
                          </Dialog>
                          {/* <span>{item.media ? <img src={item.media} width={60} alt={item.media} /> : null}</span> */}
                        </TableCell>
                        <TableCell>
                          <span>{item.judul}</span>
                        </TableCell>
                        <TableCell>
                          <span>{item.deskripsi}</span>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: 'flex',
                              gap: '10px',
                              [theme.breakpoints.down('md')]: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                              },
                            }}
                          >
                            <Grid container>
                              <Grid item sm={12} md={6}></Grid>
                              <Grid item sm={12} md={6}></Grid>
                            </Grid>
                            <Button
                              variant="outlined"
                              className={`button-outlined-primary`}
                              onClick={() => {
                                if (formGallery.id && formGallery.id === item.id) {
                                  setFormGallery({
                                    id: null,
                                    title: '',
                                    description: '',
                                    file: { img: null, fileName: '' },
                                  });
                                } else {
                                  setFormGallery({
                                    id: item.id,
                                    title: item.judul,
                                    description: item.deskripsi,
                                    file: { img: null, fileName: item.media },
                                  });
                                }
                              }}
                            >
                              {formGallery.id && formGallery.id === item.id ? <EditOffIcon /> : <EditIcon />}
                            </Button>
                            <Button
                              variant="outlined"
                              className={`button-outlined-danger`}
                              onClick={() => {
                                deleteApiHandler(item.id);
                                if (item.id === formGallery.id) {
                                  setFormGallery({
                                    id: null,
                                    title: '',
                                    description: '',
                                    file: { img: null, fileName: '' },
                                  });
                                }
                              }}
                              sx={{ width: '100%' }}
                            >
                              <DeleteForeverIcon />
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

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
