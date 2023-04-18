import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Avatar, Box } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

const columns = [
  { id: 'name', label: 'Name', minWidth: 'max-content' },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 'none' },
  {
    id: 'population',
    label: 'Population',
    minWidth: 'none',
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 'none',
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 360,
  },
  {
    id: 'elementHTML',
    label: 'Element HTML',
    minWidth: 'max-content',
  },
];

function createData(name, code, population, size, description, elementHTML) {
  return { name, code, population, size, description, elementHTML };
}

const rows = [
  createData(
    'India',
    'IN',
    1324171354,
    3287263,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    <div style={{ display: 'flex' }}>
      <Avatar />
      <div style={{ width: '180px' }}>
        <h3>Element HtML</h3>
        <h6>Element HtML</h6>
      </div>
    </div>
  ),
  createData(
    'China',
    'CN',
    1403500365,
    9596961,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    <h3>Element HtML</h3>
  ),
  createData(
    'Italy',
    'IT',
    60483973,
    301340,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    <h3>Element HtML</h3>
  ),
  createData(
    'United States',
    'US',
    327167434,
    9833520,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    <h3>Element HtML</h3>
  ),
  createData(
    'Canada',
    'CA',
    37602103,
    9984670,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    <h3>Element HtML</h3>
  ),
  createData(
    'Australia',
    'AU',
    25475400,
    7692024,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    <h3>Element HtML</h3>
  ),
  createData(
    'Germany',
    'DE',
    83019200,
    357578,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    <h3>Element HtML</h3>
  ),
  createData(
    'Ireland',
    'IE',
    4857000,
    70273,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    <h3>Element HtML</h3>
  ),
  createData(
    'Mexico',
    'MX',
    126577691,
    1972550,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    <h3>Element HtML</h3>
  ),
  createData(
    'Japan',
    'JP',
    126317000,
    377973,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    <h3>Element HtML</h3>
  ),
  createData(
    'France',
    'FR',
    67022000,
    640679,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    <h3>Element HtML</h3>
  ),
  createData(
    'United Kingdom',
    'GB',
    67545757,
    242495,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    <h3>Element HtML</h3>
  ),
  createData(
    'Russia',
    'RU',
    146793744,
    17098246,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    <h3>Element HtML</h3>
  ),
  createData(
    'Nigeria',
    'NG',
    200962417,
    923768,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    <h3>Element HtML</h3>
  ),
  createData(
    'Brazil',
    'BR',
    210147125,
    8515767,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.',
    <h3>Element HtML</h3>
  ),
];

function ResponsiveTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer sx={{ maxHeight: rowsPerPage === 25 ? 800 : 'none' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {/* <Tooltip title={column.format && typeof value === 'number' ? column.format(value) : value}> */}
                        <span>{column.format && typeof value === 'number' ? column.format(value) : value}</span>
                        {/* </Tooltip> */}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ overflowWrap: 'break-word' }}
      />
    </>
  );
}

export default ResponsiveTable;
