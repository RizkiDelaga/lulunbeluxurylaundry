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
  Paper,
  Switch,
  TextField,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './CreateNewOrder.module.css';
import dayjs from 'dayjs';
import { LocalizationProvider, MobileDatePicker, MobileTimePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';

const OrderInformationForm = (props) => {
  const theme = useTheme();
  // Datepicker
  // const [value, setValue] = React.useState(dayjs('2019-01-25 12:45:02').format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]'));
  const [value, setValue] = React.useState(dayjs());
  const [loading, setLoading] = React.useState(true);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <div className={`dash-card`}>
          <div style={{ fontWeight: 'bold', marginBottom: '16px' }}>Informasi Pelanggan</div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis libero, repellendus doloremque, dolor
          impedit reprehenderit culpa a explicabo quas nihil autem totam quia obcaecati aliquam iusto laborum eum magni
          ex!
          <br />
          <Button variant="outlined" className={`button-outlined-primary`} style={{ width: '100%' }}>
            Cari Pelanggan
          </Button>
        </div>
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <div className={`dash-card gap-16`}>
          <div style={{ fontWeight: 'bold' }}>Input Detail Pesanan</div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3.3} lg={3.3} sx={{ display: 'flex', alignItems: 'center' }}>
              <span>Tanggal Pemesanan</span>
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container>
                  <Grid xs={6} sx={{ paddingRight: '8px' }}>
                    <MobileDatePicker
                      required
                      label="Pilih Tanggal *"
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
                      sx={{
                        width: '100%',
                      }}
                    />
                  </Grid>
                  <Grid xs={6} sx={{ paddingLeft: '8px' }}>
                    <MobileTimePicker
                      required
                      label="Pilih Jam *"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                        console.log(newValue);
                        console.log('Jam: ' + newValue.$H);
                        setLoading(false);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3.3} lg={3.3} sx={{ display: 'flex', alignItems: 'center' }}>
              <span>Jenis Layanan</span>
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
              <TextField required label="Jenis Layanan" sx={{ width: '100%' }} />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3.3} lg={3.3} sx={{ display: 'flex', alignItems: 'center' }}>
              <span>Diskon</span>
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
              <TextField label="Diskon" type="number" sx={{ width: '100%' }} />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3.3} lg={3.3} sx={{ display: 'flex', alignItems: 'center' }}>
              <span>Metode Pembayaran</span>
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
              <TextField required label="Metode Pembayaran" sx={{ width: '100%' }} />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

const InputItem = (props) => {
  const theme = useTheme();
  const [image, setImage] = React.useState({});

  return (
    <div className={`dash-card gap-16`}>
      <div style={{ fontWeight: 'bold' }}>Input Barang</div>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={2} lg={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
          <span>Detail Barang</span>
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
            <Grid item xs={12} sm md lg>
              <TextField required label="Nama Barang" sx={{ width: '100%' }} />
              {/* <InputText
                stateValue={props.stateValue.items[0].itemName}
                handleState={(e) => {
                  props.handleState({ ...props.stateValue, items: [...props.stateValue.items ,{itemName: 'asd' }]});
                  console.log(props.stateValue)
                }}
                options={{
                  label: 'asd',
                  placeholder: '',
                  helperText: '',
                  multiline: false,
                  required: false,
                }}
              /> */}
            </Grid>
            <Grid item xs={5} sm={3} md={2} lg={1.2}>
              <TextField required label="Kuantitas" type="number" sx={{ width: '100%' }} />
            </Grid>
            <Grid item xs sm={12} md={3} lg={2}>
              <TextField required label="Harga per Unit" type="number" sx={{ width: '100%' }} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={2} lg={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
          <span>Jenis Laundry</span>
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
          <TextField required label="Jenis Laundry" sx={{ width: '100%' }} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={2} lg={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
          <span>Catatan</span>
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
          <TextField label="Catatan" multiline maxRows={4} sx={{ width: '100%' }} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={2} lg={1.5} sx={{ display: 'flex', alignItems: '' }}>
          <span>Foto Barang</span>
        </Grid>

        <Grid
          item
          xs
          lg
          sx={{
            display: 'flex',
            alignItems: 'center',
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
        </Grid>
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Button variant="outlined" className={`button-outlined-primary`}>
          Input Barang
        </Button>
      </div>
    </div>
  );
};

const LaundryShuttle = (props) => {
  const theme = useTheme();
  const [isUseProgram, setIsUseProgram] = React.useState(false);

  return (
    <div className={`dash-card gap-16`} style={{ width: '100%' }}>
      <div style={{ fontWeight: 'bold' }}>
        Program Antar Jemput
        <Switch
          onChange={(e) => {
            setIsUseProgram(e.target.checked);
            console.log(e.target.checked);
          }}
        />
      </div>

      {isUseProgram ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div>Alamat Penjemputan</div>
            <TextField
              required
              label="Alamat Penjemputan"
              sx={{
                width: '100%',
                marginTop: '8px !important',
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <div>Alamat Pengantaran</div>
            <TextField
              required
              label="Alamat Pengantaran"
              sx={{
                width: '100%',
                marginTop: '8px !important',
              }}
            />
          </Grid>
        </Grid>
      ) : null}
    </div>
  );
};

function CreateNewOrder() {
  const navigate = useNavigate();
  const [formOrder, setFormOrder] = React.useState({
    dateOrder: '',
    serviceType: '',
    discount: '',
    paymentMethod: '',
    customerInformation: {},
    address: {
      pickupAddress: '',
      deliveryAddress: '',
    },
    items: [
      {
        itemName: '',
        quantity: 0,
        pricePerUnit: 0,
        laundryType: '',
        notation: '',
        photo: {},
      },
    ],
  });

  React.useEffect(() => {
    document.title = 'Buat Pesanan Baru';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Pesanan"
          currentPage={{
            title: 'Buat Pesanan Baru',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Formulir Pemesanan Laundry</h2>
            </div>

            <OrderInformationForm />
            <LaundryShuttle />
            <InputItem stateValue={formOrder} handleState={setFormOrder} />

            <Button
              variant="contained"
              size="large"
              style={{ width: '100%', fontWeight: 'bold' }}
              onClick={() => navigate('/Pesanan/2')}
            >
              Buat pesanan
            </Button>
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default CreateNewOrder;
