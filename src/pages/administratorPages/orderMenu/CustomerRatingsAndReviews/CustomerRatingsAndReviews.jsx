import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Collapse,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Select,
  TextField,
  useTheme,
} from '@mui/material';

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
import { getComparator, stableSort } from '../../../../utils/tableUtils';
import RatingComponent from '../../../../components/Ratings/RatingComponent';
import { adjustTimePlus } from '../../../../utils/timeUtils';

function RowItem(props) {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <TableRow hover>
        <TableCell>
          <span onClick={() => navigate(`/Pesanan/${props.item.nomorPesanan}`)}>#{props.item.id}</span>
        </TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Avatar src={props.item.User.profilePic} />
            <div>
              {props.item.User.nama}
              <div style={{ fontSize: '12px' }}>
                {props.item.User.noTelp}
                {props.item.User.email ? ' || ' + props.item.User.email : null}
              </div>
            </div>
          </Box>
        </TableCell>
        <TableCell>
          <RatingComponent readOnly={true} ratingValue={props.item.rating} />
          pada
          {` ${props.item.createdAt.slice(8, 10)}/${props.item.createdAt.slice(5, 7)}/${props.item.createdAt.slice(
            0,
            4
          )} ${('0' + adjustTimePlus(parseInt(props.item.createdAt.slice(11, 13)))).slice(
            -2
          )}:${props.item.createdAt.slice(14, 16)}`}
        </TableCell>
        <TableCell>{props.item.review}</TableCell>
        <TableCell>
          <img src={props.item.gambar} height={60} alt="" />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function RatingReviewTable() {
  const theme = useTheme();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  React.useEffect(() => {
    handleGetOrder();
  }, []);

  const [listReview, setListReview] = React.useState([]);
  const [pageConfig, setPageConfig] = React.useState({
    currentPage: 1,
    dataPerPage: 10,
    metadata: null,
  });

  // Handle API Get All Data Rating
  const handleGetOrder = async (changePage, maxDataPerPage) => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/review?page=${
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

      setListReview(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setListReview([]);
      }
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

  const headCells = [
    {
      id: 'nomorPesanan',
      label: 'No Pesanan',
    },
    {
      id: 'nama',
      label: 'Pelanggan',
    },
    {
      id: 'rating',
      label: 'Rating',
    },
    {
      id: 'review',
      label: 'Review',
    },
    {
      id: 'gambar',
      label: 'Foto',
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
            Daftar Rating dan Review
          </Typography>
          <IconButton
            onClick={() => {
              handleGetOrder();
            }}
          >
            <RefreshIcon color="primary" />
          </IconButton>
        </span>
      </Toolbar>

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
            {stableSort(listReview, getComparator(order, orderBy)).map((item, index) => {
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
          display: listReview.length ? 'none' : null,
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
        {pageConfig.metadata === null ? null : (
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
                              handleGetOrder(index + 1);
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
                              handleGetOrder(1, item);
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
                  onClick={() => handleGetOrder('prev')}
                  disabled={pageConfig.currentPage === 1}
                  sx={{ color: '#1F305C' }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleGetOrder('next')}
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

function CustomerRatingsAndReviews() {
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = 'Rating & Review Pelanggan';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Pesanan"
          currentPage={{
            title: 'Rating dan Review',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <RatingReviewTable />
        </Paper>
      </div>
    </>
  );
}

export default CustomerRatingsAndReviews;
