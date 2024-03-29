import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Avatar, Box, Button, Grid, Menu, MenuItem, Paper, useTheme } from '@mui/material';
import AddressCard from '../../../../components/Card/AddressCard';
import axios from 'axios';
import RatingComponent from '../../../../components/Ratings/RatingComponent';
import LaundryItemTable from '../../../../components/Table/LaundryItemTable';
import DetailCustomerCard from '../../../../components/Card/DetailCustomerCard';
import { Link } from 'react-router-dom';
import { adjustTimePlus } from '../../../../utils/timeUtils';

function OrderDetails() {
  const theme = useTheme();
  const navigate = useNavigate();
  let { noPesanan } = useParams();
  const [detailOrder, setDetailOrder] = useState();
  const [ratingReview, setRatingReview] = useState();
  const [listLaundryItem, setListLaundryItem] = React.useState([]);

  React.useEffect(() => {
    document.title = 'Detail Pesanan';
    handleGetDetailOrder();
  }, []);

  const handleGetDetailOrder = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/pemesanan/user/nomor/${noPesanan}`,
      });

      setDetailOrder({
        ...res.data.data,
        alamatJemput: res.data.data.alamatJemput ? JSON.parse(res.data.data.alamatJemput) : null,
        alamatAntar: res.data.data.alamatAntar ? JSON.parse(res.data.data.alamatAntar) : null,
      });
      handleGetLaundryItem(res.data.data.id);
      handleGetRatingReview(res.data.data.id);
    } catch (error) {
      if (error.response.status === 404) {
        setDetailOrder();
      }
    }
  };

  // Handle API Get All Laundry Item
  const handleGetLaundryItem = async (id) => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/barang/user/${id}`,
      });

      setListLaundryItem(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setListLaundryItem([]);
      }
    }
  };

  const handleGetRatingReview = async (idPesanan) => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/review/pemesanan/${idPesanan}`,
      });

      setRatingReview(res.data.data[0]);
    } catch (error) {
      if (error.response.status === 404) {
        setRatingReview();
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, statusValue) => {
    try {
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/pemesanan/user/${orderId}`,
        data: {
          namaLayanan: detailOrder.namaLayanan,
          jenisLayanan: detailOrder.jenisLayanan,
          mPembayaran: detailOrder.mPembayaran,
          tglMulai: detailOrder.tglMulai,
          alamatJemput: detailOrder.alamatJemput ? JSON.stringify(detailOrder.alamatJemput) : null,
          alamatAntar: detailOrder.alamatAntar ? JSON.stringify(detailOrder.alamatAntar) : null,
          status: statusValue,
          diskon: detailOrder.diskon,
        },
      });

      handleGetDetailOrder();
    } catch (error) {}
  };

  // Menu - Order Status
  const [orderStatusAnchorEl, setOrderStatusAnchorEl] = React.useState(null);
  const openOrderStatus = Boolean(orderStatusAnchorEl);
  const handleCloseOrderStatus = () => {
    setOrderStatusAnchorEl(null);
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
            title: `Detail Pesanan #${noPesanan}`,
          }}
          directButton={
            detailOrder
              ? detailOrder.status !== 'Perlu Disetujui'
                ? false
                : [
                    {
                      color: 'primary',
                      iconType: 'edit',
                      value: 'Edit Pesanan',
                      link: detailOrder ? `/AreaPelanggan/FormulirPemesananLaundry/${detailOrder.id}` : false,
                    },
                  ]
              : false
          }
        />

        {/* Main Content */}
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <Paper
              elevation={3}
              sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '16px', mb: '25px' }}
            >
              <Box className="gap-16">
                <div style={{ width: '100%', textAlign: 'center' }}>
                  <h4 style={{ marginTop: '8px', marginBottom: '8px' }}>Informasi Pelanggan</h4>
                </div>

                {!detailOrder ? null : <DetailCustomerCard dataUser={detailOrder.User} />}

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    {!detailOrder ? null : (
                      <>
                        {!detailOrder.alamatJemput ? null : (
                          <>
                            <h6>Alamat Penjemputan</h6>
                            <Box sx={{ border: '1px solid #1F305C', borderRadius: '4px', mt: 1 }}>
                              <AddressCard designType={'card'} data={detailOrder.alamatJemput} />
                            </Box>
                          </>
                        )}
                      </>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {!detailOrder ? null : (
                      <>
                        {!detailOrder.alamatAntar ? null : (
                          <>
                            <h6>Alamat Pengantaran</h6>
                            <Box sx={{ border: '1px solid #1F305C', borderRadius: '4px', mt: 1 }}>
                              <AddressCard designType={'card'} data={detailOrder.alamatAntar} />
                            </Box>
                          </>
                        )}
                      </>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Paper>
            <Paper
              elevation={3}
              sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '16px', mb: '25px' }}
            >
              <Box className="gap-16">
                <div style={{ width: '100%', textAlign: 'center' }}>
                  <h4 style={{ marginTop: '8px', marginBottom: '8px' }}>Informasi Barang</h4>
                </div>
                {listLaundryItem.length !== 0 && detailOrder ? (
                  <LaundryItemTable
                    listLaundryItem={listLaundryItem}
                    discount={detailOrder.diskon}
                    readOnly={true}
                    detailPrice={true}
                  />
                ) : null}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Paper
              elevation={3}
              sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '16px', mb: '25px' }}
            >
              <Box className="gap-16">
                <div style={{ width: '100%', textAlign: 'center' }}>
                  <h4 style={{ marginTop: '8px', marginBottom: '8px' }}>Informasi Pesanan</h4>
                </div>

                {!detailOrder ? null : (
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'space-between',
                      gap: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h6>No Pesanan</h6>
                      <span style={{ textAlign: 'end' }}>#{detailOrder.nomorPesanan}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h6>Tanggal Pemesanan</h6>
                      <span style={{ textAlign: 'end' }}>
                        {` ${detailOrder.tglMulai.slice(8, 10)}/${detailOrder.tglMulai.slice(
                          5,
                          7
                        )}/${detailOrder.tglMulai.slice(0, 4)} ${(
                          '0' + adjustTimePlus(parseInt(detailOrder.tglMulai.slice(11, 13)))
                        ).slice(-2)}:${detailOrder.tglMulai.slice(14, 16)}`}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h6>Estimasi Selesai</h6>
                      <span style={{ textAlign: 'end' }}>
                        {` ${detailOrder.tenggatWaktu.slice(8, 10)}/${detailOrder.tenggatWaktu.slice(
                          5,
                          7
                        )}/${detailOrder.tenggatWaktu.slice(0, 4)} ${(
                          '0' + adjustTimePlus(parseInt(detailOrder.tenggatWaktu.slice(11, 13)))
                        ).slice(-2)}:${detailOrder.tenggatWaktu.slice(14, 16)}`}
                      </span>
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
                    <div
                      style={{
                        display: detailOrder.statusPembayaran === 'Belum Bayar' ? 'flex' : 'none',
                        justifyContent: 'center',
                        paddingTop: '4px',
                      }}
                    >
                      <span style={{ cursor: 'pointer', fontSize: '14px' }}>
                        <Link
                          to={`/MetodePembayaran`}
                          className="disable-link-style"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Cara Pembayaran?
                        </Link>
                      </span>
                    </div>
                  </div>
                )}

                {!detailOrder ? null : (
                  <div
                    style={{
                      backgroundColor: '#eeeeee',
                      width: '100%',
                      maxWidth: '400px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      margin: 'auto',
                    }}
                  >
                    <div
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}
                    >
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
                      {` ${detailOrder.statusUpdatedAt.slice(8, 10)}/${detailOrder.statusUpdatedAt.slice(
                        5,
                        7
                      )}/${detailOrder.statusUpdatedAt.slice(0, 4)} ${(
                        '0' + adjustTimePlus(parseInt(detailOrder.statusUpdatedAt.slice(11, 13)))
                      ).slice(-2)}:${detailOrder.statusUpdatedAt.slice(14, 16)}`}
                    </div>
                  </div>
                )}

                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate(`/StrukPemesanan/${noPesanan}`)}
                  sx={{ width: '100%', fontWeight: 'bold' }}
                >
                  Struk Digital
                </Button>

                {!detailOrder ? null : (
                  <>
                    <Button
                      disabled={detailOrder.status !== 'Perlu Disetujui' ? true : false}
                      variant="outlined"
                      size="large"
                      onClick={(event) => {
                        setOrderStatusAnchorEl(event.currentTarget);
                      }}
                      sx={{ width: '100%', fontWeight: 'bold' }}
                    >
                      Ubah Status Pesanan
                    </Button>
                    {/* Menu - Order Status */}
                    <Menu
                      anchorEl={orderStatusAnchorEl}
                      open={openOrderStatus}
                      onClose={handleCloseOrderStatus}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        sx: { width: orderStatusAnchorEl && orderStatusAnchorEl.offsetWidth },
                      }}
                    >
                      {['Batalkan Pesanan'].map((item) => (
                        <MenuItem
                          onClick={() => {
                            handleUpdateOrderStatus(detailOrder.id, 'Dibatalkan');

                            handleCloseOrderStatus();
                          }}
                          sx={{ bgcolor: detailOrder.status === item ? '#eeeeee' : null }}
                        >
                          {item}{' '}
                          {(item === 'Selesai' && detailOrder.statusPembayaran === 'Belum Bayar') ||
                          (item === 'Dibatalkan' && detailOrder.statusPembayaran === 'Sudah Bayar')
                            ? `(${detailOrder.statusPembayaran})`
                            : null}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                )}
              </Box>
            </Paper>
            <Paper
              elevation={3}
              sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '16px' }}
            >
              <Box className="gap-16">
                <div style={{ width: '100%', textAlign: 'center' }}>
                  <h4 style={{ marginTop: '8px', marginBottom: '8px' }}>Rating & Review</h4>
                </div>

                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <h6>Rating</h6>

                  <span>
                    {!ratingReview ? 'N/A' : <RatingComponent readOnly={true} ratingValue={ratingReview.rating} />}
                  </span>

                  <h6>Review</h6>

                  <span
                    style={{
                      width: '100%',
                      backgroundColor: '#eeeeee',
                      padding: '8px 24px',
                      borderRadius: '8px',
                      textAlign: 'center',
                    }}
                  >
                    {!ratingReview ? 'N/A' : ratingReview.review}
                  </span>

                  {!ratingReview ? null : !ratingReview.gambar ? null : (
                    <img src={ratingReview.gambar} width={120} alt="" />
                  )}
                </div>

                {!detailOrder ? null : (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() =>
                      navigate(`/AreaPelanggan/RatingDanReview/${detailOrder.id}/${detailOrder.nomorPesanan}`)
                    }
                    disabled={detailOrder.status !== 'Selesai'}
                    style={{ width: '100%', fontWeight: 'bold', display: ratingReview ? 'none' : null }}
                  >
                    Rating & Review Sekarang
                  </Button>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default OrderDetails;
