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
      makeItMainAddress: false,
    },
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
    buildingPhoto: {},
    makeItMainAddress: false,
  });

  React.useEffect(() => {
    document.title = 'Registrasi Pelanggan Baru';
  }, []);

  const getUrbanVillage = () => {
    return banyumasAreaList.filter((item) => {
      return item.subDistrict === mainAddress.region.subDistrict;
    });
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
                      value={formRegisterNewCustomer.mainAddress.region.hamlet}
                      onChange={(e) => {
                        setFormRegisterNewCustomer({
                          ...formRegisterNewCustomer,
                          mainAddress: {
                            ...formRegisterNewCustomer.mainAddress,
                            region: { ...formRegisterNewCustomer.mainAddress.region, hamlet: e.target.value },
                          },
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
                      value={formRegisterNewCustomer.mainAddress.region.neighbourhood}
                      onChange={(e) => {
                        setFormRegisterNewCustomer({
                          ...formRegisterNewCustomer,
                          mainAddress: {
                            ...formRegisterNewCustomer.mainAddress,
                            region: { ...formRegisterNewCustomer.mainAddress.region, neighbourhood: e.target.value },
                          },
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

                    {/* <Autocomplete
                      required
                      sx={{ width: '100%' }}
                      value={mainAddress.buildingDetails.buildingType}
                      options={['Rumah', 'Apartemen', 'Gedung', 'Hotel', 'Kost']}
                      autoHighlight
                      onChange={(event, value) => {
                        setMainAddress({
                          ...mainAddress,
                          buildingDetails: { ...mainAddress.buildingDetails, buildingType: value },
                        });
                      }}
                      getOptionLabel={(option) => option}
                      renderOption={(props, option, index) => (
                        <div style={{ paddingTop: '16px', paddingBottom: '16px' }} {...props}>
                          {option}
                        </div>
                      )}
                      renderInput={(params) => <TextField {...params} label="Tipe Bangunan *" />}
                    /> */}
                    {mainAddress.buildingDetails.buildingType}
                  </Grid>
                  <Grid item xs={12} sm>
                    <TextField
                      required
                      label="Nama / Nomer Bangunan"
                      value={formRegisterNewCustomer.mainAddress.buildingDetails.buildingName_Or_Number}
                      onChange={(e) => {
                        setFormRegisterNewCustomer({
                          ...formRegisterNewCustomer,
                          mainAddress: {
                            ...formRegisterNewCustomer.mainAddress,
                            buildingDetails: {
                              ...formRegisterNewCustomer.mainAddress.region,
                              buildingName_Or_Number: e.target.value,
                            },
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
                  value={formRegisterNewCustomer.mainAddress.addressDetails}
                  onChange={(e) => {
                    setFormRegisterNewCustomer({
                      ...formRegisterNewCustomer,
                      mainAddress: {
                        ...formRegisterNewCustomer.mainAddress,
                        addressDetails: e.target.value,
                      },
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
                          setFormRegisterNewCustomer({
                            ...formRegisterNewCustomer,
                            mainAddress: {
                              ...formRegisterNewCustomer.mainAddress,
                              buildingPhoto: {
                                img: e.target.files[0],
                                fileName: !e.target.files[0] ? null : e.target.files[0].name,
                              },
                            },
                          });
                          // console.log(image);
                        }}
                        hidden
                      />
                    </Button>
                  </Grid>
                  <Grid item xs="auto">
                    {formRegisterNewCustomer.mainAddress.buildingPhoto.img ? (
                      <img
                        id="output"
                        src={
                          formRegisterNewCustomer.mainAddress.buildingPhoto.img
                            ? URL.createObjectURL(formRegisterNewCustomer.mainAddress.buildingPhoto.img)
                            : ''
                        }
                        width={70}
                        alt="Preview"
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs>
                    {formRegisterNewCustomer.mainAddress.buildingPhoto.fileName ? (
                      <Chip
                        label={formRegisterNewCustomer.mainAddress.buildingPhoto.fileName}
                        onDelete={() =>
                          setFormRegisterNewCustomer({
                            ...formRegisterNewCustomer,
                            mainAddress: { ...formRegisterNewCustomer.mainAddress, buildingPhoto: {} },
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
              onClick={() => navigate('/Pelanggan')}
            >
              Registrasi Pelanggan
            </Button>

            {formRegisterNewCustomer.customerName}
            <br />
            {formRegisterNewCustomer.contact.phoneNumber + ' ' + formRegisterNewCustomer.contact.email}
            <br />
            {formRegisterNewCustomer.mainAddress.region.subDistrict +
              ' ' +
              formRegisterNewCustomer.mainAddress.region.urbanVillage +
              ' ' +
              formRegisterNewCustomer.mainAddress.region.hamlet +
              ' ' +
              formRegisterNewCustomer.mainAddress.region.neighbourhood}
            <br />
            {formRegisterNewCustomer.mainAddress.buildingDetails.buildingType +
              ' ' +
              formRegisterNewCustomer.mainAddress.buildingDetails.buildingName_Or_Number}
            <br />
            {formRegisterNewCustomer.mainAddress.addressDetails}
            {formRegisterNewCustomer.mainAddress.makeItMainAddress}
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
