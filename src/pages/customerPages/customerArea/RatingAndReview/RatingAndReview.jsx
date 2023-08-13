import { Box, Button, Chip, Container, Grid, Paper, TextField, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import RatingComponent from '../../../../components/Ratings/RatingComponent';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import axios from 'axios';
import LoadDecisions from '../../../../components/LoadDecisions/LoadDecisions';

function RatingAndReview() {
  const theme = useTheme();
  const navigate = useNavigate();
  let { idPesanan, noPesanan } = useParams();
  const [rating, setRating] = useState();
  const [review, setReview] = useState('');
  const [photo, setPhoto] = useState({ img: null, fileName: null });
  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Rating & Review Pesanan';
  }, []);

  const handleCreateRatingReview = async () => {
    const formData = new FormData();
    formData.append('pemesananId', idPesanan);
    formData.append('rating', rating);
    formData.append('review', review || '');
    formData.append('gambar', photo.img);

    setOpenLoadDecision({ ...openLoadDecision, isLoad: true });

    try {
      const res = await axios({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/review`,
        data: formData,
      });

      if (res.status === 201) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Rating & Review Pesanan Berhasil!',
          statusType: 'success',
        });
      }
    } catch (error) {
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '25px',
          my: '25px',
          mx: '75px',
          [theme.breakpoints.down('md')]: {
            mx: '8px',
          },
        }}
      >
        <PageStructureAndDirectButton
          defaultMenu="Area Pelanggan"
          currentPage={{
            title: `Rating & Review Pesanan #${noPesanan}`,
          }}
        />
        <LoadDecisions
          setOpenLoad={setOpenLoadDecision}
          openLoad={openLoadDecision}
          redirect={`/AreaPelanggan/${noPesanan}`}
        />

        <Paper
          elevation={3}
          sx={{
            padding: 3,
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '600px',
            width: '100%',
          }}
        >
          <h4 style={{ textAlign: 'center' }}>Rating & Review</h4>
          <span style={{ alignSelf: 'center' }}>
            <h6 style={{ textAlign: 'center' }}>Rating</h6>
            <RatingComponent setRating={setRating} />
          </span>
          <span>
            <h6 style={{ textAlign: 'center' }}>Review</h6>

            <TextField
              label="Review"
              variant="filled"
              multiline
              maxRows={4}
              autoComplete="off"
              onChange={(e) => {
                setReview(e.target.value);
              }}
              sx={{ width: '100%' }}
            />
          </span>

          {photo.img ? (
            <img
              id="output"
              src={photo.img ? URL.createObjectURL(photo.img) : ''}
              height={120}
              alt="Preview"
              style={{ alignSelf: 'center' }}
            />
          ) : null}

          {photo.fileName ? (
            <Chip
              label={photo.fileName}
              onDelete={() => setPhoto({ img: null, fileName: null })}
              sx={{ maxWidth: '250px', width: 'fit-content', alignSelf: 'center' }}
            />
          ) : null}

          <Button
            variant="contained"
            size="small"
            component="label"
            startIcon={<InsertPhotoIcon />}
            sx={{ height: 'fit-content', width: 'fit-content', alignSelf: 'center' }}
          >
            Pilih Foto
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setPhoto({
                  img: e.target.files[0],
                  fileName: !e.target.files[0] ? null : e.target.files[0].name,
                });
              }}
              hidden
            />
          </Button>
          <Button variant="contained" onClick={() => handleCreateRatingReview()} sx={{ width: '100%' }}>
            Kirim
          </Button>
        </Paper>
      </Box>
    </>
  );
}

export default RatingAndReview;
