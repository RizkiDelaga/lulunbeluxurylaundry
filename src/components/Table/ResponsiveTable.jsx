import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 360,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size, description) {
  const density = population / size;
  return { name, code, population, size, density, description };
}

const rows = [
  createData(
    'India',
    'IN',
    1324171354,
    3287263,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.'
  ),
  createData(
    'China',
    'CN',
    1403500365,
    9596961,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.'
  ),
  createData(
    'Italy',
    'IT',
    60483973,
    301340,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.'
  ),
  createData(
    'United States',
    'US',
    327167434,
    9833520,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.'
  ),
  createData(
    'Canada',
    'CA',
    37602103,
    9984670,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.'
  ),
  createData(
    'Australia',
    'AU',
    25475400,
    7692024,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.'
  ),
  createData(
    'Germany',
    'DE',
    83019200,
    357578,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.'
  ),
  createData(
    'Ireland',
    'IE',
    4857000,
    70273,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.'
  ),
  createData(
    'Mexico',
    'MX',
    126577691,
    1972550,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.'
  ),
  createData(
    'Japan',
    'JP',
    126317000,
    377973,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.'
  ),
  createData(
    'France',
    'FR',
    67022000,
    640679,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.'
  ),
  createData(
    'United Kingdom',
    'GB',
    67545757,
    242495,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.'
  ),
  createData(
    'Russia',
    'RU',
    146793744,
    17098246,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.'
  ),
  createData(
    'Nigeria',
    'NG',
    200962417,
    923768,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.'
  ),
  createData(
    'Brazil',
    'BR',
    210147125,
    8515767,
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas, quasi recusandae magnam quam commodi. Eum delectus et perspiciatis. Totam temporibus aliquid esse deleniti sint, cupiditate beatae fugiat autem doloremque.'
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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
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
                        {column.format && typeof value === 'number' ? column.format(value) : value}
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default ResponsiveTable;
