import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useTheme,
} from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditOffIcon from '@mui/icons-material/EditOff';
import LoadDecisions from '../../../../components/LoadDecisions/LoadDecisions';
import axios from 'axios';

function ServiceType() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [listServiceType, setListServiceType] = useState([]);
  const [formServiceType, setFormServiceType] = useState({
    id: null,
    serviceTypeName: '',
    serviceDuration: {
      days: null,
      hours: null,
      minutes: null,
    },
    description: '',
    photo: { img: null, fileName: '' },
  });
  const [nomor, setNomor] = useState(null);

  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Edit Jenis Layanan';
    getApiHandler();
  }, []);

  const getApiHandler = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/jenislayanan',
      });
      console.log('Response GET');
      console.log(res);
      setListServiceType(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setListServiceType([]);
      }
      console.log(error);
    }
  };

  const postApiHandler = async (data) => {
    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'POST',
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/jenislayanan',
        data: {
          layanan: data.serviceTypeName,
          hari: parseInt(data.serviceDuration.days),
          jam: parseInt(data.serviceDuration.hours),
          gambar: data.photo.fileName,
          deskripsi: data.description,
        },
      });
      console.log('Response POST');
      console.log(res);
      if (res.status === 201) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Berhasil di Tambah!',
          statusType: 'success',
        });
      }
      getApiHandler();
    } catch (error) {
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });

      console.log(error);
    }
  };

  const putApiHandler = async (data) => {
    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'PUT',
        url: `https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/jenislayanan/${data.id}`,
        data: {
          layanan: data.serviceTypeName,
          hari: parseInt(data.serviceDuration.days),
          jam: parseInt(data.serviceDuration.hours),
          gambar: data.photo.fileName,
          deskripsi: data.description,
        },
      });
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Berhasil di Edit!',
          statusType: 'success',
        });
      }
      console.log('Response DELETE');
      console.log(res);
      getApiHandler();
    } catch (error) {
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
      console.log(error);
    }
  };

  const deleteApiHandler = async (id) => {
    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'DELETE',
        url: `https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/jenislayanan/${id}`,
      });
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Berhasil di Hapus!',
          statusType: 'success',
        });
      }
      getApiHandler();
      console.log(res);
    } catch (error) {
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Informasi Bisnis"
          currentPage={{
            title: 'Jenis Layanan',
          }}
        />

        <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Jenis Layanan</h2>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.4} lg={1.9} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Nama Jenis Layanan</span>
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
                  label="Nama Jenis Layanan"
                  value={formServiceType.serviceTypeName}
                  onChange={(e) => {
                    setFormServiceType({ ...formServiceType, serviceTypeName: e.target.value });
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.4} lg={1.9} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Durasi Layanan *</span>
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
                      type="number"
                      label="Hari"
                      value={formServiceType.serviceDuration.days !== null ? formServiceType.serviceDuration.days : ''}
                      focused={formServiceType.serviceDuration.days !== null}
                      onChange={(e) => {
                        setFormServiceType({
                          ...formServiceType,
                          serviceDuration: { ...formServiceType.serviceDuration, days: e.target.value },
                        });
                      }}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={6} sm>
                    <TextField
                      type="number"
                      label="Jam"
                      value={
                        formServiceType.serviceDuration.hours !== null ? formServiceType.serviceDuration.hours : ''
                      }
                      focused={formServiceType.serviceDuration.hours !== null}
                      onChange={(e) => {
                        setFormServiceType({
                          ...formServiceType,
                          serviceDuration: { ...formServiceType.serviceDuration, hours: e.target.value },
                        });
                      }}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={6} sm>
                    <TextField
                      type="number"
                      label="Menit"
                      value={
                        formServiceType.serviceDuration.minutes !== null ? formServiceType.serviceDuration.minutes : ''
                      }
                      focused={formServiceType.serviceDuration.minutes !== null}
                      onChange={(e) => {
                        setFormServiceType({
                          ...formServiceType,
                          serviceDuration: { ...formServiceType.serviceDuration, minutes: e.target.value },
                        });
                      }}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.4} lg={1.9} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Deskripsi</span>
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
                  label="Deskripsi"
                  multiline
                  maxRows={4}
                  value={formServiceType.description}
                  onChange={(e) => {
                    setFormServiceType({
                      ...formServiceType,
                      description: e.target.value,
                    });
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.4} lg={1.9}>
                <span>Foto/Icon/Illustrasi</span>
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
                          setFormServiceType({
                            ...formServiceType,
                            photo: {
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
                    {formServiceType.photo.img ? (
                      <img
                        id="output"
                        src={formServiceType.photo.img ? URL.createObjectURL(formServiceType.photo.img) : ''}
                        width={70}
                        alt="Preview"
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs>
                    {formServiceType.photo.fileName ? (
                      <Chip
                        label={formServiceType.photo.fileName}
                        onDelete={() => setFormServiceType({ ...formServiceType, photo: { img: null, fileName: '' } })}
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
              onClick={() => {
                if (formServiceType.id) {
                  putApiHandler(formServiceType);
                } else {
                  postApiHandler(formServiceType);
                }
                setFormServiceType({
                  id: null,
                  serviceTypeName: '',
                  serviceDuration: {
                    days: null,
                    hours: null,
                    minutes: null,
                  },
                  description: '',
                  photo: { img: null, fileName: '' },
                });
                setNomor(parseInt(1));
              }}
              style={{ width: '100%', fontWeight: 'bold' }}
            >
              {formServiceType.id ? 'Simpan' : 'Tambah'}
            </Button>

            <TableContainer sx={{ width: '100%', borderRadius: '4px', backgroundColor: '#eeeeee' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ width: 0, fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
                      No
                    </TableCell>
                    <TableCell style={{ width: 'fit-content', fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
                      Jenis Layanan
                    </TableCell>
                    <TableCell style={{ width: 'fit-content', fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
                      Durasi
                    </TableCell>
                    <TableCell style={{ width: 'fit-content', fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
                      Deskripsi
                    </TableCell>
                    <TableCell style={{ width: 60, fontWeight: 'bold', backgroundColor: '#eeeeee' }}>Foto</TableCell>
                    <TableCell style={{ width: 0, fontWeight: 'bold', backgroundColor: '#eeeeee' }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listServiceType.map((item, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                        <TableCell align="center">
                          <span>{index + 1}</span>
                        </TableCell>
                        <TableCell>
                          <span>{item.layanan}</span>
                        </TableCell>
                        <TableCell>
                          <span>
                            {item.hari ? `${item.hari} Hari` : null} {item.jam ? ` ${item.jam} Jam` : null}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span>{item.deskripsi}</span>
                        </TableCell>
                        <TableCell>
                          <span>{item.gambar ? <img src="" width={60} alt={item.gambar} /> : null}</span>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: 'flex',
                              gap: '10px',
                              [theme.breakpoints.down('md')]: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                              },
                            }}
                          >
                            <Grid container>
                              <Grid item sm={12} md={6}></Grid>
                              <Grid item sm={12} md={6}></Grid>
                            </Grid>
                            <Button
                              variant="outlined"
                              className={`button-outlined-primary`}
                              onClick={() => {
                                if (formServiceType.id && formServiceType.id === item.id) {
                                  setFormServiceType({
                                    id: null,
                                    serviceTypeName: '',
                                    serviceDuration: {
                                      days: null,
                                      hours: null,
                                      minutes: null,
                                    },
                                    description: '',
                                    photo: { img: null, fileName: '' },
                                  });
                                } else {
                                  setFormServiceType({
                                    id: item.id,
                                    serviceTypeName: item.layanan,
                                    serviceDuration: {
                                      days: item.hari,
                                      hours: item.jam,
                                      minutes: null,
                                    },
                                    description: item.deskripsi,
                                    photo: { img: null, fileName: item.gambar },
                                  });
                                  console.log(typeof parseInt(formServiceType.serviceDuration.jam));
                                }
                              }}
                            >
                              {formServiceType.id && formServiceType.id === item.id ? <EditOffIcon /> : <EditIcon />}
                            </Button>
                            <Button
                              variant="outlined"
                              className={`button-outlined-danger`}
                              onClick={() => {
                                if (item.id === formServiceType.id) {
                                  setFormServiceType({
                                    id: null,
                                    serviceTypeName: '',
                                    serviceDuration: {
                                      days: null,
                                      hours: null,
                                      minutes: null,
                                    },
                                    description: '',
                                    photo: { img: null, fileName: '' },
                                  });
                                }
                                deleteApiHandler(item.id);
                              }}
                              sx={{ width: '100%' }}
                            >
                              <DeleteForeverIcon />
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {formServiceType.serviceTypeName}
            <br />
            {formServiceType.serviceDuration.days +
              ' ' +
              formServiceType.serviceDuration.hours +
              ' ' +
              formServiceType.serviceDuration.minutes}
            <br />
            {formServiceType.description}
            <br />
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default ServiceType;
