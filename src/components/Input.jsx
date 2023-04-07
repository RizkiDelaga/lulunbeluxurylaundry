import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
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
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

const options = ['Option 1', 'Option 2'];

function Input() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [orderForm, setOrderForm] = useState();
  const [image, setImage] = React.useState({});

  // Datepicker
  // const [value, setValue] = React.useState(dayjs('2019-01-25 12:45:02').format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]'));
  const [value, setValue] = React.useState(dayjs());
  const [loading, setLoading] = React.useState(true);

  const [select, setSelect] = React.useState(options[0]);
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
      {/* Input Text */}
      <TextField
        required
        label=""
        placeholder=""
        helperText=""
        multiline
        maxRows={4}
        // value={state}
        // onChange={(e) => {setState(e.target.value)}}
        sx={{ width: '100%' }}
      />

      {/* Input Search */}
      <TextField
        type="search"
        label=""
        placeholder=""
        helperText=""
        // value={state}
        // onChange={(e) => {setState(e.target.value)}}
        sx={{ width: '100%' }}
      />

      {/* Input Number */}
      <TextField
        type="number"
        label=""
        placeholder=""
        helperText=""
        // value={state}
        // onChange={(e) => {setState(e.target.value)}}
        sx={{ width: '100%' }}
      />

      {/* Input Password */}
      <FormControl
        variant="outlined"
        // onChange={(e) => {
        //   setState(e.target.value);
        // }}
        sx={{ width: '100%' }}
      >
        <InputLabel htmlFor="text-field-password">Password</InputLabel>
        <OutlinedInput
          helperText="Some important text"
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

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* Input Date */}
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

        {/* Input Time */}
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

      {/* Input Select */}
      <Autocomplete
        sx={{ width: '100%' }}
        options={countries}
        autoHighlight
        onChange={(event, newValue) => {
          setSelect(newValue.label);
        }}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img loading="lazy" width="200" src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`} alt="" />
            {option.label} ({option.code}) +{option.phone}
          </Box>
        )}
        renderInput={(params) => <TextField {...params} label="Choose a country" />}
      />
      {select}

      {/* Input File (Image) */}
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
                setImage({ img: e.target.files[0], fileName: e.target.files[0].name });
                console.log(image);
              }}
              hidden
            />
          </Button>
        </Grid>
        <Grid item xs="auto">
          {image.img ? (
            <img id="output" src={image.img ? URL.createObjectURL(image.img) : ''} width={70} alt="Preview" />
          ) : null}
        </Grid>
        <Grid item xs>
          {image.fileName ? (
            <Chip label={image.fileName} onDelete={() => setImage({})} sx={{ maxWidth: '250px' }} />
          ) : null}
        </Grid>
      </Grid>
    </>
  );
}

export default Input;
