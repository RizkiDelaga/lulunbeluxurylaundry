import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import {
  Box,
  Button,
  Chip,
  Collapse,
  FormControl,
  Grid,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  TextField,
  ToggleButtonGroup,
  styled,
  useTheme,
} from '@mui/material';
import MuiToggleButton from '@mui/material/ToggleButton';
import TimelineIcon from '@mui/icons-material/Timeline';
import BarChartIcon from '@mui/icons-material/BarChart';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import AreaChart from '../../../components/Graph/AreaChart';
import HorizontalBarChart from '../../../components/Graph/HorizontalBarChart';
import VerticalBarChart from '../../../components/Graph/VerticalBarChart';
import StackedBarChart from '../../../components/Graph/StackedBarChart';

import PieChart from '../../../components/Graph/PieChart';
import DoughnutChart from '../../../components/Graph/DoughnutChart';

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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

function FinanceStats({ dataset }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [lineBarChart, setLineBarChart] = React.useState('Line Chart');
  const [percentageChart, setPercentageChart] = React.useState('Pie Chart');

  const ToggleButton = styled(MuiToggleButton)({
    '&.Mui-selected, &.Mui-selected:hover': {
      color: '#1F305C !important',
      backgroundColor: 'rgba(31, 48, 92, 0.25)',
    },
  });

  const sumIncome = dataset[
    dataset.reportType === 'Minggu'
      ? 'laporanMingguan'
      : dataset.reportType === 'Bulan'
      ? 'laporanBulanan'
      : 'laporanTahunan'
  ].reduce((acc, obj) => acc + obj.Pemasukan, 0);

  const sumExpenses = dataset[
    dataset.reportType === 'Minggu'
      ? 'laporanMingguan'
      : dataset.reportType === 'Bulan'
      ? 'laporanBulanan'
      : 'laporanTahunan'
  ].reduce((acc, obj) => acc + obj.Pengeluaran, 0);

  const listIncome = dataset[
    dataset.reportType === 'Minggu'
      ? 'laporanMingguan'
      : dataset.reportType === 'Bulan'
      ? 'laporanBulanan'
      : 'laporanTahunan'
  ].map((item) => item.Pemasukan);

  const listExpenses = dataset[
    dataset.reportType === 'Minggu'
      ? 'laporanMingguan'
      : dataset.reportType === 'Bulan'
      ? 'laporanBulanan'
      : 'laporanTahunan'
  ].map((item) => item.Pengeluaran);

  console.log(
    'asdasd =',
    JSON.stringify(
      dataset[
        dataset.reportType === 'Minggu'
          ? 'laporanMingguan'
          : dataset.reportType === 'Bulan'
          ? 'laporanBulanan'
          : 'laporanTahunan'
      ]
    )
  );
  console.log('asdasd =', sumIncome);
  console.log(
    'asdasd =',
    dataset[
      dataset.reportType === 'Minggu'
        ? 'laporanMingguan'
        : dataset.reportType === 'Bulan'
        ? 'laporanBulanan'
        : 'laporanTahunan'
    ].map((item) => item.Pemasukan)
  );

  const labels = ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Today'];

  let chartData = {
    labels,
    datasets: [
      {
        label: 'Pemasukan',
        data: [...listIncome],
        borderColor: 'rgb(31, 48, 92)',
        backgroundColor: 'rgb(31, 48, 92)',
      },
      {
        label: 'Pengeluaran',
        data: [...listExpenses],
        borderColor: 'rgb(211, 47, 47)',
        backgroundColor: 'rgb(211, 47, 47)',
      },
    ],
  };

  let percentageData = {
    labels: ['Pemasukan', 'Pengeluaran'],
    datasets: [
      {
        label: 'Statistik Keuangan Mingguan',
        data: [sumIncome, sumExpenses],
        backgroundColor: ['rgb(31, 48, 92)', 'rgb(211, 47, 47)'],
        borderColor: ['rgb(31, 48, 92)', 'rgb(211, 47, 47)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={8}>
        <Grid container>
          <Grid item xs={12} sm sx={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Grafik Keuangan</span>
          </Grid>
          <Grid
            item
            xs={12}
            sm
            sx={{
              display: 'flex',
              justifyContent: 'right',
              [theme.breakpoints.down('sm')]: {
                display: 'flex',
                justifyContent: 'center',
                py: 1,
              },
            }}
          >
            <ToggleButtonGroup
              value={lineBarChart}
              color="primary"
              exclusive
              onChange={(event, value) => {
                if (value) {
                  setLineBarChart(value);
                }
              }}
              sx={{
                // border: '1px solid #1F305C',
                [theme.breakpoints.down('sm')]: {
                  height: '35px !important',
                },
              }}
            >
              <ToggleButton value="Line Chart" sx={{ border: '1px solid #1F305C' }}>
                <TimelineIcon />
              </ToggleButton>
              <ToggleButton value="Horizontal Bar Chart" sx={{ border: '1px solid #1F305C' }}>
                <BarChartIcon />
              </ToggleButton>
              <ToggleButton value="Vertical Bar Chart" sx={{ border: '1px solid #1F305C' }}>
                <BarChartIcon sx={{ transform: 'rotate(90deg)' }} />
              </ToggleButton>
              <ToggleButton value="Stacked Bar Chart" sx={{ border: '1px solid #1F305C' }}>
                <StackedBarChartIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>

        {lineBarChart === 'Line Chart' ? <AreaChart dataset={chartData} /> : null}
        {lineBarChart === 'Horizontal Bar Chart' ? <HorizontalBarChart dataset={chartData} /> : null}
        {lineBarChart === 'Vertical Bar Chart' ? <VerticalBarChart dataset={chartData} /> : null}
        {lineBarChart === 'Stacked Bar Chart' ? <StackedBarChart dataset={chartData} /> : null}
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <Grid container>
          <Grid item xs={12} sm sx={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Persentase</span>
          </Grid>
          <Grid
            item
            xs={12}
            sm
            sx={{
              display: 'flex',
              justifyContent: 'right',
              [theme.breakpoints.down('sm')]: {
                display: 'flex',
                justifyContent: 'center',
                py: 1,
              },
            }}
          >
            <ToggleButtonGroup
              value={percentageChart}
              color="primary"
              exclusive
              onChange={(event, value) => {
                if (value) {
                  setPercentageChart(value);
                }
              }}
              sx={{
                // border: '1px solid #1F305C',
                [theme.breakpoints.down('sm')]: {
                  height: '35px !important',
                },
              }}
            >
              <ToggleButton value="Pie Chart" sx={{ border: '1px solid #1F305C' }}>
                <PieChartIcon />
              </ToggleButton>
              <ToggleButton value="Donut Chart" sx={{ border: '1px solid #1F305C' }}>
                <DonutSmallIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>

        {percentageChart === 'Pie Chart' ? <PieChart dataset={percentageData} /> : null}
        {percentageChart === 'Donut Chart' ? <DoughnutChart dataset={percentageData} /> : null}
      </Grid>
    </Grid>
  );
}

function RowItem(props) {
  const [openTableCell, setOpenTableCell] = React.useState(false);

  const date = new Date(props.item.tanggal);

  return (
    <React.Fragment>
      <TableRow hover>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpenTableCell(!openTableCell)}>
            {openTableCell ? <ExpandLessIcon color="primary" /> : <ExpandMoreIcon color="primary" />}
          </IconButton>
        </TableCell>
        <TableCell>{props.item.id}</TableCell>
        <TableCell>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {props.item.tipe === 'Pengeluaran' ? (
              <div
                style={{
                  backgroundColor: 'rgb(211, 47, 47)',
                  borderRadius: '100%',
                  padding: '5px',
                  width: '14px',
                  height: '14px',
                }}
              >
                {' '}
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: '#1F305C',
                  borderRadius: '100%',
                  padding: '5px',
                  width: '14px',
                  height: '14px',
                }}
              >
                {' '}
              </div>
            )}
            <div>{props.item.tipe}</div>
          </div>
        </TableCell>
        <TableCell>
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(props.item.nominal)}
        </TableCell>
        <TableCell>{props.item.judul}</TableCell>
        <TableCell>
          {`${('0' + date.getDate()).slice(-2)}/${('0' + date.getMonth()).slice(-2)}/${date.getFullYear()} ${(
            '0' + date.getHours()
          ).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`}
          <div style={{ fontSize: '12px' }}>oleh Admin Name Namefull</div>
        </TableCell>
        <TableCell>{props.item.catatan}</TableCell>
        <TableCell>
          <IconButton size="small">
            <MoreVertIcon color="primary" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Collapse Table */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={openTableCell} timeout="auto" unmountOnExit>
            <Box sx={{ px: 2, py: 1 }}>
              <div style={{ marginBottom: '16px' }}>
                <h6>Detail Lengkap</h6>
              </div>

              <Grid container>
                <Grid item xs={6}>
                  <div>Lorem ipsum dolor sit amet. 1</div>
                </Grid>
                <Grid item xs={6}>
                  <div>Lorem ipsum dolor sit amet. 2</div>
                </Grid>
              </Grid>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained">Lihat Detail</Button>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function FinancialHistoryTable() {
  const theme = useTheme();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  React.useEffect(() => {
    handleGetFinance();
  }, []);

  const [listFinance, setListFinance] = React.useState([]);
  const [pageConfig, setPageConfig] = React.useState({
    currentPage: 1,
    dataPerPage: 10,
    metadata: null,
  });

  // Handle API Get All Data Finance
  const handleGetFinance = async (changePage, maxDataPerPage) => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/keuangan?page=${
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
  const handleSearchFinance = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/keuangan/search/where?judul=${searching.value}`,
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
      id: 'id',
      label: 'ID',
    },
    {
      id: 'tipe',
      label: 'Tipe',
    },
    {
      id: 'nominal',
      label: 'Nominal',
    },
    {
      id: 'judul',
      label: 'Judul',
    },
    {
      id: 'tanggal',
      label: 'Tanggal',
    },
    {
      id: 'catatan',
      label: 'Catatan',
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
            Riwayat Keuangan
          </Typography>
          <IconButton
            onClick={() => {
              handleGetFinance();
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
              handleGetFinance();
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
                  handleSearchFinance();
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
                              handleGetFinance(index + 1);
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
                              handleGetFinance(1, item);
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
                  onClick={() => handleGetFinance('prev')}
                  disabled={pageConfig.currentPage === 1}
                  sx={{ color: '#1F305C' }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleGetFinance('next')}
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

function FinanceMenu() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [dateReport, setDateReport] = useState(dayjs());
  const [financeReport, setFinanceReport] = useState([]);
  const [reportType, setReportType] = useState('Minggu');
  const [loadingReport, setLoadingReport] = useState(false);

  React.useEffect(() => {
    document.title = 'Menu Keuangan';
    handleGetFinanceReport();
  }, []);

  const handleGetFinanceReport = async () => {
    // setLoadingReport(!loadingReport);

    const date = new Date(dateReport);
    if (reportType !== 'Minggu') {
      date.setDate('01');
    }

    try {
      const res = await axios({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/keuangan/${
          reportType === 'Minggu' ? 'week' : reportType === 'Bulan' ? 'month' : 'year'
        }/report`,
        data: { tanggal: date },
      });

      console.log('Response POST Data Finance Report');
      console.log(res);
      setFinanceReport({ ...res.data.data, reportType: reportType });
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
          defaultMenu="Keuangan"
          directButton={[
            {
              color: 'primary',
              iconType: 'add',
              value: 'Tambah Pemasukan',
              link: '/Keuangan/InputPemasukan',
            },
            {
              color: 'secondary',
              iconType: 'add',
              value: 'Tambah Pengeluaran',
              link: '/Keuangan/InputPengeluaran',
            },
          ]}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Grid container spacing={2}>
            <Grid item md sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControl fullWidth>
                <InputLabel id="select-type-report">Tipe Laporan</InputLabel>
                <Select
                  required
                  labelId="select-type-report"
                  id="select-type-report"
                  value={reportType}
                  label="Tipe Laporan"
                  onChange={(e) => {
                    setReportType(e.target.value);
                  }}
                  // MenuProps={{ PaperProps: { sx: { maxHeight: 400 } } }}
                >
                  {['Minggu', 'Bulan', 'Tahun'].map((item) => {
                    return (
                      <MenuItem value={item} sx={{ py: '16px' }}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md sx={{ display: 'flex', alignItems: 'center' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {reportType === 'Minggu' ? (
                  <MobileDatePicker
                    label="Pilih Tanggal"
                    value={dateReport}
                    onChange={(newValue) => {
                      // setValue(newValue);
                      // setValueX(dayjs(`${date.year}-01-25 12:45:02`));
                      // setDate({ year: newValue.$y, month: newValue.$M, date: newValue.$D });
                      console.log(newValue);
                      setDateReport(newValue);

                      // setDateReport(dayjs(`${newValue.$y}-${newValue.$M + 1}-${newValue.$D}T00:00:00.000Z`));

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
                ) : null}

                {reportType === 'Bulan' ? (
                  <MobileDatePicker
                    views={['month', 'year']}
                    label="Pilih Bulan"
                    value={dateReport}
                    onChange={(newValue) => {
                      // setValue(newValue);
                      // 2023-02-17T00:00:00.000Z
                      console.log(newValue);
                      setDateReport(newValue);
                      // setDate({ year: newValue.$y, month: newValue.$M, date: newValue.$D });

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
                ) : null}

                {reportType === 'Tahun' ? (
                  <MobileDatePicker
                    views={['year']}
                    label="Pilih Tahun"
                    value={dateReport}
                    onChange={(newValue) => {
                      // setValue(newValue);
                      // setValueX(dayjs(`${date.year}-01-25 12:45:02`));
                      // setDate({ year: newValue.$y, month: newValue.$M, date: newValue.$D });
                      console.log(newValue);
                      setDateReport(newValue);

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
                ) : null}
              </LocalizationProvider>
            </Grid>
            <Grid item md="auto" sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  setFinanceReport([]);
                  handleGetFinanceReport();
                }}
              >
                Lihat Laporan
              </Button>
            </Grid>
          </Grid>

          {financeReport.length !== 0 ? <FinanceStats dataset={financeReport} /> : null}
        </Paper>

        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          {/* <FinancialHistoryTable /> */}
        </Paper>
      </div>
    </>
  );
}

export default FinanceMenu;
