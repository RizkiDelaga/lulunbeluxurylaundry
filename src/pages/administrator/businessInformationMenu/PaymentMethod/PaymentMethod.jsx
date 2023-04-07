import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Paper } from '@mui/material';

function PaymentMethod() {
  const navigate = useNavigate();

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Informasi Bisnis"
          currentPage={{
            title: 'Metode Pembayaran',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Metode Pembayaran</h2>
            </div>

            <Button variant="contained" size="large" style={{ width: '100%', fontWeight: 'bold' }}>
              Simpan
            </Button>
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default PaymentMethod;
