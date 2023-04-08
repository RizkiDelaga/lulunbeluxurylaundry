import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Paper } from '@mui/material';

function CustomerMenu() {
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = 'Menu Pelanggan';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Pelanggan"
          directButton={[
            {
              color: 'primary',
              iconType: 'add',
              value: 'Registrasi pelanggan baru',
              link: '/Pelanggan/RegistrasiPelangganBaru',
            },
          ]}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16"></Box>
        </Paper>
      </div>
    </>
  );
}

export default CustomerMenu;
