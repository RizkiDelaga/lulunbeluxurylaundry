import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import {
  Box,
  Button,
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
import axios from 'axios';
import LoadDecisions from '../../../../components/LoadDecisions/LoadDecisions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditOffIcon from '@mui/icons-material/EditOff';

function FrequentlyAskedQuestions() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [listFaq, setListFaq] = useState([]);
  const [formFrequentlyAskedQuestions, setFormFrequentlyAskedQuestions] = useState({
    id: null,
    question: '',
    answer: '',
  });
  const [formValidation, setFormValidation] = useState({ question: '', answer: '' });

  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Edit FAQ';
    getApiHandler();
  }, []);

  const getApiHandler = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/faq',
      });
      console.log('Response GET');
      console.log(res);
      setListFaq(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setListFaq([]);
      }
      console.log(error);
    }
  };

  const handleCreateFAQ = async () => {
    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/faq',
        data: {
          pertanyaan: formFrequentlyAskedQuestions.question,
          jawaban: formFrequentlyAskedQuestions.answer,
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
        message: error.response.data.message,
        statusType: 'error',
      });

      console.log(error);
    }
  };

  const handleUpdateFAQ = async () => {
    try {
      setOpenLoadDecision({ ...openLoadDecision, isLoad: true });
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/faq/${formFrequentlyAskedQuestions.id}`,
        data: {
          pertanyaan: formFrequentlyAskedQuestions.question,
          jawaban: formFrequentlyAskedQuestions.answer,
        },
      });
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Berhasil di Edit!',
          statusType: 'success',
        });
      }
      setFormFrequentlyAskedQuestions({
        id: null,
        question: '',
        answer: '',
      });
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
        url: `https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/faq/${id}`,
      });
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Berhasil di Hapus!',
          statusType: 'success',
        });
      }
      setFormFrequentlyAskedQuestions({
        id: null,
        question: '',
        answer: '',
      });
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
            title: 'Pertanyaan Yang Sering Diajukan (FAQ)',
          }}
        />

        {/* {openLoadDecision.isLoad ? (
          ) : null} */}
        <LoadDecisions
          setOpenLoad={setOpenLoadDecision}
          openLoad={openLoadDecision}
          // redirect={'/InformasiBisnis'}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Pertanyaan Yang Sering Diajukan (FAQ)</h2>
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={1.4} lg={1.1} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Pertanyaan</span>
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
                  label="Pertanyaan"
                  value={formFrequentlyAskedQuestions.question}
                  onChange={(e) => {
                    setFormFrequentlyAskedQuestions({ ...formFrequentlyAskedQuestions, question: e.target.value });
                  }}
                  autoComplete="off"
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={1.4} lg={1.1} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Jawaban</span>
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
                  label="Jawaban"
                  multiline
                  maxRows={4}
                  value={formFrequentlyAskedQuestions.answer}
                  onChange={(e) => {
                    setFormFrequentlyAskedQuestions({ ...formFrequentlyAskedQuestions, answer: e.target.value });
                  }}
                  autoComplete="off"
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              size="large"
              onClick={() => {
                if (formFrequentlyAskedQuestions.id) {
                  handleUpdateFAQ();
                } else {
                  handleCreateFAQ();
                }
              }}
              style={{ width: '100%', fontWeight: 'bold' }}
            >
              {formFrequentlyAskedQuestions.id ? 'Simpan' : 'Tambah'}
            </Button>

            {formFrequentlyAskedQuestions.question}
            <br />
            {formFrequentlyAskedQuestions.answer}
            <br />

            <TableContainer sx={{ width: '100%', borderRadius: '4px', backgroundColor: '#eeeeee' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ width: 0, fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
                      No
                    </TableCell>
                    <TableCell style={{ width: 'fit-content', fontWeight: 'bold', backgroundColor: '#eeeeee' }}>
                      Pertanyaan
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold', backgroundColor: '#eeeeee' }}>Jawaban</TableCell>
                    <TableCell style={{ width: 0, fontWeight: 'bold', backgroundColor: '#eeeeee' }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listFaq.map((item, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                        <TableCell align="center">
                          <span>{index + 1}</span>
                        </TableCell>
                        <TableCell>
                          <span>{item.pertanyaan}</span>
                        </TableCell>
                        <TableCell>
                          <span>{item.jawaban}</span>
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
                              onClick={() => {
                                if (formFrequentlyAskedQuestions.id && formFrequentlyAskedQuestions.id === item.id) {
                                  setFormFrequentlyAskedQuestions({
                                    id: null,
                                    question: '',
                                    answer: '',
                                  });
                                } else {
                                  setFormFrequentlyAskedQuestions({
                                    id: item.id,
                                    question: item.pertanyaan,
                                    answer: item.jawaban,
                                  });
                                }
                              }}
                            >
                              {formFrequentlyAskedQuestions.id && formFrequentlyAskedQuestions.id === item.id ? (
                                <EditOffIcon />
                              ) : (
                                <EditIcon />
                              )}
                            </Button>
                            <Button
                              variant="outlined"
                              className={`button-outlined-danger`}
                              onClick={() => {
                                if (item.id === formFrequentlyAskedQuestions.id) {
                                  setFormFrequentlyAskedQuestions({
                                    id: null,
                                    question: '',
                                    answer: '',
                                  });
                                }
                                deleteApiHandler(item.id);
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

export default FrequentlyAskedQuestions;
