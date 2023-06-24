import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ToggleButtonGroup,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import style from './NavbarAdmin.module.css';
import { useNavigate } from 'react-router-dom';

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PasswordIcon from '@mui/icons-material/Password';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import MuiToggleButton from '@mui/material/ToggleButton';
import { getProfileAccountAdmin } from '../../../redux/actions/getProfileAccount';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { adjustTimePlus } from '../../../utils/timeUtils';

const drawerWidth = 300;

// Navbar configuration
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  height: '64px',
  justifyContent: 'center',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Notification Popup for mobile version
const MobileNotificationDialog = ({
  openNotifDialog,
  handleClose,
  loadingData,
  data,
  handleCloseNotificationMenu,
  handleUpdateReadNotification,
  pageConfig,
  handleGetNotification,
}) => {
  const theme = useTheme();
  const fullScreenDialog = useMediaQuery(theme.breakpoints.up('xs'));

  const topDialog = useRef(null);
  const [notificationStatus, setNotificationStatus] = React.useState('All');

  const ToggleButton = styled(MuiToggleButton)({
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: '#1F305C',
    },
  });

  return (
    <Dialog
      fullScreen={fullScreenDialog}
      onClose={handleClose}
      open={openNotifDialog}
      sx={{
        zIndex: '10000',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      }}
    >
      <div ref={topDialog} id="asd">
        <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          Notifikasi
          <IconButton onClick={handleClose}>
            <CloseIcon color="primary" />
          </IconButton>
        </DialogTitle>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginLeft: '16px',
            marginRight: '16px',
          }}
        >
          <ToggleButtonGroup
            value={notificationStatus}
            color="primary"
            exclusive
            onChange={(event, value) => {
              if (value) {
                setNotificationStatus(value);
              }
            }}
            sx={{
              width: '100% !important',
              [theme.breakpoints.down('sm')]: {
                height: '35px !important',
              },
            }}
          >
            <ToggleButton
              value="All"
              sx={{
                width: '100%',
                border: '1px solid #1F305C',
                fontWeight: 'bold',
                color: notificationStatus === 'All' ? '#ffffff !important' : '#1F305C',
              }}
            >
              Semua
            </ToggleButton>
            <ToggleButton
              value="Unread"
              sx={{
                width: '100%',

                border: '1px solid #1F305C',
                fontWeight: 'bold',
                color: notificationStatus === 'Unread' ? '#ffffff !important' : '#1F305C',
              }}
            >
              Belum Dibaca
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <NotificationList
          handleUpdateReadNotification={handleUpdateReadNotification}
          notificationStatus={notificationStatus}
          loadingData={loadingData}
          data={data}
          handleCloseNotificationMenu={handleCloseNotificationMenu}
        />
        <div style={{ margin: '16px' }}>
          {!pageConfig.metadata ? null : pageConfig.currentPage < pageConfig.metadata.totalPage ? (
            <Button variant="contained" onClick={() => handleGetNotification(true)} sx={{ width: '100%' }}>
              Tampilkan Lebih Banyak
            </Button>
          ) : null}
        </div>
      </div>
    </Dialog>
  );
};

const NotificationList = ({ loadingData, data, notificationStatus, handleUpdateReadNotification }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = 'Buat Pesanan Baru';
  }, []);

  return (
    <div>
      {loadingData
        ? null
        : data
            .filter((element) => (notificationStatus !== 'All' ? element.dibacaAdmin === false : true))
            .map((item, index) => {
              const parseItem = JSON.parse(item.pesan);
              return (
                <span key={item.id}>
                  <MenuItem
                    onClick={() => {
                      if (!item.dibacaAdmin) {
                        handleUpdateReadNotification(item.id);
                      }
                    }}
                    className={`${style['list-notification']}`}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <div style={{ fontWeight: 'bold' }}>{parseItem.header}</div>
                      <div style={{ fontSize: '14px' }}>{parseItem.deskripsi}</div>
                      <div style={{ fontSize: '12px', textAlign: 'right' }}>
                        {` ${item.updatedAt.slice(8, 10)}/${item.updatedAt.slice(5, 7)}/${item.updatedAt.slice(
                          0,
                          4
                        )} ${('0' + adjustTimePlus(parseInt(item.updatedAt.slice(11, 13)))).slice(
                          -2
                        )}:${item.updatedAt.slice(14, 16)}`}
                      </div>
                    </div>
                    <div>
                      {!item.dibacaAdmin ? (
                        <div
                          style={{
                            backgroundColor: '#1F305C',
                            borderRadius: '100%',
                            padding: '5px',
                            width: '14px',
                            height: '14px',
                          }}
                        >
                          {' '}
                        </div>
                      ) : null}
                    </div>
                  </MenuItem>
                  <Divider />
                </span>
              );
            })}
    </div>
  );
};

