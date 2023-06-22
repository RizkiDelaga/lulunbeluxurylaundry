import {
  Alert,
  Autocomplete,
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { LocalizationProvider, MobileDatePicker, MobileTimePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';
import LoadDecisions from '../../../../components/LoadDecisions/LoadDecisions';
import { adjustTime } from '../../../../utils/timeUtils';
import LaundryItemTable from '../../../../components/Table/LaundryItemTable';
import DetailCustomerCard from '../../../../components/Card/DetailCustomerCard';

const OrderInformationForm = ({ state, setState, listServiceType, listPaymentMethod }) => {
  const theme = useTheme();
  const profileCustomer = JSON.parse(localStorage.getItem('my_profile_account'));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <div className={`dash-card`}>
          <div style={{ fontWeight: 'bold', marginBottom: '16px' }}>Informasi Pelanggan</div>

          <DetailCustomerCard dataUser={profileCustomer} />

          {/* <br />
          <Button variant="outlined" className={`button-outlined-primary`} style={{ width: '100%' }}>
            Cari Pelanggan
          </Button> */}
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
                      value={dayjs(state.dateOrder)}
                      onChange={(value) => {
                        setState({
                          ...state,
                          dateOrder: value,
                        });

                        console.log('Tanggal: ' + value.$D);
                        console.log('Bulan: ' + value.$M);
                        console.log('Tahun: ' + value.$y);
                      }}
                      renderInput={(params) => <TextField {...params} required />}
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
                      value={dayjs(state.dateOrder)}
                      onChange={(value) => {
                        setState({
                          ...state,
                          dateOrder: value,
                        });

                        console.log('Jam: ' + value.$H);
                        console.log('Menit: ' + value.$m);
                        console.log('Detik: ' + value.$s);
                      }}
                      renderInput={(params) => <TextField {...params} required />}
                      slotProps={{
                        textField: {
                          error: false,
                          helperText: ('0' + state.dateOrder.$H).slice(-2) + ':' + ('0' + state.dateOrder.$m).slice(-2),
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
                  value={state.serviceType.name}
                  label="Jenis Layanan"
                  onChange={(e) => {
                    const indexValue = listServiceType.findIndex((x) => x.layanan === e.target.value);
                    setState({
                      ...state,
                      serviceType: {
                        name: listServiceType[indexValue].layanan,
                        duration: [
                          listServiceType[indexValue].hari,
                          listServiceType[indexValue].jam,
                          listServiceType[indexValue].menit,
                        ],
                      },
                    });
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxWidth: 500,
                        maxHeight: 400,
                      },
                    },
                  }}
                >
                  {listServiceType.map((item, index) => {
                    return (
                      <MenuItem value={item.layanan} sx={{ py: '16px' }}>
                        {item.layanan} (
                        {(item.hari ? item.hari + ' Hari' : '') +
                          (item.hari && item.jam ? ' ' : '') +
                          (item.jam ? item.jam + ' Jam' : '') +
                          (item.jam && item.menit ? ' ' : '') +
                          (item.menit ? item.menit + ' Menit' : '')}
                        )
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
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
                  value={state.paymentMethod}
                  label="Metode Pembayaran"
                  onChange={(e) => {
                    setState({
                      ...state,
                      paymentMethod: e.target.value,
                    });
                  }}
                >
                  {listPaymentMethod.map((item) => {
                    return (
                      <MenuItem value={item.nama} sx={{ py: '16px' }}>
                        {item.nama}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

const LaundryShuttle = ({ state, setState, listAddress }) => {
  const theme = useTheme();
  const parsePickupAddress = state.address.pickupAddress ? JSON.parse(state.address.pickupAddress) : null;
  const parseDeliveryAddress = state.address.deliveryAddress ? JSON.parse(state.address.deliveryAddress) : null;
  const [activePickupAddress, setActivePickupAddress] = React.useState(
    parsePickupAddress ? parsePickupAddress.id : null
  );
  const [activeDeliveryAddress, setActiveDeliveryAddress] = React.useState(
    parseDeliveryAddress ? parseDeliveryAddress.id : null
  );

  return (
    <div className={`dash-card gap-16`} style={{ width: '100%' }}>
      <div style={{ fontWeight: 'bold' }}>Program Antar Jemput</div>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div>Alamat Penjemputan</div>
          <FormControl fullWidth sx={{ mt: '8px' }}>
            <InputLabel id="select-pickup-address-label">Alamat Penjemputan *</InputLabel>
            <Select
              required
              labelId="select-pickup-address-label"
              id="select-pickup-address"
              value={activePickupAddress}
              label="Alamat Pengantaran"
              onChange={(e) => {
                setActivePickupAddress(e.target.value ? e.target.value : null);
                setState({
                  ...state,
                  address: {
                    ...state.address,
                    pickupAddress: e.target.value
                      ? JSON.stringify(listAddress[listAddress.findIndex((x) => x.id === e.target.value)])
                      : null,
                  },
                });
              }}
              MenuProps={{
                style: { zIndex: 10000 },
                PaperProps: {
                  style: {
                    maxHeight: 400,
                  },
                },
              }}
            >
              {listAddress.map((item, index) => {
                return (
                  <MenuItem value={item.id} sx={{ py: '16px' }}>
                    <Box sx={{ display: 'flex', gap: '10px', whiteSpace: 'normal', alignItems: 'center' }}>
                      <img src={item.gambar} width={100} style={{ objectFit: 'cover' }} alt="" />
                      <div>
                        {item.status === 'Priority' ? (
                          <div
                            style={{
                              backgroundColor: '#1F305C',
                              color: 'white',
                              padding: '4px 12px',
                              borderRadius: '24px',
                              width: 'fit-content',
                              fontSize: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <StarIcon fontSize="inherit" />
                            Alamat Utama
                          </div>
                        ) : null}
                        Kecamatan {item.kecamatan}, Kelurahan {item.kelurahan}, RW/{item.rw}, RT/{item.rt},{' '}
                        {item.kategori} {item.detail}, {item.deskripsi}
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
            <InputLabel id="select-delivery-address-label">Alamat Pengantaran</InputLabel>
            <Select
              labelId="select-delivery-address-label"
              id="select-delivery-address"
              value={activeDeliveryAddress}
              label="Alamat Pengantaran"
              onChange={(e) => {
                setActiveDeliveryAddress(e.target.value ? e.target.value : null);
                setState({
                  ...state,
                  address: {
                    ...state.address,
                    deliveryAddress: e.target.value
                      ? JSON.stringify(listAddress[listAddress.findIndex((x) => x.id === e.target.value)])
                      : null,
                  },
                });
              }}
              MenuProps={{
                style: { zIndex: 10000 },
                PaperProps: {
                  style: {
                    maxHeight: 400,
                  },
                },
              }}
            >
              <MenuItem value="" sx={{ py: '16px' }}>
                Tanpa di Antar (Ambil langsung di outlet)
              </MenuItem>
              {listAddress.map((item, index) => {
                return (
                  <MenuItem value={item.id} sx={{ py: '16px' }}>
                    <Box sx={{ display: 'flex', gap: '10px', whiteSpace: 'normal', alignItems: 'center' }}>
                      <img src={item.gambar} width={100} style={{ objectFit: 'cover' }} alt="" />
                      <div>
                        {item.status === 'Priority' ? (
                          <div
                            style={{
                              backgroundColor: '#1F305C',
                              color: 'white',
                              padding: '4px 12px',
                              borderRadius: '24px',
                              width: 'fit-content',
                              fontSize: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <StarIcon fontSize="inherit" />
                            Alamat Utama
                          </div>
                        ) : null}
                        Kecamatan {item.kecamatan}, Kelurahan {item.kelurahan}, RW/{item.rw}, RT/{item.rt},{' '}
                        {item.kategori} {item.detail}, {item.deskripsi}
                      </div>
                    </Box>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

const InputItem = ({
  stateValue,
  handleState,
  listLaundryType,
  handleCreateLaundryItem,
  handleUpdateLaundryItem,
  setOpenAlert,
}) => {
  const theme = useTheme();

  return (
    <>
      <h4>Input Barang</h4>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('click');
          setOpenAlert(false);
          if (stateValue.id) {
            handleUpdateLaundryItem();
          } else {
            handleCreateLaundryItem();
          }
        }}
      >
        <Box className="gap-16">
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
                    type="text"
                    label="Nama Barang"
                    value={stateValue.itemName}
                    onChange={(e) => {
                      handleState({ ...stateValue, itemName: e.target.value });
                    }}
                    autoComplete="off"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={2} lg={1.2}>
                  <TextField
                    required
                    type="number"
                    label="Kuantitas"
                    value={stateValue.quantity !== null ? stateValue.quantity : ''}
                    onChange={(e) => {
                      handleState({ ...stateValue, quantity: e.target.value });
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
                  value={stateValue.laundryType}
                  label="Jenis Laundry"
                  onChange={(e) => {
                    handleState({
                      ...stateValue,
                      laundryType: e.target.value,
                    });
                  }}
                >
                  {listLaundryType.map((itemLaundryType) => {
                    return (
                      <MenuItem value={itemLaundryType.nama} sx={{ py: '16px', whiteSpace: 'normal' }}>
                        {itemLaundryType.nama}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              {stateValue.laundryType}
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
                value={stateValue.notation}
                onChange={(e) => {
                  handleState({ ...stateValue, notation: e.target.value });
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
                        handleState({
                          ...stateValue,
                          photo: {
                            img: e.target.files[0],
                            fileName: !e.target.files[0] ? null : e.target.files[0].name,
                          },
                        });
                      }}
                      hidden
                    />
                  </Button>
                </Grid>
                <Grid item xs="auto">
                  {stateValue.photo.img ? (
                    <img
                      id="output"
                      src={stateValue.photo.img ? URL.createObjectURL(stateValue.photo.img) : ''}
                      width={70}
                      alt="Preview"
                    />
                  ) : null}
                </Grid>
                <Grid item xs>
                  {stateValue.photo.fileName ? (
                    <Chip
                      label={stateValue.photo.fileName}
                      onDelete={() => handleState({ ...stateValue, photo: { img: null, fileName: null } })}
                      sx={{ maxWidth: '250px' }}
                    />
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button variant="outlined" type="submit" className={`button-outlined-primary`}>
              {stateValue.id ? 'Edit Barang' : 'Tambah Barang'}
            </Button>
          </div>
        </Box>
      </form>

      {/* {stateValue.itemName}
      <br />
      {stateValue.quantity}
      <br />
      {stateValue.pricePerUnit}
      <br />
      {stateValue.notation}
      <br /> */}
    </>
  );
};

function FormOrderLaundry() {
  const theme = useTheme();
  let { id } = useParams();
  const navigate = useNavigate();
  const [formOrder, setFormOrder] = React.useState({
    id: id || null,
    noOrder: null,
    dateOrder: dayjs(),
    serviceType: {
      name: '',
      duration: [],
    },
    discount: '',
    paymentMethod: '',
    userId: null,
    address: {
      pickupAddress: '',
      deliveryAddress: '',
    },
    status: '',
  });
  const [formItem, setFormItem] = React.useState({
    id: null,
    itemName: '',
    quantity: null,
    pricePerUnit: null,
    laundryType: '',
    notation: '',
    photo: { img: null, fileName: null },
  });
  const [listCustomerAddress, setListCustomerAddress] = React.useState([]);
  const [listServiceType, setListServiceType] = React.useState([]);
  const [listLaundryType, setListLaundryType] = React.useState([]);
  const [listPaymentMethod, setListPaymentMethod] = React.useState([]);
  const [listLaundryItem, setListLaundryItem] = React.useState([]);

  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Form Pemesanan Laundry';
    handleGetServiceType();
    handleGetPaymentMethod();
    handleGetCustomerAddress();
    if (id || formOrder.id) {
      handleGetDetailPesanan(id);
      handleGetLaundryItem();
      handleGetLaundryType();
    }
  }, []);

  const handleGetServiceType = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_KEY}/jenislayanan`,
      });
      console.log('Response GET Data Service Type');
      console.log(res);
      setListServiceType(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetPaymentMethod = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_KEY}/metodepembayaran`,
      });
      console.log('Response GET Data Service Type');
      console.log(res);
      setListPaymentMethod(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetLaundryType = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_KEY}/jenislaundry`,
      });
      console.log('Response GET Data Laundry Type');
      console.log(res);
      setListLaundryType(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetCustomerAddress = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/user/address`,
      });
      console.log('Response GET Data Service Type');
      console.log(res);
      setListCustomerAddress(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setOpenDialog({ status: true, type: 'handle address' });
      }
      console.log(error);
    }
  };

  const handleCreateOrder = async () => {
    setOpenLoadDecision({ ...openLoadDecision, isLoad: true });

    try {
      const res = await axios({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/pemesanan/user`,
        data: {
          namaLayanan: formOrder.serviceType.name,
          jenisLayanan: formOrder.serviceType.duration,
          mPembayaran: formOrder.paymentMethod,
          tglMulai: dayjs(
            `${formOrder.dateOrder.$y}-${('0' + (formOrder.dateOrder.$M + 1)).slice(-2)}-${formOrder.dateOrder.$D} ${
              formOrder.dateOrder.$H
            }:${formOrder.dateOrder.$m}:00`
          ).format('YYYY-MM-DDTHH:mm:00.000[Z]'),
          alamatJemput: formOrder.address.pickupAddress,
          alamatAntar: formOrder.address.deliveryAddress,
        },
      });
      console.log('Response GET Data Service Type');
      console.log(res);
      setFormOrder({ ...formOrder, id: res.data.data.id });
      handleGetDetailPesanan(res.data.data.id);
      // handleGetLaundryItem();
      handleGetLaundryType();

      if (res.status === 201) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Pesanan Berhasil di Buat!',
          statusType: 'success',
        });
      }
      // setListCustomerAddress(res.data.data);
    } catch (error) {
      console.log(error);
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
    }
  };

  const handleGetDetailPesanan = async (orderId) => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_KEY}/pemesanan/${orderId || id || formOrder.id}`,
      });
      console.log('Response GET Data Service Type');
      console.log(res);

      let newDate = await dayjs(
        `${res.data.data.tglMulai.slice(0, 4)}-${res.data.data.tglMulai.slice(5, 7)}-${res.data.data.tglMulai.slice(
          8,
          10
        )}T${('0' + adjustTime(res.data.data.tglMulai.slice(11, 13))).slice(-2)}:${res.data.data.tglMulai.slice(
          14,
          16
        )}:00.000Z`
      );

      console.log('apakah keluar?', res.data.data.alamatJemput);
      setFormOrder({
        id: res.data.data.id,
        noOrder: res.data.data.nomorPesanan,
        dateOrder: dayjs(newDate),
        serviceType: {
          name: res.data.data.namaLayanan,
          duration: res.data.data.jenisLayanan,
        },
        discount: res.data.data.diskon,
        paymentMethod: res.data.data.mPembayaran,
        userId: res.data.data.userId,
        address: {
          pickupAddress: res.data.data.alamatJemput,
          deliveryAddress: res.data.data.alamatAntar,
        },
        status: res.data.data.status,
      });

      setOpenDialog({ status: res.data.data.status !== 'Perlu Disetujui' ? true : false, type: 'handle status' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateOrder = async () => {
    setOpenLoadDecision({ ...openLoadDecision, isLoad: true });

    try {
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/pemesanan/user/${formOrder.id}`,
        data: {
          namaLayanan: formOrder.serviceType.name,
          jenisLayanan: formOrder.serviceType.duration,
          mPembayaran: formOrder.paymentMethod,
          tglMulai: dayjs(
            `${formOrder.dateOrder.$y}-${('0' + (formOrder.dateOrder.$M + 1)).slice(-2)}-${formOrder.dateOrder.$D} ${
              formOrder.dateOrder.$H
            }:${formOrder.dateOrder.$m}:00`
          ).format('YYYY-MM-DDTHH:mm:00.000[Z]'),
          alamatJemput: formOrder.address.pickupAddress,
          alamatAntar: formOrder.address.deliveryAddress,
          status: formOrder.status,
          diskon: formOrder.discount,
        },
      });
      console.log('Response GET Data Service Type');
      console.log(res);
      handleGetDetailPesanan(res.data.data.id);

      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Pesanan Berhasil di Update!',
          statusType: 'success',
        });
      }
    } catch (error) {
      console.log(error);
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
    }
  };

  // Handle API Get All Laundry Item
  const handleGetLaundryItem = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/barang/user/${formOrder.id || id}`,
      });

      console.log('Response GET Data');
      console.log(res);
      setListLaundryItem(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setListLaundryItem([]);
      }
      console.log(error);
    }
  };

  // Handle API POST Laundry Item
  const handleCreateLaundryItem = async () => {
    const formData = new FormData();
    formData.append('pemesananId', formOrder.id || id);
    formData.append('namaBarang', formItem.itemName);
    formData.append('jenisLaundry', formItem.laundryType);
    formData.append('kuantitas', formItem.quantity);
    formData.append('harga', formItem.pricePerUnit || 0);
    formData.append('catatan', formItem.notation);
    formData.append('gambar', formItem.photo.img || null);

    try {
      const res = await axios({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/barang/user`,
        data: formData,
      });

      console.log('Response GET Data');
      console.log(res);
      handleGetLaundryItem();
      setFormItem({
        id: null,
        itemName: '',
        quantity: null,
        pricePerUnit: null,
        laundryType: null,
        notation: '',
        photo: { img: null, fileName: null },
      });
      if (res.status === 201) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Item Berhasil di Tambah!',
          statusType: 'success',
        });
      }
    } catch (error) {
      console.log(error);
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
    }
  };

  // Handle API PUT Laundry Item
  const handleUpdateLaundryItem = async () => {
    const formData = new FormData();
    formData.append('pemesananId', formOrder.id || id);
    formData.append('namaBarang', formItem.itemName);
    formData.append('jenisLaundry', formItem.laundryType);
    formData.append('kuantitas', formItem.quantity);
    formData.append('harga', formItem.pricePerUnit || 0);
    formData.append('catatan', formItem.notation);
    formData.append('gambar', formItem.photo.img || null);

    try {
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/barang/user/${formItem.id}`,
        data: formData,
      });

      console.log('Response GET Data');
      console.log(res);
      handleGetLaundryItem();
      setFormItem({
        id: null,
        itemName: '',
        quantity: null,
        pricePerUnit: null,
        laundryType: null,
        notation: '',
        photo: { img: null, fileName: null },
      });
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Item Berhasil di Edit!',
          statusType: 'success',
        });
      }
    } catch (error) {
      console.log(error);
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
    }
  };

  // Handle API Delete Laundry Item
  const handleDeleteLaundryItem = async (itemId) => {
    try {
      const res = await axios({
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/barang/user/${itemId}`,
      });

      console.log('Response GET Data');
      console.log(res);
      handleGetLaundryItem();
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Item Berhasil di Hapus!',
          statusType: 'success',
        });
      }
    } catch (error) {
      console.log(error);
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
    }
  };

  const [openDialog, setOpenDialog] = React.useState({ status: false, type: '' });
  const [openAlert, setOpenAlert] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '25px',
          my: '25px',
          mx: '75px',
          [theme.breakpoints.down('md')]: {
            mx: '8px',
          },
        }}
      >
        <div className="gap-24">
          <PageStructureAndDirectButton
            defaultMenu="Area Pelanggan"
            currentPage={{
              title: 'Form Pemesanan Laundry',
            }}
            // params={id ? 'Edit Pesanan' : null}
          />
          <LoadDecisions
            setOpenLoad={setOpenLoadDecision}
            openLoad={openLoadDecision}
            // redirect={id ? null : `/AreaPelanggan/FormulirPemesananLaundry/${formOrder.id}`}
          />

          {/* Main Content */}
          <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log('click');
                if (formOrder.id || id) {
                  handleUpdateOrder();
                } else {
                  handleCreateOrder();
                }
              }}
            >
              <Box className="gap-16" sx={{ flexDirection: 'column', width: '100%' }}>
                <div style={{ width: '100%', textAlign: 'center' }}>
                  <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Formulir Pemesanan Laundry</h2>
                </div>

                {!listServiceType && !listPaymentMethod ? null : (
                  <OrderInformationForm
                    state={formOrder}
                    setState={setFormOrder}
                    listServiceType={listServiceType}
                    listPaymentMethod={listPaymentMethod}
                  />
                )}
                {listCustomerAddress.length !== 0 ? (
                  <LaundryShuttle state={formOrder} setState={setFormOrder} listAddress={listCustomerAddress} />
                ) : null}

                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    [theme.breakpoints.down('sm')]: {
                      flexWrap: 'wrap',
                    },
                  }}
                >
                  <Button variant="contained" size="large" type="submit" sx={{ width: '100%', fontWeight: 'bold' }}>
                    {formOrder.id ? 'Update Pesanan' : 'Buat pesanan'}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      if (listLaundryItem.reduce((sum, cur) => sum + cur.kuantitas, 0) < 3) {
                        setOpenAlert(true);
                      } else {
                        navigate(`/Pesanan/${formOrder.noOrder}`);
                      }
                    }}
                    sx={{
                      width: 'fit-content',
                      fontWeight: 'bold',
                      display: formOrder.id ? null : 'none',
                      [theme.breakpoints.down('sm')]: {
                        width: '100%',
                      },
                    }}
                  >
                    Selesai
                  </Button>

                  {!openAlert ? null : (
                    <Alert
                      variant="filled"
                      severity="warning"
                      sx={{ position: 'fixed', top: 88, left: '50%', transform: 'translate(-50%, 0)' }}
                    >
                      Minimum barang yang wajib diinputkan adalah 3 item
                    </Alert>
                  )}
                </Box>
              </Box>
            </form>
          </Paper>
        </div>
        {formOrder.id || id ? (
          <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
            <div className={`dash-card gap-16`} style={{ justifyContent: 'center' }}>
              <InputItem
                stateValue={formItem}
                handleState={setFormItem}
                listLaundryType={listLaundryType}
                handleCreateLaundryItem={handleCreateLaundryItem}
                handleUpdateLaundryItem={handleUpdateLaundryItem}
                setOpenAlert={setOpenAlert}
              />

              {listLaundryItem.length !== 0 ? (
                <>
                  <div style={{ padding: '16px 0' }}>
                    <h5 style={{ textAlign: 'center' }}>Daftar Barang</h5>
                  </div>
                  <Box sx={{ backgroundColor: '#eeeeee', width: '100%' }}>
                    <LaundryItemTable
                      listLaundryItem={listLaundryItem}
                      discount={formOrder.discount}
                      deleteLaundryItem={handleDeleteLaundryItem}
                      stateValue={formItem}
                      handleState={setFormItem}
                      cellColor={'#eeeeee'}
                    />
                  </Box>
                </>
              ) : null}
            </div>
          </Paper>
        ) : null}
      </Box>

      <Dialog open={openDialog.status}>
        <DialogTitle>
          <h4>{openDialog.type === 'handle address' ? 'Lengkapi Profil' : 'Pesanan Tidak Dapat Di Edit'}</h4>
        </DialogTitle>
        <Box sx={{ my: 2, mx: 3 }}>
          {openDialog.type === 'handle address'
            ? 'Alamat tidak ditemukan! Tambah alamat untuk melakukan pemesanan'
            : 'Status pesanan sudah tidak memungkinkan untuk dapat dilakukan perubahan'}
        </Box>
        <DialogActions>
          <Button
            onClick={() =>
              navigate(
                openDialog.type === 'handle address'
                  ? `/AreaPelanggan/EditProfil`
                  : `/AreaPelanggan/${formOrder.noOrder}`
              )
            }
            sx={{ fontWeight: 'bold' }}
          >
            {openDialog.type === 'handle address' ? 'Tambah Alamat' : 'Kembali'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormOrderLaundry;
