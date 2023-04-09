import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Paper } from '@mui/material';

function AddIncome() {
  const navigate = useNavigate();
  const [formAddIncome, setFormAddIncome] = useState({
    title: '',
    nominal: 0,
    entryDate: '',
    notes: '',
    photoEvidence: {},
  });

  React.useEffect(() => {
    document.title = 'Tambah Pemasukan';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Keuangan"
          currentPage={{
            title: 'Input Pemasukan',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Input Pemasukan</h2>
            </div>

            <Button
              variant="contained"
              size="large"
              style={{ width: '100%', fontWeight: 'bold' }}
              onClick={() => navigate('/Keuangan')}
            >
              Tambah Pemasukan
            </Button>
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default AddIncome;
