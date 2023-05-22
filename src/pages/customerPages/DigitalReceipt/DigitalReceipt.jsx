import { Button, Container, Grid, Paper } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function DigitalReceipt() {
  const navigate = useNavigate();

  return (
    <>
      <Container sx={{ mt: '50px', mb: '25px', display: 'flex', justifyContent: 'center' }}>
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
            <img src="https://katapopuler.com/wp-content/uploads/2020/11/dummy.png" width={100} alt="Logo" />
            <h4 style={{ textAlign: 'center' }}>Lulu N’ Be Luxury Laundry</h4>
            <span style={{ textAlign: 'center', maxWidth: '450px' }}>
              Komplek Ruko Nasional No.5, Jl.Situmpur (belakang Moro Mall) - Purwokerto Kulon, Kecamatan Purwokerto
              Selatan, Kabupaten Banyumas, Jawa Tengah
            </span>
            <span style={{ textAlign: 'center' }}>
              <strong>Nomer Pesanan:</strong> #12891272391
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
              <span style={{ textAlign: 'end' }}>Ahmad Yusuf Pangestu</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
              <div>
                <h6>Alamat Penjemputan</h6>
                <div style={{ marginTop: '5px' }}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam deleniti sunt odio ipsum molestias
                  distinctio asperiores dolor, sit voluptates cumque reiciendis cum a minima quam magni, doloremque
                  libero iusto tempore.
                </div>
              </div>
              <div>
                <h6>Alamat Pengantaran</h6>
                <div style={{ marginTop: '5px' }}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam deleniti sunt odio ipsum molestias
                  distinctio asperiores dolor, sit voluptates cumque reiciendis cum a minima quam magni, doloremque
                  libero iusto tempore.
                </div>
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

          <Button
            variant="outlined"
            className="button-outlined-primary"
            onClick={() => {
              if (localStorage.getItem('access_token')) {
                navigate('/AreaPelanggan/RatingDanReview');
              } else {
                navigate('/Login');
              }
            }}
          >
            Rating & Review
          </Button>
        </Paper>
      </Container>
    </>
  );
}

export default DigitalReceipt;
