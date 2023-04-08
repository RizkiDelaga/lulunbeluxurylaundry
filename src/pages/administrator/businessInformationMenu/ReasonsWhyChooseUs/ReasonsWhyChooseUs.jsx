import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Paper } from '@mui/material';

function ReasonsWhyChooseUs() {
  const navigate = useNavigate();
  const [formReasonsWhyChooseUs, setFormReasonsWhyChooseUs] = useState({
    reasonTitle: '',
    description: '',
    photo: {},
  });

  React.useEffect(() => {
    document.title = 'Edit Alasan Mengapa Memilih Kita';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Informasi Bisnis"
          currentPage={{
            title: 'Alasan Mengapa Memilih Kami',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Alasan Mengapa Memilih Kami</h2>
            </div>

            <Button variant="contained" size="large" style={{ width: '100%', fontWeight: 'bold' }}>
              Tambah
            </Button>
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default ReasonsWhyChooseUs;
