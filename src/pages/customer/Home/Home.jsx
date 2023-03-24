import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardAdminLayout from '../../../layouts/DashboardAdminLayout/DashboardAdminLayout';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <DashboardAdminLayout />
      <button onClick={() => navigate('/dashboard')}>Navbar & Sidebar Admin</button>
      <h1>sadasd</h1>
    </>
  );
}

export default Home;
