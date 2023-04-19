import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Grid, Paper } from '@mui/material';
import InformationCard from '../../../components/Card/InformationCard/InformationCard';

function OrderMenu() {
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = 'Menu Pesanan';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Pesanan"
          directButton={[
            {
              color: 'primary',
              iconType: 'add',
              value: 'Buat pesanan baru',
              link: '/Pesanan/BuatPesananBaru',
            },
          ]}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16"></Box>
        </Paper>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4} md={4} lg={4}>
            <InformationCard
              title="Order Completed"
              content={{ normalText: '81.235' }}
              navigate={{ text: 'Lihat detail pesanan', url: '/Pesanan' }}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4} lg={4}>
            <InformationCard
              title="Order Cancelled"
              content={{ normalText: '135' }}
              navigate={{ text: 'Lihat detail pesanan', url: '/Pesanan' }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <InformationCard
              title="Rating & Review"
              content={{ normalText: '4.8', smallText: '(23.112)' }}
              navigate={{ text: 'Lihat lebih banyak', url: '/Pesanan/RatingDanReviewPelanggan' }}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default OrderMenu;
