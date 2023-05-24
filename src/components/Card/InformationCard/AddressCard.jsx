import { Box, Grid, useTheme } from '@mui/material';
import React from 'react';

function AddressCard({ designType }) {
  const theme = useTheme();

  return (
    <Box sx={{ borderRadius: '4px', backgroundColor: '#ffffff', p: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={designType === 'card' ? '12' : 'auto'}>
          <Box
            component="img"
            sx={{
              height: '100%',
              width: '100%',
              maxWidth: designType === 'card' ? 'none' : '100px',
              maxHeight: designType === 'card' ? '180px' : '80px',
              objectFit: 'cover',
              borderRadius: '4px',
              [theme.breakpoints.down('sm')]: {
                maxWidth: 'none',
                maxHeight: '180px',
              },
            }}
            alt=""
            src="https://katapopuler.com/wp-content/uploads/2020/11/dummy.png"
          />
        </Grid>
        <Grid item xs={12} sm>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <span>Purwokerto Timur, Purwokerto Lor</span>
            <span>RW 003, RT 001</span>
          </div>

          <h4>Rumah, No.15C</h4>
          <span>Rumah warna hijau di sebelah warung</span>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddressCard;
