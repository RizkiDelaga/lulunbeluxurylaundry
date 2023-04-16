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

function CreateNewEvents() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [listReward, setListReward] = useState([]);
  const [reward, setReward] = useState({ id: null, rewardText: '', currentIndex: null });

  const [listCriteria, setListCriteria] = useState([]);
  const [criteria, setCriteria] = useState({ id: null, criteriaText: '', currentIndex: null });

  const [formCreateNewEvents, setFormCreateNewEvents] = useState({
    id: null,
    eventName: '',
    dateStart: '',
    dateEnd: '',
    description: '',
    reward: [],
    criteria: [],
    poster: { img: null, fileName: '' },
  });
  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Buat Event Baru';
  }, []);

  const postApiHandler = async (data) => {
    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'POST',
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/acara',
        data: {
          adminId: 1,
          nama: data.eventName,
          gambar: data.poster.fileName,
          deskripsi: data.description,
          kriteria: listCriteria.map((itemCriteria) => itemCriteria.criteriaText),
          reward: listReward.map((itemReward) => itemReward.rewardText),
          status: 'akan datang',
          jumlah: 200,
          tglMulai: '2023-03-15T07:00:00Z',
          tglSelesai: '2023-04-17T23:59:59Z',
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
          defaultMenu="Event"
          currentPage={{
            title: 'Buat Event Baru',
          }}
        />

        <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} redirect={'/Event'} />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Buat Event Baru</h2>
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.6} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Nama Event</span>
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
                  label="Nama Event"
                  value={formCreateNewEvents.eventName}
                  onChange={(e) => {
                    setFormCreateNewEvents({
                      ...formCreateNewEvents,
                      eventName: e.target.value,
                    });
                  }}
                  autoComplete="off"
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.6} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Tanggal Mulai</span>
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
                    <TextField required label="Nama Barang" sx={{ width: '100%' }} />
                  </Grid>
                  <Grid item xs={12} sm>
                    <TextField required label="Kuantitas" type="number" sx={{ width: '100%' }} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.6} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Tanggal Berakhir</span>
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
                    <TextField required label="Nama Barang" sx={{ width: '100%' }} />
                  </Grid>
                  <Grid item xs={12} sm>
                    <TextField required label="Kuantitas" type="number" sx={{ width: '100%' }} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.6} sx={{ display: 'flex', alignItems: 'center' }}>
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
                  value={formCreateNewEvents.description}
                  onChange={(e) => {
                    setFormCreateNewEvents({
                      ...formCreateNewEvents,
                      description: e.target.value,
                    });
                  }}
                  autoComplete="off"
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.6}>
                <span>Reward / Benefit</span>
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
                  <Grid
                    item
                    xs={12}
                    lg
                    sx={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'end' }}
                  >
                    <TextField
                      label="Reward / Benefit"
                      multiline
                      maxRows={4}
                      value={reward.rewardText}
                      onChange={(e) => {
                        setReward({
                          ...reward,
                          rewardText: e.target.value,
                        });
                      }}
                      autoComplete="off"
                      sx={{ width: '100%' }}
                    />
                    <Button
                      variant="outlined"
                      className="button-outlined-primary"
                      onClick={() => {
                        console.log(reward);
                        console.log(listReward);

                        if (reward.id) {
                          listReward.splice(reward.currentIndex, 1);
                          let leftArraySplice = listReward.splice(0, reward.currentIndex);
                          let rightArraySplice = listReward.splice(0, listReward.length + 1);

                          setListReward([...leftArraySplice, reward, ...rightArraySplice]);
                        } else {
                          setListReward([
                            ...listReward,
                            {
                              id:
                                listReward.length === 0
                                  ? listReward.length + 1
                                  : listReward[listReward.length - 1].id + 1,
                              rewardText: reward.rewardText,
                            },
                          ]);
                        }
                        setReward({ id: null, rewardText: '', currentIndex: null });

                        console.log('Is Null:');
                        console.log(reward.id === null);
                        console.log(listReward.length + 1);
                      }}
                      sx={{ width: 'fit-content' }}
                    >
                      {reward.id ? 'Simpan' : 'Tambah'}
                    </Button>
                  </Grid>
                  <Grid item xs={12} lg>
                    <TableContainer
                      sx={{ width: '100%', maxHeight: '400px', borderRadius: '4px', backgroundColor: '#eeeeee' }}
                    >
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              align="center"
                              style={{ width: 0, fontWeight: 'bold', backgroundColor: '#eeeeee' }}
                            >
                              No
                            </TableCell>
                            <TableCell style={{ width: 'fit-content', fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
                              Instruksi
                            </TableCell>
                            <TableCell style={{ width: 0, fontWeight: 'bold', backgroundColor: '#eeeeee' }}></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {listReward.map((item, index) => {
                            return (
                              <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                                <TableCell align="center">
                                  <span>{index + 1}</span>
                                </TableCell>
                                <TableCell>
                                  <span>
                                    {item.rewardText || formCreateNewEvents.instructions[index]} {item.id}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      gap: '10px',
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
                                        console.log(item.id);

                                        if (reward.id === item.id) {
                                          console.log(reward.id);

                                          setReward({
                                            id: null,
                                            rewardText: '',
                                            currentIndex: null,
                                          });
                                        } else {
                                          setReward({
                                            id: item.id,
                                            rewardText: item.rewardText,
                                            currentIndex: index,
                                          });
                                        }
                                      }}
                                    >
                                      {reward.id === item.id ? <EditOffIcon /> : <EditIcon />}
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      className={`button-outlined-danger`}
                                      onClick={() => {
                                        listReward.splice(index, 1);
                                        setListReward((dataList) => [...dataList]);
                                        console.log(reward.id);
                                        console.log(item.id);
                                        console.log(listReward);
                                        if (reward.id === item.id) {
                                          setReward({
                                            id: null,
                                            rewardText: '',
                                            currentIndex: null,
                                          });
                                        }
                                        console.log(reward.id);
                                        console.log(item.id);
                                        console.log(listReward);
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
                    {/*  */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.6}>
                <span>Kriteria</span>
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
                  <Grid
                    item
                    xs={12}
                    lg
                    sx={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'end' }}
                  >
                    <TextField
                      label="Kriteria"
                      multiline
                      maxRows={4}
                      value={criteria.criteriaText}
                      onChange={(e) => {
                        setCriteria({
                          ...criteria,
                          criteriaText: e.target.value,
                        });
                      }}
                      autoComplete="off"
                      sx={{ width: '100%' }}
                    />
                    <Button
                      variant="outlined"
                      className="button-outlined-primary"
                      onClick={() => {
                        console.log(criteria);
                        console.log(listCriteria);

                        if (criteria.id) {
                          listCriteria.splice(criteria.currentIndex, 1);
                          let leftArraySplice = listCriteria.splice(0, criteria.currentIndex);
                          let rightArraySplice = listCriteria.splice(0, listCriteria.length + 1);

                          setListCriteria([...leftArraySplice, criteria, ...rightArraySplice]);
                        } else {
                          setListCriteria([
                            ...listCriteria,
                            {
                              id:
                                listCriteria.length === 0
                                  ? listCriteria.length + 1
                                  : listCriteria[listCriteria.length - 1].id + 1,
                              criteriaText: criteria.criteriaText,
                            },
                          ]);
                        }
                        setCriteria({ id: null, criteriaText: '', currentIndex: null });

                        console.log('Is Null:');
                        console.log(criteria.id === null);
                        console.log(listCriteria.length + 1);
                      }}
                      sx={{ width: 'fit-content' }}
                    >
                      {criteria.id ? 'Simpan' : 'Tambah'}
                    </Button>
                  </Grid>
                  <Grid item xs={12} lg>
                    <TableContainer
                      sx={{ width: '100%', maxHeight: '400px', borderRadius: '4px', backgroundColor: '#eeeeee' }}
                    >
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              align="center"
                              style={{ width: 0, fontWeight: 'bold', backgroundColor: '#eeeeee' }}
                            >
                              No
                            </TableCell>
                            <TableCell style={{ width: 'fit-content', fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
                              Instruksi
                            </TableCell>
                            <TableCell style={{ width: 0, fontWeight: 'bold', backgroundColor: '#eeeeee' }}></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {listCriteria.map((item, index) => {
                            return (
                              <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                                <TableCell align="center">
                                  <span>{index + 1}</span>
                                </TableCell>
                                <TableCell>
                                  <span>
                                    {item.criteriaText || formCreateNewEvents.instructions[index]} {item.id}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      gap: '10px',
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
                                        console.log(item.id);

                                        if (criteria.id === item.id) {
                                          console.log(criteria.id);

                                          setCriteria({
                                            id: null,
                                            criteriaText: '',
                                            currentIndex: null,
                                          });
                                        } else {
                                          setCriteria({
                                            id: item.id,
                                            criteriaText: item.criteriaText,
                                            currentIndex: index,
                                          });
                                        }
                                      }}
                                    >
                                      {criteria.id === item.id ? <EditOffIcon /> : <EditIcon />}
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      className={`button-outlined-danger`}
                                      onClick={() => {
                                        listCriteria.splice(index, 1);
                                        setListCriteria([...listCriteria]);
                                        console.log(criteria.id);
                                        console.log(item.id);
                                        console.log(listCriteria);
                                        if (criteria.id === item.id) {
                                          setCriteria({
                                            id: null,
                                            criteriaText: '',
                                            currentIndex: null,
                                          });
                                        }
                                        console.log(criteria.id);
                                        console.log(item.id);
                                        console.log(listCriteria);
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
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.2} lg={1.6}>
                <span>Poster</span>
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
                          setFormCreateNewEvents({
                            ...formCreateNewEvents,
                            poster: {
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
                    {formCreateNewEvents.poster.img ? (
                      <img
                        id="output"
                        src={formCreateNewEvents.poster.img ? URL.createObjectURL(formCreateNewEvents.poster.img) : ''}
                        width={70}
                        alt="Preview"
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs>
                    {formCreateNewEvents.poster.fileName ? (
                      <Chip
                        label={formCreateNewEvents.poster.fileName}
                        onDelete={() =>
                          setFormCreateNewEvents({ ...formCreateNewEvents, poster: { img: null, fileName: '' } })
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
                postApiHandler(formCreateNewEvents);
                setFormCreateNewEvents({
                  id: null,
                  eventName: '',
                  dateStart: '',
                  dateEnd: '',
                  description: '',
                  reward: [],
                  criteria: [],
                  poster: { img: null, fileName: '' },
                });
              }}
              style={{ width: '100%', fontWeight: 'bold' }}
            >
              Buat Event
            </Button>

            {formCreateNewEvents.eventName}
            <br />
            {formCreateNewEvents.description}
            <br />
            {formCreateNewEvents.reward}
            <br />
            {formCreateNewEvents.criteria}
            <br />
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default CreateNewEvents;