function Navbar(props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [notificationStatus, setNotificationStatus] = React.useState('All');
  const [unreadNotif, setUnreadNotif] = React.useState();
  const [listNotification, setListNotification] = React.useState([]);
  const [pageConfig, setPageConfig] = React.useState({
    currentPage: 1,
    metadata: null,
  });

  const dispatch = useDispatch();
  const { isLoading: loadingGetProfileAccountAdmin, data: dataGetProfileAccountAdmin } = useSelector(
    (state) => state.getProfileAccountAdmin
  );

  React.useEffect(() => {
    dispatchGetProfileAccountAdmin();
    handleGetNotification();
  }, [localStorage.getItem('admin_profile_account')]);

  const dispatchGetProfileAccountAdmin = async () => {
    return await dispatch(getProfileAccountAdmin());
  };

  const handleGetNotification = async (next) => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/notifikasi/all/admin?page=${next ? pageConfig.currentPage + 1 : 1}`,
      });
      setUnreadNotif(res.data.otherData.unreadNotif);
      if (next) {
        setListNotification([...listNotification, ...res.data.data]);
        setPageConfig({ currentPage: pageConfig.currentPage + 1, metadata: res.data.metadata });
      } else {
        setListNotification(res.data.data);
        setPageConfig({ currentPage: pageConfig.currentPage, metadata: res.data.metadata });
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response.data.message);
      console.log(error.response.status);
      if (error.response.status === 401 && error.response.data.message === 'Token Expired') {
        localStorage.removeItem('access_token_admin');
        localStorage.removeItem('admin_profile_account');
        handleCloseAccountMenu('/Admin');
      }
    }
  };

  const handleUpdateReadNotification = async (id) => {
    try {
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/notifikasi/admin/${id}`,
      });
      setListNotification((prevListNotification) => {
        const updatedList = [...prevListNotification];

        updatedList[updatedList.findIndex((element) => element.id === id)] = {
          ...updatedList[updatedList.findIndex((element) => element.id === id)],
          dibacaAdmin: true,
        };
        return updatedList;
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Open Notification Menu
  const [openNotification, setOpenNotification] = React.useState(false);
  const handleCloseNotificationMenu = () => {
    setOpenNotification(null);
  };

  // Open Account Menu
  const [openMyAccount, setOpenMyAccount] = React.useState(false);
  const handleCloseAccountMenu = (linkDirection) => {
    if (linkDirection) {
      navigate(linkDirection);
    }
    setOpenMyAccount(null);
  };

  const ToggleButton = styled(MuiToggleButton)({
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: '#1F305C',
    },
  });

  return (
    <>
      <AppBar position="fixed" open={props.openSidebar} sx={{ backgroundColor: '#ffffff' }}>
        <Toolbar className={`${style['justify-navbar']}`}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={props.handleSidebar}
              edge="start"
              sx={{
                marginRight: 1,
                marginLeft: props.openSidebar ? 'none' : 6,
                [theme.breakpoints.down('md')]: {
                  marginLeft: '0 !important',
                },
              }}
              className="color-primary"
            >
              <MenuIcon />
            </IconButton>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Notification Menu */}
            <IconButton
              color="inherit"
              sx={{ marginRight: 2, marginLeft: 2 }}
              onClick={(event) => {
                setOpenNotification(event.currentTarget);
              }}
              className="color-primary"
            >
              <Badge color="primary" badgeContent={unreadNotif} max={999}>
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </IconButton>

            {/* Notification display for mobile size */}
            {!listNotification ? null : (
              <MobileNotificationDialog
                handleUpdateReadNotification={handleUpdateReadNotification}
                handleClose={() => {
                  setOpenNotification(!openNotification);
                }}
                openNotifDialog={openNotification}
                loadingData={listNotification ? false : true}
                data={listNotification}
                handleCloseNotificationMenu={handleCloseNotificationMenu}
                pageConfig={pageConfig}
                handleGetNotification={handleGetNotification}
              />
            )}

            <Menu
              anchorEl={openNotification}
              open={openNotification}
              onClose={handleCloseNotificationMenu}
              PaperProps={{
                sx: {
                  width: '100vw',
                  minWidth: '360px',
                  maxWidth: '400px',
                  height: '90vh',
                  overflowY: 'scroll',
                  borderRadius: '16px',
                  paddingBottom: '5px',
                  mt: 4.2,
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  [theme.breakpoints.down('md')]: {
                    display: 'none',
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <div
                style={{
                  marginLeft: '16px',
                  marginRight: '6px',
                }}
              >
                <h3 style={{ margin: 0 }}>Notifikasi</h3>
              </div>

              <div
                style={{
                  marginLeft: '16px',
                  marginRight: '16px',
                }}
              >
                <ToggleButtonGroup
                  value={notificationStatus}
                  color="primary"
                  exclusive
                  onChange={(event, value) => {
                    if (value) {
                      setNotificationStatus(value);
                    }
                  }}
                  sx={{
                    width: '100% !important',
                    [theme.breakpoints.down('sm')]: {
                      height: '35px !important',
                    },
                  }}
                >
                  <ToggleButton
                    value="All"
                    sx={{
                      width: '100%',
                      border: '1px solid #1F305C',
                      fontWeight: 'bold',
                      color: notificationStatus === 'All' ? '#ffffff !important' : '#1F305C',
                    }}
                  >
                    Semua
                  </ToggleButton>
                  <ToggleButton
                    value="Unread"
                    sx={{
                      width: '100%',

                      border: '1px solid #1F305C',
                      fontWeight: 'bold',
                      color: notificationStatus === 'Unread' ? '#ffffff !important' : '#1F305C',
                    }}
                  >
                    Belum Dibaca
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>

              <NotificationList
                handleUpdateReadNotification={handleUpdateReadNotification}
                notificationStatus={notificationStatus}
                loadingData={listNotification ? false : true}
                data={listNotification}
                handleCloseNotificationMenu={handleCloseNotificationMenu}
              />
              <div style={{ marginLeft: '16px', marginRight: '16px', marginTop: '16px', marginBottom: '10px' }}>
                {!pageConfig.metadata ? null : pageConfig.currentPage < pageConfig.metadata.totalPage ? (
                  <Button variant="contained" onClick={() => handleGetNotification(true)} sx={{ width: '100%' }}>
                    Tampilkan Lebih Banyak
                  </Button>
                ) : null}
              </div>
            </Menu>

            {/* Account Menu */}
            {loadingGetProfileAccountAdmin ? null : (
              <IconButton
                color="inherit"
                onClick={(event) => {
                  setOpenMyAccount(event.currentTarget);
                }}
                sx={{ padding: 0 }}
              >
                <Avatar src={dataGetProfileAccountAdmin.profilePic} sx={{ width: 32, height: 32 }} />
              </IconButton>
            )}

            <Menu
              anchorEl={openMyAccount}
              open={openMyAccount}
              onClose={() => handleCloseAccountMenu()}
              PaperProps={{
                elevation: 0,
                sx: {
                  minWidth: '280px',
                  maxWidth: '300px',
                  borderRadius: '16px',
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 0.5,
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '16px',
                  marginRight: '16px',
                }}
              >
                <Avatar src={dataGetProfileAccountAdmin.profilePic} sx={{ marginRight: 1.5 }} />
                <div style={{ width: 'fit-content' }}>
                  <div style={{ fontWeight: 'bold', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                    {dataGetProfileAccountAdmin.nama}
                  </div>
                  <div>Role admin : {dataGetProfileAccountAdmin.role}</div>
                </div>
              </div>

              <MenuItem onClick={() => handleCloseAccountMenu('/Dashboard')}>
                <ListItemIcon>
                  <DashboardOutlinedIcon className="color-primary" />
                </ListItemIcon>
                Dashboard Admin
              </MenuItem>
              <MenuItem onClick={() => handleCloseAccountMenu('/Dashboard/EditProfil')}>
                <ListItemIcon>
                  <ManageAccountsIcon className="color-primary" />
                </ListItemIcon>
                Edit Profil
              </MenuItem>
              <MenuItem onClick={() => handleCloseAccountMenu('Dashboard/UbahPassword')}>
                <ListItemIcon>
                  <PasswordIcon className="color-primary" />
                </ListItemIcon>
                Ubah Password
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  localStorage.removeItem('access_token_admin');
                  localStorage.removeItem('admin_profile_account');
                  handleCloseAccountMenu('/Admin');
                }}
              >
                <ListItemIcon>
                  <ExitToAppIcon className="color-primary" />
                </ListItemIcon>
                Keluar
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
