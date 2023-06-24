import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Chip, Grid, Paper, TextField, useTheme } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import LoadDecisions from '../../../../components/LoadDecisions/LoadDecisions';
import axios from 'axios';
import dayjs from 'dayjs';
import { LocalizationProvider, MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function AddIncome() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formAddIncome, setFormAddIncome] = useState({
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
    document.title = 'Tambah Pemasukan';
  }, []);

  const handleCreateAddIncome = async () => {
    const formData = new FormData();
    formData.append('tipe', 'Pemasukan');
    formData.append('nominal', formAddIncome.nominal);
    formData.append('judul', formAddIncome.title);
    formData.append('catatan', formAddIncome.notes);
    formData.append('tanggal', formAddIncome.entryDate);
    formData.append('gambar', formAddIncome.photoEvidence.img);

    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/keuangan`,
        data: formData,
      });

      console.log('Response POST');
      console.log(res);
      setFormAddIncome({
        title: '',
        nominal: null,
        entryDate: dayjs(),
        notes: '',
        photoEvidence: { img: null, fileName: '' },
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
          defaultMenu="Keuangan"
          currentPage={{
            title: 'Input Pemasukan',
          }}
        />

        <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} redirect={'/Keuangan'} />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log('click');
              handleCreateAddIncome();
            }}
          >
            <Box className="gap-16">
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Input Pemasukan</h2>
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
                    value={formAddIncome.title}
                    onChange={(e) => {
                      setFormAddIncome({
                        ...formAddIncome,
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
                    value={formAddIncome.nominal !== null ? formAddIncome.nominal : ''}
                    onChange={(e) => {
                      setFormAddIncome({
                        ...formAddIncome,
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
                          value={dayjs(formAddIncome.entryDate)}
                          onChange={(value) => {
                            setFormAddIncome({
                              ...formAddIncome,
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
                          value={dayjs(formAddIncome.entryDate)}
                          onChange={(value) => {
                            let date = dayjs(value).toISOString();
                            const newDate = `${date.slice(0, 4)}-${date.slice(5, 7)}-${date.slice(8, 10)}T${date
                              .slice(11, 13)
                              .slice(-2)}:${date.slice(14, 16)}:00.000Z`;

                            setFormAddIncome({
                              ...formAddIncome,
                              entryDate: dayjs(newDate),
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
                                ('0' + formAddIncome.entryDate.$H).slice(-2) +
                                ':' +
                                ('0' + formAddIncome.entryDate.$m).slice(-2),
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
                    value={formAddIncome.notes}
                    onChange={(e) => {
                      setFormAddIncome({
                        ...formAddIncome,
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
                            setFormAddIncome({
                              ...formAddIncome,
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
                      {formAddIncome.photoEvidence.img ? (
                        <img
                          id="output"
                          src={
                            formAddIncome.photoEvidence.img ? URL.createObjectURL(formAddIncome.photoEvidence.img) : ''
                          }
                          width={70}
                          alt="Preview"
                        />
                      ) : null}
                    </Grid>
                    <Grid item xs>
                      {formAddIncome.photoEvidence.fileName ? (
                        <Chip
                          label={formAddIncome.photoEvidence.fileName}
                          onDelete={() =>
                            setFormAddIncome({ ...formAddIncome, photoEvidence: { img: null, fileName: '' } })
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
                //   handleCreateAddIncome();
                // }}
                style={{ width: '100%', fontWeight: 'bold' }}
              >
                Input Pemasukan
              </Button>

              {formAddIncome.title}
              <br />
              {formAddIncome.nominal}
              <br />
              {formAddIncome.notes}
              {`${formAddIncome.entryDate.$D} ${formAddIncome.entryDate.$M} ${formAddIncome.entryDate.$y}`}
              <br />
              {`${formAddIncome.entryDate.$H} ${formAddIncome.entryDate.$m}`}
              <br />
            </Box>
          </form>
        </Paper>
      </div>
    </>
  );
}

export default AddIncome;
