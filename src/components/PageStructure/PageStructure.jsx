import React, { Fragment, useState } from 'react';
import './PageStructure.css';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { useNavigate } from 'react-router';
import ResponsiveTable from '../Table/ResponsiveTable';
import EnhancedTable from '../Table/EnhancedTable';
import { useDispatch, useSelector } from 'react-redux';
import { getExample } from '../../redux/actions/exampleAction';

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

  const [dataTable, setDataTable] = useState([
    {
      name: '',
      code: 0,
      population: 0,
      size: 0,
      description: '',
      elementHTML: 0,
    },
  ]);
  const dispatch = useDispatch();
  const { isLoading: loadingGetExample, data: dataGetExample } = useSelector((state) => state.getExample);

  React.useEffect(() => {
    dispatchGetExample();
    if (!loadingGetExample) {
      saveData(dataGetExample);
    }
  }, [loadingGetExample]);

  const dispatchGetExample = async () => {
    return await dispatch(getExample());
  };

  const saveData = (data) => {
    // data.map(() => {
    setDataTable(
      data.map((item) => ({
        name: item.title,
        code: parseInt(item.id),
        population: parseInt(item.price),
        size: parseInt(item.price * item.id),
        description: item.deskripsi,
        elementHTML: 9,
      }))
    );
    // });
  };

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

      {loadingGetExample ? null : dataTable.length > 1 ? console.log(dataTable) : null}
      {loadingGetExample ? null : dataTable.length > 1 ? <EnhancedTable dataTable={dataTable} /> : null}
      {/* <EnhancedTable /> */}

      <ResponsiveTable />
    </Fragment>
  );
}

export default PageStructure;
