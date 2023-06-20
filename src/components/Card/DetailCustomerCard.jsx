import { Avatar, Box, Grid, useTheme } from '@mui/material';
import React from 'react';

function DetailCustomerCard({ dataUser }) {
  const theme = useTheme();

  return (
    <Box sx={{ borderRadius: '4px', backgroundColor: '#eeeeee', p: 2, width: '100%' }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={'auto'} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar alt="" src={dataUser.profilePic} sx={{ width: '120px', height: '120px', borderRadius: 1 }} />
        </Grid>
        <Grid item xs={12} sm>
          <Box
            component={'h4'}
            sx={{
              [theme.breakpoints.down('sm')]: {
                textAlign: 'center',
              },
            }}
          >
            {dataUser.nama}
          </Box>
          <div>
            <strong>Tanggal Lahir :</strong> 05/02/1999
          </div>
          <div>
            <strong>Kontak :</strong> {dataUser.noTelp}
            {dataUser.email ? ` || ${dataUser.email}` : null}
          </div>
          <div>
            <strong>Alamat Utama :</strong> {dataUser.alamatUser}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DetailCustomerCard;
