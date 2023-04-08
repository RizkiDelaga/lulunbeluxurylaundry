import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Paper } from '@mui/material';

function CreateNewEvents() {
  const navigate = useNavigate();
  const [formCreateNewEvents, setFormCreateNewEvents] = useState({
    eventName: '',
    dateStart: '',
    dateEnd: '',
    description: '',
    reward: [],
    criteria: [],
    poster: {},
  });

  React.useEffect(() => {
    document.title = 'Buat Event Baru';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Event"
          currentPage={{
            title: 'Buat Event Baru',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Buat Event Baru</h2>
            </div>

            <Button
              variant="contained"
              size="large"
              style={{ width: '100%', fontWeight: 'bold' }}
              onClick={() => navigate('/Event')}
            >
              Buat Event
            </Button>
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default CreateNewEvents;
