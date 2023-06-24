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
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditOffIcon from '@mui/icons-material/EditOff';

function RowItem(props) {
  const theme = useTheme();
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

        {!props.detailPrice ? null : (
          <>
            <TableCell>
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(props.item.harga)}
            </TableCell>
            <TableCell>
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(props.item.jumlah)}
            </TableCell>
          </>
        )}

        {props.readOnly ? null : (
          <TableCell>
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
                [theme.breakpoints.down('md')]: {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                },
              }}
            >
              <Button
                variant="outlined"
                className={`button-outlined-primary`}
                onClick={() => {
                  if (props.stateValue.id !== props.item.id) {
                    props.handleState({
                      id: props.item.id,
                      itemName: props.item.namaBarang,
                      quantity: props.item.kuantitas,
                      pricePerUnit: props.item.harga,
                      laundryType: props.item.jenisLaundry,
                      notation: props.item.catatan,
                      photo: { img: null, fileName: props.item.gambar },
                    });
                  } else {
                    props.handleState({
                      id: null,
                      itemName: '',
                      quantity: null,
                      pricePerUnit: null,
                      laundryType: null,
                      notation: '',
                      photo: { img: null, fileName: null },
                    });
                  }
                }}
              >
                {props.stateValue.id === props.item.id ? <EditOffIcon /> : <EditIcon />}
              </Button>
              <Button
                variant="outlined"
                className={`button-outlined-danger`}
                onClick={() => props.deleteLaundryItem(props.item.id)}
                sx={{ width: '100%' }}
              >
                <DeleteForeverIcon />
              </Button>
            </Box>
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
                  <strong>Catatan : </strong>
                  {props.item.catatan ? props.item.catatan : ' -'}
                </Grid>
                <Grid item xs={6}>
                  <strong>Foto : </strong>
                  {props.item.gambar ? (
                    <>
                      <a href={props.item.gambar} target="_blank" rel="noreferrer" style={{ wordWrap: 'break-word' }}>
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

function LaundryItemTable({
  detailPrice,
  readOnly,
  listLaundryItem,
  discount,
  deleteLaundryItem,
  stateValue,
  handleState,
  cellColor,
}) {
  const theme = useTheme();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
              {!detailPrice ? null : (
                <TableRow>
                  <TableCell colSpan={1} sx={{ backgroundColor: cellColor }} />
                  <TableCell align="center" colSpan={3} sx={{ fontWeight: 'bold', backgroundColor: cellColor }}>
                    Details
                  </TableCell>
                  <TableCell align="center" colSpan={2} sx={{ fontWeight: 'bold', backgroundColor: cellColor }}>
                    Price
                  </TableCell>
                  {readOnly ? null : <TableCell colSpan={1} sx={{ backgroundColor: cellColor }} />}
                </TableRow>
              )}

              <TableRow>
                {headCells
                  .filter((item) => (readOnly ? (item.id === 'action' ? false : true) : true))
                  .map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      sortDirection={orderBy === headCell.id ? order : false}
                      sx={{
                        width: headCell.id !== 'collapse' && headCell.id !== 'action' ? null : 0,
                        backgroundColor: cellColor,
                        display: !detailPrice
                          ? headCell.id === 'harga' || headCell.id === 'jumlah'
                            ? 'none'
                            : null
                          : null,
                      }}
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
                return (
                  <RowItem
                    key={item.id}
                    item={item}
                    detailPrice={detailPrice}
                    readOnly={readOnly}
                    deleteLaundryItem={deleteLaundryItem}
                    stateValue={stateValue}
                    handleState={handleState}
                  />
                );
              })}
              {!detailPrice ? null : (
                <>
                  <TableRow>
                    <TableCell rowSpan={3} colSpan={4} sx={{ border: 'none', backgroundColor: cellColor }} />
                    <TableCell align="left" colSpan={1} sx={{ backgroundColor: cellColor }}>
                      Diskon
                    </TableCell>
                    <TableCell align="left" colSpan={1} sx={{ backgroundColor: cellColor }}>
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(discount)}
                    </TableCell>
                    {readOnly ? null : (
                      <TableCell rowSpan={3} colSpan={1} sx={{ border: 'none', backgroundColor: cellColor }} />
                    )}
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" colSpan={1} sx={{ backgroundColor: cellColor }}>
                      Sub Total
                    </TableCell>
                    <TableCell align="left" colSpan={1} sx={{ backgroundColor: cellColor }}>
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                        listLaundryItem.reduce((sum, cur) => sum + cur.jumlah, 0)
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" colSpan={1} sx={{ backgroundColor: cellColor }}>
                      Total Pembayaran
                    </TableCell>
                    <TableCell align="left" colSpan={1} sx={{ backgroundColor: cellColor }}>
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                        listLaundryItem.reduce((sum, cur) => sum + cur.jumlah, 0) - discount
                      )}
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default LaundryItemTable;
