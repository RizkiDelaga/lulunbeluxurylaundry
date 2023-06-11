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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BigPlayButton, ControlBar, LoadingSpinner, Player } from 'video-react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function Gallery() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [dataGallery, setDatagallery] = React.useState([]);
  const [pageConfig, setPageConfig] = React.useState({
    currentPage: 1,
    metadata: null,
  });

  const [openDescription, setOpenDescription] = React.useState(false);
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

  React.useEffect(() => {
    document.title = 'Galeri';
    handleGetGallery();
  }, []);

  const handleGetGallery = async (changePage, maxDataPerPage) => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_KEY}/galeri?page=${
          !changePage
            ? pageConfig.currentPage
            : changePage === 'prev'
            ? pageConfig.currentPage - 1
            : changePage === 'next'
            ? pageConfig.currentPage + 1
            : changePage
        }`,
      });

      setPageConfig({
        ...pageConfig,
        metadata: res.data.metadata,
        currentPage: !changePage
          ? pageConfig.currentPage
          : changePage === 'prev'
          ? pageConfig.currentPage - 1
          : changePage === 'next'
          ? pageConfig.currentPage + 1
          : changePage,
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

  const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Container sx={{ mt: '50px', mb: '25px' }}>
        <h3 style={{ textAlign: 'center' }}>Galeri</h3>
        <Grid container spacing={1}>
          {dataGallery.map((item, index) => {
            if (item.status === 'video') {
              return (
                <Grid item xs={4} sm={4} md={3} lg={2}>
                  <Box
                    onClick={() => handleClickOpen(item)}
                    sx={{ cursor: 'pointer', position: 'relative', backgroundColor: '#ffffff' }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        zIndex: 1,
                      }}
                    >
                      <div style={{ width: '100%' }}>
                        <PlayCircleOutlineIcon fontSize="large" sx={{ width: '100%', color: 'white' }} />
                      </div>
                    </div>

                    <Player playsInline fluid={false} width="100%" height={isMobileSize ? 180 : 240} src={item.media}>
                      <LoadingSpinner />
                      <BigPlayButton position="center" />
                    </Player>
                  </Box>
                </Grid>
              );
            } else {
              return (
                <Grid item xs={4} sm={4} md={3} lg={2}>
                  <Box onClick={() => handleClickOpen(item)} sx={{ cursor: 'pointer', backgroundColor: '#ffffff' }}>
                    <div
                      style={{
                        width: '100%',
                        height: isMobileSize ? 180 : 240,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      <img src={item.media} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                    </div>
                  </Box>
                </Grid>
              );
            }
          })}
        </Grid>

        {/* Table Pagination */}
        {/* pageConfig.metadata.totalPage */}
        {/* setPageConfig({ ...pageConfig, currentPage: index + 1 }) */}
        {!pageConfig.metadata ? null : (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 25,
            }}
          >
            <Button
              variant="outlined"
              size="small"
              disabled={pageConfig.currentPage === 1}
              onClick={() => handleGetGallery('prev')}
            >
              <ChevronLeftIcon />
            </Button>
            {Array.from(Array(13)).map((item, index) => {
              return (
                <Button
                  variant={pageConfig.currentPage === index + 1 ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => handleGetGallery(index + 1)}
                >
                  {index + 1}
                </Button>
              );
            })}
            <Button
              variant="outlined"
              size="small"
              disabled={pageConfig.currentPage === pageConfig.metadata.totalPage}
              onClick={() => handleGetGallery('next')}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        )}

        <Dialog
          fullWidth
          open={openPreviewGallery.isOpen}
          onClose={handleClose}
          aria-describedby="alert-dialog-description"
        >
          <h4
            style={{ padding: '0px 24px', paddingTop: '16px', display: 'flex', alignItems: 'center' }}
            onClick={() => setOpenDescription(!openDescription)}
          >
            {openPreviewGallery.data ? openPreviewGallery.data.judul : null}{' '}
            {openDescription ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </h4>

          <Box sx={{ px: 3, display: openDescription ? 'block' : 'none' }}>
            {openPreviewGallery.data ? openPreviewGallery.data.deskripsi : null}
          </Box>

          <DialogContent sx={{ display: 'flex', justifyContent: 'center', pb: 0 }}>
            {openPreviewGallery.data ? (
              openPreviewGallery.data.status === 'video' ? (
                <Player playsInline fluid={false} aspectRatio="16:9" height={280} src={openPreviewGallery.data.media}>
                  <LoadingSpinner />
                  <BigPlayButton position="center" />
                </Player>
              ) : (
                <img
                  src={openPreviewGallery.data.media}
                  width={'100%'}
                  // height={'100%'}
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
      </Container>
    </>
  );
}

export default Gallery;
