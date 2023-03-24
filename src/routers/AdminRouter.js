import { Route, Routes } from 'react-router';
import DashboardAdminLayout from '../layouts/DashboardAdminLayout/DashboardAdminLayout';

function AdminRouter() {
  return (
        <Routes>
          <Route path="dashboard" element={<DashboardAdminLayout />} />
        </Routes>
  );
}

export default AdminRouter;
