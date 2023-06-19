import {
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

const OrderInformationForm = ({ state, setState, listServiceType, listPaymentMethod }) => {
  const theme = useTheme();
  const profileCustomer = JSON.parse(localStorage.getItem('my_profile_account'));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <div className={`dash-card`}>
          <div style={{ fontWeight: 'bold', marginBottom: '16px' }}>Informasi Pelanggan</div>

          <Box sx={{ borderRadius: '4px', backgroundColor: '#eeeeee', p: 2, width: '100%' }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={'auto'} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar
                  alt=""
                  src={profileCustomer.profilePic}
                  sx={{ width: '120px', height: '120px', borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm>
                <Box
                  component={'h4'}
                  sx={{
                    [theme.breakpoints.down('sm')]: {
                      textAlign: 'center',
                    },
                  }}
                >
                  {profileCustomer.nama}
                </Box>
                <div>
                  <strong>Tanggal Lahir :</strong> 05/02/1999
                </div>
                <div>
                  <strong>Kontak :</strong> {profileCustomer.noTelp}
                  {profileCustomer.email ? ` || ${profileCustomer.email}` : null}
                </div>
                <div>
                  <strong>Alamat Utama :</strong> {profileCustomer.alamatUser}
                </div>
              </Grid>
            </Grid>
          </Box>

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
                  // value={state.serviceType.name}
                  label="Jenis Layanan"
                  onChange={(e) => {
                    setState({
                      ...state,
                      serviceType: {
                        name: listServiceType[e.target.value].layanan,
                        duration: [
                          listServiceType[e.target.value].hari,
                          listServiceType[e.target.value].jam,
                          listServiceType[e.target.value].menit,
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
                      <MenuItem value={index} sx={{ py: '16px' }}>
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
                value={state.discount}
                onChange={(e) => {
                  setState({ ...state, discount: e.target.value });
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
  const [isUseProgram, setIsUseProgram] = React.useState(true);

  return (
    <div className={`dash-card gap-16`} style={{ width: '100%' }}>
      <div style={{ fontWeight: 'bold' }}>
        Program Antar Jemput
        {/* <Switch
          onChange={(e) => {
            setIsUseProgram(e.target.checked);
            setState({
              ...state,
              address: {
                pickupAddress: '',
                deliveryAddress: '',
              },
            });
            console.log(e.target.checked);
          }}
        /> */}
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
                // value={state.address.pickupAddress}
                label="Alamat Pengantaran"
                onChange={(e) => {
                  setState({
                    ...state,
                    address: { ...state.address, pickupAddress: JSON.stringify(listAddress[e.target.value]) },
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
                    <MenuItem value={index} sx={{ py: '16px' }}>
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
                // value={state.address.deliveryAddress}
                label="Alamat Pengantaran"
                onChange={(e) => {
                  setState({
                    ...state,
                    address: { ...state.address, deliveryAddress: JSON.stringify(listAddress[e.target.value]) },
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
                    <MenuItem value={index} sx={{ py: '16px' }}>
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
      ) : null}
    </div>
  );
};

function FormOrderLaundry() {
  const theme = useTheme();
  let { id } = useParams();
  const navigate = useNavigate();
  const [formOrder, setFormOrder] = React.useState({
    id: id || null,
    dateOrder: dayjs(),
    serviceType: {
      name: '',
      duration: [],
    },
    discount: '',
    paymentMethod: '',
    customerInformation: null,
    address: {
      pickupAddress: '',
      deliveryAddress: '',
    },
    status: '',
  });
  const [listCustomerAddress, setListCustomerAddress] = React.useState([]);
  const [listServiceType, setListServiceType] = React.useState([]);
  const [listPaymentMethod, setListPaymentMethod] = React.useState([]);
  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Buat Pesanan Baru';
    handleGetServiceType();
    handleGetPaymentMethod();
    handleGetCustomerAddress();
    handleGetDetailPesanan(id);
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
        setOpenDialog(true);
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

  const handleGetDetailPesanan = async (id) => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_KEY}/pemesanan/${id}`,
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

      setFormOrder({
        id: res.data.data.id,
        dateOrder: dayjs(newDate),
        serviceType: {
          name: res.data.data.namaLayanan,
          duration: res.data.data.jenisLayanan,
        },
        discount: res.data.data.diskon,
        paymentMethod: res.data.data.mPembayaran,
        customerInformation: null,
        address: {
          pickupAddress: res.data.data.alamatJemput,
          deliveryAddress: res.data.data.alamatAntar,
        },
        status: res.data.data.status,
      });
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

  const [openDialog, setOpenDialog] = React.useState(false);

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
        <div className="gap-24" style={{ marginBottom: '24px' }}>
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
                if (formOrder.id) {
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
                {!listCustomerAddress ? null : (
                  <LaundryShuttle state={formOrder} setState={setFormOrder} listAddress={listCustomerAddress} />
                )}

                <Button variant="contained" size="large" type="submit" sx={{ width: '100%', fontWeight: 'bold' }}>
                  {formOrder.id ? 'Update Pesanan' : 'Buat pesanan'}
                  {/* {id ? 'Edit Pesanan' : 'Buat pesanan'} */}
                </Button>

                {/* {formOrder.discount}
                {formOrder.customerInformation}
                {formOrder.paymentMethod}
                {formOrder.serviceType.name}
                {formOrder.address.deliveryAddress}
                {formOrder.address.pickupAddress}
                {formOrder.status} */}
                <br />
              </Box>
            </form>
          </Paper>
        </div>
      </Box>

      {formOrder.id ? <LaundryItemTable orderId={id} /> : null}

      <Dialog open={openDialog}>
        <DialogTitle>
          <h4>Lengkapi Profil</h4>
        </DialogTitle>
        <Box sx={{ my: 2, mx: 3 }}>Alamat tidak ditemukan! Tambah alamat untuk melakukan pemesanan</Box>
        <DialogActions>
          <Button onClick={() => navigate('/AreaPelanggan/EditProfil')} sx={{ fontWeight: 'bold' }}>
            Tambah Alamat
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormOrderLaundry;
