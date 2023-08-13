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

function EditExpenses() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formEditExpenses, setFormEditExpenses] = useState({
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
    document.title = 'Edit Pengeluaran';
    handleGetDetailExpenses();
  }, []);

  const handleGetDetailExpenses = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/keuangan/${id}`,
      });

      setFormEditExpenses({
        title: res.data.data.judul,
        nominal: res.data.data.nominal,
        expenditureDate: dayjs(res.data.data.tanggal),
        notes: res.data.data.catatan,
        photoEvidence: { img: null, fileName: res.data.data.gambar },
      });
    } catch (error) {}
  };

  const handleUpdateExpenses = async () => {
    const formData = new FormData();
    formData.append('tipe', 'Pengeluaran');
    formData.append('nominal', formEditExpenses.nominal);
    formData.append('judul', formEditExpenses.title);
    formData.append('catatan', formEditExpenses.notes);
    formData.append('tanggal', formEditExpenses.expenditureDate);
    formData.append('gambar', formEditExpenses.photoEvidence.img);

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

      setFormEditExpenses({
        title: '',
        nominal: null,
        expenditureDate: dayjs(),
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
    }
  };

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Keuangan"
          currentPage={{
            title: 'Edit Pengeluaran',
          }}
        />

        <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} redirect={'/Keuangan'} />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              handleUpdateExpenses();
            }}
          >
            <Box className="gap-16">
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Edit Pengeluaran</h2>
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
                    value={formEditExpenses.title}
                    onChange={(e) => {
                      setFormEditExpenses({
                        ...formEditExpenses,
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
                    value={formEditExpenses.nominal !== null ? formEditExpenses.nominal : ''}
                    onChange={(e) => {
                      setFormEditExpenses({
                        ...formEditExpenses,
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
                          value={dayjs(formEditExpenses.expenditureDate)}
                          onChange={(value) => {
                            setFormEditExpenses({
                              ...formEditExpenses,
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
                          value={dayjs(formEditExpenses.expenditureDate)}
                          onChange={(value) => {
                            let date = dayjs(value).toISOString();
                            const newDate = `${date.slice(0, 4)}-${date.slice(5, 7)}-${date.slice(8, 10)}T${date
                              .slice(11, 13)
                              .slice(-2)}:${date.slice(14, 16)}:00.000Z`;

                            setFormEditExpenses({
                              ...formEditExpenses,
                              expenditureDate: dayjs(newDate),
                            });
                          }}
                          renderInput={(params) => <TextField {...params} required />}
                          slotProps={{
                            textField: {
                              error: false,
                              helperText:
                                ('0' + formEditExpenses.expenditureDate.$H).slice(-2) +
                                ':' +
                                ('0' + formEditExpenses.expenditureDate.$m).slice(-2),
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
                    value={formEditExpenses.notes}
                    onChange={(e) => {
                      setFormEditExpenses({
                        ...formEditExpenses,
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
                            setFormEditExpenses({
                              ...formEditExpenses,
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
                      {formEditExpenses.photoEvidence.img || formEditExpenses.photoEvidence.fileName ? (
                        <img
                          id="output"
                          src={
                            formEditExpenses.photoEvidence.img
                              ? URL.createObjectURL(formEditExpenses.photoEvidence.img)
                              : formEditExpenses.photoEvidence.fileName
                          }
                          width={70}
                          alt="Preview"
                        />
                      ) : null}
                    </Grid>
                    <Grid item xs sx={{ display: 'flex', flexDirection: 'column' }}>
                      {formEditExpenses.photoEvidence.fileName ? (
                        <Chip
                          label={formEditExpenses.photoEvidence.fileName}
                          onDelete={() =>
                            setFormEditExpenses({ ...formEditExpenses, photoEvidence: { img: null, fileName: '' } })
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
                Edit Pengeluaran
              </Button>
            </Box>
          </form>
        </Paper>
      </div>
    </>
  );
}

export default EditExpenses;
