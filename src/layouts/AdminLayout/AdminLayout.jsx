import {
  Avatar,
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';

import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import style from './AdminLayout.module.css';
import { Link, Outlet } from 'react-router-dom';

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import LogoWebsite from '../../assets/images/Logo.jpg';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PasswordIcon from '@mui/icons-material/Password';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

function DashboardAdminLayout() {
  // const theme = useTheme();
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const handleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const [notificationMenu, setNotificationMenu] = React.useState(false);
  // const openMenu = Boolean(accountMenu);
  const handleClickNotificationMenu = (event) => {
    setNotificationMenu(event.currentTarget);
  };
  const handleCloseNotificationMenu = () => {
    setNotificationMenu(null);
  };

  const [accountMenu, setAccountMenu] = React.useState(false);
  // const openMenu = Boolean(accountMenu);
  const handleClickAccountMenu = (event) => {
    setAccountMenu(event.currentTarget);
  };
  const handleCloseAccountMenu = () => {
    setAccountMenu(null);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={openSidebar} sx={{ backgroundColor: '#ffffff' }}>
        <Toolbar className={`${style['justify-navbar']}`}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleSidebar}
              edge="start"
              sx={{
                marginRight: 1,
                marginLeft: openSidebar ? 'none' : 6,
              }}
              className="color-primary"
            >
              <MenuIcon />
            </IconButton>
            {/* <Typography variant="h6" noWrap component="div">
              Mini variant drawer
            </Typography> */}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Notification Menu */}
            <IconButton
              color="inherit"
              sx={{ marginRight: 2, marginLeft: 2 }}
              onClick={handleClickNotificationMenu}
              className="color-primary"
            >
              <NotificationsNoneOutlinedIcon />
            </IconButton>

            <Menu
              anchorEl={notificationMenu}
              open={notificationMenu}
              onClose={handleCloseNotificationMenu}
              // onClick={handleCloseNotificationMenu}
              PaperProps={{
                // elevation: 0,
                sx: {
                  width: '100vw',
                  minWidth: '360px',
                  maxWidth: '400px',
                  height: '100%',
                  mt: 4.2,
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                },
              }}
              className={`${style['center-notif']}`}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
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
                <IconButton sx={{ justifyContent: 'right' }} onClick={handleClickAccountMenu}>
                  <MoreVertOutlinedIcon className="color-primary" />
                </IconButton>
              </div>
              <MenuItem
                onClick={handleCloseNotificationMenu}
                style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>Pesanan #281931290 menunggu persetujuan</div>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Nama Pengguna </span>
                    melakukan pemesanan dengan nomer pesanan #32672161276.
                  </div>
                </div>
              </MenuItem>
              <Divider />
            </Menu>

            {/* Account Menu */}
            <IconButton color="inherit" onClick={handleClickAccountMenu} sx={{ padding: 0 }}>
              <Avatar
                alt="Remy Sharp"
                src="https://www.parenting.co.id/img/images/LELA28_shutterstock_800x400.jpg"
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>

            <Menu
              anchorEl={accountMenu}
              open={accountMenu}
              onClose={handleCloseAccountMenu}
              // onClick={handleCloseAccountMenu}
              PaperProps={{
                elevation: 0,
                sx: {
                  minWidth: '280px',
                  maxWidth: '300px',
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
                  marginLeft: '16px',
                  marginRight: '16px',
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="https://www.parenting.co.id/img/images/LELA28_shutterstock_800x400.jpg"
                  sx={{ marginRight: 1.5 }}
                />
                <div style={{ width: 'fit-content' }}>
                  <div style={{ fontWeight: 'bold', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                    Nama Administrator Lorem ipsum dolor sit amet.
                  </div>
                  <div>Role admin : Master</div>
                </div>
              </div>
              <MenuItem onClick={handleCloseAccountMenu}>
                <ListItemIcon>
                  <DashboardOutlinedIcon className="color-primary" />
                </ListItemIcon>
                Dashboard Admin
              </MenuItem>
              <MenuItem onClick={handleCloseAccountMenu}>
                <ListItemIcon>
                  <ManageAccountsIcon className="color-primary" />
                </ListItemIcon>
                Edit Profil
              </MenuItem>
              <MenuItem onClick={handleCloseAccountMenu}>
                <ListItemIcon>
                  <PasswordIcon className="color-primary" />
                </ListItemIcon>
                Ubah Password
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleCloseAccountMenu}>
                <ListItemIcon>
                  <ExitToAppIcon className="color-primary" />
                </ListItemIcon>
                Keluar
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={openSidebar} style={{ zIndex: '10000' }}>
        <DrawerHeader sx={{ border: 'none', display: 'flex', justifyContent: 'center' }}>
          {openSidebar ? (
            <img src={LogoWebsite} alt="Logo" style={{ height: '48px', alignSelf: 'left' }} />
          ) : (
            <img src={LogoWebsite} alt="Logo" style={{ width: '30px' }} />
          )}
        </DrawerHeader>

        <List>
          {[
            { title: 'Dashboard', icon: <DashboardOutlinedIcon />, link: '/dashboard' },
            { title: 'Pesanan', icon: <AddToPhotosOutlinedIcon />, link: '/Pesanan' },
            { title: 'Informasi Bisnis', icon: <StoreMallDirectoryOutlinedIcon />, link: '/InformasiBisnis' },
            { title: 'Event', icon: <LocalActivityOutlinedIcon />, link: '/Event' },
            { title: 'Keuangan', icon: <LocalAtmOutlinedIcon />, link: '/Keuangan' },
            { title: 'Pelanggan', icon: <GroupsOutlinedIcon />, link: '/Pelanggan' },
          ].map((listNavbar, index) => (
            <Link to={listNavbar.link} className="disable-link-style">
              <ListItem key={listNavbar.title} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: openSidebar ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: openSidebar ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                    className="color-primary"
                  >
                    {listNavbar.icon}
                  </ListItemIcon>
                  <ListItemText primary={listNavbar.title} sx={{ opacity: openSidebar ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: openSidebar ? '300px' : '64.2px' }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </>
  );
}

export default DashboardAdminLayout;
