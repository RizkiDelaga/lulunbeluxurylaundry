import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/NavbarAdmin/NavbarAdmin';
import SidebarAdmin from '../../components/Sidebar/SidebarAdmin/SidebarAdmin';

function DashboardAdminLayout() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const handleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <>
      <CssBaseline />
      <Navbar openSidebar={openSidebar} handleSidebar={handleSidebar} />

      <SidebarAdmin openSidebar={openSidebar} handleSidebar={handleSidebar} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingTop: `calc(64px + 24px)`,
          paddingX: '24px',
          marginLeft: openSidebar ? '300px' : '64.2px',
          [theme.breakpoints.down('md')]: {
            // paddingTop: `calc(64px + 16px)`,
            paddingX: '8px',
            marginLeft: '0 !important',
          },
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}

export default DashboardAdminLayout;
