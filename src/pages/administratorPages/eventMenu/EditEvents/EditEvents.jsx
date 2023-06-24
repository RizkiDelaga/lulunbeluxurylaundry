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
import { LocalizationProvider, MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadDecisions from '../../../../components/LoadDecisions/LoadDecisions';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import axios from 'axios';
import dayjs from 'dayjs';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditOffIcon from '@mui/icons-material/EditOff';
import { adjustTime } from '../../../../utils/timeUtils';

function EditEvents() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [listReward, setListReward] = useState([]);
  const [reward, setReward] = useState({ id: null, rewardText: '', currentIndex: null });

  const [listCriteria, setListCriteria] = useState([]);
  const [criteria, setCriteria] = useState({ id: null, criteriaText: '', currentIndex: null });

  const [formEditEvents, setFormEditEvents] = useState({
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
    document.title = 'Edit Event';
    handleGetDetailEvent();
  }, []);

  const handleGetDetailEvent = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/acara/${id}`,
      });

      console.log('Response GET Data');
      console.log(res);
      setFormEditEvents({
        id: res.data.data.id,
        eventName: res.data.data.nama,
        dateStart: dayjs(res.data.data.tglMulai),
        dateEnd: dayjs(res.data.data.tglSelesai),
        description: res.data.data.deskripsi,
        poster: { img: null, fileName: res.data.data.gambar },
      });
      console.log('Reward: ', res.data.data.reward);

      const newReward = await [...res.data.data.reward].map((item, index) => {
        return { id: index, rewardText: item };
      });
      setListReward(newReward);
      const newCriteria = await [...res.data.data.kriteria].map((item, index) => {
        return { id: index, criteriaText: item };
      });
      setListCriteria(newCriteria);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateEvents = async () => {
    const formData = new FormData();
    formData.append('nama', formEditEvents.eventName);
    formData.append('gambar', formEditEvents.poster.img);
    formData.append('deskripsi', formEditEvents.description);
    formData.append('tglMulai', formEditEvents.dateStart);
    formData.append('tglSelesai', formEditEvents.dateEnd);

    listCriteria.forEach((element, index) => {
      formData.append(`kriteria[${index}]`, element.criteriaText || '');
    });
    listReward.forEach((element, index) => {
      formData.append(`reward[${index}]`, element.rewardText || '');
    });

    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/acara/${id}`,
        data: formData,
      });
      console.log('Response POST');
      console.log(res);
      setFormEditEvents({
        id: null,
        eventName: '',
        dateStart: dayjs(),
        dateEnd: dayjs(),
        description: '',
        reward: [],
        criteria: [],
        poster: { img: null, fileName: null },
      });
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Event Berhasil di Edit!',
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
            title: 'Edit Event',
          }}
        />

        <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} redirect={'/Event'} />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16" sx={{ flexDirection: 'column' }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Edit Event</h2>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log('click');
                handleUpdateEvents();
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
                      value={formEditEvents.eventName}
                      onChange={(e) => {
                        setFormEditEvents({
                          ...formEditEvents,
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
                            value={dayjs(formEditEvents.dateStart)}
                            onChange={(value) => {
                              setFormEditEvents({
                                ...formEditEvents,
                                dateStart: value,
                              });

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
                      <Grid item xs={12} sm>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <MobileTimePicker
                            label="Pilih Jam"
                            value={dayjs(formEditEvents.dateStart)}
                            onChange={(value) => {
                              let date = dayjs(value).toISOString();
                              const newDate = `${date.slice(0, 4)}-${date.slice(5, 7)}-${date.slice(8, 10)}T${date
                                .slice(11, 13)
                                .slice(-2)}:${date.slice(14, 16)}:00.000Z`;

                              setFormEditEvents({
                                ...formEditEvents,
                                dateStart: dayjs(newDate),
                              });

                              console.log('Jam: ' + value.$H);
                              console.log('Menit: ' + value.$m);
                              console.log('Detik: ' + value.$s);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            slotProps={{
                              textField: {
                                error: false,
                                helperText:
                                  ('0' + formEditEvents.dateStart.$H).slice(-2) +
                                  ':' +
                                  ('0' + formEditEvents.dateStart.$m).slice(-2),
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
                            value={dayjs(formEditEvents.dateEnd)}
                            onChange={(value) => {
                              setFormEditEvents({
                                ...formEditEvents,
                                dateEnd: value,
                              });

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
                      <Grid item xs={12} sm>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <MobileTimePicker
                            label="Pilih Jam"
                            value={dayjs(formEditEvents.dateEnd)}
                            onChange={(value) => {
                              let date = dayjs(value).toISOString();
                              const newDate = `${date.slice(0, 4)}-${date.slice(5, 7)}-${date.slice(8, 10)}T${date
                                .slice(11, 13)
                                .slice(-2)}:${date.slice(14, 16)}:00.000Z`;

                              setFormEditEvents({
                                ...formEditEvents,
                                dateEnd: dayjs(newDate),
                              });

                              console.log('Jam: ' + value.$H);
                              console.log('Menit: ' + value.$m);
                              console.log('Detik: ' + value.$s);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            slotProps={{
                              textField: {
                                error: false,
                                helperText:
                                  ('0' + formEditEvents.dateEnd.$H).slice(-2) +
                                  ':' +
                                  ('0' + formEditEvents.dateEnd.$m).slice(-2),
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
                      value={formEditEvents.description}
                      onChange={(e) => {
                        setFormEditEvents({
                          ...formEditEvents,
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
                              {!listReward
                                ? null
                                : listReward.map((item, index) => {
                                    return (
                                      <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                                        <TableCell align="center">
                                          <span>{index + 1}</span>
                                        </TableCell>
                                        <TableCell>
                                          <span>
                                            {item.rewardText || formEditEvents.instructions[index]} {item.id}
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
                              {!listCriteria
                                ? null
                                : listCriteria.map((item, index) => {
                                    return (
                                      <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                                        <TableCell align="center">
                                          <span>{index + 1}</span>
                                        </TableCell>
                                        <TableCell>
                                          <span>
                                            {item.criteriaText || formEditEvents.instructions[index]} {item.id}
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
                              setFormEditEvents({
                                ...formEditEvents,
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
                        {formEditEvents.poster.img || formEditEvents.poster.fileName ? (
                          <img
                            id="output"
                            src={
                              formEditEvents.poster.img
                                ? URL.createObjectURL(formEditEvents.poster.img)
                                : formEditEvents.poster.fileName
                            }
                            width={70}
                            alt="Preview"
                          />
                        ) : null}
                      </Grid>
                      <Grid item xs>
                        {formEditEvents.poster.fileName ? (
                          <Chip
                            label={formEditEvents.poster.fileName}
                            onDelete={() =>
                              setFormEditEvents({ ...formEditEvents, poster: { img: null, fileName: null } })
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
                  type="submit"
                  // onClick={() => {
                  //   handleUpdateEvents();
                  // }}
                  sx={{ width: '100%', fontWeight: 'bold' }}
                >
                  Edit Event
                </Button>
              </div>
            </form>

            {formEditEvents.eventName}
            <br />
            {formEditEvents.description}
            <br />
            <br />
            {`${formEditEvents.dateStart.$D} ${formEditEvents.dateStart.$M} ${formEditEvents.dateStart.$y}`}
            <br />
            {`${formEditEvents.dateStart.$H} ${formEditEvents.dateStart.$m}`}
            <br />
            {`${formEditEvents.dateEnd.$D} ${formEditEvents.dateEnd.$M} ${formEditEvents.dateEnd.$y}`}
            <br />
            {`${formEditEvents.dateEnd.$H} ${formEditEvents.dateEnd.$m}`}
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default EditEvents;
