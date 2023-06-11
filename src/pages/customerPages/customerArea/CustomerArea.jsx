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

import InformationCard from '../../../components/Card/InformationCard/InformationCard';

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
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAccountCustomer } from '../../../redux/actions/getProfileAccount';

function RowItem(props) {
  const navigate = useNavigate();
  const [openTableCell, setOpenTableCell] = React.useState(false);

  const dateStart = new Date(props.item.tglMulai);
  const dateEnd = new Date(props.item.tenggatWaktu);
  const lastUpdate = new Date(props.item.updatedAt);

  return (
    <React.Fragment>
      <TableRow hover>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpenTableCell(!openTableCell)}>
            {openTableCell ? <ExpandLessIcon color="primary" /> : <ExpandMoreIcon color="primary" />}
          </IconButton>
        </TableCell>
        <TableCell>
          <span onClick={() => navigate(`/AreaPelanggan/${props.item.nomorPesanan}`)}>#{props.item.nomorPesanan}</span>
        </TableCell>
        <TableCell>
          {`${('0' + dateStart.getDate()).slice(-2)}/${('0' + dateStart.getMonth()).slice(
            -2
          )}/${dateStart.getFullYear()} ${('0' + dateStart.getHours()).slice(-2)}:${(
            '0' + dateStart.getMinutes()
          ).slice(-2)}`}
          <div style={{ fontSize: '12px' }}>oleh {props.item.createdBy}</div>
        </TableCell>
        <TableCell>
          {`${('0' + dateEnd.getDate()).slice(-2)}/${('0' + dateEnd.getMonth()).slice(-2)}/${dateEnd.getFullYear()} ${(
            '0' + dateEnd.getHours()
          ).slice(-2)}:${('0' + dateEnd.getMinutes()).slice(-2)}`}
        </TableCell>
        <TableCell>{props.item.mPembayaran}</TableCell>
        <TableCell>
          {}
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
            : null}
          <div style={{ fontSize: '12px' }}>
            pada{' '}
            {`${('0' + lastUpdate.getDate()).slice(-2)}/${('0' + lastUpdate.getMonth()).slice(
              -2
            )}/${lastUpdate.getFullYear()} ${('0' + lastUpdate.getHours()).slice(-2)}:${(
              '0' + lastUpdate.getMinutes()
            ).slice(-2)}`}{' '}
            oleh {props.item.updatedBy}
          </div>
        </TableCell>

        <TableCell>
          <IconButton size="small">
            <MoreVertIcon color="primary" />
          </IconButton>
        </TableCell>
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
                    {props.item.alamatJemput}
                  </div>
                  <div>
                    <strong>Alamat pengantaran : </strong>
                    {props.item.alamatAntar}
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

