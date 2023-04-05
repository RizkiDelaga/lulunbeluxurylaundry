import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './CreateNewOrder.module.css';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import dayjs from 'dayjs';
import { LocalizationProvider, MobileDatePicker, MobileTimePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const options = ['Option 1', 'Option 2'];

function CreateNewOrder() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [orderForm, setOrderForm] = useState();

  // Datepicker
  const [value, setValue] = React.useState(dayjs('2019-01-25 12:45:02').format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]'));
  const [loading, setLoading] = React.useState(true);

  const [select, setSelect] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  const countries = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    {
      code: 'AE',
      label: 'United Arab Emirates',
      phone: '971',
    },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    {
      code: 'AG',
      label: 'Antigua and Barbuda',
      phone: '1-268',
    },
  ];
  return (
    <>
      <Paper elevation={3}>
        <Box sx={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Formulir Pemesanan Laundry</h2>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className={`${style['dash-card']}`}>
                <div style={{ fontWeight: 'bold', marginBottom: '16px' }}>Informasi Pelanggan</div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis libero, repellendus doloremque, dolor
                impedit reprehenderit culpa a explicabo quas nihil autem totam quia obcaecati aliquam iusto laborum eum
                magni ex!
                <br />
                <Button variant="outlined" className={`button-outlined-primary ${style['']}`} style={{ width: '100%' }}>
                  Cari Pelanggan
                </Button>
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className={`${style['dash-card']}`}>
                <div style={{ fontWeight: 'bold', marginBottom: '16px' }}>Input Detail Pesanan</div>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md="auto"
                    lg="auto"
                    xl="auto"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <span>Tanggal Pemesanan</span>
                  </Grid>

                  <Grid
                    item
                    xs
                    lg
                    sx={{
                      display: 'flex',
                      [theme.breakpoints.down('md')]: {
                        paddingTop: '0px !important',
                      },
                    }}
                  >
                    <Grid container>
                      <Grid xs={6} sx={{ paddingRight: '8px' }}>
                        <TextField required label="Required" style={{ width: '100%' }} />
                      </Grid>
                      <Grid xs={6} sx={{ paddingLeft: '8px' }}>
                        <TextField required label="Required" style={{ width: '100%' }} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>

          <TextField required label="Required" style={{ width: '100%' }} />
          <TextField label="Search field" type="search" style={{ width: '100%' }} />
          <TextField label="Helper text" helperText="Some important text" style={{ width: '100%' }} />
          <TextField label="Number" type="number" style={{ width: '100%' }} />

          <FormControl
            variant="outlined"
            onChange={(e) => {
              setOrderForm(e.target.value);
            }}
            style={{ width: '100%' }}
          >
            <InputLabel htmlFor="text-field-password">Password</InputLabel>
            <OutlinedInput
              id="text-field-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={() => setShowPassword(!showPassword)}
                    edge="end"
                    color="primary"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <br />
          <br />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label="For mobile"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                console.log(newValue);
                setLoading(false);
              }}
              renderInput={(params) => <TextField {...params} />}
              slotProps={{
                textField: {
                  helperText: 'MM / DD / YYYY',
                },
              }}
            />

            <br />
            <MobileTimePicker
              label="For mobile"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                setLoading(false);
              }}
              renderInput={(params) => <TextField {...params} />}
              slotProps={{
                textField: {
                  helperText: 'MM / DD / YYYY',
                },
              }}
            />
          </LocalizationProvider>
          {/* <h1>{value}</h1> */}
          <h1>{loading ? null : value.toString()}</h1>

          <br />
          <Autocomplete
            sx={{ width: 300 }}
            options={countries}
            autoHighlight
            onChange={(event, newValue) => {
              setSelect(newValue.label);
            }}
            // inputValue={inputValue}
            // onInputChange={(event, newInputValue) => {
            //   setInputValue(newInputValue);
            // }}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                  loading="lazy"
                  width="200"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  // srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label} ({option.code}) +{option.phone}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country"
                // inputProps={{
                //   ...params.inputProps,
                //   autoComplete: 'new-password', // disable autocomplete and autofill
                // }}
              />
            )}
          />
          {select}
        </Box>
      </Paper>
    </>
  );
}

export default CreateNewOrder;
