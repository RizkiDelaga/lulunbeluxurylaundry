import React, { Fragment, useState } from 'react';
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
import ResponsiveTable from '../Table/ResponsiveTable';
import EnhancedTable from '../Table/EnhancedTable';
import { useDispatch, useSelector } from 'react-redux';
import { getExample } from '../../redux/actions/exampleAction';
import { Button, Grid } from '@mui/material';

function PageStructureAndDirectButton(props) {
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
  ];
  const mainMenu = listMenu.find((item) => item.title.toLowerCase() === props.defaultMenu.toLowerCase());

  // const [dataTable, setDataTable] = useState([
  //   {
  //     name: '',
  //     code: 0,
  //     population: 0,
  //     size: 0,
  //     description: '',
  //     elementHTML: 0,
  //   },
  // ]);
  // const dispatch = useDispatch();
  // const { isLoading: loadingGetExample, data: dataGetExample } = useSelector((state) => state.getExample);

  // React.useEffect(() => {
  //   dispatchGetExample();
  //   if (!loadingGetExample) {
  //     saveData(dataGetExample);
  //   }
  // }, [loadingGetExample]);

  // const dispatchGetExample = async () => {
  //   return await dispatch(getExample());
  // };

  // const saveData = (data) => {
  //   // data.map(() => {
  //   setDataTable(
  //     data.map((item) => ({
  //       name: item.title,
  //       code: parseInt(item.id),
  //       population: parseInt(item.price),
  //       size: parseInt(item.price * item.id),
  //       description: item.deskripsi,
  //       elementHTML: 9,
  //     }))
  //   );
  //   // });
  // };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm sx={{ display: 'flex', alignItems: 'center' }}>
          <Breadcrumbs maxItems={3} aria-label="breadcrumb">
            {/* Main Menu */}
            <Link
              underline="none"
              color="inherit"
              onClick={() => {
                console.log(
                  listMenu.find((item, index) => item.title.toLowerCase() === props.defaultMenu.toLowerCase())
                );
                navigate(mainMenu.link);
              }}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              {mainMenu.icon}
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
            <Typography color="text.primary">{props.currentPage.title}</Typography>
          </Breadcrumbs>
        </Grid>
        {props.directButton ? (
          <Grid item xs={12} sm="auto" sx={{ display: 'flex', justifyContent: 'right' }}>
            <Button
              variant="outlined"
              className={props.directButton.secondaryColor ? 'button-outlined-danger' : 'button-outlined-primary'}
              onClick={() => navigate(props.directButton.link)}
            >
              {props.directButton.value}
            </Button>
          </Grid>
        ) : null}
      </Grid>

      {/* {loadingGetExample ? null : dataTable.length > 1 ? console.log(dataTable) : null}
      {loadingGetExample ? null : dataTable.length > 1 ? <EnhancedTable dataTable={dataTable} /> : null} */}
      {/* <EnhancedTable /> */}

      {/* <ResponsiveTable /> */}
    </>
  );
}

export default PageStructureAndDirectButton;
