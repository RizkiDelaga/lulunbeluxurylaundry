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
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';

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
    dateStart: dayjs(),
    dateEnd: dayjs().add(1, 'day'),
    description: '',
    poster: { img: null, fileName: null },
  });
  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Buat Event Baru';
  }, []);

  const handleCreateEvents = async () => {
    const formData = new FormData();
    formData.append('nama', formCreateNewEvents.eventName);
    formData.append('gambar', formCreateNewEvents.poster.img);
    formData.append('deskripsi', formCreateNewEvents.description);
    formData.append('tglMulai', formCreateNewEvents.dateStart);
    formData.append('tglSelesai', formCreateNewEvents.dateEnd);

    listCriteria.forEach((element, index) => {
      formData.append(`kriteria[${index}]`, element.criteriaText);
    });
    listReward.forEach((element, index) => {
      formData.append(`reward[${index}]`, element.rewardText);
    });

    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/acara`,
        data: formData,
      });
      setFormCreateNewEvents({
        id: null,
        eventName: '',
        dateStart: dayjs(),
        dateEnd: dayjs(),
        description: '',
        reward: [],
        criteria: [],
        poster: { img: null, fileName: null },
      });
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
          <Box className="gap-16" sx={{ flexDirection: 'column' }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Buat Event Baru</h2>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateEvents();
              }}
            >
              <div className="gap-16">
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <MobileDatePicker
                            label="Pilih Tanggal"
                            value={dayjs(formCreateNewEvents.dateStart)}
                            onChange={(value) => {
                              setFormCreateNewEvents({
                                ...formCreateNewEvents,
                                dateStart: value,
                              });
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
                      <Grid item xs={12} sm>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <MobileTimePicker
                            label="Pilih Jam"
                            value={dayjs(formCreateNewEvents.dateStart)}
                            onChange={(value) => {
                              let date = dayjs(value).toISOString();
                              const newDate = `${date.slice(0, 4)}-${date.slice(5, 7)}-${date.slice(8, 10)}T${date
                                .slice(11, 13)
                                .slice(-2)}:${date.slice(14, 16)}:00.000Z`;

                              setFormCreateNewEvents({
                                ...formCreateNewEvents,
                                dateStart: dayjs(newDate),
                              });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            slotProps={{
                              textField: {
                                error: false,
                                helperText:
                                  ('0' + formCreateNewEvents.dateStart.$H).slice(-2) +
                                  ':' +
                                  ('0' + formCreateNewEvents.dateStart.$m).slice(-2),
                              },
                            }}
                            sx={{ width: '100%' }}
                          />
                        </LocalizationProvider>
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <MobileDatePicker
                            label="Pilih Tanggal"
                            value={dayjs(formCreateNewEvents.dateEnd)}
                            onChange={(value) => {
                              setFormCreateNewEvents({
                                ...formCreateNewEvents,
                                dateEnd: value,
                              });
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
                      <Grid item xs={12} sm>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <MobileTimePicker
                            label="Pilih Jam"
                            value={dayjs(formCreateNewEvents.dateEnd)}
                            onChange={(value) => {
                              let date = dayjs(value).toISOString();
                              const newDate = `${date.slice(0, 4)}-${date.slice(5, 7)}-${date.slice(8, 10)}T${date
                                .slice(11, 13)
                                .slice(-2)}:${date.slice(14, 16)}:00.000Z`;

                              setFormCreateNewEvents({
                                ...formCreateNewEvents,
                                dateEnd: dayjs(newDate),
                              });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            slotProps={{
                              textField: {
                                error: false,
                                helperText:
                                  ('0' + formCreateNewEvents.dateEnd.$H).slice(-2) +
                                  ':' +
                                  ('0' + formCreateNewEvents.dateEnd.$m).slice(-2),
                              },
                            }}
                            sx={{ width: '100%' }}
                          />
                        </LocalizationProvider>
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
                      required
                      type="text"
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
                            if (reward.rewardText) {
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
                            }

                            setReward({ id: null, rewardText: '', currentIndex: null });
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
                                <TableCell
                                  style={{ width: 'fit-content', fontWeight: 'bold', backgroundColor: '#eeeeee' }}
                                >
                                  Reward / Benefit
                                </TableCell>
                                <TableCell
                                  style={{ width: 0, fontWeight: 'bold', backgroundColor: '#eeeeee' }}
                                ></TableCell>
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
                                      <span>{item.rewardText || formCreateNewEvents.instructions[index]}</span>
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
                                            if (reward.id === item.id) {
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

                                            if (reward.id === item.id) {
                                              setReward({
                                                id: null,
                                                rewardText: '',
                                                currentIndex: null,
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
                            if (criteria.criteriaText) {
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
                            }

                            setCriteria({ id: null, criteriaText: '', currentIndex: null });
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
                                <TableCell
                                  style={{ width: 'fit-content', fontWeight: 'bold', backgroundColor: '#eeeeee' }}
                                >
                                  Kriteria
                                </TableCell>
                                <TableCell
                                  style={{ width: 0, fontWeight: 'bold', backgroundColor: '#eeeeee' }}
                                ></TableCell>
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
                                      <span>{item.criteriaText || formCreateNewEvents.instructions[index]}</span>
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
                                            if (criteria.id === item.id) {
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

                                            if (criteria.id === item.id) {
                                              setCriteria({
                                                id: null,
                                                criteriaText: '',
                                                currentIndex: null,
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
                              setFormCreateNewEvents({
                                ...formCreateNewEvents,
                                poster: {
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
                        {formCreateNewEvents.poster.img ? (
                          <img
                            id="output"
                            src={
                              formCreateNewEvents.poster.img ? URL.createObjectURL(formCreateNewEvents.poster.img) : ''
                            }
                            width={70}
                            alt="Preview"
                          />
                        ) : null}
                      </Grid>
                      <Grid item xs sx={{ display: 'flex', flexDirection: 'column' }}>
                        {formCreateNewEvents.poster.fileName ? (
                          <Chip
                            label={formCreateNewEvents.poster.fileName}
                            onDelete={() =>
                              setFormCreateNewEvents({ ...formCreateNewEvents, poster: { img: null, fileName: null } })
                            }
                            sx={{ maxWidth: '250px' }}
                          />
                        ) : null}
                        <span style={{ fontSize: '12px' }}>*Max size file 5MB</span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Button variant="contained" size="large" type="submit" sx={{ width: '100%', fontWeight: 'bold' }}>
                  Buat Event
                </Button>
              </div>
            </form>
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default CreateNewEvents;
