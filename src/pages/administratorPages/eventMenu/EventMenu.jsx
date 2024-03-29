import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Chip, Collapse, Grid, Menu, MenuItem, Paper, Select, TextField, useTheme } from '@mui/material';

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
import { getComparator, stableSort } from '../../../utils/tableUtils';
import { adjustTimePlus } from '../../../utils/timeUtils';

function RowItem(props) {
  const navigate = useNavigate();
  const [openTableCell, setOpenTableCell] = React.useState(false);

  const dateStart = new Date(props.item.tglMulai);
  const dateEnd = new Date(props.item.tglSelesai);

  const handleUpdateEventStatus = async (eventId) => {
    try {
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/acara/update-status/${eventId}`,
      });

      props.setLoadEvent(props.loadEvent + 1);
    } catch (error) {}
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const res = await axios({
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/acara/${eventId}`,
      });

      props.setLoadEvent(props.loadEvent + 1);
    } catch (error) {}
  };

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
        <TableCell>#{props.item.id}</TableCell>
        <TableCell>
          <img src={props.item.gambar} height={60} style={{ objectFit: 'contain' }} alt="" />
        </TableCell>
        <TableCell>{props.item.nama} </TableCell>

        <TableCell>
          {` ${props.item.tglMulai.slice(8, 10)}/${props.item.tglMulai.slice(5, 7)}/${props.item.tglMulai.slice(
            0,
            4
          )} ${('0' + adjustTimePlus(parseInt(props.item.tglMulai.slice(11, 13)))).slice(
            -2
          )}:${props.item.tglMulai.slice(14, 16)}`}
        </TableCell>
        <TableCell>
          {` ${props.item.tglSelesai.slice(8, 10)}/${props.item.tglSelesai.slice(5, 7)}/${props.item.tglSelesai.slice(
            0,
            4
          )} ${('0' + adjustTimePlus(parseInt(props.item.tglSelesai.slice(11, 13)))).slice(
            -2
          )}:${props.item.tglSelesai.slice(14, 16)}`}
        </TableCell>

        <TableCell>{props.item.status}</TableCell>

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
              navigate(`/Event/EditEvent/${props.item.id}`);
              handleCloseAction();
            }}
          >
            Edit Event
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleUpdateEventStatus(props.item.id);
              handleCloseAction();
            }}
          >
            {props.item.status === 'Nonaktif' ? 'Aktifkan Event' : 'Nonaktifkan Event'}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleDeleteEvent(props.item.id);
              handleCloseAction();
            }}
          >
            Hapus Event
          </MenuItem>
        </Menu>
      </TableRow>

      {/* Collapse Table */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={openTableCell} timeout="auto" unmountOnExit>
            <Box sx={{ px: 2, py: 1 }}>
              <div style={{ marginBottom: '16px' }}>
                <h6>Detail Event</h6>
              </div>

              <Grid container>
                <Grid item xs={4}>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Deskripsi : </strong>
                  </div>
                  {props.item.deskripsi}
                </Grid>
                <Grid item xs={4}>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Reward / Benefit : </strong>
                  </div>
                  <ol>{!props.item.reward ? null : props.item.reward.map((item) => <li>{item}</li>)}</ol>
                </Grid>
                <Grid item xs={4}>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Kriteria : </strong>
                  </div>
                  <ol>{!props.item.kriteria ? null : props.item.kriteria.map((item) => <li>{item}</li>)}</ol>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function EventTable({ statusType, loadEvent, setLoadEvent }) {
  const theme = useTheme();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  React.useEffect(() => {
    handleGetEvent();
  }, [loadEvent]);

  const [listEvent, setListEvent] = React.useState([]);

  // Handle API Get All Data Finance
  const handleGetEvent = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/acara/search${
          statusType === 'Aktif' ? '/active' : statusType === 'Akan Datang' ? '/coming-soon' : '/done'
        }`,
      });

      setListEvent(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setListEvent([]);
      }
    }
  };

  const headCells = [
    {
      id: 'collapse',
      label: '',
    },
    {
      id: 'id',
      label: 'No Event',
    },
    {
      id: 'gambar',
      label: 'Foto',
    },
    {
      id: 'nama',
      label: 'Nama Event',
    },
    {
      id: 'tglMulai',
      label: 'Tanggal Mulai',
    },
    {
      id: 'tglSelesai',
      label: 'Tanggal Selesai',
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
            Daftar Event {statusType}
          </Typography>
          <IconButton
            onClick={() => {
              handleGetEvent();
            }}
          >
            <RefreshIcon color="primary" />
          </IconButton>
        </span>
      </Toolbar>

      {/* Table Section */}
      <TableContainer sx={{ maxHeight: 800 }}>
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
            {stableSort(listEvent, getComparator(order, orderBy)).map((item, index) => {
              return <RowItem key={item.id} item={item} loadEvent={loadEvent} setLoadEvent={setLoadEvent} />;
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
          display: listEvent.length ? 'none' : null,
        }}
      >
        <h5>Data tidak ditemukan!</h5>
      </Box>
    </>
  );
}

function EventMenu() {
  const navigate = useNavigate();
  const [loadEvent, setLoadEvent] = useState(0);

  React.useEffect(() => {
    document.title = 'Menu Event';
  }, [loadEvent]);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Event"
          directButton={[
            {
              color: 'primary',
              iconType: 'add',
              value: 'Buat Event Baru',
              link: '/Event/BuatEventBaru',
            },
          ]}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <EventTable statusType={'Aktif'} loadEvent={loadEvent} setLoadEvent={setLoadEvent} />
        </Paper>

        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <EventTable statusType={'Akan Datang'} loadEvent={loadEvent} setLoadEvent={setLoadEvent} />
        </Paper>

        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <EventTable statusType={'Selesai & Nonaktif'} loadEvent={loadEvent} setLoadEvent={setLoadEvent} />
        </Paper>
      </div>
    </>
  );
}

export default EventMenu;
