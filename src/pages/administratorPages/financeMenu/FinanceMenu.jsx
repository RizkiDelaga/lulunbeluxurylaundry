import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Paper } from '@mui/material';

function FinanceMenu() {
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = 'Menu Keuangan';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Keuangan"
          directButton={[
            {
              color: 'primary',
              iconType: 'add',
              value: 'Tambah Pemasukan',
              link: '/Keuangan/InputPemasukan',
            },
            {
              color: 'secondary',
              iconType: 'add',
              value: 'Tambah Pengeluaran',
              link: '/Keuangan/InputPengeluaran',
            },
          ]}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16"></Box>
        </Paper>

        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16"></Box>
        </Paper>
      </div>
    </>
  );
}

export default FinanceMenu;
