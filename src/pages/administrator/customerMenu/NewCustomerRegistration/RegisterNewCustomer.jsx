import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Paper } from '@mui/material';

function RegisterNewCustomer() {
  const navigate = useNavigate();
  const [formRegisterNewCustomer, setFormRegisterNewCustomer] = useState({
    customerName: '',
    contact: {
      phoneNumber: '',
      email: '',
    },
    birthDate: '',
    profilePicture: {},
    mainAddress: {
      region: {
        subDistrict: '',
        urbanVillage: '',
        hamlet: '',
        neighbourhood: '',
      },
      buildingDetails: {
        buildingType: '',
        buildingName_Or_Number: '',
      },
      addressDetails: '',
      buildingPhoto: {},
      mainAddress: false,
    },
  });

  React.useEffect(() => {
    document.title = 'Registrasi Pelanggan Baru';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Pelanggan"
          currentPage={{
            title: 'Registrasi Pelanggan Baru',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Registrasi Pelanggan Baru</h2>
            </div>

            <Button
              variant="contained"
              size="large"
              style={{ width: '100%', fontWeight: 'bold' }}
              onClick={() => navigate('/Pelanggan')}
            >
              Registrasi Pelanggan
            </Button>
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default RegisterNewCustomer;
