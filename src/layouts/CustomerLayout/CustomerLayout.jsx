import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import NavbarCustomer from '../../components/Navbar/NavbarCustomer/NavbarCustomer';
import SidebarCustomer from '../../components/Sidebar/SidebarCustomer/SidebarCustomer';

function CustomerLayout() {
  const navigate = useNavigate();

  const [openSidebar, setOpenSidebar] = React.useState(false);
  const handleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <>
      <CssBaseline />
      <NavbarCustomer openSidebar={openSidebar} handleSidebar={handleSidebar} />

      <SidebarCustomer openSidebar={openSidebar} handleSidebar={handleSidebar} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingTop: `64px`,
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}

export default CustomerLayout;
