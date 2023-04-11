import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Grid, Paper, TextField, useTheme } from '@mui/material';

function FrequentlyAskedQuestions() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formFrequentlyAskedQuestions, setFormFrequentlyAskedQuestions] = useState({
    question: '',
    answer: '',
  });

  React.useEffect(() => {
    document.title = 'Edit FAQ';
  }, []);

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

            <Button variant="contained" size="large" style={{ width: '100%', fontWeight: 'bold' }}>
              Tambah
            </Button>

            {formFrequentlyAskedQuestions.question}
            <br />
            {formFrequentlyAskedQuestions.answer}
            <br />
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default FrequentlyAskedQuestions;
