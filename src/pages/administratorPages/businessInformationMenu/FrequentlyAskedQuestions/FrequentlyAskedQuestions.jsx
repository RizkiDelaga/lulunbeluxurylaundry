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

function FrequentlyAskedQuestions() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [listFaq, setListFaq] = useState([]);
  const [formFrequentlyAskedQuestions, setFormFrequentlyAskedQuestions] = useState({
    question: '',
    answer: '',
  });

  React.useEffect(() => {
    document.title = 'Edit FAQ';
    getListFaqHandler();
  }, []);

  const getListFaqHandler = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/faq',
      });
      setListFaq(res.data.data);
      console.log(res);
      // console.log(listFaq);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (data) => {
    try {
      const res = await axios({
        method: 'POST',
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/faq',
        data: {
          pertanyaan: data.question,
          jawaban: data.answer,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFaqHandler = async (id) => {
    try {
      const res = await axios({
        method: 'DELETE',
        url: `https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/faq/${id}`,
      });
      getListFaqHandler();
      // setListFaq(res.data.data);
      console.log(res);
      // console.log(listFaq);
    } catch (error) {
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
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              size="large"
              onClick={() => {
                submitHandler(formFrequentlyAskedQuestions);
              }}
              style={{ width: '100%', fontWeight: 'bold' }}
            >
              Tambah
            </Button>
            {listFaq.length ? listFaq[0].pertanyaan : 'belum ada'}

            {formFrequentlyAskedQuestions.question}
            <br />
            {formFrequentlyAskedQuestions.answer}
            <br />
            <TableContainer sx={{ maxHeight: 'none', width: '100%' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ fontWeight: 'bold' }}>
                      No
                    </TableCell>
                    <TableCell style={{ width: 'fit-content', fontWeight: 'bold' }}>No</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>column.label</TableCell>
                    <TableCell style={{ width: 'fit-content', fontWeight: 'bold' }}></TableCell>
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
                          <span align="right">
                            <div>
                              <Button>Edit</Button>
                              <Button onClick={() => deleteFaqHandler(item.id)}>Delete</Button>
                            </div>
                          </span>
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
