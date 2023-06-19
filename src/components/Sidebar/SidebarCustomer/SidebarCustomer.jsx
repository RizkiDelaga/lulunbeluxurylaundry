import { Button, Collapse, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { Link, useNavigate } from 'react-router-dom';
import LogoWebsite from '../../../assets/images/Logo.jpg';

import CloseIcon from '@mui/icons-material/Close';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { NavHashLink } from 'react-router-hash-link';
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

function SidebarCustomer(props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [openListMenu, setOpenListMenu] = React.useState(false);

  // Scroll Offset
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -100;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  const dispatch = useDispatch();
  const { isLoading: loadingGetGeneralInformation, data: dataGetGeneralInformation } = useSelector(
    (state) => state.getGeneralInformation
  );

  React.useEffect(() => {
    dispatchGetGeneralInformation();
  }, []);

  const dispatchGetGeneralInformation = async () => {
    return await dispatch(getGeneralInformation());
  };

  return (
    <>
      <Drawer
        variant="permanent"
        open={props.openSidebar}
        sx={{
          [theme.breakpoints.up('md')]: {
            display: 'none',
          },
        }}
      >
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
            { title: 'Beranda', link: '/' },
            { title: 'Galeri', link: '/Galeri' },
            { title: 'Tentang Kami', link: '/TentangKami' },
          ].map((listMenu, index) => (
            <Link
              to={listMenu.link}
              className="disable-link-style"
              onClick={window.innerWidth <= 900 ? props.handleSidebar : null}
            >
              <ListItem key={listMenu.title} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: props.openSidebar ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemText primary={listMenu.title} sx={{ opacity: props.openSidebar ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={() => setOpenListMenu(!openListMenu)} sx={{ padding: '8px 20px' }}>
              <ListItemText primary="Lainnya" />
              {openListMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openListMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
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
                      onClick={window.innerWidth <= 900 ? props.handleSidebar : null}
                    >
                      <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton sx={{ pl: 6 }}>
                          <ListItemText primary={additionalMenuList.title} />
                        </ListItemButton>
                      </ListItem>
                    </NavHashLink>
                  );
                })}
              </List>
            </Collapse>
          </ListItem>
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
            mx: 2.5,
            [theme.breakpoints.up('md')]: {
              display: 'none',
            },
          }}
        >
          Pesan sekarang
        </Button>
      </Drawer>
    </>
  );
}

export default SidebarCustomer;
