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

function HowToOrder() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [listHowToOrder, setListHowToOrder] = useState([]);
  const [formHowToOrderViaOnline, setFormHowToOrderViaOnline] = useState({
    id: null,
    stepTitle: '',
    description: '',
    photo: { img: null, fileName: '' },
  });

  const [formHowToOrderViaOutlet, setFormHowToOrderViaOutlet] = useState({
    id: null,
    stepTitle: '',
    description: '',
    photo: { img: null, fileName: '' },
  });

  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Edit Cara Pemesanan';
    getApiHandler();
  }, []);

  const getApiHandler = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/carapesan',
      });
      console.log('Response GET');
      console.log(res);
      setListHowToOrder(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setListHowToOrder([]);
      }
      console.log(error);
    }
  };

  const postApiHandler = async (data, statusType) => {
    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'POST',
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/carapesan',
        data: {
          status: statusType,
          judul: data.stepTitle,
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

  const putApiHandler = async (data, statusType) => {
    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'PUT',
        url: `https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/carapesan/${data.id}`,
        data: {
          status: statusType,
          judul: data.stepTitle,
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
        url: `https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/carapesan/${id}`,
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
            title: 'Cara Pemesanan',
          }}
        />

        <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Cara Pemesanan (Via Online)</h2>
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={1.9} lg={1.4} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Judul Langkah</span>
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
                  label="Judul Langkah"
                  value={formHowToOrderViaOnline.stepTitle}
                  onChange={(e) => {
                    setFormHowToOrderViaOnline({
                      ...formHowToOrderViaOnline,
                      stepTitle: e.target.value,
                    });
                  }}
                  autoComplete="off"
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={1.9} lg={1.4} sx={{ display: 'flex', alignItems: 'center' }}>
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
                  value={formHowToOrderViaOnline.description}
                  onChange={(e) => {
                    setFormHowToOrderViaOnline({
                      ...formHowToOrderViaOnline,
                      description: e.target.value,
                    });
                  }}
                  autoComplete="off"
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={1.9} lg={1.4}>
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
                          setFormHowToOrderViaOnline({
                            ...formHowToOrderViaOnline,

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
                    {formHowToOrderViaOnline.photo.img ? (
                      <img
                        id="output"
                        src={
                          formHowToOrderViaOnline.photo.img
                            ? URL.createObjectURL(formHowToOrderViaOnline.photo.img)
                            : ''
                        }
                        width={70}
                        alt="Preview"
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs>
                    {formHowToOrderViaOnline.photo.fileName ? (
                      <Chip
                        label={formHowToOrderViaOnline.photo.fileName}
                        onDelete={() =>
                          setFormHowToOrderViaOnline({
                            ...formHowToOrderViaOnline,
                            photo: { img: null, fileName: '' },
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
              onClick={() => {
                if (formHowToOrderViaOnline.id) {
                  putApiHandler(formHowToOrderViaOnline, 'Via Online');
                } else {
                  postApiHandler(formHowToOrderViaOnline, 'Via Online');
                }
                setFormHowToOrderViaOnline({
                  id: null,
                  stepTitle: '',
                  description: '',
                  photo: { img: null, fileName: '' },
                });
              }}
              style={{ width: '100%', fontWeight: 'bold' }}
            >
              {formHowToOrderViaOnline.id ? 'Simpan' : 'Tambah'}
            </Button>

            <TableListDataHowToOrder
              listHowToOrder={listHowToOrder}
              formHowToOrder={formHowToOrderViaOnline}
              setFormHowToOrder={setFormHowToOrderViaOnline}
              deleteApiHandler={deleteApiHandler}
              statusType="Via Online"
            />

            {formHowToOrderViaOnline.stepTitle}
            <br />
            {formHowToOrderViaOnline.description}
            <br />
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Cara Pemesanan (Via Outlet)</h2>
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={1.9} lg={1.4} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Judul Langkah</span>
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
                  label="Judul Langkah"
                  value={formHowToOrderViaOutlet.stepTitle}
                  onChange={(e) => {
                    setFormHowToOrderViaOutlet({
                      ...formHowToOrderViaOutlet,
                      stepTitle: e.target.value,
                    });
                  }}
                  autoComplete="off"
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={1.9} lg={1.4} sx={{ display: 'flex', alignItems: 'center' }}>
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
                  value={formHowToOrderViaOutlet.description}
                  onChange={(e) => {
                    setFormHowToOrderViaOutlet({
                      ...formHowToOrderViaOutlet,
                      description: e.target.value,
                    });
                  }}
                  autoComplete="off"
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={1.9} lg={1.4}>
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
                          setFormHowToOrderViaOutlet({
                            ...formHowToOrderViaOutlet,
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
                    {formHowToOrderViaOutlet.photo.img ? (
                      <img
                        id="output"
                        src={
                          formHowToOrderViaOutlet.photo.img
                            ? URL.createObjectURL(formHowToOrderViaOutlet.photo.img)
                            : ''
                        }
                        width={70}
                        alt="Preview"
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs>
                    {formHowToOrderViaOutlet.photo.fileName ? (
                      <Chip
                        label={formHowToOrderViaOutlet.photo.fileName}
                        onDelete={() =>
                          setFormHowToOrderViaOutlet({
                            ...formHowToOrderViaOutlet,
                            photo: { img: null, fileName: '' },
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
              onClick={() => {
                if (formHowToOrderViaOutlet.id) {
                  putApiHandler(formHowToOrderViaOutlet, 'Via Outlet');
                } else {
                  postApiHandler(formHowToOrderViaOutlet, 'Via Outlet');
                }
                setFormHowToOrderViaOutlet({
                  id: null,
                  stepTitle: '',
                  description: '',
                  photo: { img: null, fileName: '' },
                });
              }}
              style={{ width: '100%', fontWeight: 'bold' }}
            >
              {formHowToOrderViaOutlet.id ? 'Simpan' : 'Tambah'}
            </Button>

            <TableListDataHowToOrder
              listHowToOrder={listHowToOrder}
              formHowToOrder={formHowToOrderViaOutlet}
              setFormHowToOrder={setFormHowToOrderViaOutlet}
              deleteApiHandler={deleteApiHandler}
              statusType="Via Outlet"
            />

            {formHowToOrderViaOutlet.stepTitle}
            <br />
            {formHowToOrderViaOutlet.description}
            <br />
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default HowToOrder;

const TableListDataHowToOrder = (props) => {
  const theme = useTheme();

  return (
    <TableContainer sx={{ width: '100%', borderRadius: '4px', backgroundColor: '#eeeeee' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ width: 0, fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
              No
            </TableCell>
            <TableCell style={{ width: 'fit-content', fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
              Judul Langkah
            </TableCell>
            <TableCell style={{ width: 'fit-content', fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
              Deskripsi
            </TableCell>
            <TableCell style={{ width: 60, fontWeight: 'bold', backgroundColor: '#eeeeee' }}>Foto</TableCell>
            <TableCell style={{ width: 0, fontWeight: 'bold', backgroundColor: '#eeeeee' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.listHowToOrder
            .filter((filterItem) => filterItem.status === props.statusType)
            .map((item, index) => {
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
                    <span>{item.gambar}</span>
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
                          if (props.formHowToOrder.id && props.formHowToOrder.id === item.id) {
                            props.setFormHowToOrder({
                              id: null,
                              stepTitle: '',
                              description: '',
                              photo: { img: null, fileName: '' },
                            });
                          } else {
                            props.setFormHowToOrder({
                              id: item.id,
                              stepTitle: item.judul,
                              description: item.deskripsi,
                              photo: { img: null, fileName: item.gambar },
                            });
                          }
                        }}
                      >
                        {props.formHowToOrder.id && props.formHowToOrder.id === item.id ? (
                          <EditOffIcon />
                        ) : (
                          <EditIcon />
                        )}
                      </Button>
                      <Button
                        variant="outlined"
                        className={`button-outlined-danger`}
                        onClick={() => {
                          props.deleteApiHandler(item.id);
                          if (item.id === props.formHowToOrder.id) {
                            props.setFormHowToOrder({
                              id: null,
                              stepTitle: '',
                              description: '',
                              photo: { img: null, fileName: '' },
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
  );
};
