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
  Switch,
  TextField,
  useTheme,
} from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { banyumasAreaList } from '../../../../utils/banyumasAreaList';
import AddressCard from '../../../../components/Card/InformationCard/AddressCard';
import axios from 'axios';

function EditProfile() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [urbanVillage, setUrbanVillage] = useState();
  const [formEditProfile, setFormEditProfile] = useState({
    customerName: '',
    contact: {
      phoneNumber: '',
      email: '',
    },
    birthDate: dayjs,
    profilePicture: { img: null, fileName: null },
    // mainAddress: {
    //   region: {
    //     subDistrict: '',
    //     urbanVillage: '',
    //     hamlet: '',
    //     neighbourhood: '',
    //   },
    //   buildingDetails: {
    //     buildingType: '',
    //     buildingName_Or_Number: '',
    //   },
    //   addressDetails: '',
    //   buildingPhoto: {},
    //   makeItMainAddress: false,
    // },
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
    buildingPhoto: { img: null, fileName: '' },
    makeItMainAddress: false,
    isMainAddress: false,
  });

  React.useEffect(() => {
    document.title = 'Edit Profil';
    handleGetMyProfile();
  }, []);

  const handleGetMyProfile = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/user',
      });
      console.log('Response GET Data My Profile');
      console.log(res);
      // setFormEditProfile(res.data.data);
      setFormEditProfile({
        customerName: res.data.data.nama,
        contact: {
          phoneNumber: res.data.data.noTelp,
          email: res.data.data.email,
        },
        birthDate: dayjs(res.data.data.tglLahir),
        profilePicture: { img: null, fileName: res.data.data.profilePic },
      });
      localStorage.setItem('my_name', res.data.data.nama);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateMyProfile = async () => {
    const formData = new FormData();
    formData.append('nama', formEditProfile.customerName);
    formData.append('noTelp', formEditProfile.contact.phoneNumber);
    formData.append('email', formEditProfile.contact.email);
    formData.append('tglLahir', formEditProfile.birthDate);
    formData.append('profilePic', formEditProfile.profilePicture.img);

    try {
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/user',
        data: formData,
      });
      console.log('Response GET Data My Profile');
      console.log(res);
      handleGetMyProfile();
    } catch (error) {
      console.log(error);
    }
  };

  // const getUrbanVillage = () => {
  //   return banyumasAreaList.filter((item) => {
  //     return item.subDistrict === mainAddress.region.subDistrict;
  //   });
  // };

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
        <PageStructureAndDirectButton
          defaultMenu="Area Pelanggan"
          currentPage={{
            title: 'Edit Profil',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Edit Profil</h2>
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.8} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Nama Langkap</span>
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
                  label="Nama Langkap"
                  value={formEditProfile.customerName}
                  onChange={(e) => {
                    setFormEditProfile({
                      ...formEditProfile,
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
                      value={formEditProfile.contact.phoneNumber}
                      onChange={(e) => {
                        setFormEditProfile({
                          ...formEditProfile,
                          contact: { ...formEditProfile.contact, phoneNumber: e.target.value },
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
                      value={formEditProfile.contact.email}
                      onChange={(e) => {
                        setFormEditProfile({
                          ...formEditProfile,
                          contact: { ...formEditProfile.contact, email: e.target.value },
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
                    value={formEditProfile.birthDate}
                    onChange={(value) => {
                      setFormEditProfile({ ...formEditProfile, birthDate: value });

                      console.log(formEditProfile.birthDate);
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
                          setFormEditProfile({
                            ...formEditProfile,
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
                    {formEditProfile.profilePicture.img ? (
                      <img
                        id="output"
                        src={
                          formEditProfile.profilePicture.img
                            ? URL.createObjectURL(formEditProfile.profilePicture.img)
                            : ''
                        }
                        width={70}
                        alt="Preview"
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs>
                    {formEditProfile.profilePicture.fileName ? (
                      <Chip
                        label={formEditProfile.profilePicture.fileName}
                        onDelete={() =>
                          setFormEditProfile({ ...formEditProfile, profilePicture: { img: null, fileName: null } })
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
              onClick={() => handleUpdateMyProfile()}
            >
              Edit Profil
            </Button>
          </Box>
        </Paper>

        {/* Address Configuration */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Paper
              elevation={3}
              sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}
            >
              <Box className="gap-16">
                <div style={{ width: '100%', textAlign: 'center' }}>
                  <h4 style={{ marginTop: '8px', marginBottom: '8px' }}>Tambah Alamat</h4>
                </div>
                {/* <div style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>Alamat Utama</div> */}

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={3} lg={3} sx={{ display: 'flex', alignItems: 'center' }}>
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
                      <Grid item xs={12} md={6}>
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
                      <Grid item xs={12} md={6}>
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
                      <Grid item xs={12} md={6}>
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
                      <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} sm={12} md={3} lg={3} sx={{ display: 'flex', alignItems: 'center' }}>
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
                                ...mainAddress.region,
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
                  <Grid item xs={12} sm={12} md={3} lg={3} sx={{ display: 'flex', alignItems: 'center' }}>
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
                  <Grid item xs={12} sm={12} md={3} lg={3}>
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
                            src={
                              mainAddress.buildingPhoto.img ? URL.createObjectURL(mainAddress.buildingPhoto.img) : ''
                            }
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
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={3} lg={3} sx={{ display: 'flex', alignItems: 'center' }}>
                    <span>Jadikan alamat utama</span>
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
                    <Switch
                      checked={mainAddress.isMainAddress}
                      onChange={(e) => {
                        setMainAddress({ ...mainAddress, isMainAddress: e.target.checked });
                        console.log(e.target.checked);
                      }}
                    />
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  size="large"
                  style={{ width: '100%', fontWeight: 'bold' }}
                  onClick={() => navigate('/AreaPelanggan')}
                >
                  Tambah Alamat
                </Button>

                {formEditProfile.customerName}
                <br />
                {formEditProfile.contact.phoneNumber + ' ' + formEditProfile.contact.email}
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
                {`${formEditProfile.birthDate.$D}
              ${formEditProfile.birthDate.$M}
              ${formEditProfile.birthDate.$y}`}

                <br />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <div style={{ width: '100%', textAlign: 'left' }}>
              <h4 style={{ marginTop: '8px', marginBottom: '8px' }}>Alamat Pelanggan</h4>
            </div>
            <AddressCard data={{}} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default EditProfile;
