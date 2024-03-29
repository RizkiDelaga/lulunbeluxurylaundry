import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Collapse,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Select,
  TextField,
  useTheme,
} from '@mui/material';

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
import { getComparator, stableSort } from '../../../utils/tableUtils';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import InformationCard from '../../../components/Card/InformationCard';
import { adjustTimePlus } from '../../../utils/timeUtils';
import dayjs from 'dayjs';

function RowItem(props) {
  const navigate = useNavigate();
  const [openTableCell, setOpenTableCell] = React.useState(false);
  const currentDate = new Date(dayjs());
  const givenDate = new Date(
    props.item.tenggatWaktu.slice(0, 4),
    parseInt(props.item.tenggatWaktu.slice(5, 7)) - 1,
    props.item.tenggatWaktu.slice(8, 10)
  );
  currentDate.setDate(currentDate.getDate() + 1);
  // Set the time to 00:00:00 for both dates
  givenDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

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
          <span onClick={() => navigate(`/Pesanan/${props.item.nomorPesanan}`)} style={{ cursor: 'pointer' }}>
            #{props.item.nomorPesanan}
          </span>
        </TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Avatar src={props.item.User.profilePic} />
            <div>
              {props.item.User.nama}
              <div style={{ fontSize: '12px' }}>
                {props.item.User.noTelp}
                {props.item.User.email ? ' || ' + props.item.User.email : null}
              </div>
            </div>
          </Box>
        </TableCell>
        <TableCell>
          {` ${props.item.tglMulai.slice(8, 10)}/${props.item.tglMulai.slice(5, 7)}/${props.item.tglMulai.slice(
            0,
            4
          )} ${('0' + adjustTimePlus(parseInt(props.item.tglMulai.slice(11, 13)))).slice(
            -2
          )}:${props.item.tglMulai.slice(14, 16)}`}
          <div style={{ fontSize: '12px' }}>oleh {props.item.createdBy}</div>
        </TableCell>
        <TableCell
          sx={{
            color:
              givenDate.getFullYear() === currentDate.getFullYear() &&
              givenDate.getMonth() === currentDate.getMonth() &&
              givenDate.getDate() === currentDate.getDate() - 1
                ? 'orange'
                : currentDate.getTime() > givenDate.getTime()
                ? 'red'
                : 'black',
          }}
        >
          {` ${props.item.tenggatWaktu.slice(8, 10)}/${props.item.tenggatWaktu.slice(
            5,
            7
          )}/${props.item.tenggatWaktu.slice(0, 4)} ${(
            '0' + adjustTimePlus(parseInt(props.item.tenggatWaktu.slice(11, 13)))
          ).slice(-2)}:${props.item.tenggatWaktu.slice(14, 16)}`}
        </TableCell>
        <TableCell>
          {props.item.status}
          <div style={{ fontSize: '12px' }}>
            pada
            {` ${props.item.statusUpdatedAt.slice(8, 10)}/${props.item.statusUpdatedAt.slice(
              5,
              7
            )}/${props.item.statusUpdatedAt.slice(0, 4)} ${(
              '0' + adjustTimePlus(parseInt(props.item.statusUpdatedAt.slice(11, 13)))
            ).slice(-2)}:${props.item.statusUpdatedAt.slice(14, 16)}`}
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
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Total pembayaran : </strong>
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                      props.item.totalHarga
                    )}{' '}
                    ({props.item.statusPembayaran})
                  </div>
                  <div>
                    <strong>Jenis laundry : </strong>
                    {props.item.namaLayanan}
                  </div>
                </Grid>
              </Grid>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" onClick={() => navigate(`/Pesanan/${props.item.nomorPesanan}`)}>
                  Lihat Detail
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
    handleGetOrder(null, null, 'Perlu Dikerjakan');
  }, []);

  const [listOrder, setListOrder] = React.useState([]);
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
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/pemesanan/where/status?page=${
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

      setListOrder(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setListOrder([]);
      }
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
        url: `${process.env.REACT_APP_API_KEY}/pemesanan/search/where?nomorPesanan=${searching.value}`,
      });

      setListOrder(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setListOrder([]);
      }
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
  const [searching, setSearching] = React.useState({ label: 'No Pemesanan', value: '', currentSearch: '' });
  const [searchAnchorEl, setSearchAnchorEl] = React.useState(null);
  const openSearch = Boolean(searchAnchorEl);
  const handleCloseSearch = () => {
    setSearchAnchorEl(null);
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
      id: 'nama',
      label: 'Pelanggan',
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
          flexWrap: 'wrap',
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
              handleGetOrder(null, null, filterOrderStatus);
              setSearching({ label: searching.label, value: '', currentSearch: '' });
            }}
          >
            <RefreshIcon color="primary" />
          </IconButton>
        </span>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap-reverse',
            justifyContent: 'center',
            alignItems: 'center',
            justifySelf: 'end',
          }}
        >
          <Chip
            label={`Search: ${searching.currentSearch}`}
            onDelete={() => {
              setSearching({ label: searching.label, value: '', currentSearch: '' });
              handleGetOrder(null, null, filterOrderStatus);
            }}
            sx={{ display: !searching.currentSearch ? 'none' : null }}
          />
          <Tooltip title="Search list">
            <IconButton
              onClick={(event) => {
                setSearchAnchorEl(event.currentTarget);
              }}
            >
              <SearchIcon color="primary" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Filter list">
            <IconButton
              onClick={(event) => {
                setFilterAnchorEl(event.currentTarget);
              }}
            >
              {/* <FilterListIcon color="primary" /> */}
              <FilterListIcon color="primary" />
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
                defaultValue="Judul"
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value={'No Pemesanan'} selected>
                  No Pemesanan
                </MenuItem>
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
                  setSearching({ label: searching.label, value: '', currentSearch: searching.value });

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
          Perlu Dijemput
        </MenuItem>
        <MenuItem
          onClick={() => {
            setFilterOrderStatus('Perlu Dikerjakan');
            handleGetOrder(null, null, 'Perlu Dikerjakan');

            handleCloseFilter();
          }}
          sx={{ bgcolor: filterOrderStatus === 'Perlu Dikerjakan' ? '#eeeeee' : null }}
        >
          Perlu Dikerjakan
        </MenuItem>
        <MenuItem
          onClick={() => {
            setFilterOrderStatus('Perlu Diantar');
            handleGetOrder(null, null, 'Perlu Diantar');
            handleCloseFilter();
          }}
          sx={{ bgcolor: filterOrderStatus === 'Perlu Diantar' ? '#eeeeee' : null }}
        >
          Perlu Diantar
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
            {stableSort(listOrder, getComparator(order, orderBy)).map((item, index) => {
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
          display: listOrder.length ? 'none' : null,
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
                              handleGetOrder(index + 1, null, filterOrderStatus);
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
                              handleGetOrder(1, item, filterOrderStatus);
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
                  onClick={() => handleGetOrder('prev', null, filterOrderStatus)}
                  disabled={pageConfig.currentPage === 1}
                  sx={{ color: '#1F305C' }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleGetOrder('next', null, filterOrderStatus)}
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

function OrderMenu() {
  const navigate = useNavigate();
  const [orderStats, setOrderStats] = React.useState({
    needApproval: null,
    needsToBePickedUp: null,
    needsToBeDone: null,
    needsToBeDelivered: null,
    completed: null,
    cancelled: null,
    declined: null,
    averageRating: null,
    totalReviews: null,
  });

  React.useEffect(() => {
    document.title = 'Menu Pesanan';
    handleGetOrderStats();
  }, []);

  const handleGetOrderStats = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/pemesanan/admin/statistic-data`,
      });

      setOrderStats({
        needApproval: res.data.data.perluDisetujui,
        needsToBePickedUp: res.data.data.perluDijemput,
        needsToBeDone: res.data.data.perluDikerjakan,
        needsToBeDelivered: res.data.data.perluDiantar,
        completed: res.data.data.completed,
        cancelled: res.data.data.cancelled,
        declined: res.data.data.declined,
        averageRating: res.data.data.averageRating,
        totalReviews: res.data.data.totalReview,
      });
    } catch (error) {}
  };

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Pesanan"
          directButton={[
            {
              color: 'primary',
              iconType: 'add',
              value: 'Buat pesanan baru',
              link: '/Pesanan/FormulirPemesananLaundry',
            },
          ]}
        />

        {/* Main Content */}
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
          <h4>Progres Pesanan</h4>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3} lg={3}>
              <InformationCard
                title="Perlu Disetujui"
                content={{ normalText: orderStats.needApproval }}
                navigate={{ text: 'Lihat detail pesanan', url: '/Pesanan/DaftarPesanan/Perlu Disetujui' }}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <InformationCard
                title="Perlu Dijemput"
                content={{ normalText: orderStats.needsToBePickedUp }}
                navigate={{ text: 'Lihat detail pesanan', url: '/Pesanan/DaftarPesanan/Perlu Dijemput' }}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <InformationCard
                title="Perlu Dikerjakan"
                content={{ normalText: orderStats.needsToBeDone }}
                navigate={{ text: 'Lihat detail pesanan', url: '/Pesanan/DaftarPesanan/Perlu Dikerjakan' }}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <InformationCard
                title="Perlu Diantar"
                content={{ normalText: orderStats.needsToBeDelivered }}
                navigate={{ text: 'Lihat detail pesanan', url: '/Pesanan/DaftarPesanan/Perlu Diantar' }}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <OrderTable />
        </Paper>

        <Grid container spacing={2}>
          <Grid item xs={6} sm={4} md={4} lg={4}>
            <InformationCard
              title="Order Completed"
              content={{ normalText: orderStats.completed }}
              navigate={{ text: 'Lihat detail pesanan', url: '/Pesanan/DaftarPesanan/Selesai' }}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4} lg={4}>
            <InformationCard
              title="Order Cancelled"
              content={{ normalText: orderStats.cancelled }}
              navigate={{ text: 'Lihat detail pesanan', url: '/Pesanan/DaftarPesanan/Dibatalkan' }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <InformationCard
              title="Rating & Review"
              content={{ normalText: orderStats.averageRating, smallText: orderStats.totalReviews }}
              navigate={{ text: 'Lihat lebih banyak', url: '/Pesanan/RatingDanReviewPelanggan' }}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default OrderMenu;
