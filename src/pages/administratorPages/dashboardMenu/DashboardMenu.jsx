import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Box, Button, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getExample } from '../../../redux/actions/exampleAction';
import EnhancedTable from '../../../components/Table/EnhancedTable';
import ResponsiveTable from '../../../components/Table/ResponsiveTable';

function DashboardMenu() {
  const navigate = useNavigate();

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
    document.title = 'Menu Dashboard';
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
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Dashboard"
          directButton={[
            {
              color: 'primary',
              iconType: 'add',
              value: 'Registrasi administrator baru',
              link: '/Dashboard/RegistrasiAdministratorBaru',
            },
          ]}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            {/* {loadingGetExample ? null : dataTable.length > 1 ? console.log(dataTable) : null}
            {loadingGetExample ? null : dataTable.length > 1 ? <EnhancedTable dataTable={dataTable} /> : null} */}
            <EnhancedTable />
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <ResponsiveTable />
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default DashboardMenu;
