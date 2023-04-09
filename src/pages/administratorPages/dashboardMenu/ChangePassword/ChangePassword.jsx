import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Paper } from '@mui/material';

function ChangePassword() {
  const navigate = useNavigate();
  const [formChangePassword, setFormChangePassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  React.useEffect(() => {
    document.title = 'Ubah Password';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Dashboard"
          currentPage={{
            title: 'Ubah Password',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Ubah Password</h2>
            </div>

            <Button
              variant="contained"
              size="large"
              style={{ width: '100%', fontWeight: 'bold' }}
              onClick={() => navigate('/Dashboard')}
            >
              Ubah Password
            </Button>
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default ChangePassword;
