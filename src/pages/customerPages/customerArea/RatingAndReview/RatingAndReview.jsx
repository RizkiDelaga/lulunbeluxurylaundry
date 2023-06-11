import { Box, Button, Chip, Container, Grid, Paper, TextField, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import RatingComponent from '../../../../components/Ratings/RatingComponent';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';

function RatingAndReview() {
  const theme = useTheme();
  const navigate = useNavigate();
  let { id } = useParams();
  const [formRatingAndReview, setFormRatingAndReview] = useState({
    rating: null,
    review: '',
    photo: { img: null, fileName: '' },
  });

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
            title: `Rating & Review Pesanan #${id}`,
          }}
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
            <RatingComponent />
          </span>
          <span>
            <h6 style={{ textAlign: 'center' }}>Review</h6>

            <TextField
              label="Review"
              variant="filled"
              multiline
              maxRows={4}
              autoComplete="off"
              sx={{ width: '100%' }}
            />
          </span>

          {formRatingAndReview.photo.img ? (
            <img
              id="output"
              src={formRatingAndReview.photo.img ? URL.createObjectURL(formRatingAndReview.photo.img) : ''}
              height={120}
              alt="Preview"
              style={{ alignSelf: 'center' }}
            />
          ) : null}

          {formRatingAndReview.photo.fileName ? (
            <Chip
              label={formRatingAndReview.photo.fileName}
              onDelete={() => setFormRatingAndReview({ ...formRatingAndReview, photo: { img: null, fileName: '' } })}
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
                console.log(e.target.files);
                setFormRatingAndReview({
                  ...formRatingAndReview,
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
          <Button variant="contained" sx={{ width: '100%' }}>
            Kirim
          </Button>
        </Paper>
      </Box>
    </>
  );
}

export default RatingAndReview;
