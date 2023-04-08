import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Grid, Paper } from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PermDeviceInformationIcon from '@mui/icons-material/PermDeviceInformation';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import CollectionsIcon from '@mui/icons-material/Collections';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import PaymentIcon from '@mui/icons-material/Payment';

const listBusinessInformationMenu = [
  {
    title: 'Informasi Umum',
    icon: <ContactsIcon color="primary" sx={{ fontSize: 60 }} />,
    link: '/InformasiBisnis/InformasiUmum',
  },
  {
    title: 'Jenis Laundry',
    icon: <LocalLaundryServiceIcon color="primary" sx={{ fontSize: 60 }} />,
    link: '/InformasiBisnis/JenisLaundry',
  },
  {
    title: 'Jenis Layanan',
    icon: <LocalShippingIcon color="primary" sx={{ fontSize: 60 }} />,
    link: '/InformasiBisnis/JenisLayanan',
  },
  {
    title: 'Tentang Kami',
    icon: <PermDeviceInformationIcon color="primary" sx={{ fontSize: 60 }} />,
    link: '/InformasiBisnis/TentangKami',
  },
  {
    title: 'Alasan Mengapa Memilih Kami',
    icon: <TipsAndUpdatesIcon color="primary" sx={{ fontSize: 60 }} />,
    link: '/InformasiBisnis/AlasanMengapaMemilihKami',
  },
  {
    title: 'Cara Pemesanan',
    icon: <LiveHelpIcon color="primary" sx={{ fontSize: 60 }} />,
    link: '/InformasiBisnis/CaraPemesanan',
  },
  {
    title: 'Galeri',
    icon: <CollectionsIcon color="primary" sx={{ fontSize: 60 }} />,
    link: '/InformasiBisnis/Galeri',
  },
  {
    title: 'Pertanyaan Yang Sering Diajukan (FAQ)',
    icon: <PsychologyAltIcon color="primary" sx={{ fontSize: 60 }} />,
    link: '/InformasiBisnis/PertanyaanYangSerinDiAjukan',
  },
  {
    title: 'Metode Pembayaran',
    icon: <PaymentIcon color="primary" sx={{ fontSize: 60 }} />,
    link: '/InformasiBisnis/MetodePembayaran',
  },
];

function BusinessInformationMenu() {
  const navigate = useNavigate();

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton defaultMenu="Informasi Bisnis" />

        {/* Main Content */}
        <Grid container spacing={3}>
          {listBusinessInformationMenu.map((menuItem) => {
            return (
              <Grid item xs={6} sm={4} md={4} lg={3}>
                <Paper
                  elevation={3}
                  sx={{
                    height: '100%',
                    backgroundColor: '#ffffff',
                    borderRadius: '4px',
                    border: '2px solid #1F305C',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    gap: '16px 0px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                  onClick={() => navigate(menuItem.link)}
                >
                  {menuItem.icon}
                  {menuItem.title}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
}

export default BusinessInformationMenu;
