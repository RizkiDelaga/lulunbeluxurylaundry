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
    paymentLogo: { img: null, fileName: '' },
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
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/metodepembayaran',
      });
      console.log('Response GET');
      console.log(res);
      setListPaymentMethod(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setListPaymentMethod([]);
      }
      console.log(error);
    }
  };

  // const listPaymentMethodHandle = async (data) => {
  //   data.instruksi.map(async (itemInstruksi, index) => {
  //     console.log(itemInstruksi);
  //     setListInstructions((list) => [...list, { id: index + 1, instructionText: itemInstruksi }]);
  //   });
  // };
  const postApiHandler = async (data) => {
    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'POST',
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/metodepembayaran',
        data: {
          logo: data.paymentLogo.fileName,
          nama: data.paymentName,
          nomor: data.iD_Or_Number,
          instruksi: listInstructions.map((itemInstruction) => itemInstruction.instructionText),
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
      getApiHandler();
    } catch (error) {
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message || 'error manual',
        statusType: 'error',
      });
      console.log(error);
    }
  };

  const putApiHandler = async (data) => {
    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'PUT',
        url: `https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/metodepembayaran/${data.id}`,
        data: {
          logo: data.paymentLogo.fileName,
          nama: data.paymentName,
          nomor: data.iD_Or_Number,
          instruksi: listInstructions.map((itemInstruction) => itemInstruction.instructionText),
        },
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
        url: `https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/metodepembayaran/${id}`,
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
            title: 'Metode Pembayaran',
          }}
        />

        <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Metode Pembayaran</h2>
            </div>

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
                  required
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
                      required
                      label="Instruksi"
                      multiline
                      maxRows={4}
                      value={instruction.instructionText}
                      onChange={(e) => {
                        console.log(listInstructions.length);
                        setInstruction({
                          // ...instructionText,
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
                        console.log(instruction);
                        console.log(listInstructions);

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
                        setInstruction({ id: null, instructionText: '', currentIndex: null });

                        console.log('Is Null:');
                        console.log(instruction.id === null);
                        console.log(listInstructions.length + 1);
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
                            <TableCell style={{ width: 'fit-content', fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
                              Instruksi
                            </TableCell>
                            <TableCell style={{ width: 0, fontWeight: 'bold', backgroundColor: '#eeeeee' }}></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {listInstructions.map((item, index) => {
                            return (
                              <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                                <TableCell align="center">
                                  <span>{index + 1}</span>
                                </TableCell>
                                <TableCell>
                                  <span>
                                    {item.instructionText || formPaymentMethod.instructions[index]} {item.id}
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

                                        if (instruction.id === item.id) {
                                          console.log(instruction.id);

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
                                        console.log(instruction.id);
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
                          console.log(e.target.files);
                          setFormPaymentMethod({
                            ...formPaymentMethod,
                            paymentLogo: {
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
                    {formPaymentMethod.paymentLogo.img ? (
                      <img
                        id="output"
                        src={
                          formPaymentMethod.paymentLogo.img
                            ? URL.createObjectURL(formPaymentMethod.paymentLogo.img)
                            : ''
                        }
                        width={70}
                        alt="Preview"
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs>
                    {formPaymentMethod.paymentLogo.fileName ? (
                      <Chip
                        label={formPaymentMethod.paymentLogo.fileName}
                        onDelete={() =>
                          setFormPaymentMethod({ ...formPaymentMethod, paymentLogo: { img: null, fileName: '' } })
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
                if (formPaymentMethod.id) {
                  putApiHandler(formPaymentMethod);
                } else {
                  postApiHandler(formPaymentMethod, listInstructions);
                }
                setListInstructions([]);
                setFormPaymentMethod({
                  id: null,
                  paymentName: '',
                  iD_Or_Number: '',
                  paymentLogo: { img: null, fileName: '' },
                });
              }}
              style={{ width: '100%', fontWeight: 'bold' }}
            >
              {formPaymentMethod.id ? 'Simpan' : 'Tambah'}
            </Button>

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
                            {item.instruksi.map((itemInstruksi, index) => {
                              return <div>{index + 1 + '. ' + itemInstruksi}</div>;
                            })}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span>{item.logo ? <img src="" width={60} alt={item.logo} /> : null}</span>
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
                                    paymentLogo: { img: null, fileName: '' },
                                  });
                                } else {
                                  item.instruksi.map((itemInstruksi, index) => {
                                    console.log(itemInstruksi);
                                    setListInstructions((list) => [
                                      ...list,
                                      { id: index + 1, instructionText: itemInstruksi },
                                    ]);
                                  });
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
                                deleteApiHandler(item.id);
                                if (item.id === formPaymentMethod.id) {
                                  setListInstructions([]);
                                  setFormPaymentMethod({
                                    id: null,
                                    paymentName: '',
                                    iD_Or_Number: '',

                                    paymentLogo: { img: null, fileName: '' },
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

            {formPaymentMethod.paymentName}
            <br />
            {formPaymentMethod.iD_Or_Number}
            <br />
            {formPaymentMethod.instructions}
            <br />
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default PaymentMethod;
