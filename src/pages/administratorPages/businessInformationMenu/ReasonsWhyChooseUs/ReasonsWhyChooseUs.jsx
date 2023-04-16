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
      fileName: '',
    },
  });
  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Edit Alasan Mengapa Memilih Kita';
    getApiHandler();
  }, []);

  const getApiHandler = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/alasan',
      });
      console.log('Response GET');
      console.log(res);
      setListReasonsWhyChooseUs(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setListReasonsWhyChooseUs([]);
      }
      console.log(error);
    }
  };

  const postApiHandler = async (data) => {
    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'POST',
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/alasan',
        data: {
          judul: data.reasonTitle,
          deskripsi: data.description,
          gambar: data.photo.fileName,
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
        url: `https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/alasan/${data.id}`,
        data: {
          judul: data.reasonTitle,
          deskripsi: data.description,
          gambar: data.photo.fileName,
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
        url: `https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/alasan/${id}`,
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
            title: 'Alasan Mengapa Memilih Kami',
          }}
        />

        <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Alasan Mengapa Memilih Kami</h2>
            </div>

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
                  required
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
                          console.log(e.target.files);
                          setFormReasonsWhyChooseUs({
                            ...formReasonsWhyChooseUs,
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
                    {formReasonsWhyChooseUs.photo.img ? (
                      <img
                        id="output"
                        src={
                          formReasonsWhyChooseUs.photo.img ? URL.createObjectURL(formReasonsWhyChooseUs.photo.img) : ''
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
                          setFormReasonsWhyChooseUs({ ...formReasonsWhyChooseUs, photo: { img: null, fileName: '' } })
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
              onClick={() => {
                if (formReasonsWhyChooseUs.id) {
                  putApiHandler(formReasonsWhyChooseUs);
                } else {
                  postApiHandler(formReasonsWhyChooseUs);
                }
                setFormReasonsWhyChooseUs({
                  id: null,
                  reasonTitle: '',
                  description: '',
                  photo: { img: null, fileName: '' },
                });
              }}
              style={{ width: '100%', fontWeight: 'bold' }}
            >
              {formReasonsWhyChooseUs.id ? 'Simpan' : 'Tambah'}
            </Button>

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
                                deleteApiHandler(item.id);
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

            {formReasonsWhyChooseUs.reasonTitle}
            <br />
            {formReasonsWhyChooseUs.description}
            <br />
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default ReasonsWhyChooseUs;
