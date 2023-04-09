import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Paper } from '@mui/material';
import LoadDecisions from '../../../../components/LoadDecisions/LoadDecisions';

function GeneralInformation() {
  const navigate = useNavigate();
  const [openLoadDecision, setoOpenLoadDecision] = React.useState(false);
  const [formGeneralInformation, setFormGeneralInformation] = useState({
    logo: {},
    slogan: '',
    location: {
      location: '',
      googleMapsEmbed: '',
    },
    contact: {
      phoneNumber: '',
      fax: '',
      whatsApp: '',
      telegram: '',
      email: '',
    },
    socialMedia: {
      instagram: '',
      facebook: '',
      twitter: '',
      youtube: '',
      tikTok: '',
    },
    operatingHours: [
      {
        day: '',
        openingHours: '',
        closingHours: '',
      },
    ],
  });

  React.useEffect(() => {
    document.title = 'Edit Informasi Umum';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Informasi Bisnis"
          currentPage={{
            title: 'Informasi Umum',
          }}
        />

        <LoadDecisions
          setOpen={setoOpenLoadDecision}
          open={openLoadDecision}
          close={true}
          alertProps={{
            title: 'This is a success alert — check it out!',
            statusType: 'success|error|warning|info',
          }}
          // redirect={'/InformasiBisnis'}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Informasi Umum</h2>
            </div>

            <Button
              variant="contained"
              size="large"
              style={{ width: '100%', fontWeight: 'bold' }}
              onClick={() => {
                setoOpenLoadDecision(true);
              }}
            >
              Simpan
            </Button>
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default GeneralInformation;
