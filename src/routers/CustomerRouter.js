import { Navigate, Route, Routes } from 'react-router';
import { Outlet } from 'react-router-dom';
import CustomerLayout from '../layouts/CustomerLayout/CustomerLayout';
import HomePage from '../pages/customerPages/HomePage/HomePage';
import SidebarCustomer from '../components/Sidebar/SidebarCustomer/SidebarCustomer';
import AboutUs from '../pages/customerPages/AboutUs/AboutUs';
import LoginCustomer from '../pages/customerPages/customerAuth/LoginCustomer/LoginCustomer';
import Gallery from '../pages/customerPages/Gallery/Gallery';
import DigitalReceipt from '../pages/customerPages/DigitalReceipt/DigitalReceipt';
import CustomerArea from '../pages/customerPages/customerArea/CustomerArea';
import RatingAndReview from '../pages/customerPages/customerArea/RatingAndReview/RatingAndReview';

function CustomerRouter() {

  const HandleLoginSuccessfully = () => {
    if (localStorage.getItem("access_token")) {
        return <Navigate to={-1} replace />
    }
    return <CustomerLayout />;
  }

  const ProtectedCustomerRoute = () => {
    if (!localStorage.getItem("access_token")) {
      return <Navigate to="/login" replace />
    }
    return <CustomerLayout />;
  }

  const PublicCustomerRoute = () => {

    return <CustomerLayout />;
    // return <SidebarCustomer />;
  }

  return (
        <Routes>
          {/* Public Route */}
          <Route element={<PublicCustomerRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="galeri" element={<Gallery />} />
            <Route path="TentangKami" element={<AboutUs />} />
            <Route path="StrukPemesanan/:id" element={<DigitalReceipt />} />
          </Route>

          <Route element={<HandleLoginSuccessfully />}>
            <Route path="Registrasi" element={<HomePage />} />
            <Route path="Login" element={<LoginCustomer />} />
            <Route path="AjukanLupaPassword" element={<HomePage />} />
            <Route path="ValidasiAkun" element={<HomePage />} />
            <Route path="UbahPassword" element={<HomePage />} />
          </Route>

          <Route element={<ProtectedCustomerRoute />}>
            <Route path="AreaPelanggan" element={<CustomerArea />} />
            <Route path="AreaPelanggan/EditProfil" element={<HomePage />} />
            <Route path="AreaPelanggan/UbahPassword" element={<HomePage />} />
            <Route path="AreaPelanggan/BuatPesananBaru" element={<HomePage />} />
            <Route path="AreaPelanggan/:id" element={<HomePage />} />
            <Route path="AreaPelanggan/RatingDanReview" element={<RatingAndReview />} />
          </Route>
        </Routes>
  );
}

export default CustomerRouter;
