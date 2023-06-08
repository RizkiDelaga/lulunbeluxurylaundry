import { IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

import ListItemIcon from '@mui/material/ListItemIcon';
import style from './SidebarAdmin.module.css';
import { Link, useNavigate } from 'react-router-dom';

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import LogoWebsite from '../../../assets/images/Logo.jpg';

import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { getGeneralInformation } from '../../../redux/actions/getBusinessInformationAction';

const drawerWidth = 300;

const openedMixin = (theme) => ({
  [theme.breakpoints.down('md')]: {
    width: '100vw',
  },
  [theme.breakpoints.up('md')]: {
    width: drawerWidth,
  },
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  zIndex: 10000,
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  zIndex: 10000,
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.down('md')]: {
    display: 'none',
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

function SidebarAdmin(props) {
  const navigate = useNavigate();
  const theme = useTheme();

  const dispatch = useDispatch();
  const { isLoading: loadingGetGeneralInformation, data: dataGetGeneralInformation } = useSelector(
    (state) => state.getGeneralInformation
  );

  React.useEffect(() => {
    document.title = 'Tentang Kami';
    dispatchGetGeneralInformation();
  }, [sessionStorage.getItem('business_information')]);

  const dispatchGetGeneralInformation = async () => {
    return await dispatch(getGeneralInformation());
  };

  return (
    <>
      <Drawer variant="permanent" open={props.openSidebar}>
        <DrawerHeader sx={{ border: 'none', display: 'flex', justifyContent: 'center' }}>
          {loadingGetGeneralInformation ? null : props.openSidebar ? (
            <img src={dataGetGeneralInformation.logo} alt="Logo" style={{ height: '48px', alignSelf: 'left' }} />
          ) : (
            <img src={dataGetGeneralInformation.logo} alt="Logo" style={{ width: '30px' }} />
          )}
          <IconButton
            onClick={props.handleSidebar}
            // edge="start"
            sx={{
              position: 'absolute',
              right: 0,
              marginRight: 1,
              [theme.breakpoints.up('md')]: {
                display: 'none',
              },
              // marginLeft: openSidebar ? 'none' : 6,
            }}
            className="color-primary"
          >
            <CloseIcon />
          </IconButton>
        </DrawerHeader>

        <List>
          {[
            { title: 'Dashboard', icon: <DashboardOutlinedIcon />, link: '/Dashboard' },
            { title: 'Pesanan', icon: <AddToPhotosOutlinedIcon />, link: '/Pesanan' },
            { title: 'Informasi Bisnis', icon: <StoreMallDirectoryOutlinedIcon />, link: '/InformasiBisnis' },
            { title: 'Event', icon: <LocalActivityOutlinedIcon />, link: '/Event' },
            { title: 'Keuangan', icon: <LocalAtmOutlinedIcon />, link: '/Keuangan' },
            { title: 'Pelanggan', icon: <GroupsOutlinedIcon />, link: '/Pelanggan' },
          ].map((listNavbar, index) => (
            <Link
              to={listNavbar.link}
              className="disable-link-style"
              onClick={window.innerWidth <= 900 ? props.handleSidebar : null}
            >
              <ListItem key={listNavbar.title} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: props.openSidebar ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: props.openSidebar ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                    className="color-primary"
                  >
                    {listNavbar.icon}
                  </ListItemIcon>
                  <ListItemText primary={listNavbar.title} sx={{ opacity: props.openSidebar ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default SidebarAdmin;
