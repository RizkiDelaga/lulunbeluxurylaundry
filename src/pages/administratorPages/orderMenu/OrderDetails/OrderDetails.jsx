import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Alert, Box, Button, Grid, Menu, MenuItem, Paper, useTheme } from '@mui/material';
import axios from 'axios';
import DetailCustomerCard from '../../../../components/Card/DetailCustomerCard';
import AddressCard from '../../../../components/Card/AddressCard';
import LaundryItemTable from '../../../../components/Table/LaundryItemTable';
import RatingComponent from '../../../../components/Ratings/RatingComponent';
import SendIcon from '@mui/icons-material/Send';
import { adjustTimePlus } from '../../../../utils/timeUtils';

function OrderDetails() {
  const theme = useTheme();
  const navigate = useNavigate();
  let { noPesanan } = useParams();
  const [detailOrder, setDetailOrder] = useState();
  const [ratingReview, setRatingReview] = useState();
  const [listLaundryItem, setListLaundryItem] = React.useState([]);

  React.useEffect(() => {
    document.title = `Detail Pesanan #${noPesanan}`;
    handleGetDetailOrder();
  }, []);

  const handleGetDetailOrder = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/pemesanan/nomor/${noPesanan}`,
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

  const handleGetLaundryItem = async (orderId) => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/barang/pemesananId/${orderId}`,
      });

      setListLaundryItem(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setListLaundryItem([]);
      }
    }
  };

  const handleGetRatingReview = async (orderId) => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/review/pemesanan/${orderId}`,
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
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/pemesanan/admin/status/${orderId}`,
        data: { status: statusValue },
      });

      if (statusValue !== 'Diterima') {
        handleGetDetailOrder();
      }

      if (statusValue === 'Diterima') {
        handleUpdateOrderStatus(detailOrder.id, 'Perlu Dijemput');
      }
    } catch (error) {}
  };

  const handleUpdatePaymentStatus = async (orderId, statusValue) => {
    try {
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/pemesanan/admin/payment-status/${orderId}`,
        data: { statusPembayaran: statusValue },
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

  // Menu - Payment Status
  const [paymentStatusAnchorEl, setPaymentStatusAnchorEl] = React.useState(null);
  const openPaymentStatus = Boolean(paymentStatusAnchorEl);
  const handleClosePaymentStatus = () => {
    setPaymentStatusAnchorEl(null);
  };

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Pesanan"
          currentPage={{
            title: 'Detail Pesanan',
          }}
          directButton={
            detailOrder
              ? detailOrder.status === 'Selesai' ||
                detailOrder.status === 'Dibatalkan' ||
                detailOrder.status === 'Ditolak'
                ? false
                : [
                    {
                      color: 'primary',
                      iconType: 'edit',
                      value: 'Edit Pesanan',
                      link: detailOrder ? `/Pesanan/FormulirPemesananLaundry/${detailOrder.id}` : false,
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
                        {detailOrder.status}
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

                <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate(`/StrukPemesanan/${noPesanan}`)}
                    sx={{ width: '100%', fontWeight: 'bold' }}
                  >
                    Struk Digital
                  </Button>

                  {!detailOrder ? null : (
                    <a
                      href={`https://wa.me/${detailOrder.User.noTelp}?text=*Struk Elektronik Transaksi Lulu 'N Be Luxury laundry*%0A%0ANo Pesanan: ${noPesanan}%0AStruk Online:%0Ahttps://lulunbeluxurylaundry.vercel.app/StrukPemesanan/${noPesanan}%0A%0ATerima Kasih`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button variant="outlined" size="large" sx={{ width: 'fit-content', fontWeight: 'bold' }}>
                        <SendIcon />
                      </Button>
                    </a>
                  )}
                </Box>
                {!detailOrder ? null : (
                  <>
                    <Button
                      disabled={detailOrder.status === 'Selesai' || detailOrder.status === 'Ditolak' ? true : false}
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
                        sx: { width: orderStatusAnchorEl && orderStatusAnchorEl.offsetWidth }, // <-- The line that does all
                      }}
                    >
                      {(detailOrder.status === 'Perlu Disetujui'
                        ? ['Diterima', 'Ditolak']
                        : detailOrder.status === 'Ditolak' || detailOrder.status === 'Selesai'
                        ? []
                        : ['Perlu Dijemput', 'Perlu Dikerjakan', 'Perlu Diantar', 'Selesai', 'Dibatalkan']
                      ).map((item) => (
                        <MenuItem
                          disabled={
                            (item === 'Selesai' && detailOrder.statusPembayaran === 'Belum Bayar') ||
                            (item === 'Dibatalkan' && detailOrder.statusPembayaran === 'Sudah Bayar')
                              ? true
                              : false
                          }
                          onClick={() => {
                            handleUpdateOrderStatus(detailOrder.id, item);

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

                    <Button
                      disabled={
                        detailOrder.status === 'Selesai' ||
                        detailOrder.status === 'Dibatalkan' ||
                        detailOrder.status === 'Perlu Disetujui'
                          ? true
                          : false
                      }
                      variant="outlined"
                      size="large"
                      onClick={(event) => {
                        setPaymentStatusAnchorEl(event.currentTarget);
                      }}
                      sx={{ width: '100%', fontWeight: 'bold' }}
                    >
                      Ubah Status Pembayaran
                    </Button>
                    {/* Menu - Payment Status */}
                    <Menu
                      anchorEl={paymentStatusAnchorEl}
                      open={openPaymentStatus}
                      onClose={handleClosePaymentStatus}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        sx: { width: paymentStatusAnchorEl && paymentStatusAnchorEl.offsetWidth }, // <-- The line that does all
                      }}
                    >
                      {['Belum Bayar', 'Sudah Bayar'].map((item) => (
                        <MenuItem
                          onClick={() => {
                            handleUpdatePaymentStatus(detailOrder.id, item);
                            handleClosePaymentStatus();
                          }}
                          sx={{ bgcolor: detailOrder.statusPembayaran === item ? '#eeeeee' : null }}
                        >
                          {item}
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
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default OrderDetails;
