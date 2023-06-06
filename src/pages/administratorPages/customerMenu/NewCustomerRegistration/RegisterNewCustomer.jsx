import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  useTheme,
} from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { banyumasAreaList } from '../../../../utils/banyumasAreaList';
import axios from 'axios';

function RegisterNewCustomer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [urbanVillage, setUrbanVillage] = useState();
  const [formRegisterNewCustomer, setFormRegisterNewCustomer] = useState({
    customerName: '',
    contact: {
      phoneNumber: '',
      email: '',
    },
    birthDate: dayjs,
    profilePicture: { img: null, fileName: null },
  });
  const [mainAddress, setMainAddress] = useState({
    region: {
      subDistrict: '',
      urbanVillage: '',
      hamlet: '',
      neighbourhood: '',
    },
    buildingDetails: {
      buildingType: null,
      buildingName_Or_Number: '',
    },
    addressDetails: '',
    buildingPhoto: { img: null, fileName: null },
    makeItMainAddress: true,
  });

  React.useEffect(() => {
    document.title = 'Registrasi Pelanggan Baru';
  }, []);

  // const getUrbanVillage = () => {
  //   return banyumasAreaList.filter((item) => {
  //     return item.subDistrict === mainAddress.region.subDistrict;
  //   });
  // };

  const handleCreateNewCustomer = async () => {
    const formData = new FormData();
    formData.append('nama', formRegisterNewCustomer.customerName);
    formData.append('email', formRegisterNewCustomer.contact.email);
    formData.append('noTelp', formRegisterNewCustomer.contact.phoneNumber);
    formData.append(
      'tglLahir',
      typeof formRegisterNewCustomer.birthDate !== 'function' ? formRegisterNewCustomer.birthDate : null
    );
    formData.append('profilePic', formRegisterNewCustomer.profilePicture.img);
    formData.append('kategori', mainAddress.buildingDetails.buildingType);
    formData.append('detail', mainAddress.buildingDetails.buildingName_Or_Number);
    formData.append('kecamatan', mainAddress.region.subDistrict);
    formData.append('kelurahan', mainAddress.region.urbanVillage);
    formData.append('rt', mainAddress.region.neighbourhood);
    formData.append('rw', mainAddress.region.hamlet);
    formData.append('deskripsi', mainAddress.addressDetails);
    formData.append('gambar', mainAddress.buildingPhoto.img);
    formData.append('status', 'Priority');

    try {
      const res = await axios({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/admin/user`,
        data: formData,
      });

      console.log('Response POST');
      console.log(res);
      navigate('/Pelanggan');
    } catch (error) {
      console.log(error);
    }
  };

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

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.8} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Nama Pelanggan</span>
              </Grid>

              <Grid
                item
                xs
                lg
                sx={{
                  display: 'flex',
                  [theme.breakpoints.down('md')]: {
                    paddingTop: '8px !important',
                  },
                }}
              >
                <TextField
                  required
                  label="Nama Pelanggan"
                  value={formRegisterNewCustomer.customerName}
                  onChange={(e) => {
                    setFormRegisterNewCustomer({
                      ...formRegisterNewCustomer,
                      customerName: e.target.value,
                    });
                  }}
                  autoComplete="off"
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.8} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Kontak</span>
              </Grid>
              <Grid
                item
                xs
                lg
                sx={{
                  display: 'flex',
                  [theme.breakpoints.down('md')]: {
                    paddingTop: '8px !important',
                  },
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm>
                    <TextField
                      required
                      type="number"
                      label="Nomer Telepon"
                      value={formRegisterNewCustomer.contact.phoneNumber}
                      onChange={(e) => {
                        setFormRegisterNewCustomer({
                          ...formRegisterNewCustomer,
                          contact: { ...formRegisterNewCustomer.contact, phoneNumber: e.target.value },
                        });
                      }}
                      autoComplete="off"
                      onWheel={(e) => e.target.blur()}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm>
                    <TextField
                      label="Email"
                      value={formRegisterNewCustomer.contact.email}
                      onChange={(e) => {
                        setFormRegisterNewCustomer({
                          ...formRegisterNewCustomer,
                          contact: { ...formRegisterNewCustomer.contact, email: e.target.value },
                        });
                      }}
                      autoComplete="off"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.8} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Tanggal Lahir</span>
              </Grid>

              <Grid
                item
                xs
                lg
                sx={{
                  display: 'flex',
                  [theme.breakpoints.down('md')]: {
                    paddingTop: '8px !important',
                  },
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    label="Pilih Tanggal"
                    value={formRegisterNewCustomer.birthDate}
                    onChange={(value) => {
                      setFormRegisterNewCustomer({ ...formRegisterNewCustomer, birthDate: value });

                      console.log(formRegisterNewCustomer.birthDate);
                      console.log('Tanggal: ' + value.$D);
                      console.log('Bulan: ' + value.$M);
                      console.log('Tahun: ' + value.$y);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    slotProps={{
                      textField: {
                        error: false,
                        // helperText: 'MM / DD / YYYY',
                      },
                    }}
                    sx={{
                      width: '100%',
                      '& .MuiDialog-root .MuiModal-root .css-3dah0e-MuiModal-root-MuiDialog-root': {
                        zIndex: 100000,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.8}>
                <span>Foto Profil</span>
              </Grid>

              <Grid
                item
                xs
                lg
                sx={{
                  display: 'flex',
                  [theme.breakpoints.down('md')]: {
                    paddingTop: '8px !important',
                  },
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs="auto">
                    <Button
                      variant="contained"
                      size="small"
                      component="label"
                      startIcon={<InsertPhotoIcon />}
                      sx={{ height: 'fit-content' }}
                    >
                      Pilih Foto
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          console.log(e.target.files);
                          setFormRegisterNewCustomer({
                            ...formRegisterNewCustomer,
                            profilePicture: {
                              img: e.target.files[0],
                              fileName: !e.target.files[0] ? null : e.target.files[0].name,
                            },
                          });
                          // console.log(image);
                        }}
                        hidden
                      />
                    </Button>
                  </Grid>
                  <Grid item xs="auto">
                    {formRegisterNewCustomer.profilePicture.img ? (
                      <img
                        id="output"
                        src={
                          formRegisterNewCustomer.profilePicture.img
                            ? URL.createObjectURL(formRegisterNewCustomer.profilePicture.img)
                            : ''
                        }
                        width={70}
                        alt="Preview"
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs>
                    {formRegisterNewCustomer.profilePicture.fileName ? (
                      <Chip
                        label={formRegisterNewCustomer.profilePicture.fileName}
                        onDelete={() => setFormRegisterNewCustomer({ ...formRegisterNewCustomer, profilePicture: {} })}
                        sx={{ maxWidth: '250px' }}
                      />
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <div style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>Alamat Utama</div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.8} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Daerah</span>
              </Grid>
              <Grid
                item
                xs
                lg
                sx={{
                  display: 'flex',
                  [theme.breakpoints.down('md')]: {
                    paddingTop: '8px !important',
                  },
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md>
                    <FormControl fullWidth>
                      <InputLabel id="select-sub-district-label">Pilih Kecamatan *</InputLabel>
                      <Select
                        required
                        labelId="select-sub-district-label"
                        id="select-sub-district"
                        value={mainAddress.region.subDistrict || ''}
                        label="Pilih Kecamatan"
                        onChange={(e) => {
                          setUrbanVillage(
                            banyumasAreaList[banyumasAreaList.findIndex((i) => i.subDistrict === e.target.value)]
                              .urbanVillage
                          );
                          setMainAddress({
                            ...mainAddress,
                            region: {
                              ...mainAddress.region,
                              subDistrict: e.target.value,
                              urbanVillage: '',
                            },
                          });
                        }}
                      >
                        {banyumasAreaList
                          ? banyumasAreaList.map((item) => {
                              return (
                                <MenuItem value={item.subDistrict} sx={{ py: '16px' }}>
                                  {item.subDistrict}
                                </MenuItem>
                              );
                            })
                          : null}
                      </Select>
                    </FormControl>

                    {mainAddress.region.subDistrict || null}
                  </Grid>
                  <Grid item xs={12} sm={6} md>
                    <FormControl disabled={urbanVillage ? false : true} fullWidth>
                      <InputLabel id="select-urban-village-label">Pilih Kelurahan *</InputLabel>
                      <Select
                        required
                        labelId="select-urban-village-label"
                        id="select-urban-village"
                        value={mainAddress.region.urbanVillage || ''}
                        label="Pilih Kelurahan"
                        onChange={(e) => {
                          setMainAddress({
                            ...mainAddress,
                            region: { ...mainAddress.region, urbanVillage: e.target.value },
                          });
                        }}
                      >
                        {urbanVillage
                          ? urbanVillage.map((item) => {
                              return (
                                <MenuItem value={item} sx={{ py: '16px' }}>
                                  {item}
                                </MenuItem>
                              );
                            })
                          : null}
                      </Select>
                    </FormControl>

                    {mainAddress.region.urbanVillage || null}
                  </Grid>
                  <Grid item xs={12} sm={6} md>
                    <TextField
                      required
                      type="number"
                      label="RW"
                      value={mainAddress.region.hamlet}
                      onChange={(e) => {
                        setMainAddress({
                          ...mainAddress,
                          region: { ...mainAddress.region, hamlet: e.target.value },
                        });
                      }}
                      autoComplete="off"
                      onWheel={(e) => e.target.blur()}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md>
                    <TextField
                      required
                      type="number"
                      label="RT"
                      value={mainAddress.region.neighbourhood}
                      onChange={(e) => {
                        setMainAddress({
                          ...mainAddress,
                          region: { ...mainAddress.region, neighbourhood: e.target.value },
                        });
                      }}
                      autoComplete="off"
                      onWheel={(e) => e.target.blur()}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.8} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Detail Bangunan</span>
              </Grid>
              <Grid
                item
                xs
                lg
                sx={{
                  display: 'flex',
                  [theme.breakpoints.down('md')]: {
                    paddingTop: '8px !important',
                  },
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm>
                    <FormControl fullWidth>
                      <InputLabel id="select-building-type-label">Tipe Bangunan *</InputLabel>
                      <Select
                        required
                        labelId="select-building-type-label"
                        id="select-building-type"
                        value={mainAddress.buildingDetails.buildingType}
                        label="Tipe Bangunan"
                        onChange={(e) => {
                          setMainAddress({
                            ...mainAddress,
                            buildingDetails: { ...mainAddress.buildingDetails, buildingType: e.target.value },
                          });
                        }}
                      >
                        {['Rumah', 'Apartemen', 'Gedung', 'Hotel', 'Kost'].map((item) => {
                          return (
                            <MenuItem value={item} sx={{ py: '16px' }}>
                              {item}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>

                    {mainAddress.buildingDetails.buildingType}
                  </Grid>
                  <Grid item xs={12} sm>
                    <TextField
                      required
                      label="Nama / Nomer Bangunan"
                      value={mainAddress.buildingDetails.buildingName_Or_Number}
                      onChange={(e) => {
                        setMainAddress({
                          ...mainAddress,
                          buildingDetails: {
                            ...mainAddress.buildingDetails,
                            buildingName_Or_Number: e.target.value,
                          },
                        });
                      }}
                      autoComplete="off"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.8} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Rincian Alamat</span>
              </Grid>

              <Grid
                item
                xs
                lg
                sx={{
                  display: 'flex',
                  [theme.breakpoints.down('md')]: {
                    paddingTop: '8px !important',
                  },
                }}
              >
                <TextField
                  label="Rincian Alamat"
                  multiline
                  maxRows={4}
                  value={mainAddress.addressDetails}
                  onChange={(e) => {
                    setMainAddress({
                      ...mainAddress,
                      addressDetails: e.target.value,
                    });
                  }}
                  autoComplete="off"
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.8}>
                <span>Foto Bangunan</span>
              </Grid>

              <Grid
                item
                xs
                lg
                sx={{
                  display: 'flex',
                  [theme.breakpoints.down('md')]: {
                    paddingTop: '8px !important',
                  },
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs="auto">
                    <Button
                      variant="contained"
                      size="small"
                      component="label"
                      startIcon={<InsertPhotoIcon />}
                      sx={{ height: 'fit-content' }}
                    >
                      Pilih Foto
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          console.log(e.target.files);
                          setMainAddress({
                            ...mainAddress,
                            buildingPhoto: {
                              img: e.target.files[0],
                              fileName: !e.target.files[0] ? null : e.target.files[0].name,
                            },
                          });
                          // console.log(image);
                        }}
                        hidden
                      />
                    </Button>
                  </Grid>
                  <Grid item xs="auto">
                    {mainAddress.buildingPhoto.img ? (
                      <img
                        id="output"
                        src={mainAddress.buildingPhoto.img ? URL.createObjectURL(mainAddress.buildingPhoto.img) : ''}
                        width={70}
                        alt="Preview"
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs>
                    {mainAddress.buildingPhoto.fileName ? (
                      <Chip
                        label={mainAddress.buildingPhoto.fileName}
                        onDelete={() =>
                          setMainAddress({
                            ...mainAddress,
                            buildingPhoto: {},
                          })
                        }
                        sx={{ maxWidth: '250px' }}
                      />
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              size="large"
              style={{ width: '100%', fontWeight: 'bold' }}
              onClick={() => handleCreateNewCustomer()}
            >
              Registrasi Pelanggan
            </Button>

            {formRegisterNewCustomer.customerName}
            <br />
            {formRegisterNewCustomer.contact.phoneNumber + ' ' + formRegisterNewCustomer.contact.email}
            <br />
            {mainAddress.region.subDistrict +
              ' ' +
              mainAddress.region.urbanVillage +
              ' ' +
              mainAddress.region.hamlet +
              ' ' +
              mainAddress.region.neighbourhood}
            <br />
            {mainAddress.buildingDetails.buildingType + ' ' + mainAddress.buildingDetails.buildingName_Or_Number}
            <br />
            {mainAddress.addressDetails}
            {mainAddress.makeItMainAddress}
            {`${formRegisterNewCustomer.birthDate.$D}
              ${formRegisterNewCustomer.birthDate.$M}
              ${formRegisterNewCustomer.birthDate.$y}`}

            <br />
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default RegisterNewCustomer;
