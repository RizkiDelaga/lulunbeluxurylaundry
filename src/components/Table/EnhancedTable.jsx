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
import { visuallyHidden } from '@mui/utils';
import {
  Avatar,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import Draggable from 'react-draggable';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// function createData(name, calories, fat, carbs, protein) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//   };
// }

// function createData(name, code, population, size, description, elementHTML) {
//   return { name, code, population, size, description, elementHTML };
// }

const headCells = [
  {
    id: 'collapse',
    numeric: false,
    label: '',
  },
  {
    id: 'name',
    numeric: false,
    label: 'Name',
  },
  {
    id: 'code',
    numeric: true,
    label: 'Code',
  },
  {
    id: 'population',
    numeric: true,
    label: 'Population',
  },
  {
    id: 'size',
    numeric: true,
    label: 'Size',
  },
  {
    id: 'description',
    numeric: false,
    label: 'Description',
  },
  {
    id: 'elementHTML',
    numeric: true,
    label: 'Element HTML',
  },
];

const dataTable = [
  {
    name: 'India',
    code: 'IN',
    population: 1324171354,
    size: 3287263,
    description:
      '1 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: 1,
  },
  {
    name: 'China',
    code: 'CN',
    population: 1403500365,
    size: 9596961,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: 2,
  },
  {
    name: 'Italy',
    code: 'IT',
    population: 60483973,
    size: 301340,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: 3,
  },
  {
    name: 'United States',
    code: 'US',
    population: 327167434,
    size: 9833520,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: 4,
  },
  {
    name: 'Canada',
    code: 'CA',
    population: 37602103,
    size: 9984670,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: 5,
  },
  {
    name: 'Australia',
    code: 'AU',
    population: 25475400,
    size: 7692024,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: 6,
  },
  {
    name: 'Germany',
    code: 'DE',
    population: 83019200,
    size: 357578,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: 7,
  },
  {
    name: 'Ireland',
    code: 'IE',
    population: 4857000,
    size: 70273,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: 8,
  },
  {
    name: 'Mexico',
    code: 'MX',
    population: 126577691,
    size: 1972550,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: 9,
  },
  {
    name: 'Japan',
    code: 'JP',
    population: 126317000,
    size: 377973,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: 10,
  },
  {
    name: 'France',
    code: 'FR',
    population: 67022000,
    size: 640679,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: 11,
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    population: 67545757,
    size: 242495,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: 12,
  },
  {
    name: 'Russia',
    code: 'RU',
    population: 146793744,
    size: 17098246,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: 13,
  },
  {
    name: 'Nigeria',
    code: 'NG',
    population: 200962417,
    size: 923768,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: 14,
  },
  {
    name: 'Brazil',
    code: 'BR',
    population: 210147125,
    size: 8515767,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: 15,
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
        <TableCell>{props.item.name}</TableCell>
        <TableCell align="right">{props.item.code}</TableCell>
        <TableCell align="right">{props.item.population}</TableCell>
        <TableCell align="right">{props.item.size}</TableCell>
        <TableCell align="right">{props.item.description}</TableCell>
        <TableCell align="right">{props.item.elementHTML}</TableCell>
      </TableRow>

      {/* Collapse Table */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
          <IconButton>
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
                  align={headCell.numeric ? 'right' : 'left'}
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
            {stableSort(dataTable, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((rowItem, index) => {
                return <RowItem key={rowItem.code} item={rowItem} />;
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Table Pagination */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <span>
          <Button sx={{ width: 'max-content' }}>Pagination 1 (1-100)</Button>
        </span>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={dataTable.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            [theme.breakpoints.up('sm')]: { justifyContent: 'right' },
          }}
        />
      </Box>
    </>
  );
}
