import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getExample } from '../../../redux/actions/exampleAction';
// import EnhancedTable from '../../../components/Table/EnhancedTable';
// import ResponsiveTable from '../../../components/Table/ResponsiveTable';
import InformationCard from '../../../components/Card/InformationCard/InformationCard';
import AreaChart from '../../../components/Graph/AreaChart';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';

function RowItem(props) {
  const navigate = useNavigate();

  const dateCreate = new Date(props.item.createdAt);
  const dateUpdate = new Date(props.item.updatedAt);

  return (
    <React.Fragment>
      <TableRow hover>
        <TableCell>#{props.item.id}</TableCell>
        <TableCell>{props.item.role}</TableCell>

        <TableCell>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Avatar src={props.item.profilePic} />
            <div>
              {props.item.nama}
              <div style={{ fontSize: '12px' }}>
                {props.item.noTelp} || {props.item.email}
              </div>
            </div>
          </Box>
        </TableCell>

        <TableCell>
          {`${('0' + dateCreate.getDate()).slice(-2)}/${('0' + dateCreate.getMonth()).slice(
            -2
          )}/${dateCreate.getFullYear()} ${('0' + dateCreate.getHours()).slice(-2)}:${(
            '0' + dateCreate.getMinutes()
          ).slice(-2)}`}
          <div style={{ fontSize: '12px' }}>oleh {props.item.createdBy}</div>
        </TableCell>

        <TableCell>
          {`${('0' + dateUpdate.getDate()).slice(-2)}/${('0' + dateUpdate.getMonth()).slice(
            -2
          )}/${dateUpdate.getFullYear()} ${('0' + dateUpdate.getHours()).slice(-2)}:${(
            '0' + dateUpdate.getMinutes()
          ).slice(-2)}`}
          <div style={{ fontSize: '12px' }}>oleh {props.item.updatedBy}</div>
        </TableCell>

        <TableCell>
          <IconButton size="small">
            <MoreVertIcon color="primary" />
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function AdminTable({ setState }) {
  const theme = useTheme();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  React.useEffect(() => {
    handleGetAdmin();
  }, []);

  const [listAdmin, setListAdmin] = React.useState([]);
  const [pageConfig, setPageConfig] = React.useState({
    currentPage: 1,
    dataPerPage: 10,
    metadata: null,
  });

  // Handle API Get All Data Finance
  const handleGetAdmin = async (changePage, maxDataPerPage) => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/admin?page=${
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

      setState({
        activeOrders: res.data.otherData.pesananAktif,
        ordersCompleted: res.data.otherData.pesananSelesai,
        eventActive: res.data.otherData.eventAktif,
        totalCustomers: res.data.otherData.totalPelanggan,
        averageRating: res.data.otherData.averageRating,
        totalReviews: res.data.otherData.totalReview,
      });
      console.log('Response GET Data Finance');
      console.log(res);
      setListAdmin(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setListAdmin([]);
      }
      console.log(error);
    }
  };

  // Handle API Search Finance
  const handleSearchAdmin = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/admin/search/where${
          searching.label === 'Nama' ? '?nama=' + searching.value : '?noTelp=' + searching.value
        }`,
      });
      console.log('Response GET Data Finance');
      console.log(res);

      setListAdmin(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setListAdmin([]);
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
  const [searching, setSearching] = React.useState({ label: 'Nama', value: '', currentSearch: '' });
  const [searchAnchorEl, setSearchAnchorEl] = React.useState(null);
  const openSearch = Boolean(searchAnchorEl);
  const handleCloseSearch = () => {
    setSearchAnchorEl(null);
  };

  const headCells = [
    {
      id: 'id',
      label: 'ID Admin',
    },
    {
      id: 'role',
      label: 'Role',
    },
    {
      id: 'nama',
      label: 'Nama',
    },
    {
      id: 'createdAt',
      label: 'Tanggal Registrasi',
    },
    {
      id: 'updatedAt',
      label: 'Tanggal Terakhir Update',
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
    // let stabilizedThis;
    // if (orderBy === 'nama') {
    //   stabilizedThis = array.map((item, index) => [item.User, index]);
    // } else {
    //   stabilizedThis = array.map((el, index) => [el, index]);
    // }
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
            Daftar Administrator
          </Typography>
          <IconButton
            onClick={() => {
              handleGetAdmin();
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
              setSearching({ ...searching, currentSearch: '' });
              handleGetAdmin();
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
                {/* <MenuItem value="">
                  <em>Pilih Label</em>
                </MenuItem> */}
                <MenuItem value={'Nama'}>Nama</MenuItem>
                <MenuItem value={'No Telp'}>No Telp</MenuItem>
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
                  setSearching({ ...searching, currentSearch: searching.value });

                  handleCloseSearch();
                  handleSearchAdmin();
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
                  {headCell.id !== 'action' ? (
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
            {stableSort(listAdmin, getComparator(order, orderBy)).map((item, index) => {
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
          display: listAdmin.length ? 'none' : null,
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
                              handleGetAdmin(index + 1);
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
                              handleGetAdmin(1, item);
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
                  onClick={() => handleGetAdmin('prev')}
                  disabled={pageConfig.currentPage === 1}
                  sx={{ color: '#1F305C' }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleGetAdmin('next')}
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

function DashboardMenu() {
  const navigate = useNavigate();
  const [businessStats, setBusinessStats] = React.useState({
    activeOrders: null,
    ordersCompleted: null,
    eventActive: null,
    totalCustomers: null,
    averageRating: null,
    totalReviews: null,
  });
  const [financeReport, setFinanceReport] = useState([]);
  const [chartData, setChartData] = useState();

  React.useEffect(() => {
    document.title = 'Menu Dashboard';
    handleGetFinanceReport();
  }, []);

  const handleGetFinanceReport = async () => {
    const date = new Date();
    date.setDate(date.getDate() - 6);

    try {
      const res = await axios({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/keuangan/week/report`,
        data: { tanggal: date },
      });

      console.log('Response POST Data Finance Report');
      console.log(res);
      setFinanceReport({ ...res.data.data });
      setChartData({
        labels: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Today'],
        datasets: [
          {
            label: 'Pemasukan',
            data: res.data.data.laporanMingguan.map((item) => item.Pemasukan),
            borderColor: 'rgb(31, 48, 92)',
            backgroundColor: 'rgb(31, 48, 92)',
          },
          {
            label: 'Pengeluaran',
            data: res.data.data.laporanMingguan.map((item) => item.Pengeluaran),
            borderColor: 'rgb(211, 47, 47)',
            backgroundColor: 'rgb(211, 47, 47)',
          },
        ],
      });

      // setLoadingReport(!loadingReport);
    } catch (error) {
      if (error.response.status === 404) {
        setFinanceReport([]);
      }
      console.log(error);
    }
  };

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Dashboard"
          directButton={[
            {
              color: 'primary',
              iconType: 'add',
              value: 'Registrasi administrator baru',
              link: '/Dashboard/RegistrasiAdministratorBaru',
            },
          ]}
        />

        {/* Main Content */}
        <Grid container spacing={2}>
          <Grid item md={12} lg={6} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={4} lg={6}>
                <InformationCard
                  title="Pesanan sedang Berjalan"
                  content={{ normalText: businessStats.activeOrders }}
                  navigate={{ text: 'Lihat daftar pesanan', url: '/Pesanan' }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={6}>
                <InformationCard
                  title="Event Sedang berlangsung"
                  content={{ normalText: businessStats.eventActive }}
                  navigate={{ text: 'Lihat daftar cara', url: '/Event' }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={6}>
                <InformationCard
                  title="Pesanan selesai"
                  content={{ normalText: businessStats.ordersCompleted }}
                  navigate={{ text: 'Lihat daftar pesanan selesai', url: '/Pesanan' }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <InformationCard
                  title="Total pelanggan"
                  content={{ normalText: businessStats.totalCustomers }}
                  navigate={{ text: 'Lihat daftar pelanggan', url: '/Pelanggan' }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={12}>
                <InformationCard
                  title="Rating dan Review Pelanggan"
                  content={{
                    normalText: businessStats.averageRating,
                    smallText: businessStats.totalReviews,
                  }}
                  navigate={{ text: 'Lihat rating dan review pelanggan', url: '/Pesanan/RatingDanReviewPelanggan' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6}>
            {financeReport.length !== 0 && chartData ? (
              <InformationCard
                title="Laporan keuangan mingguan terbaru"
                content={{
                  embedHTML: (
                    <>
                      <AreaChart dataset={chartData} />
                    </>
                  ),
                }}
                navigate={{ text: 'Lihat laporan keuangan', url: '/Keuangan' }}
              />
            ) : null}
          </Grid>
        </Grid>

        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          {/* <EnhancedTable /> */}
          <AdminTable setState={setBusinessStats} />
        </Paper>

        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16"></Box>
        </Paper>
      </div>
    </>
  );
}

export default DashboardMenu;
