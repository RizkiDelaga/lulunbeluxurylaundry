import {
  Avatar,
  Box,
  Button,
  Chip,
  Collapse,
  Container,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import EditIcon from '@mui/icons-material/Edit';

import InformationCard from '../../../components/Card/InformationCard';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import axios from 'axios';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAccountCustomer } from '../../../redux/actions/getProfileAccount';
import FilterListIcon from '@mui/icons-material/FilterList';
import { getComparator, stableSort } from '../../../utils/tableUtils';

function RowItem(props) {
  const navigate = useNavigate();
  const [openTableCell, setOpenTableCell] = React.useState(false);

  const dateStart = new Date(props.item.tglMulai);
  const dateEnd = new Date(props.item.tenggatWaktu);
  const lastUpdate = new Date(props.item.statusUpdatedAt);

  const pickUpAddress = props.item.alamatJemput ? JSON.parse(props.item.alamatJemput) : null;
  const deliveryAddress = props.item.alamatAntar ? JSON.parse(props.item.alamatAntar) : null;

  // Menu - Action
  const [actionAnchorEl, setActionAnchorEl] = React.useState(null);
  const openAction = Boolean(actionAnchorEl);
  const handleCloseAction = () => {
    setActionAnchorEl(null);
  };

  return (
    <React.Fragment>
      <TableRow hover>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpenTableCell(!openTableCell)}>
            {openTableCell ? <ExpandLessIcon color="primary" /> : <ExpandMoreIcon color="primary" />}
          </IconButton>
        </TableCell>
        <TableCell>
          <span onClick={() => navigate(`/AreaPelanggan/${props.item.nomorPesanan}`)} style={{ cursor: 'pointer' }}>
            #{props.item.nomorPesanan}
          </span>
        </TableCell>
        <TableCell>
          {`${dateStart.toISOString().slice(8, 10)}/${dateStart.toISOString().slice(5, 7)}/${dateStart
            .toISOString()
            .slice(0, 4)} ${dateStart.toISOString().slice(11, 16)}`}

          <div style={{ fontSize: '12px' }}>oleh {props.item.createdBy}</div>
        </TableCell>
        <TableCell>
          {`${dateEnd.toISOString().slice(8, 10)}/${dateEnd.toISOString().slice(5, 7)}/${dateEnd
            .toISOString()
            .slice(0, 4)} ${dateEnd.toISOString().slice(11, 16)}`}
        </TableCell>
        <TableCell>
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(props.item.totalHarga)} (
          {props.item.statusPembayaran})
        </TableCell>
        <TableCell>
          {props.item.status === 'Perlu Disetujui'
            ? 'Menunggu Persetujuan'
            : props.item.status === 'Perlu Dijemput'
            ? 'Pesanan Akan Segera Di Jemput'
            : props.item.status === 'Perlu Dikerjakan'
            ? 'Pesanan Sedang Di Kerjakan'
            : props.item.status === 'Perlu Diantar'
            ? 'Pesanan Akan Segera Di Antar'
            : props.item.status === 'Selesai'
            ? 'Pesanan Selesai'
            : props.item.status === 'Dibatalkan'
            ? 'Pesanan Di Batalkan'
            : props.item.status === 'Ditolak'
            ? 'Pesanan Di Tolak'
            : null}
          <div style={{ fontSize: '12px' }}>
            pada
            {` ${lastUpdate.toISOString().slice(8, 10)}/${lastUpdate.toISOString().slice(5, 7)}/${lastUpdate
              .toISOString()
              .slice(0, 4)} ${lastUpdate.toISOString().slice(11, 16)}`}
            {props.item.updatedBy ? ` oleh ${props.item.updatedBy}` : null}
          </div>
        </TableCell>

        <TableCell>
          <IconButton
            size="small"
            onClick={(event) => {
              setActionAnchorEl(event.currentTarget);
            }}
          >
            <MoreVertIcon color="primary" />
          </IconButton>
        </TableCell>
        {/* Menu - Action */}
        <Menu
          anchorEl={actionAnchorEl}
          open={openAction}
          onClose={handleCloseAction}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem
            disabled={props.item.status !== 'Perlu Disetujui' ? true : false}
            onClick={() => {
              navigate(`/Pesanan/FormulirPemesananLaundry/${props.item.id}`);
              handleCloseAction();
            }}
          >
            Edit Pesanan
          </MenuItem>
        </Menu>
      </TableRow>

      {/* Collapse Table */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={openTableCell} timeout="auto" unmountOnExit>
            <Box sx={{ px: 2, py: 1 }}>
              <div style={{ marginBottom: '16px' }}>
                <h6>Detail Pesanan</h6>
              </div>

              <Grid container>
                <Grid item xs={6}>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Alamat penjemputan : </strong>
                    {!props.item.alamatJemput ? null : (
                      <>
                        {pickUpAddress.kecamatan ? `Kecamatan ${pickUpAddress.kecamatan}` : null}
                        {pickUpAddress.kelurahan ? `, Kelurahan ${pickUpAddress.kelurahan}` : null}
                        {pickUpAddress.rw ? `, RW ${pickUpAddress.rw}` : null}
                        {pickUpAddress.rt ? `, RT ${pickUpAddress.rt}` : null}
                        {pickUpAddress.kategori ? `, ${pickUpAddress.kategori}` : null}
                        {pickUpAddress.detail ? ` ${pickUpAddress.detail}` : null}
                        {pickUpAddress.deskripsi ? `, ${pickUpAddress.deskripsi}` : null}
                      </>
                    )}
                  </div>
                  <div>
                    <strong>Alamat pengantaran : </strong>
                    {!props.item.alamatAntar ? null : (
                      <>
                        {deliveryAddress.kecamatan ? `Kecamatan ${deliveryAddress.kecamatan}` : null}
                        {deliveryAddress.kelurahan ? `, Kelurahan ${deliveryAddress.kelurahan}` : null}
                        {deliveryAddress.rw ? `, RW ${deliveryAddress.rw}` : null}
                        {deliveryAddress.rt ? `, RT ${deliveryAddress.rt}` : null}
                        {deliveryAddress.kategori ? `, ${deliveryAddress.kategori}` : null}
                        {deliveryAddress.detail ? ` ${deliveryAddress.detail}` : null}
                        {deliveryAddress.deskripsi ? `, ${deliveryAddress.deskripsi}` : null}
                      </>
                    )}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div>
                    <strong>Jenis laundry : </strong>
                    {props.item.namaLayanan}
                  </div>
                </Grid>
              </Grid>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" onClick={() => navigate(`/AreaPelanggan/${props.item.nomorPesanan}`)}>
                  Lihat Detail Pesanan
                </Button>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function OrderTable({ orderStatusType, myOrderStats }) {
  const theme = useTheme();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  React.useEffect(() => {
    handleGetOrder(null, null, orderStatusType === 'Pesanan sedang Berjalan' ? filterOrderStatus : orderStatusType);
  }, [orderStatusType]);

  const [listFinance, setListFinance] = React.useState([]);
  const [pageConfig, setPageConfig] = React.useState({
    currentPage: 1,
    dataPerPage: 10,
    metadata: null,
  });

  // Handle API Get All Data Finance
  const handleGetOrder = async (changePage, maxDataPerPage, status) => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/pemesanan/user/all?page=${
          !changePage
            ? pageConfig.currentPage
            : changePage === 'prev'
            ? pageConfig.currentPage - 1
            : changePage === 'next'
            ? pageConfig.currentPage + 1
            : changePage
        }&perPage=${maxDataPerPage ? maxDataPerPage : pageConfig.dataPerPage}&status=${status}`,
      });

      setPageConfig({
        ...pageConfig,
        metadata: res.data.metadata,
        currentPage: !changePage
          ? pageConfig.currentPage
          : changePage === 'prev'
          ? pageConfig.currentPage - 1
          : changePage === 'next'
          ? pageConfig.currentPage + 1
          : changePage,
        dataPerPage: maxDataPerPage ? maxDataPerPage : pageConfig.dataPerPage,
      });

      console.log('Response GET Data Finance');
      console.log(res);
      setListFinance(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setListFinance([]);
      }
      console.log(error);
    }
  };

  // Menu - Select Page
  const [selectPageAnchorEl, setSelectPageAnchorEl] = React.useState(null);
  const openSelectPage = Boolean(selectPageAnchorEl);
  const handleCloseSelectPage = () => {
    setSelectPageAnchorEl(null);
  };

  // Menu - Select Data Per Page
  const [selectDataPerPageAnchorEl, setSelectDataPerPageAnchorEl] = React.useState(null);
  const openSelectDataPerPage = Boolean(selectDataPerPageAnchorEl);
  const handleCloseSelectDataPerPage = () => {
    setSelectDataPerPageAnchorEl(null);
  };

  // Menu - Filter
  const [filterOrderStatus, setFilterOrderStatus] = React.useState('Perlu Dikerjakan');
  const [filterAnchorEl, setFilterAnchorEl] = React.useState(null);
  const openFilter = Boolean(filterAnchorEl);
  const handleCloseFilter = () => {
    setFilterAnchorEl(null);
  };

  const headCells = [
    {
      id: 'collapse',
      label: '',
    },
    {
      id: 'nomorPesanan',
      label: 'No Pesanan',
    },
    {
      id: 'tglMulai',
      label: 'Tanggal Pemesanan',
    },
    {
      id: 'tenggatWaktu',
      label: 'Estimasi Selesai',
    },
    {
      id: 'totalHarga',
      label: 'Total Pembayaran',
    },
    {
      id: 'status',
      label: 'Status',
    },
    {
      id: 'action',
      label: '',
    },
  ];

  return (
    <>
      {/* Table Title */}
      <Toolbar
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 'bold' }} color="primary" variant="h5" id="tableTitle" component="div">
            Daftar Pesanan Sedang Berjalan
          </Typography>
          <IconButton
            onClick={() => {
              handleGetOrder(
                null,
                null,
                orderStatusType === 'Pesanan sedang Berjalan' ? filterOrderStatus : orderStatusType
              );
            }}
          >
            <RefreshIcon color="primary" />
          </IconButton>
        </span>
        {orderStatusType !== 'Pesanan sedang Berjalan' ? null : (
          <div>
            <IconButton
              onClick={(event) => {
                setFilterAnchorEl(event.currentTarget);
              }}
            >
              <FilterListIcon color="primary" />
            </IconButton>
          </div>
        )}
      </Toolbar>
      {/* Menu - Filter */}
      <Menu
        anchorEl={filterAnchorEl}
        open={openFilter}
        onClose={handleCloseFilter}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          onClick={() => {
            setFilterOrderStatus('Perlu Dijemput');
            handleGetOrder(null, null, 'Perlu Dijemput');
            handleCloseFilter();
          }}
          sx={{ bgcolor: filterOrderStatus === 'Perlu Dijemput' ? '#eeeeee' : null }}
        >
          Segera Di Jemput ({myOrderStats.needsToBePickedUp})
        </MenuItem>
        <MenuItem
          onClick={() => {
            setFilterOrderStatus('Perlu Dikerjakan');
            handleGetOrder(null, null, 'Perlu Dikerjakan');

            handleCloseFilter();
          }}
          sx={{ bgcolor: filterOrderStatus === 'Perlu Dikerjakan' ? '#eeeeee' : null }}
        >
          Sedang Di Kerjakan ({myOrderStats.needsToBeDone})
        </MenuItem>
        <MenuItem
          onClick={() => {
            setFilterOrderStatus('Perlu Diantar');
            handleGetOrder(null, null, 'Perlu Diantar');
            handleCloseFilter();
          }}
          sx={{ bgcolor: filterOrderStatus === 'Perlu Diantar' ? '#eeeeee' : null }}
        >
          Segera Di Antar ({myOrderStats.needsToBeDelivered})
        </MenuItem>
      </Menu>

      {/* Table Section */}
      <TableContainer sx={{ maxHeight: pageConfig.dataPerPage !== 10 ? 800 : 'none' }}>
        <Table stickyHeader sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          {/* Table Header */}
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                  sx={{ width: headCell.id !== 'collapse' && headCell.id !== 'action' ? null : 0 }}
                >
                  {headCell.id !== 'collapse' && headCell.id !== 'action' ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={(event) => {
                        handleRequestSort(event, headCell.id);
                      }}
                      style={{ fontWeight: 'bold' }}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Content */}
          <TableBody>
            {stableSort(listFinance, getComparator(order, orderBy)).map((item, index) => {
              return <RowItem key={item.id} item={item} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 404 Data Not Found Handling */}
      <Box
        sx={{
          mt: 2,
          py: 1,
          px: 2,
          borderRadius: 2,
          backgroundColor: '#eeeeee',
          textAlign: 'center',
          display: listFinance.length ? 'none' : null,
        }}
      >
        <h5>Data tidak ditemukan!</h5>
      </Box>

      {/* Table Pagination */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        {pageConfig.metadata === null ? null : (
          <Box sx={{ py: 2, px: 1 }}>
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                sm="auto"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                {/* Change Pages */}
                <span>Pages:</span>
                <Button
                  variant="text"
                  size="small"
                  onClick={(e) => {
                    setSelectPageAnchorEl(e.currentTarget);
                  }}
                  sx={{ display: 'flex', fontSize: '16px' }}
                >
                  {pageConfig.metadata === null ? null : pageConfig.currentPage}
                  <ArrowDropDownIcon />
                </Button>
                {/* Menu - Select Page */}
                <Menu
                  anchorEl={selectPageAnchorEl}
                  open={openSelectPage}
                  onClose={handleCloseSelectPage}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  {pageConfig.metadata === null
                    ? null
                    : Array.from(Array(pageConfig.metadata.totalPage)).map((item, index) => {
                        return (
                          <MenuItem
                            onClick={() => {
                              // handleGetOrder();
                              handleGetOrder(
                                index + 1,
                                null,
                                orderStatusType === 'Pesanan sedang Berjalan' ? filterOrderStatus : orderStatusType
                              );
                              handleCloseSelectPage();
                            }}
                            disabled={pageConfig.currentPage === index + 1}
                          >
                            {index + 1}
                          </MenuItem>
                        );
                      })}
                </Menu>

                {/* Change Data Per Pages */}
                <div>Rows per page:</div>
                <Button
                  variant="text"
                  size="small"
                  onClick={(e) => {
                    setSelectDataPerPageAnchorEl(e.currentTarget);
                  }}
                  sx={{ display: 'flex', fontSize: '16px' }}
                >
                  {pageConfig.metadata === null ? null : pageConfig.dataPerPage}
                  <ArrowDropDownIcon />
                </Button>
                {/* Menu - Select Data Per Page */}
                <Menu
                  anchorEl={selectDataPerPageAnchorEl}
                  open={openSelectDataPerPage}
                  onClose={handleCloseSelectDataPerPage}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  {pageConfig.metadata === null
                    ? null
                    : [10, 20, 50, 100].map((item, index) => {
                        return (
                          <MenuItem
                            onClick={() => {
                              // handleGetOrder();
                              handleGetOrder(
                                1,
                                item,
                                orderStatusType === 'Pesanan sedang Berjalan' ? filterOrderStatus : orderStatusType
                              );
                              handleCloseSelectDataPerPage();
                            }}
                            disabled={pageConfig.dataPerPage === item}
                          >
                            {item}
                          </MenuItem>
                        );
                      })}
                </Menu>
              </Grid>
              <Grid
                item
                xs={12}
                sm="auto"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                {/* Show Number Of Data */}
                <span>
                  {pageConfig.currentPage * pageConfig.dataPerPage - pageConfig.dataPerPage + 1}-
                  {pageConfig.currentPage === pageConfig.metadata.totalPage &&
                  pageConfig.currentPage * pageConfig.dataPerPage > pageConfig.metadata.totalCount
                    ? pageConfig.metadata.totalCount
                    : pageConfig.currentPage * pageConfig.dataPerPage}{' '}
                  of {pageConfig.metadata.totalCount}
                </span>
                {/* Prev & Next Pagination */}
                <IconButton
                  size="small"
                  onClick={() =>
                    handleGetOrder(
                      'prev',
                      null,
                      orderStatusType === 'Pesanan sedang Berjalan' ? filterOrderStatus : orderStatusType
                    )
                  }
                  disabled={pageConfig.currentPage === 1}
                  sx={{ color: '#1F305C' }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() =>
                    handleGetOrder(
                      'next',
                      null,
                      orderStatusType === 'Pesanan sedang Berjalan' ? filterOrderStatus : orderStatusType
                    )
                  }
                  disabled={pageConfig.currentPage === pageConfig.metadata.totalPage}
                  sx={{ color: '#1F305C' }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
}

function CustomerArea() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [buttonStatusOrder, setButtonStatusOrder] = useState('Pesanan sedang Berjalan');
  // const myProfile = JSON.parse(localStorage.getItem('my_profile_account'));
  const [myOrderStats, setMyOrderStats] = React.useState({
    needApproval: null,
    needsToBePickedUp: null,
    needsToBeDone: null,
    needsToBeDelivered: null,
    completed: null,
    cancelled: null,
    declined: null,
  });

  const dispatch = useDispatch();
  const { isLoading: loadingGetProfileAccountCustomer, data: dataGetProfileAccountCustomer } = useSelector(
    (state) => state.getProfileAccountCustomer
  );

  React.useEffect(() => {
    document.title = 'Area Pelanggan';
    dispatchGetProfileAccountCustomer();
    handleGetOrderStats();
  }, []);

  const dispatchGetProfileAccountCustomer = async () => {
    return await dispatch(getProfileAccountCustomer());
  };

  const handleGetOrderStats = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/pemesanan/user/statistic-data`,
      });
      console.log('Response GET');
      console.log(res);
      setMyOrderStats({
        needApproval: res.data.data.perluDisetujui,
        needsToBePickedUp: res.data.data.perluDijemput,
        needsToBeDone: res.data.data.perluDikerjakan,
        needsToBeDelivered: res.data.data.perluDiantar,
        completed: res.data.data.completed,
        cancelled: res.data.data.cancelled,
        declined: res.data.data.declined,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        {/* <PageStructureAndDirectButton defaultMenu="Area Pelanggan" /> */}
        <PageStructureAndDirectButton
          defaultMenu="Area Pelanggan"
          directButton={[
            {
              color: 'primary',
              iconType: 'add',
              value: 'Buat pesanan baru',
              link: '/AreaPelanggan/FormulirPemesananLaundry',
            },
          ]}
        />

        {loadingGetProfileAccountCustomer ? null : (
          <Paper
            elevation={3}
            sx={{
              width: '100%',
              padding: 2.5,
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Avatar src={dataGetProfileAccountCustomer.profilePic} sx={{ width: 60, height: 60 }} />

              <span style={{ fontSize: '24px' }}>Hey, {dataGetProfileAccountCustomer.nama}</span>
            </div>
            <Button
              variant="text"
              startIcon={<EditIcon />}
              onClick={() => navigate('/AreaPelanggan/EditProfil')}
              sx={{
                width: 'fit-content',
                fontWeight: 'bold',
                [theme.breakpoints.down('sm')]: {
                  display: 'none',
                },
              }}
            >
              Edit Profil
            </Button>
          </Paper>
        )}

        {/* Progress Order Menu */}
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            padding: 2.5,
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            backgroundColor: '#1F305C',
            color: '#ffffff',
          }}
        >
          <h4 style={{}}>Progres Pemesanan Saya</h4>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4} lg={2.4}>
              <Box
                onClick={() => {
                  setButtonStatusOrder(
                    buttonStatusOrder === 'Perlu Disetujui' ? 'Pesanan sedang Berjalan' : 'Perlu Disetujui'
                  );
                }}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '4px !important',
                  padding: 0,
                  backgroundColor: buttonStatusOrder === 'Perlu Disetujui' ? '#ffffff80' : '#ffffff',
                  '&:hover': {
                    backgroundColor: '#ffffff80 !important',
                  },
                }}
              >
                <InformationCard
                  title="Menunggu Persetujuan"
                  content={{ normalText: myOrderStats.needApproval }}
                  inheritColor={true}
                  // navigate={{ text: 'Lihat daftar pesanan', url: '/Pesanan' }}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={4} lg={2.4}>
              <Box
                onClick={() => {
                  setButtonStatusOrder(
                    buttonStatusOrder === 'Pesanan sedang Berjalan'
                      ? 'Pesanan sedang Berjalan'
                      : 'Pesanan sedang Berjalan'
                  );
                }}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '4px !important',
                  padding: 0,
                  backgroundColor: buttonStatusOrder === 'Pesanan sedang Berjalan' ? '#ffffff80' : '#ffffff',
                  '&:hover': {
                    backgroundColor: '#ffffff80 !important',
                  },
                }}
              >
                <InformationCard
                  title="Pesanan sedang Berjalan"
                  content={{
                    normalText:
                      myOrderStats.needsToBePickedUp + myOrderStats.needsToBeDone + myOrderStats.needsToBeDelivered,
                  }}
                  inheritColor={true}
                  // navigate={{ text: 'Lihat daftar pesanan', url: '/Pesanan' }}
                />
              </Box>
            </Grid>

            <Grid item xs={6} md={4} lg={2.4}>
              <Box
                onClick={() => {
                  setButtonStatusOrder(buttonStatusOrder === 'Selesai' ? 'Pesanan sedang Berjalan' : 'Selesai');
                }}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '4px !important',
                  padding: 0,
                  backgroundColor: buttonStatusOrder === 'Selesai' ? '#ffffff80' : '#ffffff',
                  '&:hover': {
                    backgroundColor: '#ffffff80 !important',
                  },
                }}
              >
                <InformationCard
                  title="Pesanan Selesai"
                  content={{ normalText: myOrderStats.completed }}
                  inheritColor={true}
                  // navigate={{ text: 'Lihat daftar pesanan', url: '/Pesanan' }}
                />
              </Box>
            </Grid>

            <Grid item xs={6} md={4} lg={2.4}>
              <Box
                onClick={() => {
                  setButtonStatusOrder(buttonStatusOrder === 'Dibatalkan' ? 'Pesanan sedang Berjalan' : 'Dibatalkan');
                }}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '4px !important',
                  padding: 0,
                  backgroundColor: buttonStatusOrder === 'Dibatalkan' ? '#ffffff80' : '#ffffff',
                  '&:hover': {
                    backgroundColor: '#ffffff80 !important',
                  },
                }}
              >
                <InformationCard
                  title="Pesanan Batal"
                  content={{ normalText: myOrderStats.cancelled }}
                  inheritColor={true}
                  // navigate={{ text: 'Lihat daftar pesanan', url: '/Pesanan' }}
                />
              </Box>
            </Grid>

            <Grid item xs={6} md={4} lg={2.4}>
              <Box
                onClick={() => {
                  setButtonStatusOrder(buttonStatusOrder === 'Ditolak' ? 'Pesanan sedang Berjalan' : 'Ditolak');
                }}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '4px !important',
                  padding: 0,
                  backgroundColor: buttonStatusOrder === 'Ditolak' ? '#ffffff80' : '#ffffff',
                  '&:hover': {
                    backgroundColor: '#ffffff80 !important',
                  },
                }}
              >
                <InformationCard
                  title="Pesanan di Tolak"
                  content={{ normalText: myOrderStats.declined }}
                  inheritColor={true}
                  // navigate={{ text: 'Lihat daftar pesanan', url: '/Pesanan' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <OrderTable orderStatusType={buttonStatusOrder} myOrderStats={myOrderStats} />
        </Paper>
      </Box>
    </>
  );
}

export default CustomerArea;
