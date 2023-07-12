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

function PaymentMethod() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [listPaymentMethod, setListPaymentMethod] = useState([]);
  const [instruction, setInstruction] = useState({ id: null, instructionText: '', currentIndex: null });
  const [listInstructions, setListInstructions] = useState([]);
  const [formPaymentMethod, setFormPaymentMethod] = useState({
    id: null,
    paymentName: '',
    iD_Or_Number: '',
    paymentLogo: { img: null, fileName: null },
  });
  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Edit Metode Pembayaran';
    getApiHandler();
  }, [formPaymentMethod.instructions]);

  const getApiHandler = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_KEY}/metodepembayaran`,
      });
      setListPaymentMethod(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setListPaymentMethod([]);
      }
    }
  };

  const handleCreatePaymentMethod = async () => {
    const formData = new FormData();
    formData.append('logo', formPaymentMethod.paymentLogo.img);
    formData.append('nama', formPaymentMethod.paymentName);
    formData.append('nomor', formPaymentMethod.iD_Or_Number);
    listInstructions.forEach((element, index) => {
      formData.append(`instruksi[${index}]`, element.instructionText);
    });

    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/metodepembayaran`,
        data: formData,
      });
      if (res.status === 201) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Berhasil di Tambah!',
          statusType: 'success',
        });
      }
      setListInstructions([]);
      setFormPaymentMethod({
        id: null,
        paymentName: '',
        iD_Or_Number: '',
        paymentLogo: { img: null, fileName: null },
      });
      getApiHandler();
    } catch (error) {
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message || 'error manual',
        statusType: 'error',
      });
    }
  };

  const handleUpdatePaymentMethod = async () => {
    const formData = new FormData();
    formData.append('logo', formPaymentMethod.paymentLogo.img || formPaymentMethod.paymentLogo.fileName);
    formData.append('nama', formPaymentMethod.paymentName);
    formData.append('nomor', formPaymentMethod.iD_Or_Number);
    listInstructions.forEach((element, index) => {
      formData.append(`instruksi[${index}]`, element.instructionText);
    });

    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/metodepembayaran/${formPaymentMethod.id}`,
        data: formData,
      });
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Berhasil di Edit!',
          statusType: 'success',
        });
      }
      setListInstructions([]);
      setFormPaymentMethod({
        id: null,
        paymentName: '',
        iD_Or_Number: '',
        paymentLogo: { img: null, fileName: null },
      });
      getApiHandler();
    } catch (error) {
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
    }
  };

  const handleDeletePaymentMethod = async (id) => {
    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/metodepembayaran/${id}`,
      });
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Berhasil di Hapus!',
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
    }
  };

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Informasi Bisnis"
          currentPage={{
            title: 'Metode Pembayaran',
          }}
        />

        <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          {/* Form Validation */}

          <Box className="gap-16" sx={{ flexDirection: 'column' }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Metode Pembayaran</h2>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (formPaymentMethod.id) {
                  handleUpdatePaymentMethod();
                } else {
                  handleCreatePaymentMethod();
                }
                e.stopPropagation();
              }}
            >
              <div className="gap-16">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={2.4} lg={2.1} sx={{ display: 'flex', alignItems: 'center' }}>
                    <span>Nama Pembayaran</span>
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
                      label="Nama Pembayaran"
                      value={formPaymentMethod.paymentName}
                      onChange={(e) => {
                        setFormPaymentMethod({
                          ...formPaymentMethod,
                          paymentName: e.target.value,
                        });
                      }}
                      autoComplete="off"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={2.4} lg={2.1} sx={{ display: 'flex', alignItems: 'center' }}>
                    <span>ID/Nomer Pembayaran</span>
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
                      type="number"
                      label="ID / Nomer"
                      value={formPaymentMethod.iD_Or_Number}
                      onChange={(e) => {
                        setFormPaymentMethod({
                          ...formPaymentMethod,
                          iD_Or_Number: e.target.value,
                        });
                      }}
                      autoComplete="off"
                      onWheel={(e) => e.target.blur()}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={2.4} lg={2.1}>
                    <span>Instruksi</span>
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
                          label="Instruksi"
                          multiline
                          maxRows={4}
                          value={instruction.instructionText}
                          onChange={(e) => {
                            setInstruction({
                              ...instruction,
                              instructionText: e.target.value,
                            });
                          }}
                          autoComplete="off"
                          sx={{ width: '100%' }}
                        />
                        <Button
                          variant="outlined"
                          className="button-outlined-primary"
                          onClick={() => {
                            if (instruction.instructionText) {
                              if (instruction.id) {
                                listInstructions.splice(instruction.currentIndex, 1);
                                let leftArraySplice = listInstructions.splice(0, instruction.currentIndex);
                                let rightArraySplice = listInstructions.splice(0, listInstructions.length + 1);

                                setListInstructions([...leftArraySplice, instruction, ...rightArraySplice]);
                              } else {
                                setListInstructions([
                                  ...listInstructions,
                                  {
                                    id:
                                      listInstructions.length === 0
                                        ? listInstructions.length + 1
                                        : listInstructions[listInstructions.length - 1].id + 1,
                                    instructionText: instruction.instructionText,
                                  },
                                ]);
                              }
                            }

                            setInstruction({ id: null, instructionText: '', currentIndex: null });
                          }}
                          sx={{ width: 'fit-content' }}
                        >
                          {instruction.id ? 'Simpan' : 'Tambah'}
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
                                  Instruksi
                                </TableCell>
                                <TableCell
                                  style={{ width: 0, fontWeight: 'bold', backgroundColor: '#eeeeee' }}
                                ></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {!listInstructions
                                ? null
                                : listInstructions.map((item, index) => {
                                    return (
                                      <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                                        <TableCell align="center">
                                          <span>{index + 1}</span>
                                        </TableCell>
                                        <TableCell>
                                          <span>{item.instructionText || formPaymentMethod.instructions[index]}</span>
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
                                                if (instruction.id === item.id) {
                                                  setInstruction({
                                                    id: null,
                                                    instructionText: '',
                                                    currentIndex: null,
                                                  });
                                                } else {
                                                  setInstruction({
                                                    id: item.id,
                                                    instructionText: item.instructionText,
                                                    currentIndex: index,
                                                  });
                                                }
                                              }}
                                            >
                                              {instruction.id === item.id ? <EditOffIcon /> : <EditIcon />}
                                            </Button>
                                            <Button
                                              variant="outlined"
                                              className={`button-outlined-danger`}
                                              onClick={() => {
                                                listInstructions.splice(index, 1);
                                                setListInstructions([...listInstructions]);
                                                if (instruction.id === index + 1) {
                                                  setInstruction({
                                                    id: null,
                                                    instructionText: '',
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
                  <Grid item xs={12} sm={12} md={2.4} lg={2.1}>
                    <span>Logo Pembayaran</span>
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
                              setFormPaymentMethod({
                                ...formPaymentMethod,
                                paymentLogo: {
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
                        {formPaymentMethod.paymentLogo.img || formPaymentMethod.paymentLogo.fileName ? (
                          <img
                            id="output"
                            src={
                              formPaymentMethod.paymentLogo.img
                                ? URL.createObjectURL(formPaymentMethod.paymentLogo.img)
                                : formPaymentMethod.paymentLogo.fileName
                            }
                            width={70}
                            alt="Preview"
                          />
                        ) : null}
                      </Grid>
                      <Grid item xs sx={{ display: 'flex', flexDirection: 'column' }}>
                        {formPaymentMethod.paymentLogo.fileName ? (
                          <Chip
                            label={formPaymentMethod.paymentLogo.fileName}
                            onDelete={() =>
                              setFormPaymentMethod({ ...formPaymentMethod, paymentLogo: { img: null, fileName: null } })
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
                  {formPaymentMethod.id ? 'Simpan' : 'Tambah'}
                </Button>
              </div>
            </form>

            <TableContainer sx={{ width: '100%', borderRadius: '4px', backgroundColor: '#eeeeee' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ width: 0, fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
                      No
                    </TableCell>
                    <TableCell style={{ width: 'fit-content', fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
                      Nama Pembayaran
                    </TableCell>
                    <TableCell style={{ width: 'fit-content', fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
                      ID/Nomer
                    </TableCell>
                    <TableCell style={{ width: 'fit-content', fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
                      Instruksi
                    </TableCell>
                    <TableCell style={{ width: 60, fontWeight: 'bold', backgroundColor: '#eeeeee' }}>Logo</TableCell>
                    <TableCell style={{ width: 0, fontWeight: 'bold', backgroundColor: '#eeeeee' }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listPaymentMethod.map((item, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                        <TableCell align="center">
                          <span>{index + 1}</span>
                        </TableCell>
                        <TableCell>
                          <span>{item.nama}</span>
                        </TableCell>
                        <TableCell>
                          <span>{item.nomor}</span>
                        </TableCell>
                        <TableCell>
                          <span>
                            {!item.instruksi
                              ? null
                              : item.instruksi.map((itemInstruksi, index) => {
                                  return <div>{index + 1 + '. ' + itemInstruksi}</div>;
                                })}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span>{item.logo ? <img src={item.logo} width={60} alt={item.logo} /> : null}</span>
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
                              onClick={async () => {
                                setListInstructions([]);
                                if (formPaymentMethod.id && formPaymentMethod.id === item.id) {
                                  setFormPaymentMethod({
                                    id: null,
                                    paymentName: '',
                                    iD_Or_Number: '',
                                    paymentLogo: { img: null, fileName: null },
                                  });
                                } else {
                                  if (item.instruksi) {
                                    item.instruksi.map((itemInstruksi, index) => {
                                      setListInstructions((list) => [
                                        ...list,
                                        { id: index + 1, instructionText: itemInstruksi },
                                      ]);
                                    });
                                  }
                                  setFormPaymentMethod({
                                    id: item.id,
                                    paymentName: item.nama,
                                    iD_Or_Number: item.nomor,
                                    paymentLogo: { img: null, fileName: item.logo },
                                  });
                                }
                              }}
                            >
                              {formPaymentMethod.id && formPaymentMethod.id === item.id ? (
                                <EditOffIcon />
                              ) : (
                                <EditIcon />
                              )}
                            </Button>
                            <Button
                              variant="outlined"
                              className={`button-outlined-danger`}
                              onClick={() => {
                                handleDeletePaymentMethod(item.id);
                                if (item.id === formPaymentMethod.id) {
                                  setListInstructions([]);
                                  setFormPaymentMethod({
                                    id: null,
                                    paymentName: '',
                                    iD_Or_Number: '',

                                    paymentLogo: { img: null, fileName: null },
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
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default PaymentMethod;
