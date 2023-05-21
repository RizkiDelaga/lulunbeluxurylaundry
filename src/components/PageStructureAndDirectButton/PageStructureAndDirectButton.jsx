import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import { useNavigate } from 'react-router';
import { Button, Grid, useTheme } from '@mui/material';

function PageStructureAndDirectButton(props) {
  const theme = useTheme();
  const navigate = useNavigate();

  const listMenu = [
    {
      title: 'Dashboard',
      link: '/Dashboard',
      icon: <DashboardOutlinedIcon className="color-primary" sx={{ mr: 1 }} />,
    },
    {
      title: 'Pesanan',
      link: '/Pesanan',
      icon: <AddToPhotosOutlinedIcon className="color-primary" sx={{ mr: 1 }} />,
    },
    {
      title: 'Informasi Bisnis',
      link: '/InformasiBisnis',
      icon: <StoreMallDirectoryOutlinedIcon className="color-primary" sx={{ mr: 1 }} />,
    },
    {
      title: 'Event',
      link: '/Event',
      icon: <LocalActivityOutlinedIcon className="color-primary" sx={{ mr: 1 }} />,
    },
    {
      title: 'Keuangan',
      link: '/Keuangan',
      icon: <LocalAtmOutlinedIcon className="color-primary" sx={{ mr: 1 }} />,
    },
    {
      title: 'Pelanggan',
      link: '/Pelanggan',
      icon: <GroupsOutlinedIcon className="color-primary" sx={{ mr: 1 }} />,
    },
    {
      title: 'Area Pelanggan',
      link: '/AreaPelanggan',
      icon: <GroupsOutlinedIcon className="color-primary" sx={{ mr: 1 }} />,
    },
  ];
  const mainMenu = listMenu.find((item) => item.title.toLowerCase() === props.defaultMenu.toLowerCase());

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm="6" md="auto" sx={{ display: 'flex', alignItems: 'center' }}>
          {mainMenu.icon}
          <Breadcrumbs maxItems={3} aria-label="breadcrumb">
            {/* Main Menu */}
            <Link
              underline="none"
              color={props.currentPage ? 'inherit' : '#000000DE'}
              onClick={() => (props.currentPage ? navigate(mainMenu.link) : null)}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              {mainMenu.title}
            </Link>

            {/* Previous Page */}
            {props.previousPage
              ? props.previousPage.map((item) => {
                  return (
                    <Link
                      underline="none"
                      color="inherit"
                      onClick={() => {
                        navigate(item.link);
                      }}
                      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    >
                      {item.title}
                    </Link>
                  );
                })
              : null}

            {/* Current Page */}
            {props.currentPage ? <Typography color="text.primary">{props.currentPage.title}</Typography> : null}
          </Breadcrumbs>
        </Grid>

        {/* Direct Button */}
        <Grid item xs={12} sm={6} md style={{ display: 'flex', justifyContent: 'right' }}>
          <div style={{ width: '100%', textAlign: 'right' }}>
            {props.directButton
              ? props.directButton.map((btnItem) => {
                  return (
                    <Button
                      variant="outlined"
                      startIcon={btnItem.iconType.toLowerCase() === 'edit' ? <EditIcon /> : <AddIcon />}
                      className={
                        btnItem.color.toLowerCase() === 'secondary'
                          ? 'button-outlined-danger'
                          : 'button-outlined-primary'
                      }
                      onClick={() => navigate(btnItem.link)}
                      sx={{
                        ml: 2,
                        [theme.breakpoints.down('md')]: {
                          width: '100% !important',
                          mt: 1,
                          ml: '0px !important',
                        },
                      }}
                    >
                      {btnItem.value}
                    </Button>
                  );
                })
              : null}
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default PageStructureAndDirectButton;

// ======== How To Call ========
/* <PageStructureAndDirectButton
  defaultMenu="Dashboard/Pesanan/Informasi Bisnis/Event/Keuangan/Pelanggan"
  previousPage={[
    {
      title: 'Title Name',
      link: '/link',
    },
  ]}
  currentPage={{
    title: 'Title Name',
  }}
  directButton={[
    {
      color: 'secondary (default=primary)',
      iconType: 'edit (default=add)',
      value: 'Button Label',
      link: '/link',
    },
  ]}
/>; */
