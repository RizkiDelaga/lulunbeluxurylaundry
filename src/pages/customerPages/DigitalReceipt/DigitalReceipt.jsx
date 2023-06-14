import { Box, Button, Container, Grid, Paper, useTheme } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getGeneralInformation } from '../../../redux/actions/getBusinessInformationAction';
import RatingComponent from '../../../components/Ratings/RatingComponent';

function DigitalReceipt() {
  const theme = useTheme();
  const navigate = useNavigate();
  let { noPesanan } = useParams();
  const [detailOrder, setDetailOrder] = useState();
  const [ratingReview, setRatingReview] = useState();

  const dispatch = useDispatch();
  const { isLoading: loadingGetGeneralInformation, data: dataGetGeneralInformation } = useSelector(
    (state) => state.getGeneralInformation
  );

  React.useEffect(() => {
    document.title = 'Detail Pesanan';
    dispatchGetGeneralInformation();
    handleGetDetailOrder();
  }, []);

  const dispatchGetGeneralInformation = async () => {
    return await dispatch(getGeneralInformation());
  };

  const handleGetDetailOrder = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/pemesanan/user/nomor/${noPesanan}`,
      });

      console.log('Response GET Data Finance');
      console.log(res);
      setDetailOrder(res.data.data);
      handleGetRatingReview(res.data.data.id);
    } catch (error) {
      if (error.response.status === 404) {
        setDetailOrder();
      }
      console.log(error);
    }
  };

  const handleGetRatingReview = async (id) => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/review/pemesanan/${id}`,
      });

      console.log('Response GET Data Finance');
      console.log(res);
      setRatingReview(res.data.data[0]);
    } catch (error) {
      if (error.response.status === 404) {
        setRatingReview();
      }
      console.log(error);
    }
  };

  return (
    <>
      <Container sx={{ mt: '50px', mb: '25px', display: 'flex', justifyContent: 'center' }}>
        {loadingGetGeneralInformation || !detailOrder ? null : (
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              width: '100%',
              maxWidth: '800px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
              <img src={dataGetGeneralInformation.logo} width={100} alt="Logo" />
              <h4 style={{ textAlign: 'center' }}>Lulu N’ Be Luxury Laundry</h4>
              <span style={{ textAlign: 'center', maxWidth: '450px' }}>{dataGetGeneralInformation.lokasi}</span>
              <span style={{ textAlign: 'center' }}>
                <strong>Nomer Pesanan:</strong> #{noPesanan}
              </span>
            </div>

            {/*  */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'space-between',
                gap: '16px',
              }}
            >
              <h5>Informasi Pelanggan</h5>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h6>Nama Pelanggan</h6>
                <span style={{ textAlign: 'end' }}>{detailOrder.User.nama}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                <div>
                  <h6>Alamat Penjemputan</h6>
                  <div style={{ marginTop: '5px' }}>{detailOrder.alamatJemput}</div>
                </div>
                <div>
                  <h6>Alamat Pengantaran</h6>
                  <div style={{ marginTop: '5px' }}>{detailOrder.alamatAntar}</div>
                </div>
              </div>
            </div>

            {/*  */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'space-between',
                gap: '16px',
              }}
            >
              <h5>Informasi Daftar Barang</h5>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>Tabel</div>
            </div>

            {/*  */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'space-between',
                gap: '16px',
              }}
            >
              <h5>Informasi Pesanan</h5>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h6>Tanggal Pemesanan</h6>
                <span style={{ textAlign: 'end' }}>{`${detailOrder.tglMulai.slice(8, 10)}/${detailOrder.tglMulai.slice(
                  5,
                  7
                )}/${detailOrder.tglMulai.slice(0, 4)} ${detailOrder.tglMulai.slice(11, 16)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h6>Tenggat Waktu</h6>
                <span style={{ textAlign: 'end' }}>{`${detailOrder.tenggatWaktu.slice(
                  8,
                  10
                )}/${detailOrder.tenggatWaktu.slice(5, 7)}/${detailOrder.tenggatWaktu.slice(
                  0,
                  4
                )} ${detailOrder.tenggatWaktu.slice(11, 16)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h6>Total Pembayaran</h6>
                <span style={{ textAlign: 'end' }}>
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                    detailOrder.totalHarga
                  )}{' '}
                  ({detailOrder.statusPembayaran})
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h6>Metode Pembayaran</h6>
                <span style={{ textAlign: 'end' }}>{detailOrder.mPembayaran}</span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#eeeeee',
                width: '100%',
                maxWidth: '400px',
                padding: '8px 16px',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                <h6>Status Pesanan</h6>
                <div style={{ backgroundColor: '#ffffff', padding: '4px 24px', borderRadius: '8px' }}>
                  {detailOrder.status === 'Perlu Disetujui'
                    ? 'Menunggu Persetujuan'
                    : detailOrder.status === 'Perlu Dijemput'
                    ? 'Pesanan Akan Segera Di Jemput'
                    : detailOrder.status === 'Perlu Dikerjakan'
                    ? 'Pesanan Sedang Di Kerjakan'
                    : detailOrder.status === 'Perlu Diantar'
                    ? 'Pesanan Akan Segera Di Antar'
                    : detailOrder.status === 'Selesai'
                    ? 'Pesanan Selesai'
                    : detailOrder.status === 'Dibatalkan'
                    ? 'Pesanan Di Batalkan'
                    : detailOrder.status === 'Ditolak'
                    ? 'Pesanan Di Tolak'
                    : null}
                </div>
              </div>
              <div style={{ fontSize: '12px', marginTop: '5px' }}>
                Status diubah pada{' '}
                {`${detailOrder.updatedAt.slice(8, 10)}/${detailOrder.updatedAt.slice(
                  5,
                  7
                )}/${detailOrder.updatedAt.slice(0, 4)} ${detailOrder.updatedAt.slice(11, 16)}`}
              </div>
            </div>

            {!ratingReview ? null : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  maxWidth: '800px',
                  bgcolor: '#eeeeee',
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <h5 style={{ textAlign: 'center' }}>Rating & Review</h5>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm="auto" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      src={ratingReview.gambar}
                      style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: 4 }}
                      alt=""
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      [theme.breakpoints.down('sm')]: {
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                      },
                    }}
                  >
                    <RatingComponent readOnly={true} ratingValue={ratingReview.rating} />
                    {ratingReview.review}
                  </Grid>
                </Grid>
              </Box>
            )}

            {!detailOrder ? null : (
              <>
                {ratingReview ? null : (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      if (localStorage.getItem('access_token')) {
                        navigate(`/AreaPelanggan/RatingDanReview/${detailOrder.id}/${noPesanan}`);
                      } else {
                        navigate('/Login');
                      }
                    }}
                    disabled={detailOrder.status !== 'Selesai'}
                    style={{ fontWeight: 'bold' }}
                  >
                    Rating & Review
                  </Button>
                )}
              </>
            )}
          </Paper>
        )}
      </Container>
    </>
  );
}

export default DigitalReceipt;
