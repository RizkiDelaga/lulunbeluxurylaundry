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

function AddExpenses() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formAddExpenses, setFormAddExpenses] = useState({
    title: '',
    nominal: null,
    expenditureDate: dayjs(),
    notes: '',
    photoEvidence: { img: null, fileName: null },
  });
  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Tambah Pengeluaran';
  }, []);

  const handleCreateAddExpenses = async () => {
    const formData = new FormData();
    formData.append('tipe', 'Pengeluaran');
    formData.append('nominal', formAddExpenses.nominal);
    formData.append('judul', formAddExpenses.title);
    formData.append('catatan', formAddExpenses.notes);
    formData.append('tanggal', formAddExpenses.expenditureDate);
    formData.append('gambar', formAddExpenses.photoEvidence.img);

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
      setFormAddExpenses({
        title: '',
        nominal: null,
        expenditureDate: dayjs(),
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
            title: 'Input Pengeluaran',
          }}
        />

        <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} redirect={'/Keuangan'} />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateAddExpenses();
            }}
          >
            <Box className="gap-16">
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Input Pengeluaran</h2>
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
                    value={formAddExpenses.title}
                    onChange={(e) => {
                      setFormAddExpenses({
                        ...formAddExpenses,
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
                  <span>Nominal Pengeluaran</span>
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
                    label="Nominal Pengeluaran"
                    value={formAddExpenses.nominal !== null ? formAddExpenses.nominal : ''}
                    onChange={(e) => {
                      setFormAddExpenses({
                        ...formAddExpenses,
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
                  <span>Tanggal Pengeluaran</span>
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
                          value={dayjs(formAddExpenses.expenditureDate)}
                          onChange={(value) => {
                            setFormAddExpenses({
                              ...formAddExpenses,
                              expenditureDate: value,
                            });
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
                          value={dayjs(formAddExpenses.expenditureDate)}
                          onChange={(value) => {
                            let date = dayjs(value).toISOString();
                            const newDate = `${date.slice(0, 4)}-${date.slice(5, 7)}-${date.slice(8, 10)}T${date
                              .slice(11, 13)
                              .slice(-2)}:${date.slice(14, 16)}:00.000Z`;

                            setFormAddExpenses({
                              ...formAddExpenses,
                              expenditureDate: dayjs(newDate),
                            });
                          }}
                          renderInput={(params) => <TextField {...params} required />}
                          slotProps={{
                            textField: {
                              error: false,
                              helperText:
                                ('0' + formAddExpenses.expenditureDate.$H).slice(-2) +
                                ':' +
                                ('0' + formAddExpenses.expenditureDate.$m).slice(-2),
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
                    value={formAddExpenses.notes}
                    onChange={(e) => {
                      setFormAddExpenses({
                        ...formAddExpenses,
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
                            setFormAddExpenses({
                              ...formAddExpenses,
                              photoEvidence: {
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
                      {formAddExpenses.photoEvidence.img ? (
                        <img
                          id="output"
                          src={
                            formAddExpenses.photoEvidence.img
                              ? URL.createObjectURL(formAddExpenses.photoEvidence.img)
                              : ''
                          }
                          width={70}
                          alt="Preview"
                        />
                      ) : null}
                    </Grid>
                    <Grid item xs sx={{ display: 'flex', flexDirection: 'column' }}>
                      {formAddExpenses.photoEvidence.fileName ? (
                        <Chip
                          label={formAddExpenses.photoEvidence.fileName}
                          onDelete={() => setFormAddExpenses({ ...formAddExpenses, photoEvidence: {} })}
                          sx={{ maxWidth: '250px' }}
                        />
                      ) : null}
                      <span style={{ fontSize: '12px' }}>*Max size file 5MB</span>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Button variant="contained" size="large" type="submit" style={{ width: '100%', fontWeight: 'bold' }}>
                Tambah Pengeluaran
              </Button>
            </Box>
          </form>
        </Paper>
      </div>
    </>
  );
}

export default AddExpenses;
