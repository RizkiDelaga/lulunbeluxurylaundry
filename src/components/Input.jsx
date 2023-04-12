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
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import dayjs from 'dayjs';
import { LocalizationProvider, MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

const options = ['Option 1', 'Option 2'];

function Input() {
  let useDate = new Date();
  const theme = useTheme();
  const navigate = useNavigate();
  const [orderForm, setOrderForm] = useState();
  const [image, setImage] = React.useState({});

  const [showPassword, setShowPassword] = useState(false);
  // const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });

  // Datepicker
  // const [value, setValue] = React.useState(dayjs('2019-01-25 12:45:02').format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]'));
  const [date, setDate] = React.useState({
    year: 2012,
    month: null,
    date: null,
  });
  const [time, setTime] = React.useState();
  const [dateTime, setDateTime] = React.useState();
  // dayjs().set('year', 2022).set('month', 5).set('day', 20).set('hour', 5).set('minute', 55).set('second', 15);
  const [value, setValue] = React.useState(
    dayjs()
      .set('year', 2022)
      .set('month', 4)
      .set('day', 20)
      .set('hour', 5 + 7)
      .set('minute', 55)
      .set('second', 15)
  );

  const [valueX, setValueX] = React.useState(dayjs());
  // const [value, setValue] = React.useState();

  useEffect(() => {
    // let date = new Date();
    console.log('date');
    // console.log(date.getHours() + ' ' + date.getMinutes() + ' ' + date.getSeconds());
  }, []);

  const [select, setSelect] = React.useState({});
  const countries = [
    {
      address:
        'Andorra Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam laudantium repellat eligendi reprehenderit quia repellendus recusandae eveniet natus in molestias rem earum, neque maxime hic velit ipsa voluptates dicta vel.',
      img: 'https://loremflickr.com/cache/resized/65535_52221868541_94ff5e1bc0_c_640_480_nofilter.jpg',
    },
    {
      address: 'United Arab Emirates',
      img: 'https://loremflickr.com/cache/resized/65535_52599625509_79556354a1_b_640_480_nofilter.jpg',
    },
    {
      address: 'Afghanistan',
      img: 'https://loremflickr.com/cache/resized/65535_52613049706_41c5129b3e_z_640_480_nofilter.jpg',
    },
    {
      address: 'Antigua and Barbuda',
      img: 'https://loremflickr.com/cache/resized/65535_52312472207_66bd987f9d_c_640_480_nofilter.jpg',
    },
    {
      address:
        'Andorra Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam laudantium repellat eligendi reprehenderit quia repellendus recusandae eveniet natus in molestias rem earum, neque maxime hic velit ipsa voluptates dicta vel.',
      img: 'https://loremflickr.com/cache/resized/65535_52438185688_e4eda3e577_c_640_480_nofilter.jpg',
    },
    {
      address:
        'Andorra Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam laudantium repellat eligendi reprehenderit quia repellendus recusandae eveniet natus in molestias rem earum, neque maxime hic velit ipsa voluptates dicta vel.',
      img: 'https://loremflickr.com/cache/resized/65535_52200388018_cee17c5025_z_640_480_nofilter.jpg',
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
        <InputLabel htmlFor="input-password">Password *</InputLabel>
        <OutlinedInput
          required
          label="Password"
          helperText="Some important text"
          id="input-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" color="primary">
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* Input Date */}
        <MobileDatePicker
          label="For mobile"
          value={value}
          onChange={(newValue) => {
            // setValue(newValue);
            setValueX(dayjs(`${date.year}-01-25 12:45:02`));
            setDate({ year: newValue.$y, month: newValue.$M, date: newValue.$D });

            console.log('Tanggal: ' + newValue.$D);
            console.log('Bulan: ' + newValue.$M);
            console.log('Tahun: ' + newValue.$y);
            // setLoading(false);
          }}
          renderInput={(params) => <TextField {...params} />}
          slotProps={{
            textField: {
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

        {/* Input Time */}
        <MobileTimePicker
          label="For mobile"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            setTime({ hour: newValue.$H, minute: newValue.$m, second: newValue.$s });

            console.log(newValue);
            console.log('Jam: ' + newValue.$H);
            console.log('Menit: ' + newValue.$m);
            console.log('Detik: ' + newValue.$s);
          }}
          renderInput={(params) => <TextField {...params} />}
          slotProps={{
            textField: {
              // helperText: 'MM / DD / YYYY',
            },
          }}
          sx={{ width: '100%' }}
        />
      </LocalizationProvider>

      {/* <h1>{value}</h1> */}
      <h1>{value ? value.toString() : null}</h1>
      <h1>{valueX ? valueX.toString() : null}</h1>

      {/* Input Select */}
      <Autocomplete
        sx={{ width: '400px' }}
        options={countries}
        autoHighlight
        onChange={(event, newValue) => {
          console.log(newValue);
          setSelect(newValue);
        }}
        getOptionLabel={(option) => option.address}
        renderOption={(props, option) => (
          <div style={{ paddingTop: '16px', paddingBottom: '16px' }} {...props}>
            {option.address}
          </div>
        )}
        renderInput={(params) => <TextField {...params} label="Choose a country" />}
      />

      {select.label}

      <Autocomplete
        sx={{ width: '100%' }}
        options={countries}
        autoHighlight
        onChange={(event, newValue) => {
          console.log(newValue);
          setSelect(newValue);
        }}
        getOptionLabel={(option) => option.address}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img loading="lazy" width="100px" src={option.img} alt="" />
            {option.address}
          </Box>
        )}
        ListboxProps={{
          style: {
            maxHeight: '400px',
          },
        }}
        renderInput={(params) => (
          <TextField
            multiline
            {...params}
            label="Choose a country"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <img
                    loading="lazy"
                    width="100"
                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJmI2k0FuQjvPhpvG0CoBNbaq0MVlOgyfgvA&usqp=CAU`}
                    alt=""
                  />
                </>
              ),
            }}
          />
        )}
      />

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
                setImage({ img: e.target.files[0], fileName: !e.target.files[0] ? null : e.target.files[0].name });
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

      {/* 
      {formRegisterNewAdministrator.administratorName}
      <br />
      {formRegisterNewAdministrator.contact.phoneNumber}
      <br />
      {formRegisterNewAdministrator.contact.email}
      <br />
      {formRegisterNewAdministrator.role}
      <br />
      {formRegisterNewAdministrator.password}
      <br />
      {formRegisterNewAdministrator.confirmPassword}
       */}
    </>
  );
}

export default Input;
