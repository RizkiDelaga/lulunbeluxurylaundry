import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Grid, Paper, useTheme } from '@mui/material';
import AddressCard from '../../../../components/Card/InformationCard/AddressCard';

function OrderDetails() {
  let { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = 'Detail Pesanan';
  }, []);

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
            title: `Detail Pesanan #${id}`,
          }}
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

                <Box sx={{ borderRadius: '4px', backgroundColor: '#eeeeee', p: 2 }}>
                  <Grid container spacing={1}>
                    <Grid
                      item
                      xs={12}
                      sm={'auto'}
                      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Box
                        component="img"
                        sx={{
                          width: '120px',
                          height: '100%',
                          minHeight: '120px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                        alt=""
                        src="https://katapopuler.com/wp-content/uploads/2020/11/dummy.png"
                      />
                    </Grid>
                    <Grid item xs={12} sm>
                      <Box
                        component={'h4'}
                        sx={{
                          [theme.breakpoints.down('sm')]: {
                            textAlign: 'center',
                          },
                        }}
                      >
                        Ahmad Yusuf Pangestu
                      </Box>
                      <div>
                        <strong>Tanggal Lahir :</strong> 05/02/1999
                      </div>
                      <div>
                        <strong>Kontak :</strong> 081234567890 || ahmadyusuf@gmail.com
                      </div>
                      <div>
                        <strong>Alamat Utama :</strong> Kecamatan Purwokerto Timur, Kelurahan Purwokerto Lor, RW/003,
                        RT/001, Rumah No.15C, Rumah warna hijau di sebelah warung.
                      </div>
                    </Grid>
                  </Grid>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <h6>Alamat Penjemputan</h6>
                    <Box sx={{ border: '1px solid #1F305C', borderRadius: '4px', mt: 2 }}>
                      <AddressCard designType={'card'} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <h6>Alamat Pengantaran</h6>
                    <Box sx={{ border: '1px solid #1F305C', borderRadius: '4px', mt: 2 }}>
                      <AddressCard designType={'card'} />
                    </Box>
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
                    <span style={{ textAlign: 'end' }}>#231621965213</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h6>Tanggal Pemesanan</h6>
                    <span style={{ textAlign: 'end' }}>23/03/2023 12:54</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h6>Tenggat Waktu</h6>
                    <span style={{ textAlign: 'end' }}>23/03/2023 12:54</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h6>Total Pembayaran</h6>
                    <span style={{ textAlign: 'end' }}>Rp 143.000,00 (Belum Bayar)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h6>Metode Pembayaran</h6>
                    <span style={{ textAlign: 'end' }}>Cash</span>
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
                    margin: 'auto',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                    <h6>Status Pesanan</h6>
                    <div style={{ backgroundColor: '#ffffff', padding: '4px 24px', borderRadius: '8px' }}>
                      Sedang di Jemput
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', marginTop: '5px' }}>Status diubah pada 23/03/2023 14:47</div>
                </div>

                <Button variant="contained" size="large" style={{ width: '100%', fontWeight: 'bold' }}>
                  Struk Digital
                </Button>
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

                  <span style={{}}>N/A</span>

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
                    N/A
                  </span>
                </div>

                <Button variant="contained" size="large" style={{ width: '100%', fontWeight: 'bold' }}>
                  Rating & Review Sekarang
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default OrderDetails;
