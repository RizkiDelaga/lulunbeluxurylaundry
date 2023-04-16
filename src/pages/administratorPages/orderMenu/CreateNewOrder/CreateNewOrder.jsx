import { Box, Button, Chip, Grid, Paper, Switch, TextField, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
              <TextField
                type="number"
                label="Diskon"
                value={formOrder.discount}
                onChange={(e) => {
                  setFormOrder({ ...formOrder, discount: e.target.value });
                }}
                autoComplete="off"
                onWheel={(e) => e.target.blur()}
                sx={{ width: '100%' }}
              />
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

const InputItem = (props) => {
  const theme = useTheme();
  const [image, setImage] = React.useState({});

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
  const [item, setItem] = React.useState({
    itemName: '',
    quantity: null,
    pricePerUnit: null,
    laundryType: '',
    notation: '',
    photo: {},
  });

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
              <TextField
                required
                label="Nama Barang"
                value={item.itemName}
                onChange={(e) => {
                  setItem({ ...item, itemName: e.target.value });
                }}
                autoComplete="off"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={5} sm={3} md={2} lg={1.2}>
              <TextField
                required
                type="number"
                label="Kuantitas"
                value={item.quantity}
                onChange={(e) => {
                  setItem({ ...item, quantity: e.target.value });
                }}
                autoComplete="off"
                onWheel={(e) => e.target.blur()}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs sm={12} md={3} lg={2}>
              <TextField
                required
                type="number"
                label="Harga Per Unit"
                value={item.pricePerUnit}
                onChange={(e) => {
                  setItem({ ...item, pricePerUnit: e.target.value });
                }}
                autoComplete="off"
                onWheel={(e) => e.target.blur()}
                sx={{ width: '100%' }}
              />
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
          <TextField
            label="Catatan"
            multiline
            maxRows={4}
            value={item.notation}
            onChange={(e) => {
              setItem({ ...item, notation: e.target.value });
            }}
            autoComplete="off"
            sx={{ width: '100%' }}
          />
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
                    setItem({
                      ...item,
                      photo: { img: e.target.files[0], fileName: !e.target.files[0] ? null : e.target.files[0].name },
                    });
                    // console.log(formItem.photo.img);
                  }}
                  hidden
                />
              </Button>
            </Grid>
            <Grid item xs="auto">
              {item.photo.img ? (
                <img
                  id="output"
                  src={item.photo.img ? URL.createObjectURL(item.photo.img) : ''}
                  width={70}
                  alt="Preview"
                />
              ) : null}
            </Grid>
            <Grid item xs>
              {item.photo.fileName ? (
                <Chip
                  label={item.photo.fileName}
                  onDelete={() => setItem({ ...item, photo: {} })}
                  sx={{ maxWidth: '250px' }}
                />
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

      {item.itemName}
      <br />
      {item.quantity}
      <br />
      {item.pricePerUnit}
      <br />
      {item.notation}
      <br />
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

  const handleFormOrder = (e) => {
    setFormOrder({ ...formOrder, discount: e.target.value });
  };

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

            <OrderInformationForm stateValue={formOrder} handleState={handleFormOrder} />
            <LaundryShuttle stateValue={formOrder} handleState={setFormOrder} />
            <InputItem stateValue={formOrder} handleState={setFormOrder} />

            <Button
              variant="contained"
              size="large"
              style={{ width: '100%', fontWeight: 'bold' }}
              onClick={() => navigate('/Pesanan/2')}
            >
              Buat pesanan
            </Button>

            {formOrder.discount}
            <br />
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default CreateNewOrder;
