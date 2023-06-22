import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
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
import style from './NavbarCustomer.module.css';
import { Link, useNavigate } from 'react-router-dom';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PasswordIcon from '@mui/icons-material/Password';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';

import MuiToggleButton from '@mui/material/ToggleButton';
import { NavHashLink } from 'react-router-hash-link';
import { getGeneralInformation } from '../../../redux/actions/getBusinessInformationAction';
import { getProfileAccountCustomer } from '../../../redux/actions/getProfileAccount';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

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
            .filter((element) => (notificationStatus !== 'All' ? element.dibacaUser === false : true))
            .map((item, index) => {
              const parseItem = JSON.parse(item.pesan);
              return (
                <span key={item.id}>
                  <MenuItem
                    onClick={() => {
                      if (!item.dibacaUser) {
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
                      <div style={{ fontSize: '12px', textAlign: 'right' }}>{`${item.updatedAt.slice(
                        8,
                        10
                      )}/${item.updatedAt.slice(5, 7)}/${item.updatedAt.slice(0, 4)} ${item.updatedAt.slice(
                        11,
                        16
                      )}`}</div>
                    </div>
                    <div>
                      {!item.dibacaUser ? (
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

function NavbarCustomer(props) {
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
  const { isLoading: loadingGetGeneralInformation, data: dataGetGeneralInformation } = useSelector(
    (state) => state.getGeneralInformation
  );
  const { isLoading: loadingGetProfileAccountCustomer, data: dataGetProfileAccountCustomer } = useSelector(
    (state) => state.getProfileAccountCustomer
  );

  React.useEffect(() => {
    dispatchGetGeneralInformation();
    dispatchGetProfileAccountCustomer();
    handleGetNotification();
  }, [localStorage.getItem('my_profile_account')]);

  const handleGetNotification = async (next) => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/notifikasi/all/user?page=${next ? pageConfig.currentPage + 1 : 1}`,
      });
      console.log('Response GET Data Service Type');
      console.log(res);
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
    }
  };

  const handleUpdateReadNotification = async (id) => {
    try {
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/notifikasi/user/${id}`,
      });
      console.log('Response GET Data Service Type');
      console.log(res);
      setListNotification((prevListNotification) => {
        const updatedList = [...prevListNotification];

        updatedList[updatedList.findIndex((element) => element.id === id)] = {
          ...updatedList[updatedList.findIndex((element) => element.id === id)],
          dibacaUser: true,
        };
        return updatedList;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const dispatchGetProfileAccountCustomer = async () => {
    return await dispatch(getProfileAccountCustomer());
  };

  const dispatchGetGeneralInformation = async () => {
    return await dispatch(getGeneralInformation());
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

  // Open Additional Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openAdditionalMenu = Boolean(anchorEl);
  const handleClickAdditionalMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAdditionalMenu = () => {
    setAnchorEl(null);
  };

  // Scroll Offset
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -100;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  return (
    <>
      <a href={`https://wa.me/${dataGetGeneralInformation.telegram}`} target="_blank" rel="noreferrer">
        <Fab color="primary" sx={{ position: 'fixed', bottom: '50px', right: '25px' }}>
          <WhatsAppIcon />
        </Fab>
      </a>

      <Helmet>
        {loadingGetGeneralInformation
          ? null
          : <link rel="icon" href={dataGetGeneralInformation.logo} /> || (
              <link rel="apple-touch-icon" href={dataGetGeneralInformation.logo} />
            )}
      </Helmet>
      <AppBar position="fixed" open={props.openSidebar} sx={{ backgroundColor: '#ffffff' }}>
        <Toolbar className={`${style['justify-navbar']}`}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={props.handleSidebar}
              edge="start"
              sx={{
                marginRight: 1,
                [theme.breakpoints.up('md')]: {
                  display: 'none',
                },
              }}
              className="color-primary"
            >
              <MenuIcon />
            </IconButton>

            {!loadingGetGeneralInformation ? <img src={dataGetGeneralInformation.logo} height={40} alt="" /> : null}

            <List
              component="div"
              disablePadding
              sx={{
                display: 'flex',
                gap: 2,
                ml: 2,
                [theme.breakpoints.down('md')]: {
                  display: 'none',
                },
              }}
            >
              {[
                { title: 'Beranda', link: '/' },
                { title: 'Galeri', link: '/Galeri' },
                { title: 'Tentang Kami', link: '/TentangKami' },
              ].map((listMenu, index) => {
                return (
                  <Link to={listMenu.link} className="disable-link-style">
                    <ListItem disablePadding sx={{ width: 'max-content' }}>
                      <ListItemButton sx={{ px: 1 }}>
                        <ListItemText primary={listMenu.title} />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                );
              })}

              <ListItem disablePadding onClick={handleClickAdditionalMenu} sx={{ color: 'black' }}>
                <ListItemButton sx={{ px: 1 }}>
                  <ListItemText primary="Lainnya" />
                </ListItemButton>
              </ListItem>
              <Menu
                anchorEl={anchorEl}
                open={openAdditionalMenu}
                onClose={handleCloseAdditionalMenu}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {[
                  { title: 'Pilihan Laundry', link: '/#PilihanLaundry' },
                  { title: 'Jenis Layanan Kami', link: '/#JenisLayanan' },
                  { title: 'Jam Operasional', link: '/#JamOperasional' },
                  { title: 'Cara Pemesanan', link: '/#CaraPemesanan' },
                  { title: 'Event', link: '/#Event' },
                  { title: 'Testimoni Pelanggan', link: '/#TestimoniPelanggan' },
                  { title: 'Kontak dan Lokasi', link: '/#KontakDanLokasi' },
                ].map((additionalMenuList, index) => {
                  return (
                    <NavHashLink
                      smooth
                      to={additionalMenuList.link}
                      scroll={(el) => scrollWithOffset(el)}
                      className="disable-link-style"
                    >
                      <MenuItem
                        onClick={() => {
                          handleCloseAdditionalMenu();
                        }}
                      >
                        {additionalMenuList.title}
                      </MenuItem>
                    </NavHashLink>
                  );
                })}
              </Menu>
            </List>
            <Button
              variant="contained"
              onClick={() => {
                if (localStorage.getItem('access_token')) {
                  const profileAccount = JSON.parse(localStorage.getItem('my_profile_account'));
                  if (!profileAccount.alamatUser) {
                    alert('Harap input alamat terlebih dahulu!');
                  } else {
                    navigate('/AreaPelanggan/FormulirPemesananLaundry');
                  }
                } else {
                  navigate('/Login');
                }
              }}
              sx={{
                ml: 2,
                [theme.breakpoints.down('md')]: {
                  display: 'none',
                },
              }}
            >
              Pesan sekarang
            </Button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            {localStorage.getItem('access_token') ? (
              <>
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
                      unreadNotif
                      // !listNotification ? null : listNotification.filter((item) => item.dibacaUser === false).length
                    }
                    max={999}
                  >
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
                {loadingGetProfileAccountCustomer ? null : (
                  <IconButton
                    color="inherit"
                    onClick={(event) => {
                      setOpenMyAccount(event.currentTarget);
                    }}
                    sx={{ padding: 0 }}
                  >
                    <Avatar src={dataGetProfileAccountCustomer.profilePic} sx={{ width: 32, height: 32 }} />
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
                      margin: '8px 16px',
                    }}
                  >
                    <Avatar src={dataGetProfileAccountCustomer.profilePic} sx={{ marginRight: 1.5 }} />
                    <div style={{ width: 'fit-content' }}>
                      <div style={{ fontWeight: 'bold', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                        {dataGetProfileAccountCustomer.nama}
                      </div>
                    </div>
                  </div>
                  <MenuItem onClick={() => handleCloseAccountMenu('/AreaPelanggan')}>
                    <ListItemIcon>
                      <AccountBoxIcon className="color-primary" />
                    </ListItemIcon>
                    Area Pelanggan
                  </MenuItem>
                  <MenuItem onClick={() => handleCloseAccountMenu('/AreaPelanggan/EditProfil')}>
                    <ListItemIcon>
                      <ManageAccountsIcon className="color-primary" />
                    </ListItemIcon>
                    Edit Profil
                  </MenuItem>
                  <MenuItem onClick={() => handleCloseAccountMenu('AreaPelanggan/UbahPassword')}>
                    <ListItemIcon>
                      <PasswordIcon className="color-primary" />
                    </ListItemIcon>
                    Ubah Password
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      localStorage.removeItem('access_token');
                      localStorage.removeItem('my_profile_account');
                      handleCloseAccountMenu('/Login');
                    }}
                  >
                    <ListItemIcon>
                      <ExitToAppIcon className="color-primary" />
                    </ListItemIcon>
                    Keluar
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <div style={{ display: 'flex', gap: '16px' }}>
                <Button variant="contained" onClick={() => navigate('/Registrasi')}>
                  Register
                </Button>
                <Button variant="outlined" className="button-outlined-primary" onClick={() => navigate('/Login')}>
                  Login
                </Button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavbarCustomer;
