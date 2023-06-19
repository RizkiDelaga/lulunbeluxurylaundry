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

function LaundryItemTable({ orderId }) {
  const theme = useTheme();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  React.useEffect(() => {
    handleGetLaundryItem();
  }, []);

  const [listLaundryItem, setListLaundryItem] = React.useState([]);

  // Handle API Get All Data Finance
  const handleGetLaundryItem = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/barang/user/${orderId}`,
      });

      console.log('Response GET Data Finance');
      console.log(res);
      setListLaundryItem(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setListLaundryItem([]);
      }
      console.log(error);
    }
  };

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
              {stableSort(listLaundryItem, getComparator(order, orderBy)).map((item, index) => {
                return <RowItem key={item.id} item={item} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* 404 Data Not Found Handling */}
      {/* <Box
        sx={{
          mt: 2,
          py: 1,
          px: 2,
          borderRadius: 2,
          backgroundColor: '#eeeeee',
          textAlign: 'center',
          display: listLaundryItem.length ? 'none' : null,
        }}
      >
        <h5>Belum ada Item!</h5>
      </Box> */}
    </>
  );
}

export default LaundryItemTable;
