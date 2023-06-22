import { Box, Button, Chip, Grid, Paper, TextField, useTheme } from '@mui/material';
import { LocalizationProvider, MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadDecisions from '../../../../components/LoadDecisions/LoadDecisions';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import axios from 'axios';
import dayjs from 'dayjs';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { adjustTime } from '../../../../utils/timeUtils';

function EditIncome() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formEditIncome, setFormEditIncome] = useState({
    title: '',
    nominal: null,
    entryDate: dayjs(),
    notes: '',
    photoEvidence: { img: null, fileName: null },
  });
  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Edit Pemasukan';
    handleGetDetailIncome();
  }, []);

  const handleGetDetailIncome = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/keuangan/${id}`,
      });

      let newDate = await dayjs(
        `${res.data.data.tanggal.slice(0, 4)}-${res.data.data.tanggal.slice(5, 7)}-${res.data.data.tanggal.slice(
          8,
          10
        )}T${('0' + adjustTime(res.data.data.tanggal.slice(11, 13))).slice(-2)}:${res.data.data.tanggal.slice(
          14,
          16
        )}:00.000Z`
      );

      console.log('Response POST');
      console.log(res);
      setFormEditIncome({
        title: res.data.data.judul,
        nominal: res.data.data.nominal,
        entryDate: dayjs(newDate),
        notes: res.data.data.catatan,
        photoEvidence: { img: null, fileName: res.data.data.gambar },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateIncome = async () => {
    const formData = new FormData();
    formData.append('tipe', 'Pemasukan');
    formData.append('nominal', formEditIncome.nominal);
    formData.append('judul', formEditIncome.title);
    formData.append('catatan', formEditIncome.notes);
    formData.append(
      'tanggal',
      dayjs(
        `${formEditIncome.entryDate.$y}-${('0' + (formEditIncome.entryDate.$M + 1)).slice(-2)}-${
          formEditIncome.entryDate.$D
        } ${formEditIncome.entryDate.$H}:${formEditIncome.entryDate.$m}:00`
      ).format('YYYY-MM-DDTHH:mm:00.000[Z]')
    );
    formData.append('gambar', formEditIncome.photoEvidence.img);

    setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
    try {
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/keuangan/${id}`,
        data: formData,
      });

      console.log('Response POST');
      console.log(res);
      setFormEditIncome({
        title: '',
        nominal: null,
        entryDate: dayjs(),
        notes: '',
        photoEvidence: { img: null, fileName: '' },
      });
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Berhasil di Edit!',
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
          defaultMenu="Keuangan"
          currentPage={{
            title: 'Edit Pemasukan',
          }}
        />

        <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} redirect={'/Keuangan'} />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log('click');
              handleUpdateIncome();
            }}
          >
            <Box className="gap-16">
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Edit Pemasukan</h2>
              </div>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={2.7} lg={2} sx={{ display: 'flex', alignItems: 'center' }}>
                  <span>Judul</span>
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
                    label="Judul"
                    type="text"
                    value={formEditIncome.title}
                    onChange={(e) => {
                      setFormEditIncome({
                        ...formEditIncome,
                        title: e.target.value,
                      });
                    }}
                    autoComplete="off"
                    sx={{ width: '100%' }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={2.7} lg={2} sx={{ display: 'flex', alignItems: 'center' }}>
                  <span>Nominal Pendapatan</span>
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
                    type="number"
                    label="Nominal Pendapatan"
                    value={formEditIncome.nominal !== null ? formEditIncome.nominal : ''}
                    onChange={(e) => {
                      setFormEditIncome({
                        ...formEditIncome,
                        nominal: e.target.value,
                      });
                    }}
                    autoComplete="off"
                    onWheel={(e) => e.target.blur()}
                    sx={{ width: '100%' }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={2.7} lg={2} sx={{ display: 'flex', alignItems: 'center' }}>
                  <span>Tanggal Pendapatan</span>
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
                          value={formEditIncome.entryDate}
                          onChange={(value) => {
                            setFormEditIncome({
                              ...formEditIncome,
                              entryDate: value,
                            });

                            console.log('Tanggal: ' + value.$D);
                            console.log('Bulan: ' + value.$M);
                            console.log('Tahun: ' + value.$y);
                          }}
                          renderInput={(params) => <TextField {...params} required />}
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
                          value={formEditIncome.entryDate}
                          onChange={(value) => {
                            setFormEditIncome({
                              ...formEditIncome,
                              entryDate: value,
                            });

                            console.log('Jam: ' + value.$H);
                            console.log('Menit: ' + value.$m);
                            console.log('Detik: ' + value.$s);
                          }}
                          renderInput={(params) => <TextField {...params} required />}
                          slotProps={{
                            textField: {
                              error: false,
                              helperText:
                                ('0' + formEditIncome.entryDate.$H).slice(-2) +
                                ':' +
                                ('0' + formEditIncome.entryDate.$m).slice(-2),
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
                <Grid item xs={12} sm={12} md={2.7} lg={2} sx={{ display: 'flex', alignItems: 'center' }}>
                  <span>Catatan</span>
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
                    label="Catatan"
                    multiline
                    maxRows={4}
                    value={formEditIncome.notes}
                    onChange={(e) => {
                      setFormEditIncome({
                        ...formEditIncome,
                        notes: e.target.value,
                      });
                    }}
                    autoComplete="off"
                    sx={{ width: '100%' }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={2.7} lg={2}>
                  <span>Foto Bukti</span>
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
                            setFormEditIncome({
                              ...formEditIncome,
                              photoEvidence: {
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
                      {formEditIncome.photoEvidence.img ? (
                        <img
                          id="output"
                          src={
                            formEditIncome.photoEvidence.img
                              ? URL.createObjectURL(formEditIncome.photoEvidence.img)
                              : ''
                          }
                          width={70}
                          alt="Preview"
                        />
                      ) : null}
                    </Grid>
                    <Grid item xs>
                      {formEditIncome.photoEvidence.fileName ? (
                        <Chip
                          label={formEditIncome.photoEvidence.fileName}
                          onDelete={() =>
                            setFormEditIncome({ ...formEditIncome, photoEvidence: { img: null, fileName: '' } })
                          }
                          sx={{ maxWidth: '250px' }}
                        />
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Button variant="contained" size="large" type="submit" sx={{ width: '100%', fontWeight: 'bold' }}>
                Edit Pemasukan
              </Button>

              {formEditIncome.title}
              <br />
              {formEditIncome.nominal}
              <br />
              {formEditIncome.notes}
              {`${formEditIncome.entryDate.$D} ${formEditIncome.entryDate.$M} ${formEditIncome.entryDate.$y}`}
              <br />
              {`${formEditIncome.entryDate.$H} ${formEditIncome.entryDate.$m}`}
              <br />
            </Box>
          </form>
        </Paper>
      </div>
    </>
  );
}

export default EditIncome;
