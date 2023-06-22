import {
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
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddressCard from '../../../../components/Card/AddressCard';
import { banyumasAreaList } from '../../../../utils/banyumasAreaList';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import LoadDecisions from '../../../../components/LoadDecisions/LoadDecisions';
import axios from 'axios';
import dayjs from 'dayjs';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

function EditCustomerInformation() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [urbanVillage, setUrbanVillage] = useState();
  const [formEditCustomerInformation, setFormEditCustomerInformation] = useState({
    customerName: '',
    contact: {
      phoneNumber: '',
      email: '',
    },
    birthDate: dayjs,
    profilePicture: { img: null, fileName: null },
  });
  const [listCustomerAddress, setListCustomerAddress] = useState([]);
  const [mainAddress, setMainAddress] = useState({
    id: null,
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
    isMainAddress: false,
  });
  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Edit Profil Pelanggan';
    handleGetCustomerProfile();
    handleGetCustomerAddress();
  }, []);

  const handleGetCustomerProfile = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/admin/user/${id}`,
      });
      console.log('Response GET Data My Profile');
      console.log(res);

      setFormEditCustomerInformation({
        customerName: res.data.data.nama,
        contact: {
          phoneNumber: res.data.data.noTelp,
          email: res.data.data.email || '',
        },
        birthDate: res.data.data.tglLahir ? dayjs(res.data.data.tglLahir) : dayjs,
        profilePicture: { img: null, fileName: res.data.data.profilePic },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCustomerProfile = async () => {
    const formData = new FormData();
    formData.append('nama', formEditCustomerInformation.customerName);
    formData.append('noTelp', formEditCustomerInformation.contact.phoneNumber);

    formData.append('email', formEditCustomerInformation.contact.email);
    if (typeof formEditCustomerInformation.birthDate !== 'function') {
      formData.append('tglLahir', formEditCustomerInformation.birthDate);
    }
    formData.append('profilePic', formEditCustomerInformation.profilePicture.img);

    setOpenLoadDecision({ ...openLoadDecision, isLoad: true });

    try {
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/admin/user/${id}`,
        data: formData,
      });

      console.log(res);
      handleGetCustomerProfile();
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Edit Berhasil!',
          statusType: 'success',
        });
      }
    } catch (error) {
      console.log(error);
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
    }
  };

  const handleGetCustomerAddress = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/admin/user-address/${id}`,
      });
      console.log('Response GET Data My Address');
      console.log(res);

      setListCustomerAddress(res.data.data);
      handleGetCustomerProfile();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateAddress = async () => {
    const formData = new FormData();
    formData.append('kategori', mainAddress.buildingDetails.buildingType);
    formData.append('detail', mainAddress.buildingDetails.buildingName_Or_Number);
    formData.append('kecamatan', mainAddress.region.subDistrict);
    formData.append('kelurahan', mainAddress.region.urbanVillage);
    formData.append('rt', mainAddress.region.neighbourhood);
    formData.append('rw', mainAddress.region.hamlet);
    formData.append('deskripsi', mainAddress.addressDetails);
    formData.append('gambar', mainAddress.buildingPhoto.img);
    formData.append('status', mainAddress.isMainAddress ? 'Priority' : 'Standard');

    setOpenLoadDecision({ ...openLoadDecision, isLoad: true });

    try {
      const res = await axios({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/admin/user-address/${id}`,
        data: formData,
      });
      console.log('Response POST Data My Address');
      console.log(res);
      setMainAddress({
        id: null,
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
        // makeItMainAddress: false,
        isMainAddress: false,
      });
      setUrbanVillage();
      handleGetCustomerAddress();
      if (res.status === 201) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Tambah Alamat Berhasil!',
          statusType: 'success',
        });
      }
    } catch (error) {
      console.log(error);
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
    }
  };

  const handleUpdateAddress = async () => {
    const formData = new FormData();
    formData.append('kategori', mainAddress.buildingDetails.buildingType);
    formData.append('detail', mainAddress.buildingDetails.buildingName_Or_Number);
    formData.append('kecamatan', mainAddress.region.subDistrict);
    formData.append('kelurahan', mainAddress.region.urbanVillage);
    formData.append('rt', mainAddress.region.neighbourhood);
    formData.append('rw', mainAddress.region.hamlet);
    formData.append('deskripsi', mainAddress.addressDetails);
    formData.append('gambar', mainAddress.buildingPhoto.img);
    formData.append('status', mainAddress.isMainAddress ? 'Priority' : 'Standard');

    setOpenLoadDecision({ ...openLoadDecision, isLoad: true });

    try {
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/admin/user-address/${id}/${mainAddress.id}`,
        data: formData,
      });
      console.log('Response PUT Data My Address');
      console.log(res);
      setMainAddress({
        id: null,
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
        isMainAddress: false,
      });
      setUrbanVillage();
      handleGetCustomerAddress();
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Update Alamat Pelanggan Berhasil!',
          statusType: 'success',
        });
      }
    } catch (error) {
      console.log(error);
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
    }
  };

  const handleDeleteAddress = async (addressId) => {
    setOpenLoadDecision({ ...openLoadDecision, isLoad: true });

    try {
      const res = await axios({
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/admin/user-address/${id}/${addressId}`,
      });
      console.log('Response DELETE Data My Address');
      console.log(res);
      handleGetCustomerAddress();
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Hapus Alamat Berhasil!',
          statusType: 'success',
        });
      }
    } catch (error) {
      console.log(error);
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
    }
  };

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Area Pelanggan"
          currentPage={{
            title: 'Edit Profil Pelanggan',
          }}
        />
        <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log('click');
              handleUpdateCustomerProfile();
            }}
          >
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
                    type="text"
                    label="Nama Langkap"
                    value={formEditCustomerInformation.customerName}
                    onChange={(e) => {
                      setFormEditCustomerInformation({
                        ...formEditCustomerInformation,
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
                        value={formEditCustomerInformation.contact.phoneNumber}
                        disabled="true"
                        onChange={(e) => {
                          setFormEditCustomerInformation({
                            ...formEditCustomerInformation,
                            contact: { ...formEditCustomerInformation.contact, phoneNumber: e.target.value },
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
                        type="text"
                        value={formEditCustomerInformation.contact.email}
                        onChange={(e) => {
                          setFormEditCustomerInformation({
                            ...formEditCustomerInformation,
                            contact: { ...formEditCustomerInformation.contact, email: e.target.value },
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
                      value={formEditCustomerInformation.birthDate}
                      onChange={(value) => {
                        setFormEditCustomerInformation({ ...formEditCustomerInformation, birthDate: value });

                        console.log(formEditCustomerInformation.birthDate);
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
                            setFormEditCustomerInformation({
                              ...formEditCustomerInformation,
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
                      {formEditCustomerInformation.profilePicture.img ? (
                        <img
                          id="output"
                          src={
                            formEditCustomerInformation.profilePicture.img
                              ? URL.createObjectURL(formEditCustomerInformation.profilePicture.img)
                              : ''
                          }
                          width={70}
                          alt="Preview"
                        />
                      ) : null}
                    </Grid>
                    <Grid item xs>
                      {formEditCustomerInformation.profilePicture.fileName ? (
                        <Chip
                          label={formEditCustomerInformation.profilePicture.fileName}
                          onDelete={() =>
                            setFormEditCustomerInformation({
                              ...formEditCustomerInformation,
                              profilePicture: { img: null, fileName: null },
                            })
                          }
                          sx={{ maxWidth: '250px' }}
                        />
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Button variant="contained" size="large" type="submit" sx={{ width: '100%', fontWeight: 'bold' }}>
                Edit Profil
              </Button>
            </Box>
          </form>
        </Paper>

        {/* Address Configuration */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Paper
              elevation={3}
              sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log('click');
                  if (mainAddress.id) {
                    handleUpdateAddress();
                  } else {
                    handleCreateAddress();
                  }
                }}
              >
                <Box className="gap-16" sx={{ flexDirection: 'column' }}>
                  <div style={{ width: '100%', textAlign: 'center' }}>
                    <h4 style={{ marginTop: '8px', marginBottom: '8px' }}>
                      {mainAddress.id ? 'Update Alamat' : 'Tambah Alamat'}
                    </h4>
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
                              value={mainAddress.buildingDetails.buildingType || ''}
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
                            type="text"
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

                  <div style={{ display: 'flex', gap: 4, justifyContent: 'space-between' }}>
                    <Button
                      variant="contained"
                      size="large"
                      type="submit"
                      sx={{ width: '100%', fontWeight: 'bold' }}
                      // onClick={() => {
                      //   if (mainAddress.id) {
                      //     handleUpdateAddress();
                      //   } else {
                      //     handleCreateAddress();
                      //   }
                      // }}
                    >
                      {mainAddress.id ? 'Update Alamat' : 'Tambah Alamat'}
                    </Button>
                    {mainAddress.id ? (
                      <Button
                        variant="outlined"
                        size="large"
                        style={{ width: 'fit-content', fontWeight: 'bold' }}
                        onClick={() => {
                          setMainAddress({
                            id: null,
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
                            // makeItMainAddress: false,
                            isMainAddress: false,
                          });
                          setUrbanVillage();
                        }}
                      >
                        Batal
                      </Button>
                    ) : null}
                  </div>

                  <div>
                    {formEditCustomerInformation.customerName}
                    <br />
                    {formEditCustomerInformation.contact.phoneNumber + ' ' + formEditCustomerInformation.contact.email}
                    <br />
                    {mainAddress.region.subDistrict +
                      ' ' +
                      mainAddress.region.urbanVillage +
                      ' ' +
                      mainAddress.region.hamlet +
                      ' ' +
                      mainAddress.region.neighbourhood}
                    <br />
                    {mainAddress.buildingDetails.buildingType +
                      ' ' +
                      mainAddress.buildingDetails.buildingName_Or_Number}
                    <br />
                    {mainAddress.addressDetails}
                    {/* {mainAddress.makeItMainAddress} */}
                    {`${formEditCustomerInformation.birthDate.$D}
              ${formEditCustomerInformation.birthDate.$M}
              ${formEditCustomerInformation.birthDate.$y}`}
                  </div>

                  <br />
                </Box>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <div style={{ width: '100%', textAlign: 'left' }}>
              <h4 style={{ marginTop: '8px', marginBottom: '8px' }}>Alamat Pelanggan</h4>
            </div>
            <div className="gap-10">
              {listCustomerAddress.map((item) => {
                return (
                  <AddressCard
                    data={item}
                    setUpdateAddress={setMainAddress}
                    setUrbanVillage={setUrbanVillage}
                    handleDeleteAddress={handleDeleteAddress}
                  />
                );
              })}
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default EditCustomerInformation;
