import { Container, Grid, Paper } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function HowToPay() {
  const navigate = useNavigate();
  const [howToPay, setHowToPay] = React.useState([]);

  React.useEffect(() => {
    document.title = 'Cara Pembayaran';
    handleGetHowToPay();
  }, []);

  const handleGetHowToPay = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_KEY}/metodepembayaran`,
      });

      setHowToPay(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container sx={{ mt: '50px', mb: '25px' }}>
        <Paper
          elevation={3}
          sx={{ padding: 3, borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          <h3 style={{ textAlign: 'center' }}>Metode Pembayaran</h3>
          {howToPay.map((item, index) => {
            return (
              <div>
                <Grid container spacing={1}>
                  <Grid item xs="auto" sx={{ fontWeight: 'bold' }}>
                    {index + 1}.
                  </Grid>
                  <Grid item xs>
                    <div style={{ fontWeight: 'bold' }}>{item.nama}</div>
                    {!item.logo ? null : <img src={item.logo} width={180} alt="" />}
                    {!item.nomor ? null : (
                      <div>
                        <strong>ID/Nomer Pembayaran : </strong>
                        {item.nomor}
                      </div>
                    )}
                    {!item.instruksi ? null : (
                      <>
                        Instruksi Pembayaran :
                        <ul style={{ margin: 0 }}>
                          <div>
                            {item.instruksi.map((i) => {
                              return <li>{i}</li>;
                            })}
                          </div>
                        </ul>
                      </>
                    )}
                  </Grid>
                </Grid>
              </div>
            );
          })}
        </Paper>
      </Container>
    </>
  );
}

export default HowToPay;
