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

function LaundryType() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [listLaundryType, setListLaundryType] = useState([]);
  const [formLaundryType, setFormLaundryType] = useState({
    id: null,
    laundryTypeName: '',
    description: '',
    photo: { img: null, fileName: null },
  });
  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Edit Jenis Laundry';
    handleGetLaundryType();
  }, []);

  const handleGetLaundryType = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_KEY}/jenislaundry`,
      });
      console.log('Response GET');
      console.log(res);
      setListLaundryType(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setListLaundryType([]);
      }
      console.log(error);
    }
  };

  const handleCreateLaundryType = async (data) => {
    const formData = new FormData();
    formData.append('nama', formLaundryType.laundryTypeName);
    formData.append('deskripsi', formLaundryType.description);
    formData.append('gambar', formLaundryType.photo.img);

    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/jenislaundry`,
        data: formData,
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
      setFormLaundryType({
        id: null,
        laundryTypeName: '',
        description: '',
        photo: { img: null, fileName: null },
      });
      handleGetLaundryType();
    } catch (error) {
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });

      console.log(error);
    }
  };

  const handleUpdateLaundryType = async () => {
    const formData = new FormData();
    formData.append('nama', formLaundryType.laundryTypeName);
    formData.append('deskripsi', formLaundryType.description);
    formData.append('gambar', formLaundryType.photo.img);

    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/jenislaundry/${formLaundryType.id}`,
        data: formData,
      });
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Berhasil di Edit!',
          statusType: 'success',
        });
      }
      setFormLaundryType({
        id: null,
        laundryTypeName: '',
        description: '',
        photo: { img: null, fileName: null },
      });
      console.log('Response DELETE');
      console.log(res);
      handleGetLaundryType();
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
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/jenislaundry/${id}`,
      });
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Berhasil di Hapus!',
          statusType: 'success',
        });
      }
      handleGetLaundryType();
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
            title: 'Jenis Laundry',
          }}
        />

        <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16" sx={{ flexDirection: 'column' }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Jenis Laundry</h2>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log('click');
                if (formLaundryType.id) {
                  handleUpdateLaundryType();
                } else {
                  handleCreateLaundryType();
                }
              }}
            >
              <div className="gap-16">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={2.6} lg={1.9} sx={{ display: 'flex', alignItems: 'center' }}>
                    <span>Nama Jenis Laundry</span>
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
                      label="Nama Jenis Laundry"
                      value={formLaundryType.laundryTypeName}
                      onChange={(e) => {
                        setFormLaundryType({
                          ...formLaundryType,
                          laundryTypeName: e.target.value,
                        });
                      }}
                      autoComplete="off"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={2.6} lg={1.9} sx={{ display: 'flex', alignItems: 'center' }}>
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
                      required
                      label="Deskripsi"
                      multiline
                      maxRows={4}
                      value={formLaundryType.description}
                      onChange={(e) => {
                        setFormLaundryType({
                          ...formLaundryType,
                          description: e.target.value,
                        });
                      }}
                      autoComplete="off"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={2.6} lg={1.9}>
                    <span>Foto</span>
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
                              setFormLaundryType({
                                ...formLaundryType,
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
                        {formLaundryType.photo.img ? (
                          <img
                            id="output"
                            src={formLaundryType.photo.img ? URL.createObjectURL(formLaundryType.photo.img) : ''}
                            width={70}
                            alt="Preview"
                          />
                        ) : null}
                      </Grid>
                      <Grid item xs>
                        {formLaundryType.photo.fileName ? (
                          <Chip
                            label={formLaundryType.photo.fileName}
                            onDelete={() =>
                              setFormLaundryType({ ...formLaundryType, photo: { img: null, fileName: null } })
                            }
                            sx={{ maxWidth: '250px' }}
                          />
                        ) : null}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Button variant="contained" size="large" type="submit" sx={{ width: '100%', fontWeight: 'bold' }}>
                  {formLaundryType.id ? 'Simpan' : 'Tambah'}
                </Button>
              </div>
            </form>

            <TableContainer sx={{ width: '100%', borderRadius: '4px', backgroundColor: '#eeeeee' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ width: 0, fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
                      No
                    </TableCell>
                    <TableCell style={{ width: 'fit-content', fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
                      Jenis Laundry
                    </TableCell>
                    <TableCell style={{ width: 'fit-content', fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
                      Deskripsi
                    </TableCell>
                    <TableCell style={{ width: 60, fontWeight: 'bold', backgroundColor: '#eeeeee' }}>Foto</TableCell>
                    <TableCell style={{ width: 0, fontWeight: 'bold', backgroundColor: '#eeeeee' }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listLaundryType.map((item, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                        <TableCell align="center">
                          <span>{index + 1}</span>
                        </TableCell>
                        <TableCell>
                          <span>{item.nama}</span>
                        </TableCell>
                        <TableCell>
                          <span>{item.deskripsi}</span>
                        </TableCell>
                        <TableCell>
                          <span>{item.gambar ? <img src={item.gambar} width={60} alt={item.gambar} /> : null}</span>
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
                                if (formLaundryType.id && formLaundryType.id === item.id) {
                                  setFormLaundryType({
                                    id: null,
                                    laundryTypeName: '',
                                    description: '',
                                    photo: { img: null, fileName: null },
                                  });
                                } else {
                                  setFormLaundryType({
                                    id: item.id,
                                    laundryTypeName: item.nama,
                                    description: item.deskripsi,
                                    photo: { img: null, fileName: item.gambar ? item.gambar : null },
                                  });
                                }
                              }}
                            >
                              {formLaundryType.id && formLaundryType.id === item.id ? <EditOffIcon /> : <EditIcon />}
                            </Button>
                            <Button
                              variant="outlined"
                              className={`button-outlined-danger`}
                              onClick={() => {
                                deleteApiHandler(item.id);
                                if (item.id === formLaundryType.id) {
                                  setFormLaundryType({
                                    id: null,
                                    laundryTypeName: '',
                                    description: '',
                                    photo: { img: null, fileName: null },
                                  });
                                }
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

            {formLaundryType.laundryTypeName}
            <br />
            {formLaundryType.description}
            <br />
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default LaundryType;
