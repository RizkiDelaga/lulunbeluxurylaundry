import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  useTheme,
} from '@mui/material';
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

  const [formOrder, setFormOrder] = React.useState({
    dateOrder: dayjs(),
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

  const dataServiceType = [
    {
      id: 12,
      layanan: 'Express',
      hari: null,
      jam: 2,
      gambar: 'IMG_20220730_140826.jpg',
      deskripsi:
        'Waktu pencucian dilakukan dengan singkat mulai dari 2-5 jam untuk kategori barang seperti pakaian, bedcover, sepatu, tas, sajadah, jas, dan boneka.',
      createdAt: '2023-04-13T06:24:07.039Z',
      updatedAt: '2023-04-13T06:25:43.930Z',
    },
    {
      id: 15,
      layanan: 'Standard',
      hari: 2,
      jam: 5,
      gambar: 'IMG_20220730_140826.jpg',
      deskripsi:
        'Waktu pencucian biasa dilakukan selama 1-2 hari untuk beberapa kategori barang seperti pakaian, bedcover, sepatu, tas, sajadah, jas, dan boneka.',
      createdAt: '2023-04-13T06:29:47.875Z',
      updatedAt: '2023-04-13T06:33:59.303Z',
    },
    {
      id: 16,
      layanan: 'Khusus',
      hari: 7,
      jam: null,
      gambar: 'IMG_20220730_140826.jpg',
      deskripsi:
        'Waktu pencucian dilakukan lebih lama dari biasanya, antara 4-7 hari untuk kategori barang besar seperti karpet dan gordyn.',
      createdAt: '2023-04-13T06:30:38.369Z',
      updatedAt: '2023-04-13T06:35:36.549Z',
    },
  ];

  const dataPaymentMethod = [
    {
      id: 23,
      logo: 'logo-uang.png',
      nama: 'Cash',
      nomor: null,
      instruksi: ['Lakukan Pembayaran Secara Langsung Melalui Petugas Outlet'],
      createdAt: '2023-04-14T07:46:11.853Z',
      updatedAt: '2023-04-14T10:14:02.762Z',
    },
    {
      id: 20,
      logo: 'logo-uang.png',
      nama: 'Ovo',
      nomor: '08123456789',
      instruksi: [
        'Buka Aplikasi Ovo',
        "Masuk ke menu 'Pay'",
        'Pilih metode Input Nomor HP',
        'Pilih metode pembayaran (OVO Cash atau OVO Point)',
        'Masukkan Security Code',
        'Pembayaran berhasil! Lakukan konfirmasi dengan menghubungi admin',
      ],
      createdAt: '2023-04-14T07:36:16.294Z',
      updatedAt: '2023-04-15T03:05:18.877Z',
    },
    {
      id: 24,
      logo: 'logo-uang.png',
      nama: 'Transfer Bank',
      nomor: '091312923121398',
      instruksi: [
        'Lakukan pembayaran dengan cara melakukan transfer ke nomer bank 091312923121398 sesuai dengan nominal struk tagihan yang ada',
        'Transfer dapat dilakukan dengan cara transfer via mesin ATM, Internet Banking, dan Mobile banking ',
        'Pembayaran berhasil! Lakukan konfirmasi dengan menghubungi admin',
      ],
      createdAt: '2023-04-15T03:06:07.080Z',
      updatedAt: '2023-04-15T03:06:07.080Z',
    },
  ];

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
              <Grid container>
                <Grid xs={6} sx={{ paddingRight: '8px' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      label="Pilih Tanggal"
                      value={formOrder.dateOrder}
                      onChange={(value) => {
                        setFormOrder({
                          ...formOrder,
                          dateOrder: value,
                        });

                        console.log('Tanggal: ' + value.$D);
                        console.log('Bulan: ' + value.$M);
                        console.log('Tahun: ' + value.$y);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      slotProps={{
                        textField: {
                          error: false,
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
                  </LocalizationProvider>
                </Grid>
                <Grid xs={6} sx={{ paddingLeft: '8px' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker
                      label="Pilih Jam"
                      value={formOrder.dateOrder}
                      onChange={(value) => {
                        setFormOrder({
                          ...formOrder,
                          dateOrder: value,
                        });

                        console.log('Jam: ' + value.$H);
                        console.log('Menit: ' + value.$m);
                        console.log('Detik: ' + value.$s);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      slotProps={{
                        textField: {
                          error: false,
                          helperText:
                            ('0' + formOrder.dateOrder.$H).slice(-2) + ':' + ('0' + formOrder.dateOrder.$m).slice(-2),
                        },
                      }}
                      sx={{ width: '100%' }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
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
              <FormControl fullWidth>
                <InputLabel id="select-service-type-label">Jenis Layanan *</InputLabel>
                <Select
                  required
                  labelId="select-service-type-label"
                  id="select-service-type"
                  value={formOrder.serviceType}
                  label="Jenis Layanan"
                  onChange={(e) => {
                    setFormOrder({
                      ...formOrder,
                      serviceType: e.target.value,
                    });
                  }}
                >
                  {dataServiceType.map((item) => {
                    return (
                      <MenuItem value={item.layanan} sx={{ py: '16px', whiteSpace: 'normal' }}>
                        {formOrder.serviceType === item.layanan ? (
                          item.layanan
                        ) : (
                          <div style={{ display: 'block' }}>
                            <div style={{ fontWeight: 'bold' }}>
                              {item.layanan} (
                              {(item.hari ? item.hari + ' Hari' : '') +
                                (item.hari && item.jam ? ' ' : '') +
                                (item.jam ? item.jam + ' Jam' : '')}
                              )
                            </div>
                            <div>{item.deskripsi}</div>
                          </div>
                        )}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              {formOrder.serviceType}
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
              <FormControl fullWidth>
                <InputLabel id="select-payment-method-label">Metode Pembayaran *</InputLabel>
                <Select
                  required
                  labelId="select-payment-method-label"
                  id="select-payment-method"
                  value={formOrder.paymentMethod}
                  label="Metode Pembayaran"
                  onChange={(e) => {
                    setFormOrder({
                      ...formOrder,
                      paymentMethod: e.target.value,
                    });
                  }}
                >
                  {dataPaymentMethod.map((item) => {
                    return (
                      <MenuItem value={item.nama} sx={{ py: '16px', whiteSpace: 'normal' }}>
                        {formOrder.paymentMethod === item.nama ? (
                          item.nama
                        ) : (
                          <div style={{ display: 'block' }} {...props}>
                            <div style={{ fontWeight: 'bold' }}>{item.nama}</div>
                            <div style={{ fontWeight: 'bold' }}>Instruksi:</div>
                            {item.instruksi.map((itemInstruction, index) => {
                              return (
                                <table>
                                  <tr>
                                    <td style={{ display: 'block' }}>{index + 1}.</td>
                                    <td>{itemInstruction}</td>
                                  </tr>
                                </table>
                              );
                            })}
                          </div>
                        )}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              {formOrder.paymentMethod}
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
  });

  const dataAddress = [
    {
      id: 1,
      kategori: 'Rumah',
      detail: 'No.15C',
      kecamatan: 'Purwokerto Utara',
      kelurahan: 'Purwokerto Lor',
      rt: '05',
      rw: '03',
      deskripsi: 'rumah warna hijau sebelah warung',
      gambar: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/House2008.jpg',
    },
    {
      id: 2,
      kategori: 'Kost',
      detail: 'Yellow',
      kecamatan: 'Purwokerto Utara',
      kelurahan: 'Purwokerto Lor',
      rt: '07',
      rw: '13',
      deskripsi: 'Kost warna kuning depan fotokopi',
      gambar: 'https://pix10.agoda.net/hotelImages/135/1353767/1353767_16081917290045634234.jpg?ca=6&ce=1&s=1024x768',
    },
    {
      id: 3,
      kategori: 'Hotel',
      detail: 'Aston',
      kecamatan: 'Purwokerto Utara',
      kelurahan: 'Purwokerto Lor',
      rt: null,
      rw: null,
      deskripsi: 'Lobi hotel',
      gambar: 'https://nubanyumas.com/wp-content/uploads/2022/04/images-16.jpeg',
    },
  ];

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
            <FormControl fullWidth sx={{ mt: '8px' }}>
              <InputLabel id="select-pickup-address-label">Alamat Penjemputan *</InputLabel>
              <Select
                required
                labelId="select-pickup-address-label"
                id="select-pickup-address"
                value={formOrder.address.pickupAddress}
                label="Alamat Pengantaran"
                onChange={(e) => {
                  setFormOrder({
                    ...formOrder,
                    address: { ...formOrder.address, pickupAddress: e.target.value },
                  });
                }}
                MenuProps={{
                  style: { zIndex: 10000 },
                }}
              >
                {dataAddress.map((itemAddress) => {
                  return (
                    <MenuItem value={itemAddress.id} sx={{ py: '16px' }}>
                      <Box sx={{ display: 'flex', gap: '10px', whiteSpace: 'normal', alignItems: 'center' }}>
                        <img src={itemAddress.gambar} height={70} style={{ objectFit: 'cover' }} alt="" />
                        <div>
                          <div>
                            Kecamatan {itemAddress.kecamatan}, Kelurahan {itemAddress.kelurahan}, RW/{itemAddress.rw},
                            RT/{itemAddress.rt}, {itemAddress.kategori}, {itemAddress.deskripsi}
                          </div>
                        </div>
                      </Box>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <div>Alamat Pengantaran</div>
            <FormControl fullWidth sx={{ mt: '8px' }}>
              <InputLabel id="select-delivery-address-label">Alamat Pengantaran *</InputLabel>
              <Select
                required
                labelId="select-delivery-address-label"
                id="select-delivery-address"
                value={formOrder.address.deliveryAddress}
                label="Alamat Pengantaran"
                onChange={(e) => {
                  setFormOrder({
                    ...formOrder,
                    address: { ...formOrder.address, deliveryAddress: e.target.value },
                  });
                }}
                MenuProps={{
                  style: { zIndex: 10000 },
                }}
              >
                {dataAddress.map((itemAddress) => {
                  return (
                    <MenuItem value={itemAddress.id} sx={{ py: '16px' }}>
                      <Box sx={{ display: 'flex', gap: '10px', whiteSpace: 'normal', alignItems: 'center' }}>
                        <img src={itemAddress.gambar} height={70} style={{ objectFit: 'cover' }} alt="" />
                        <div>
                          <div>
                            Kecamatan {itemAddress.kecamatan}, Kelurahan {itemAddress.kelurahan}, RW/{itemAddress.rw},
                            RT/{itemAddress.rt}, {itemAddress.kategori}, {itemAddress.deskripsi}
                          </div>
                        </div>
                      </Box>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
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
    laundryType: null,
    notation: '',
    photo: {},
  });

  const dataLaundryType = [
    {
      id: 9,
      nama: 'Wet Cleaning',
      deskripsi: 'Proses pencucian dilakukan dengan air dan deterjen menggunakan mesin cuci seperti pada umumnya.',
      gambar: 'hackit.png',
      createdAt: '2023-04-17T04:41:56.626Z',
      updatedAt: '2023-04-17T04:41:56.626Z',
    },
    {
      id: 10,
      nama: 'Dry Cleaning',
      deskripsi: 'Proses pencucian menggunakan bahan kimia (solvent) tanpa melibatkan air dan deterjen biasa.',
      gambar: 'Localla_Logo.png',
      createdAt: '2023-04-17T04:42:19.915Z',
      updatedAt: '2023-04-17T04:42:19.915Z',
    },
  ];

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
          <FormControl fullWidth>
            <InputLabel id="select-laundry-type-label">Jenis Laundry *</InputLabel>
            <Select
              required
              labelId="select-laundry-type-label"
              id="select-laundry-type"
              value={item.laundryType}
              label="Jenis Laundry"
              onChange={(e) => {
                setItem({
                  ...item,
                  laundryType: e.target.value,
                });
              }}
            >
              {dataLaundryType.map((itemLaundryType) => {
                return (
                  <MenuItem value={itemLaundryType.nama} sx={{ py: '16px', whiteSpace: 'normal' }}>
                    {item.laundryType === itemLaundryType.nama ? (
                      itemLaundryType.nama
                    ) : (
                      <div style={{ display: 'block' }} {...props}>
                        <div style={{ fontWeight: 'bold' }}>{itemLaundryType.nama}</div>
                        <div>{itemLaundryType.deskripsi}</div>
                      </div>
                    )}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {item.laundryType}
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
    dateOrder: dayjs(),
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
