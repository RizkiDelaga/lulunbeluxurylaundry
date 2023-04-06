import {
  Autocomplete,
  Box,
  FormControl,
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
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import dayjs from 'dayjs';
import { LocalizationProvider, MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const options = ['Option 1', 'Option 2'];

function Input() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [orderForm, setOrderForm] = useState();

  // Datepicker
  // const [value, setValue] = React.useState(dayjs('2019-01-25 12:45:02').format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]'));
  const [value, setValue] = React.useState(dayjs());
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
          <TextField required label="Required" sx={{ width: '100%' }} />
          <TextField label="multiline" multiline maxRows={4} sx={{ width: '100%' }} />

          <TextField label="Search field" type="search" sx={{ width: '100%' }} />
          <TextField label="Helper text" helperText="Some important text" sx={{ width: '100%' }} />
          <TextField label="Number" type="number" sx={{ width: '100%' }} />

          <FormControl
            variant="outlined"
            onChange={(e) => {
              setOrderForm(e.target.value);
            }}
            sx={{ width: '100%' }}
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
                console.log('Tanggal: ' + newValue.$D);
                console.log('Bulan: ' + newValue.$M);
                console.log('Tahun: ' + newValue.$y);
                console.log('Jam: ' + newValue.$H);
                console.log('Menit: ' + newValue.$m);
                console.log('Detik: ' + newValue.$s);
                setLoading(false);
              }}
              renderInput={(params) => <TextField {...params} />}
              slotProps={{
                textField: {
                  helperText: 'MM / DD / YYYY',
                },
              }}
              sx={{
                width: '100%',
                '& .MuiDialog-root .MuiModal-root .css-3dah0e-MuiModal-root-MuiDialog-root': {
                  zIndex: 100000,
                },
              }}
            />

            <br />
            <MobileTimePicker
              label="For mobile"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                console.log(newValue);
                console.log('Jam: ' + newValue.$H);
                setLoading(false);
              }}
              renderInput={(params) => <TextField {...params} />}
              slotProps={{
                textField: {
                  helperText: 'MM / DD / YYYY',
                },
              }}
              sx={{ width: '100%' }}
            />
          </LocalizationProvider>
          {/* <h1>{value}</h1> */}
          <h1>{loading ? null : value.toString()}</h1>

          <br />
          <Autocomplete
            sx={{ width: '100%' }}
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

export default Input;
