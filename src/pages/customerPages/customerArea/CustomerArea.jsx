import { Box, Button, Container, Grid, Paper, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import EditIcon from '@mui/icons-material/Edit';

function CustomerArea() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '25px',
          my: '25px',
          mx: '75px',
          [theme.breakpoints.down('md')]: {
            mx: '8px',
          },
        }}
      >
        <PageStructureAndDirectButton defaultMenu="Area Pelanggan" />

        <Paper
          elevation={3}
          sx={{
            width: '100%',

            padding: 2.5,
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img
              src="https://katapopuler.com/wp-content/uploads/2020/11/dummy.png"
              width={60}
              height={60}
              alt=""
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
            <span style={{ fontSize: '24px' }}>Rating & Review</span>
          </div>
          <Button variant="text" startIcon={<EditIcon />} sx={{ width: 'fit-content', fontWeight: 'bold' }}>
            Edit Profil
          </Button>
        </Paper>

        <Paper
          elevation={3}
          sx={{ padding: 3, borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <h4 style={{ textAlign: 'center' }}>Rating & Review</h4>
        </Paper>
      </Box>
    </>
  );
}

export default CustomerArea;
