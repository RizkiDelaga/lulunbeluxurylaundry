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
import LoadDecisions from '../../../../components/LoadDecisions/LoadDecisions';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditOffIcon from '@mui/icons-material/EditOff';

function ReasonsWhyChooseUs() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [listReasonsWhyChooseUs, setListReasonsWhyChooseUs] = useState([]);
  const [formReasonsWhyChooseUs, setFormReasonsWhyChooseUs] = useState({
    id: null,
    reasonTitle: '',
    description: '',
    photo: {
      img: null,
      fileName: null,
    },
  });
  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Edit Alasan Mengapa Memilih Kita';
    handleGetReasonsWhyChooseUs();
  }, []);

  const handleGetReasonsWhyChooseUs = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_KEY}/alasan`,
      });
      setListReasonsWhyChooseUs(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setListReasonsWhyChooseUs([]);
      }
      console.log(error);
    }
  };

  const handleCreateReasonsWhyChooseUs = async () => {
    const formData = new FormData();
    formData.append('judul', formReasonsWhyChooseUs.reasonTitle);
    formData.append('deskripsi', formReasonsWhyChooseUs.description);
    formData.append('gambar', formReasonsWhyChooseUs.photo.img);
    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/alasan`,
        data: formData,
      });
      if (res.status === 201) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Berhasil di Tambah!',
          statusType: 'success',
        });
      }
      setFormReasonsWhyChooseUs({
        id: null,
        reasonTitle: '',
        description: '',
        photo: { img: null, fileName: null },
      });
      handleGetReasonsWhyChooseUs();
    } catch (error) {
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });

      console.log(error);
    }
  };

  const handleUpdateReasonsWhyChooseUs = async () => {
    const formData = new FormData();
    formData.append('judul', formReasonsWhyChooseUs.reasonTitle);
    formData.append('deskripsi', formReasonsWhyChooseUs.description);
    formData.append('gambar', formReasonsWhyChooseUs.photo.img);
    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/alasan/${formReasonsWhyChooseUs.id}`,
        data: formData,
      });
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Berhasil di Edit!',
          statusType: 'success',
        });
      }
      setFormReasonsWhyChooseUs({
        id: null,
        reasonTitle: '',
        description: '',
        photo: { img: null, fileName: null },
      });
      handleGetReasonsWhyChooseUs();
    } catch (error) {
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
      console.log(error);
    }
  };

  const handleDeleteReasonsWhyChooseUs = async (id) => {
    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/alasan/${id}`,
      });
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Berhasil di Hapus!',
          statusType: 'success',
        });
      }
      handleGetReasonsWhyChooseUs();
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
            title: 'Alasan Mengapa Memilih Kami',
          }}
        />

        <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16" sx={{ flexDirection: 'column' }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Alasan Mengapa Memilih Kami</h2>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (formReasonsWhyChooseUs.id) {
                  handleUpdateReasonsWhyChooseUs();
                } else {
                  handleCreateReasonsWhyChooseUs();
                }
              }}
            >
              <div className="gap-16">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={1.8} lg={1.3} sx={{ display: 'flex', alignItems: 'center' }}>
                    <span>Judul Alasan</span>
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
                      label="Judul Alasan"
                      multiline
                      maxRows={4}
                      value={formReasonsWhyChooseUs.reasonTitle}
                      onChange={(e) => {
                        setFormReasonsWhyChooseUs({ ...formReasonsWhyChooseUs, reasonTitle: e.target.value });
                      }}
                      autoComplete="off"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={1.8} lg={1.3} sx={{ display: 'flex', alignItems: 'center' }}>
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
                      type="text"
                      label="Deskripsi"
                      multiline
                      maxRows={4}
                      value={formReasonsWhyChooseUs.description}
                      onChange={(e) => {
                        setFormReasonsWhyChooseUs({ ...formReasonsWhyChooseUs, description: e.target.value });
                      }}
                      autoComplete="off"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={1.8} lg={1.3}>
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
                              setFormReasonsWhyChooseUs({
                                ...formReasonsWhyChooseUs,
                                photo: {
                                  img: e.target.files[0],
                                  fileName: !e.target.files[0] ? null : e.target.files[0].name,
                                },
                              });
                            }}
                            hidden
                          />
                        </Button>
                      </Grid>
                      <Grid item xs="auto">
                        {formReasonsWhyChooseUs.photo.img || formReasonsWhyChooseUs.photo.fileName ? (
                          <img
                            id="output"
                            src={
                              formReasonsWhyChooseUs.photo.img
                                ? URL.createObjectURL(formReasonsWhyChooseUs.photo.img)
                                : formReasonsWhyChooseUs.photo.fileName
                            }
                            width={70}
                            alt="Preview"
                          />
                        ) : null}
                      </Grid>
                      <Grid item xs>
                        {formReasonsWhyChooseUs.photo.fileName ? (
                          <Chip
                            label={formReasonsWhyChooseUs.photo.fileName}
                            onDelete={() =>
                              setFormReasonsWhyChooseUs({
                                ...formReasonsWhyChooseUs,
                                photo: { img: null, fileName: null },
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
                  {formReasonsWhyChooseUs.id ? 'Simpan' : 'Tambah'}
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
                      Judul Alasan
                    </TableCell>
                    <TableCell style={{ width: 'fit-content', fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
                      Deskripsi
                    </TableCell>
                    <TableCell style={{ width: 60, fontWeight: 'bold', backgroundColor: '#eeeeee' }}>Foto</TableCell>
                    <TableCell style={{ width: 0, fontWeight: 'bold', backgroundColor: '#eeeeee' }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listReasonsWhyChooseUs.map((item, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                        <TableCell align="center">
                          <span>{index + 1}</span>
                        </TableCell>
                        <TableCell>
                          <span>{item.judul}</span>
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
                                if (formReasonsWhyChooseUs.id && formReasonsWhyChooseUs.id === item.id) {
                                  setFormReasonsWhyChooseUs({
                                    id: null,
                                    reasonTitle: '',
                                    description: '',
                                    photo: {},
                                  });
                                } else {
                                  setFormReasonsWhyChooseUs({
                                    id: item.id,
                                    reasonTitle: item.judul,
                                    description: item.deskripsi,
                                    photo: { img: null, fileName: item.gambar ? item.gambar : null },
                                  });
                                }
                              }}
                            >
                              {formReasonsWhyChooseUs.id && formReasonsWhyChooseUs.id === item.id ? (
                                <EditOffIcon />
                              ) : (
                                <EditIcon />
                              )}
                            </Button>
                            <Button
                              variant="outlined"
                              className={`button-outlined-danger`}
                              onClick={() => {
                                handleDeleteReasonsWhyChooseUs(item.id);
                                if (item.id === formReasonsWhyChooseUs.id) {
                                  setFormReasonsWhyChooseUs({
                                    id: null,
                                    reasonTitle: '',
                                    description: '',
                                    photo: {},
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
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default ReasonsWhyChooseUs;
