import { Box, Button, Container, Grid, Paper, ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components';
import MuiToggleButton from '@mui/material/ToggleButton';
import InformationCard from '../../../components/Card/InformationCard/InformationCard';

function CustomerArea() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [buttonStatusOrder, setButtonStatusOrder] = useState('Pesanan sedang Berjalan');

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
        <PageStructureAndDirectButton defaultMenu="Area Pelanggan" />

        <Paper
          elevation={3}
          sx={{
            width: '100%',
            padding: 2.5,
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img
              src="https://katapopuler.com/wp-content/uploads/2020/11/dummy.png"
              width={60}
              height={60}
              alt=""
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
            <span style={{ fontSize: '24px' }}>Nama Pelanggan</span>
          </div>
          <Button
            variant="text"
            startIcon={<EditIcon />}
            sx={{
              width: 'fit-content',
              fontWeight: 'bold',
              [theme.breakpoints.down('sm')]: {
                display: 'none',
              },
            }}
          >
            Edit Profil
          </Button>
        </Paper>

        {/* Progress Order Menu */}
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            padding: 2.5,
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            backgroundColor: '#1F305C',
            color: '#ffffff',
          }}
        >
          <h4 style={{}}>Progres Pemesanan Saya</h4>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4} lg={2.4}>
              <Box
                onClick={() => {
                  setButtonStatusOrder(
                    buttonStatusOrder === 'Menunggu Persetujuan' ? 'Pesanan sedang Berjalan' : 'Menunggu Persetujuan'
                  );
                }}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '4px !important',
                  padding: 0,
                  backgroundColor: buttonStatusOrder === 'Menunggu Persetujuan' ? '#ffffff80' : '#ffffff',
                  '&:hover': {
                    backgroundColor: '#ffffff80 !important',
                  },
                }}
              >
                <InformationCard
                  title="Menunggu Persetujuan"
                  content={{ normalText: '19' }}
                  inheritColor={true}
                  // navigate={{ text: 'Lihat daftar pesanan', url: '/Pesanan' }}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={4} lg={2.4}>
              <Box
                onClick={() => {
                  setButtonStatusOrder(
                    buttonStatusOrder === 'Pesanan sedang Berjalan'
                      ? 'Pesanan sedang Berjalan'
                      : 'Pesanan sedang Berjalan'
                  );
                }}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '4px !important',
                  padding: 0,
                  backgroundColor: buttonStatusOrder === 'Pesanan sedang Berjalan' ? '#ffffff80' : '#ffffff',
                  '&:hover': {
                    backgroundColor: '#ffffff80 !important',
                  },
                }}
              >
                <InformationCard
                  title="Pesanan sedang Berjalan"
                  content={{ normalText: '19' }}
                  inheritColor={true}
                  // navigate={{ text: 'Lihat daftar pesanan', url: '/Pesanan' }}
                />
              </Box>
            </Grid>

            <Grid item xs={6} md={4} lg={2.4}>
              <Box
                onClick={() => {
                  setButtonStatusOrder(
                    buttonStatusOrder === 'Pesanan Selesai' ? 'Pesanan sedang Berjalan' : 'Pesanan Selesai'
                  );
                }}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '4px !important',
                  padding: 0,
                  backgroundColor: buttonStatusOrder === 'Pesanan Selesai' ? '#ffffff80' : '#ffffff',
                  '&:hover': {
                    backgroundColor: '#ffffff80 !important',
                  },
                }}
              >
                <InformationCard
                  title="Pesanan Selesai"
                  content={{ normalText: '19' }}
                  inheritColor={true}
                  // navigate={{ text: 'Lihat daftar pesanan', url: '/Pesanan' }}
                />
              </Box>
            </Grid>

            <Grid item xs={6} md={4} lg={2.4}>
              <Box
                onClick={() => {
                  setButtonStatusOrder(
                    buttonStatusOrder === 'Pesanan Batal' ? 'Pesanan sedang Berjalan' : 'Pesanan Batal'
                  );
                }}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '4px !important',
                  padding: 0,
                  backgroundColor: buttonStatusOrder === 'Pesanan Batal' ? '#ffffff80' : '#ffffff',
                  '&:hover': {
                    backgroundColor: '#ffffff80 !important',
                  },
                }}
              >
                <InformationCard
                  title="Pesanan Batal"
                  content={{ normalText: '19' }}
                  inheritColor={true}
                  // navigate={{ text: 'Lihat daftar pesanan', url: '/Pesanan' }}
                />
              </Box>
            </Grid>

            <Grid item xs={6} md={4} lg={2.4}>
              <Box
                onClick={() => {
                  setButtonStatusOrder(
                    buttonStatusOrder === 'Pesanan di Tolak' ? 'Pesanan sedang Berjalan' : 'Pesanan di Tolak'
                  );
                }}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '4px !important',
                  padding: 0,
                  backgroundColor: buttonStatusOrder === 'Pesanan di Tolak' ? '#ffffff80' : '#ffffff',
                  '&:hover': {
                    backgroundColor: '#ffffff80 !important',
                  },
                }}
              >
                <InformationCard
                  title="Pesanan di Tolak"
                  content={{ normalText: '19' }}
                  inheritColor={true}
                  // navigate={{ text: 'Lihat daftar pesanan', url: '/Pesanan' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}

export default CustomerArea;
