import { Box, Button, Chip, Collapse, Grid, Menu, MenuItem, Select, TextField, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

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
import { getComparator, stableSort } from '../../utils/tableUtils';

function RowItem(props) {
  const [openTableCell, setOpenTableCell] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow hover>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpenTableCell(!openTableCell)}>
            {openTableCell ? <ExpandLessIcon color="primary" /> : <ExpandMoreIcon color="primary" />}
          </IconButton>
        </TableCell>
        <TableCell>{props.item.namaBarang}</TableCell>
        <TableCell>{props.item.jenisLaundry}</TableCell>
        <TableCell>{props.item.kuantitas}</TableCell>

        <TableCell>
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(props.item.harga)}
        </TableCell>
        <TableCell>
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(props.item.jumlah)}
        </TableCell>

        {props.readOnly ? null : (
          <TableCell>
            <IconButton size="small" onClick={() => props.deleteLaundryItem(props.item.id)}>
              <MoreVertIcon color="primary" />
            </IconButton>
          </TableCell>
        )}
      </TableRow>

      {/* Collapse Table */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={props.readOnly ? 6 : 7}>
          <Collapse in={openTableCell} timeout="auto" unmountOnExit>
            <Box sx={{ px: 2, py: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {props.item.catatan}
                </Grid>
                <Grid item xs={6}>
                  <strong>Foto Bukti : </strong>
                  {props.item.gambar ? (
                    <>
                      <a href={props.item.gambar} target="_blank" rel="noreferrer">
                        {props.item.gambar}
                      </a>
                    </>
                  ) : (
                    ' -'
                  )}
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function LaundryItemTable({ readOnly, listLaundryItem, discount, deleteLaundryItem }) {
  const theme = useTheme();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  React.useEffect(() => {
    // handleGetLaundryItem();
  }, []);

  const headCells = [
    {
      id: 'collapse',
      label: '',
    },
    {
      id: 'namaBarang',
      label: 'Nama Barang',
    },
    {
      id: 'jenisLaundry',
      label: 'Jenis Laundry',
    },
    {
      id: 'kuantitas',
      label: 'Kuantitas',
    },
    {
      id: 'harga',
      label: 'Harga per Unit',
    },
    {
      id: 'jumlah',
      label: 'Jumlah',
    },
    {
      id: 'action',
      label: '',
    },
  ];

  return (
    <>
      {/* Table Section */}
      {listLaundryItem.length === 0 ? null : (
        <TableContainer>
          <Table stickyHeader sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            {/* Table Header */}
            <TableHead>
              <TableRow>
                <TableCell colSpan={1} />
                <TableCell align="center" colSpan={3} sx={{ fontWeight: 'bold' }}>
                  Details
                </TableCell>
                <TableCell align="center" colSpan={2} sx={{ fontWeight: 'bold' }}>
                  Price
                </TableCell>
                {readOnly ? null : <TableCell colSpan={1} />}
              </TableRow>
              <TableRow>
                {headCells
                  .filter((item) => (readOnly ? (item.id === 'action' ? false : true) : true))
                  .map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      sortDirection={orderBy === headCell.id ? order : false}
                      // sx={{ paddingY: 1 }}
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
              {stableSort(listLaundryItem, getComparator(order, orderBy)).map((item, index) => {
                return <RowItem key={item.id} item={item} readOnly={readOnly} deleteLaundryItem={deleteLaundryItem} />;
              })}
              <TableRow>
                <TableCell rowSpan={2} colSpan={4} sx={{ border: 'none' }} />
                <TableCell align="left" colSpan={1}>
                  Diskon
                </TableCell>
                <TableCell align="right" colSpan={1}>
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(discount)}
                </TableCell>
                {readOnly ? null : <TableCell rowSpan={2} colSpan={1} sx={{ border: 'none' }} />}
              </TableRow>
              <TableRow>
                <TableCell align="left" colSpan={1}>
                  Total
                </TableCell>
                <TableCell align="right" colSpan={1}>
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                    listLaundryItem.reduce((sum, cur) => sum + cur.jumlah, 0)
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default LaundryItemTable;
