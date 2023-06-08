import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
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
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { getExample } from '../../../redux/actions/exampleAction';
import MuiToggleButton from '@mui/material/ToggleButton';
import { NavHashLink } from 'react-router-hash-link';
import { getGeneralInformation } from '../../../redux/actions/getBusinessInformationAction';

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
const MobileNotificationDialog = (props) => {
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
      onClose={props.handleClose}
      open={props.openNotifDialog}
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
          <IconButton onClick={props.handleClose}>
            <MenuIcon color="primary" />
          </IconButton>
        </DialogTitle>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        <NotificationList
          loadingGetExample={props.loadingGetExample}
          dataGetExample={props.dataGetExample}
          handleCloseNotificationMenu={props.handleCloseNotificationMenu}
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

const NotificationList = (props) => {
  const navigate = useNavigate();

  return (
    <div style={{ height: '100%' }}>
      {props.loadingGetExample
        ? null
        : props.dataGetExample.map((data, index) => (
            <span key={data.id}>
              <MenuItem
                onClick={() => {
                  navigate(`Pesanan/${data.id}`);
                  // props.setOpenMyAccount(null);
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
                  <div style={{ fontWeight: 'bold' }}>Pesanan #281931290 menunggu persetujuan</div>
                  <div style={{ fontSize: '14px' }}>
                    <span style={{ fontWeight: 'bold' }}>Nama Pengguna </span>
                    melakukan pemesanan dengan nomer pesanan #32672161276.
                  </div>
                  <div style={{ fontSize: '12px', textAlign: 'right' }}>23/04/2023 15:52</div>
                </div>
                <div>
                  {data.status ? (
                    <Badge style={{ width: '20px' }} color="primary" overlap="circular" badgeContent="" />
                  ) : null}
                </div>
              </MenuItem>
              <Divider />
            </span>
          ))}
    </div>
  );
};

function NavbarCustomer(props) {
  const navigate = useNavigate();
  const theme = useTheme();

  const [notificationStatus, setNotificationStatus] = React.useState('All');

  const dispatch = useDispatch();
  const { isLoading: loadingGetExample, data: dataGetExample } = useSelector((state) => state.getExample);
  const { isLoading: loadingGetGeneralInformation, data: dataGetGeneralInformation } = useSelector(
    (state) => state.getGeneralInformation
  );

  React.useEffect(() => {
    dispatchGetExample();
    dispatchGetGeneralInformation();
  }, []);

  const dispatchGetExample = async () => {
    return await dispatch(getExample());
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
              {/* <Button onClick={handleClickAdditionalMenu}>Dashboard</Button> */}
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
                          // navigate(additionalMenuList.link);
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
                      loadingGetExample ? null : dataGetExample.filter((item) => item.status === true).length
                    }
                    max={999}
                  >
                    <NotificationsNoneOutlinedIcon />
                  </Badge>
                </IconButton>

                {/* Notification display for mobile size */}
                {loadingGetExample ? null : (
                  <MobileNotificationDialog
                    handleClose={() => {
                      setOpenNotification(!openNotification);
                    }}
                    openNotifDialog={openNotification}
                    loadingGetExample={loadingGetExample}
                    dataGetExample={dataGetExample}
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
                    loadingGetExample={loadingGetExample}
                    dataGetExample={dataGetExample}
                    handleCloseNotificationMenu={handleCloseNotificationMenu}
                  />
                </Menu>

                {/* Account Menu */}
                <IconButton
                  color="inherit"
                  onClick={(event) => {
                    setOpenMyAccount(event.currentTarget);
                  }}
                  sx={{ padding: 0 }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="https://www.parenting.co.id/img/images/LELA28_shutterstock_800x400.jpg"
                    sx={{ width: 32, height: 32 }}
                  />
                </IconButton>

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
                      // justifyContent: 'space-between',
                      alignItems: 'center',
                      // marginLeft: '16px',
                      // marginRight: '16px',
                      margin: '8px 16px',
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="https://www.parenting.co.id/img/images/LELA28_shutterstock_800x400.jpg"
                      sx={{ marginRight: 1.5 }}
                    />
                    <div style={{ width: 'fit-content' }}>
                      <div style={{ fontWeight: 'bold', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                        Nama Customer
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
                      localStorage.removeItem('customer_name');
                      localStorage.removeItem('customer_profile_picture');
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
