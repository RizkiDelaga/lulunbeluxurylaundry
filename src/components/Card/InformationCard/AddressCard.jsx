import { Box, Button, Grid, useTheme } from '@mui/material';
import React from 'react';
import style from './AddressCard.module.css';
import { banyumasAreaList } from '../../../utils/banyumasAreaList';
import StarIcon from '@mui/icons-material/Star';

function AddressCard({ designType, data, setUpdateAddress, setUrbanVillage, handleDeleteAddress }) {
  const theme = useTheme();

  return (
    <Box
      className={`${style['address-card']}`}
      sx={{ borderRadius: '4px', backgroundColor: '#ffffff', p: 2, width: '100%' }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={designType === 'card' ? '12' : 'auto'}>
          {!data.gambar ? null : (
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
              src={data.gambar || null}
            />
          )}
        </Grid>
        <Grid item xs={12} sm>
          {data.status === 'Priority' ? (
            <div
              style={{
                backgroundColor: '#1F305C',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '24px',
                width: 'fit-content',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <StarIcon fontSize="inherit" />
              Alamat Utama
            </div>
          ) : null}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <span>
              {data.kecamatan}, {data.kelurahan}
            </span>
            <span>
              RW {data.rw}, RT {data.rt}
            </span>
          </div>

          <h4>
            {data.kategori}, {data.detail}{' '}
          </h4>
          <span>{data.deskripsi}</span>
        </Grid>
      </Grid>
      {!setUpdateAddress ? null : (
        <Box className={`${style['card-action']}`}>
          <div style={{ display: 'flex', gap: 4, justifyContent: 'space-between', marginTop: '8px' }}>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => {
                setUpdateAddress({
                  id: data.id,
                  region: {
                    subDistrict: data.kecamatan,
                    urbanVillage: data.kelurahan,
                    hamlet: data.rw,
                    neighbourhood: data.rt,
                  },
                  buildingDetails: {
                    buildingType: data.kategori,
                    buildingName_Or_Number: data.detail,
                  },
                  addressDetails: data.deskripsi,
                  buildingPhoto: { img: null, fileName: data.gambar },
                  // makeItMainAddress: false,
                  isMainAddress: data.status === 'Priority' ? true : false,
                });
                setUrbanVillage(
                  banyumasAreaList[banyumasAreaList.findIndex((i) => i.subDistrict === data.kecamatan)].urbanVillage
                );
              }}
              sx={{ width: '100%' }}
            >
              Update
            </Button>

            <Button
              variant="contained"
              size="medium"
              onClick={() => handleDeleteAddress(data.id)}
              sx={{ width: '100%' }}
            >
              Hapus
            </Button>
          </div>
        </Box>
      )}
    </Box>
  );
}

export default AddressCard;
