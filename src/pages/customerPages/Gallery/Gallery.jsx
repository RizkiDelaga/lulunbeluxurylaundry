import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BigPlayButton, ControlBar, LoadingSpinner, Player } from 'video-react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

function Gallery() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [dataGallery, setDatagallery] = React.useState([]);
  const [openDescription, setOpenDescription] = React.useState(false);

  const [openDialog, setOpenDialog] = React.useState({
    isOpen: false,
    data: null,
  });

  const handleClickOpen = (data) => {
    setOpenDialog({ ...openDialog, isOpen: true, data: data });
  };

  const handleClose = () => {
    setOpenDialog({ ...openDialog, isOpen: false });
  };

  React.useEffect(() => {
    document.title = 'Validasi Akun';
    getApiHandler();
  }, []);

  const getApiHandler = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/galeri',
      });
      console.log('Response GET');
      console.log(res);
      setDatagallery(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setDatagallery([]);
      }
      console.log(error);
    }
  };

  return (
    <>
      <Container sx={{ mt: '50px', mb: '25px' }}>
        <h3 style={{ textAlign: 'center' }}>Galeri</h3>
        <Grid container spacing={0.25}>
          {dataGallery.map((item, index) => {
            if (item.status === 'video') {
              return (
                <Grid item xs={6} sm={4} md={3} lg={3}>
                  <Box onClick={() => handleClickOpen(item)} sx={{ cursor: 'pointer' }}>
                    <Player playsInline fluid={false} width="100%" height={180} src={item.media}>
                      <LoadingSpinner />
                      <BigPlayButton position="center" />
                    </Player>
                  </Box>
                </Grid>
              );
            } else {
              return (
                <Grid item xs={6} sm={4} md={3} lg={3}>
                  <Box onClick={() => handleClickOpen(item)} sx={{ cursor: 'pointer' }}>
                    <img src={item.media} width={'100%'} height={180} style={{ objectFit: 'cover' }} alt="" />
                  </Box>
                </Grid>
              );
            }
          })}
        </Grid>

        <Dialog fullWidth open={openDialog.isOpen} onClose={handleClose} aria-describedby="alert-dialog-description">
          <h4
            style={{ padding: '0px 24px', paddingTop: '16px', display: 'flex', alignItems: 'center' }}
            onClick={() => setOpenDescription(!openDescription)}
          >
            {openDialog.data ? openDialog.data.judul : null} {openDescription ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </h4>

          <Box sx={{ px: 3, display: openDescription ? 'block' : 'none' }}>
            {openDialog.data ? openDialog.data.deskripsi : null}
          </Box>

          <DialogContent sx={{ display: 'flex', justifyContent: 'center', pb: 0 }}>
            {openDialog.data ? (
              openDialog.data.status === 'video' ? (
                <Player playsInline fluid={false} aspectRatio="16:9" height={280} src={openDialog.data.media}>
                  <LoadingSpinner />
                  <BigPlayButton position="center" />
                </Player>
              ) : (
                <img
                  src={openDialog.data.media}
                  height={'100%'}
                  style={{ objectFit: 'cover', maxHeight: '500px' }}
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
      </Container>
    </>
  );
}

export default Gallery;
