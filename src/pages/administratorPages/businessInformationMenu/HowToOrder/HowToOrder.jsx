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
    photo: { img: null, fileName: null },
  });

  const [formHowToOrderViaOutlet, setFormHowToOrderViaOutlet] = useState({
    id: null,
    stepTitle: '',
    description: '',
    photo: { img: null, fileName: null },
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
        url: `${process.env.REACT_APP_API_KEY}/carapesan`,
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

  const handleCreateHowToOrder = async (data, statusType) => {
    const formData = new FormData();
    formData.append('status', statusType);
    formData.append('judul', data.stepTitle);
    formData.append('deskripsi', data.description);
    formData.append('gambar', data.photo.img || data.photo.fileName);

    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/carapesan`,
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

  const handleUpdateHowToOrder = async (data, statusType) => {
    const formData = new FormData();
    formData.append('status', statusType);
    formData.append('judul', data.stepTitle);
    formData.append('deskripsi', data.description);
    formData.append('gambar', data.photo.img || data.photo.fileName);

    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/carapesan/${data.id}`,
        data: formData,
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
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/carapesan/${id}`,
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
          <Box className="gap-16" sx={{ flexDirection: 'column' }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Cara Pemesanan (Via Online)</h2>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log('click');
                if (formHowToOrderViaOnline.id) {
                  handleUpdateHowToOrder(formHowToOrderViaOnline, 'Online');
                } else {
                  handleCreateHowToOrder(formHowToOrderViaOnline, 'Online');
                }
                setFormHowToOrderViaOnline({
                  id: null,
                  stepTitle: '',
                  description: '',
                  photo: { img: null, fileName: null },
                });
              }}
            >
              <div className="gap-16">
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
                      type="text"
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
                  {formHowToOrderViaOnline.id ? 'Simpan' : 'Tambah'}
                </Button>
              </div>
            </form>

            <TableListDataHowToOrder
              listHowToOrder={listHowToOrder}
              formHowToOrder={formHowToOrderViaOnline}
              setFormHowToOrder={setFormHowToOrderViaOnline}
              deleteApiHandler={deleteApiHandler}
              statusType="Online"
            />

            {formHowToOrderViaOnline.stepTitle}
            <br />
            {formHowToOrderViaOnline.description}
            <br />
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16" sx={{ flexDirection: 'column' }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Cara Pemesanan (Via Outlet)</h2>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log('click');
                if (formHowToOrderViaOutlet.id) {
                  handleUpdateHowToOrder(formHowToOrderViaOutlet, 'Outlet');
                } else {
                  handleCreateHowToOrder(formHowToOrderViaOutlet, 'Outlet');
                }
                setFormHowToOrderViaOutlet({
                  id: null,
                  stepTitle: '',
                  description: '',
                  photo: { img: null, fileName: null },
                });
              }}
            >
              <div className="gap-16">
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
                      type="text"
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
                  {formHowToOrderViaOutlet.id ? 'Simpan' : 'Tambah'}
                </Button>
              </div>
            </form>

            <TableListDataHowToOrder
              listHowToOrder={listHowToOrder}
              formHowToOrder={formHowToOrderViaOutlet}
              setFormHowToOrder={setFormHowToOrderViaOutlet}
              deleteApiHandler={deleteApiHandler}
              statusType="Outlet"
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
                          if (props.formHowToOrder.id && props.formHowToOrder.id === item.id) {
                            props.setFormHowToOrder({
                              id: null,
                              stepTitle: '',
                              description: '',
                              photo: { img: null, fileName: null },
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
  );
};
