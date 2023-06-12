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
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { getExample } from '../../../redux/actions/exampleAction';
import MuiToggleButton from '@mui/material/ToggleButton';
import { getProfileAccountAdmin } from '../../../redux/actions/getProfileAccount';
import { getNotificationAdmin } from '../../../redux/actions/getNotificationAction';
import axios from 'axios';

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
const MobileNotificationDialog = ({ openNotifDialog, handleClose, loadingData, data, handleCloseNotificationMenu }) => {
  const theme = useTheme();
  const fullScreenDialog = useMediaQuery(theme.breakpoints.up('xs'));

  const [isVisible, setIsVisible] = useState(true);
  const topDialog = useRef(null);
  const executeScroll = () => topDialog.current.scrollIntoView();

  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     console.log('hi', 200);
  //     setIsVisible(document.scrollY >= 200);
  //   });
  // }, []);

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
            <MenuIcon color="primary" />
          </IconButton>
        </DialogTitle>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        <NotificationList
          loadingData={loadingData}
          data={data}
          handleCloseNotificationMenu={handleCloseNotificationMenu}
        />
      </div>

      {/* Button Up */}
      <Button
        color="primary"
        variant="contained"
        id="myBtn"
        style={{
          display: isVisible ? 'block' : 'none',
          position: 'fixed',
          bottom: '50px',
          left: '50%',
          transform: 'translate(-50%, 0)',
          zIndex: '1',
          borderRadius: '24px',
        }}
        onClick={() => {
          executeScroll();
        }}
      >
        Lihat Notifikasi Teratas
      </Button>
    </Dialog>
  );
};

const NotificationList = ({ loadingData, data, notificationStatus, handleUpdateReadNotification }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = 'Buat Pesanan Baru';
  }, []);

  return (
    <div style={{ height: '100%' }}>
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
                      handleUpdateReadNotification(item.id);
                      // navigate(`/Pesanan/${item.id}`);
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
                      <div style={{ fontSize: '12px', textAlign: 'right' }}>{`${item.updatedAt.slice(
                        8,
                        10
                      )}/${item.updatedAt.slice(5, 7)}/${item.updatedAt.slice(0, 4)} ${item.updatedAt.slice(
                        11,
                        16
                      )}`}</div>
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

  const dispatch = useDispatch();
  const { isLoading: loadingGetNotificationAdmin, data: dataGetNotificationAdmin } = useSelector(
    (state) => state.getNotificationAdmin
  );
  const { isLoading: loadingGetProfileAccountAdmin, data: dataGetProfileAccountAdmin } = useSelector(
    (state) => state.getProfileAccountAdmin
  );

  React.useEffect(() => {
    dispatchGetNotificationAdmin();
    dispatchGetProfileAccountAdmin();
  }, []);

  const dispatchGetNotificationAdmin = async () => {
    return await dispatch(getNotificationAdmin());
  };

  const dispatchGetProfileAccountAdmin = async () => {
    return await dispatch(getProfileAccountAdmin());
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
      console.log('Response GET Data Service Type');
      console.log(res);
      dispatchGetNotificationAdmin();
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
              <Badge
                color="primary"
                badgeContent={
                  loadingGetNotificationAdmin
                    ? null
                    : dataGetNotificationAdmin.filter((item) => item.dibacaAdmin === false).length
                }
                max={999}
              >
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </IconButton>

            {/* Notification display for mobile size */}
            {loadingGetNotificationAdmin ? null : (
              <MobileNotificationDialog
                handleClose={() => {
                  setOpenNotification(!openNotification);
                }}
                openNotifDialog={openNotification}
                loadingData={loadingGetNotificationAdmin}
                data={dataGetNotificationAdmin}
                handleCloseNotificationMenu={handleCloseNotificationMenu}
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
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginLeft: '16px',
                  marginRight: '6px',
                }}
              >
                <h3 style={{ margin: 0 }}>Notifikasi</h3>
                <IconButton
                  sx={{ justifyContent: 'right' }}
                  onClick={(event) => {
                    setOpenMyAccount(event.currentTarget);
                  }}
                >
                  <MoreVertOutlinedIcon className="color-primary" />
                </IconButton>
              </div>

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
                loadingData={loadingGetNotificationAdmin}
                data={dataGetNotificationAdmin}
                handleCloseNotificationMenu={handleCloseNotificationMenu}
              />
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
              {/* {loadingGetProfileAccountAdmin ? null : ( */}
              <div
                style={{
                  display: 'flex',
                  // justifyContent: 'space-between',
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
              {/* )} */}

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
                  localStorage.removeItem('admin_name');
                  localStorage.removeItem('admin_profile_picture');
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
