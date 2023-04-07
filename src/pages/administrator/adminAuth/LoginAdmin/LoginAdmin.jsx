import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Paper } from '@mui/material';

function LoginAdmin() {
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh',
        }}
      >
        {/* <div className="gap-24"> */}
        <img src="" alt="logo" />
        <br />
        {/* Main Content */}
        <Paper elevation={3} sx={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '16px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Jenis Laundry</h2>
            </div>

            <Button variant="contained" size="large" style={{ width: '100%', fontWeight: 'bold' }}>
              Simpan
            </Button>
          </Box>
        </Paper>
      </div>
      {/* </div> */}
    </>
  );
}

export default LoginAdmin;
