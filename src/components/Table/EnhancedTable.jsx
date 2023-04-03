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
import { Avatar, Collapse } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

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
    disablePadding: false,
    label: '',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'code',
    numeric: true,
    disablePadding: false,
    label: 'Code',
  },
  {
    id: 'population',
    numeric: true,
    disablePadding: false,
    label: 'Population',
  },
  {
    id: 'size',
    numeric: true,
    disablePadding: false,
    label: 'Size',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'elementHTML',
    numeric: true,
    disablePadding: false,
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
    elementHTML: (
      <div style={{ display: 'flex' }}>
        <Avatar />
        <div style={{ width: '180px' }}>
          <h3>Element HtML</h3>
          <h6>Element HtML</h6>
        </div>
      </div>
    ),
  },
  {
    name: 'China',
    code: 'CN',
    population: 1403500365,
    size: 9596961,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: <h3>Element HtML</h3>,
  },
  {
    name: 'Italy',
    code: 'IT',
    population: 60483973,
    size: 301340,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: <h3>Element HtML</h3>,
  },
  {
    name: 'United States',
    code: 'US',
    population: 327167434,
    size: 9833520,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: <h3>Element HtML</h3>,
  },
  {
    name: 'Canada',
    code: 'CA',
    population: 37602103,
    size: 9984670,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: <h3>Element HtML</h3>,
  },
  {
    name: 'Australia',
    code: 'AU',
    population: 25475400,
    size: 7692024,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: <h3>Element HtML</h3>,
  },
  {
    name: 'Germany',
    code: 'DE',
    population: 83019200,
    size: 357578,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: <h3>Element HtML</h3>,
  },
  {
    name: 'Ireland',
    code: 'IE',
    population: 4857000,
    size: 70273,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: <h3>Element HtML</h3>,
  },
  {
    name: 'Mexico',
    code: 'MX',
    population: 126577691,
    size: 1972550,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: <h3>Element HtML</h3>,
  },
  {
    name: 'Japan',
    code: 'JP',
    population: 126317000,
    size: 377973,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: <h3>Element HtML</h3>,
  },
  {
    name: 'France',
    code: 'FR',
    population: 67022000,
    size: 640679,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: <h3>Element HtML</h3>,
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    population: 67545757,
    size: 242495,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: <h3>Element HtML</h3>,
  },
  {
    name: 'Russia',
    code: 'RU',
    population: 146793744,
    size: 17098246,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: <h3>Element HtML</h3>,
  },
  {
    name: 'Nigeria',
    code: 'NG',
    population: 200962417,
    size: 923768,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: <h3>Element HtML</h3>,
  },
  {
    name: 'Brazil',
    code: 'BR',
    population: 210147125,
    size: 8515767,
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    elementHTML: <h3>Element HtML</h3>,
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
            {openCell ? <FilterListIcon /> : <RefreshIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{props.item.name}</TableCell>
        <TableCell align="right">{props.item.code}</TableCell>
        <TableCell align="right">{props.item.population}</TableCell>
        <TableCell align="right">{props.item.size}</TableCell>
        <TableCell align="right">{props.item.description}</TableCell>
        <TableCell align="right">{props.item.elementHTML}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={openCell} timeout="auto" unmountOnExit>
            {/* <Box sx={{ margin: 1 }}> */}
            <Typography variant="h6" gutterBottom component="div">
              History Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias id nobis, dignissimos neque
              reiciendis vitae fuga quisquam, dolorem inventore praesentium, corrupti nam! Esse ab consequuntur quo
              maiores sequi labore distinctio.
            </Typography>
            <h1>Lorem ipsum dolor sit amet</h1>
            {/* </Box> */}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function EnhancedTable(props) {
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
    <Paper elevation={3}>
      <Box sx={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
        {/* Table Title */}
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <span style={{ display: 'flex' }}>
            <Typography sx={{ fontWeight: 'bold' }} color="primary" variant="h5" id="tableTitle" component="div">
              Daftar Pesanan Sedang Berjalan
            </Typography>
            <IconButton>
              <RefreshIcon color="primary" />
            </IconButton>
          </span>
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon color="primary" />
            </IconButton>
          </Tooltip>
        </Toolbar>

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

            <TableBody>
              {stableSort(props.dataTable, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((rowItem, index) => {
                  return <RowItem key={rowItem.code} item={rowItem} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          // rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={props.dataTable.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Paper>
  );
}
