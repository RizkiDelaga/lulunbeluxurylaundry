import React, { Fragment, useState } from 'react';
import './PageStructure.css';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { useNavigate } from 'react-router';

function PageStructure({ defaultMenu, previousPage, currentPage }) {
  const navigate = useNavigate();
  const [structure, setStucture] = useState({
    previousPage: [
      {
        title: '',
        link: '',
      },
    ],
    currentPage: {
      title: '',
      link: '',
    },
  });

  const listMenu = {
    dashboard: {
      title: 'Dashboard',
      link: '/dashboard',
      icon: 'DashboardOutlinedIcon',
    },
    pesanan: {
      title: 'Pesanan',
      link: '/pesanan',
      icon: 'AddToPhotosOutlinedIcon',
    },
  };

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  return (
    <Fragment>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs maxItems={3} aria-label="breadcrumb">
          <Link
            underline="none"
            color="inherit"
            onClick={() => {
              navigate('/galeri');
            }}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <DashboardOutlinedIcon className="color-primary" />
            {listMenu[defaultMenu].title}
          </Link>

          <Link
            underline="none"
            color="inherit"
            onClick={() => {
              navigate('/galeri');
            }}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <DashboardOutlinedIcon className="color-primary" />
            {listMenu[defaultMenu].title}
          </Link>

          <Typography color="text.primary">{currentPage.title}</Typography>
        </Breadcrumbs>
      </div>
    </Fragment>
  );
}

export default PageStructure;
