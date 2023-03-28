import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function CustomerLayout() {
  const navigate = useNavigate();

  return (
    <>
      <Outlet />
    </>
  );
}

export default CustomerLayout;
