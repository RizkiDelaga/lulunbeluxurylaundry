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
    // formData.append('status ', '');
    formData.append(
      'tglMulai',
      dayjs(
        `${formCreateNewEvents.dateStart.$y}-${('0' + (formCreateNewEvents.dateStart.$M + 1)).slice(-2)}-${
          formCreateNewEvents.dateStart.$D
        } ${formCreateNewEvents.dateStart.$H}:${formCreateNewEvents.dateStart.$m}:00`
      ).format('YYYY-MM-DDTHH:mm:00.000[Z]')
    );
    formData.append(
      'tglSelesai',
      dayjs(
        `${formCreateNewEvents.dateEnd.$y}-${('0' + (formCreateNewEvents.dateEnd.$M + 1)).slice(-2)}-${
          formCreateNewEvents.dateEnd.$D
        } ${formCreateNewEvents.dateEnd.$H}:${formCreateNewEvents.dateEnd.$m}:00`
      ).format('YYYY-MM-DDTHH:mm:00.000[Z]')
    );
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
      console.log('Response POST');
      console.log(res);
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
          <Box className="gap-16" sx={{ flexDirection: 'column' }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Buat Event Baru</h2>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log('click');
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
                            value={formCreateNewEvents.dateStart}
                            onChange={(value) => {
                              setFormCreateNewEvents({
                                ...formCreateNewEvents,
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
                            value={formCreateNewEvents.dateStart}
                            onChange={(value) => {
                              setFormCreateNewEvents({
                                ...formCreateNewEvents,
                                dateStart: value,
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
                            value={formCreateNewEvents.dateEnd}
                            onChange={(value) => {
                              setFormCreateNewEvents({
                                ...formCreateNewEvents,
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
                            value={formCreateNewEvents.dateEnd}
                            onChange={(value) => {
                              setFormCreateNewEvents({
                                ...formCreateNewEvents,
                                dateEnd: value,
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
                            src={
                              formCreateNewEvents.poster.img ? URL.createObjectURL(formCreateNewEvents.poster.img) : ''
                            }
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
                              setFormCreateNewEvents({ ...formCreateNewEvents, poster: { img: null, fileName: null } })
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
                  //   handleCreateEvents();
                  // }}
                  sx={{ width: '100%', fontWeight: 'bold' }}
                >
                  Buat Event
                </Button>
              </div>
            </form>

            {formCreateNewEvents.eventName}
            <br />
            {formCreateNewEvents.description}
            <br />
            <br />
            {`${formCreateNewEvents.dateStart.$D} ${formCreateNewEvents.dateStart.$M} ${formCreateNewEvents.dateStart.$y}`}
            <br />
            {`${formCreateNewEvents.dateStart.$H} ${formCreateNewEvents.dateStart.$m}`}
            <br />
            {`${formCreateNewEvents.dateEnd.$D} ${formCreateNewEvents.dateEnd.$M} ${formCreateNewEvents.dateEnd.$y}`}
            <br />
            {`${formCreateNewEvents.dateEnd.$H} ${formCreateNewEvents.dateEnd.$m}`}
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default CreateNewEvents;
