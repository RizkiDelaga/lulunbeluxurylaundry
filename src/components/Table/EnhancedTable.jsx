import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import Draggable from 'react-draggable';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import axios from 'axios';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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

function RowItem(props) {
  const [openCell, setOpenCell] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow hover>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpenCell(!openCell)}>
            {openCell ? <ExpandLessIcon color="primary" /> : <ExpandMoreIcon color="primary" />}
          </IconButton>
        </TableCell>
        <TableCell>{props.item.id}</TableCell>
        <TableCell>{props.item.tipe}</TableCell>
        <TableCell>{props.item.nominal}</TableCell>
        <TableCell>{props.item.judul}</TableCell>
        <TableCell>{props.item.tanggal}</TableCell>
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
          <Collapse in={openCell} timeout="auto" unmountOnExit>
            <Typography variant="h6" gutterBottom component="div">
              History Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias id nobis, dignissimos neque
              reiciendis vitae fuga quisquam, dolorem inventore praesentium, corrupti nam! Esse ab consequuntur quo
              maiores sequi labore distinctio.
            </Typography>
            <h1>Lorem ipsum dolor sit amet</h1>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function FilterPopUp({ openFilterPopUp, setOpenFilterPopUp }) {
  const PaperComponent = (props) => {
    return (
      <Draggable handle="#filter-dialog" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  };
  return (
    <Dialog
      open={openFilterPopUp}
      onClose={() => setOpenFilterPopUp(!openFilterPopUp)}
      PaperComponent={PaperComponent}
      aria-labelledby="filter-dialog"
      sx={{ zIndex: 10000 }}
    >
      <DialogTitle
        color="primary"
        style={{ cursor: 'move', display: 'flex', alignItems: 'center', gap: '10px' }}
        id="filter-dialog"
      >
        <FilterListIcon />
        Filter
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates occasionally.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setOpenFilterPopUp(!openFilterPopUp)}>
          Batal
        </Button>
        <Button onClick={() => setOpenFilterPopUp(!openFilterPopUp)}>Terapkan</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function EnhancedTable() {
  const theme = useTheme();
  const [openFilterPopUp, setOpenFilterPopUp] = React.useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');

  // const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
    metadata: null,
  });
  const handleGetFinance = async (changePage) => {
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
        }&perPage=${10}`,
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
      });
      console.log('Response GET Data Finance');
      console.log(res);
      setListFinance(res.data.data);
      // setPageConfig({ ...pageConfig, metadata: res.data.metadata });
    } catch (error) {
      if (error.response.status === 404) {
        setListFinance([]);
      }
      console.log(error);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <IconButton onClick={() => handleGetFinance()}>
            <RefreshIcon color="primary" />
          </IconButton>
        </span>
        <Tooltip title="Filter list">
          <IconButton onClick={() => setOpenFilterPopUp(!openFilterPopUp)}>
            <FilterListIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Toolbar>

      <FilterPopUp openFilterPopUp={openFilterPopUp} setOpenFilterPopUp={setOpenFilterPopUp} />

      <TableContainer sx={{ maxHeight: rowsPerPage !== 10 ? 800 : 'none' }}>
        <Table stickyHeader sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          {/* Table Header */}
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  // align={headCell.numeric ? 'right' : 'left'}
                  sortDirection={orderBy === headCell.id ? order : false}
                  sx={{ paddingY: 1 }}
                >
                  {headCell.id !== 'collapse' ? (
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
            {stableSort(listFinance, getComparator(order, orderBy))
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((rowItem, index) => {
                return <RowItem key={rowItem.code} item={rowItem} />;
              })}
          </TableBody>
        </Table>
      </TableContainer>

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
                <span>Pages:</span>
                <Button variant="text" size="small" onClick={handleClick} sx={{ display: 'flex', fontSize: '16px' }}>
                  {pageConfig.metadata === null ? null : pageConfig.metadata.totalPage}
                  <ArrowDropDownIcon />
                  <ArrowDropUpIcon />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
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
                              handleClose();
                            }}
                            disabled={pageConfig.currentPage === index + 1}
                          >
                            {index + 1}
                          </MenuItem>
                        );
                      })}
                </Menu>
                <div>Rows per page:</div>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => console.log('asd')}
                  sx={{ display: 'flex', fontSize: '16px' }}
                >
                  10
                  <ArrowDropDownIcon />
                  <ArrowDropUpIcon />
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                sm="auto"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <span>1-10 of 100</span>
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