function OrderTable() {
  const theme = useTheme();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  React.useEffect(() => {
    handleGetOrder();
  }, []);

  const [listFinance, setListFinance] = React.useState([]);
  const [pageConfig, setPageConfig] = React.useState({
    currentPage: 1,
    dataPerPage: 10,
    metadata: null,
  });

  // Handle API Get All Data Finance
  const handleGetOrder = async (changePage, maxDataPerPage) => {
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
        }&perPage=${maxDataPerPage ? maxDataPerPage : pageConfig.dataPerPage}`,
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

  // Handle API Search Finance
  const handleSearchOrder = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/keuangan/search/where?judul=${searching.value}`,
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

  // Menu - Searching
  const [searching, setSearching] = React.useState({ label: '', value: '', currentSearch: '' });
  const [searchAnchorEl, setSearchAnchorEl] = React.useState(null);
  const openSearch = Boolean(searchAnchorEl);
  const handleCloseSearch = () => {
    setSearchAnchorEl(null);
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
      label: 'Tenggat Waktu',
    },
    {
      id: 'status',
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

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

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
              handleGetOrder();
              setSearching({ label: '', value: '', currentSearch: '' });
            }}
          >
            <RefreshIcon color="primary" />
          </IconButton>
        </span>
        <div>
          <Chip
            label={`Search: ${searching.currentSearch}`}
            onDelete={() => {
              setSearching({ label: '', value: '', currentSearch: '' });
              handleGetOrder();
            }}
            sx={{ display: !searching.currentSearch ? 'none' : null }}
          />
          <Tooltip title="Filter list">
            <IconButton
              onClick={(event) => {
                setSearchAnchorEl(event.currentTarget);
              }}
            >
              {/* <FilterListIcon color="primary" /> */}
              <SearchIcon color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
      {/* Menu - Searching */}
      <Menu
        anchorEl={searchAnchorEl}
        open={openSearch}
        onClose={handleCloseSearch}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ py: 1, px: 2, display: 'flex', gap: 1 }}>
          <Grid container spacing={1}>
            <Grid
              item
              xs
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                [theme.breakpoints.up('sm')]: {
                  flexDirection: 'row',
                },
              }}
            >
              <Select
                value={searching.label}
                size="small"
                onChange={(e) => {
                  setSearching({ ...searching, label: e.target.value });
                }}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="">
                  <em>Pilih Label</em>
                </MenuItem>
                <MenuItem value={'Judul'}>Judul</MenuItem>
              </Select>

              <TextField
                required
                label="Kata Pencarian"
                value={searching.value}
                onChange={(e) => {
                  setSearching({ ...searching, value: e.target.value });
                }}
                size="small"
                autoComplete="off"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs="auto" sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                size="medium"
                variant="contained"
                onClick={() => {
                  setSearching({ label: '', value: '', currentSearch: searching.value });

                  handleCloseSearch();
                  handleSearchOrder();
                }}
              >
                Cari
              </Button>
            </Grid>
          </Grid>
        </Box>
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
                  sx={{ paddingY: 1 }}
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
        {pageConfig.metadata === null || searching.currentSearch ? null : (
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
                              handleGetOrder(index + 1);
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
                              handleGetOrder(1, item);
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
                  onClick={() => handleGetOrder('prev')}
                  disabled={pageConfig.currentPage === 1}
                  sx={{ color: '#1F305C' }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleGetOrder('next')}
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

  const dispatch = useDispatch();
  const { isLoading: loadingGetProfileAccountCustomer, data: dataGetProfileAccountCustomer } = useSelector(
    (state) => state.getProfileAccountCustomer
  );

  React.useEffect(() => {
    document.title = 'Area Pelanggan';
    dispatchGetProfileAccountCustomer();
  }, []);

  const dispatchGetProfileAccountCustomer = async () => {
    return await dispatch(getProfileAccountCustomer());
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
        <PageStructureAndDirectButton defaultMenu="Area Pelanggan" />

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
              {/* <img
                src="https://katapopuler.com/wp-content/uploads/2020/11/dummy.png"
                width={60}
                height={60}
                alt=""
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              /> */}
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
                    buttonStatusOrder === 'Menunggu Persetujuan' ? 'Pesanan sedang Berjalan' : 'Menunggu Persetujuan'
                  );
                }}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '4px !important',
                  padding: 0,
                  backgroundColor: buttonStatusOrder === 'Menunggu Persetujuan' ? '#ffffff80' : '#ffffff',
                  '&:hover': {
                    backgroundColor: '#ffffff80 !important',
                  },
                }}
              >
                <InformationCard
                  title="Menunggu Persetujuan"
                  content={{ normalText: '19' }}
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
                  content={{ normalText: '19' }}
                  inheritColor={true}
                  // navigate={{ text: 'Lihat daftar pesanan', url: '/Pesanan' }}
                />
              </Box>
            </Grid>

            <Grid item xs={6} md={4} lg={2.4}>
              <Box
                onClick={() => {
                  setButtonStatusOrder(
                    buttonStatusOrder === 'Pesanan Selesai' ? 'Pesanan sedang Berjalan' : 'Pesanan Selesai'
                  );
                }}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '4px !important',
                  padding: 0,
                  backgroundColor: buttonStatusOrder === 'Pesanan Selesai' ? '#ffffff80' : '#ffffff',
                  '&:hover': {
                    backgroundColor: '#ffffff80 !important',
                  },
                }}
              >
                <InformationCard
                  title="Pesanan Selesai"
                  content={{ normalText: '19' }}
                  inheritColor={true}
                  // navigate={{ text: 'Lihat daftar pesanan', url: '/Pesanan' }}
                />
              </Box>
            </Grid>

            <Grid item xs={6} md={4} lg={2.4}>
              <Box
                onClick={() => {
                  setButtonStatusOrder(
                    buttonStatusOrder === 'Pesanan Batal' ? 'Pesanan sedang Berjalan' : 'Pesanan Batal'
                  );
                }}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '4px !important',
                  padding: 0,
                  backgroundColor: buttonStatusOrder === 'Pesanan Batal' ? '#ffffff80' : '#ffffff',
                  '&:hover': {
                    backgroundColor: '#ffffff80 !important',
                  },
                }}
              >
                <InformationCard
                  title="Pesanan Batal"
                  content={{ normalText: '19' }}
                  inheritColor={true}
                  // navigate={{ text: 'Lihat daftar pesanan', url: '/Pesanan' }}
                />
              </Box>
            </Grid>

            <Grid item xs={6} md={4} lg={2.4}>
              <Box
                onClick={() => {
                  setButtonStatusOrder(
                    buttonStatusOrder === 'Pesanan di Tolak' ? 'Pesanan sedang Berjalan' : 'Pesanan di Tolak'
                  );
                }}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '4px !important',
                  padding: 0,
                  backgroundColor: buttonStatusOrder === 'Pesanan di Tolak' ? '#ffffff80' : '#ffffff',
                  '&:hover': {
                    backgroundColor: '#ffffff80 !important',
                  },
                }}
              >
                <InformationCard
                  title="Pesanan di Tolak"
                  content={{ normalText: '19' }}
                  inheritColor={true}
                  // navigate={{ text: 'Lihat daftar pesanan', url: '/Pesanan' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <OrderTable />
        </Paper>
      </Box>
    </>
  );
}

export default CustomerArea;
