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
import AccountValidation from '../pages/customerPages/customerAuth/AccountValidation/AccountValidation';
import ChangePasswordOnForgotPassword from '../pages/customerPages/customerAuth/ChangePasswordOnForgotPassword/ChangePasswordOnForgotPassword';
import ForgotPasswordRequest from '../pages/customerPages/customerAuth/ForgotPasswordRequest/ForgotPasswordRequest';
import CustomerRegistration from '../pages/customerPages/customerAuth/CustomerRegistration/CustomerRegistration';
import ChangePassword from '../pages/customerPages/customerArea/ChangePassword/ChangePassword';
import EditProfile from '../pages/customerPages/customerArea/EditProfile/EditProfile';
import OrderDetails from '../pages/customerPages/customerArea/OrderDetails/OrderDetails';
import CreateNewOrder from '../pages/customerPages/customerArea/CreateNewOrder/CreateNewOrder';

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
    
  }

  return (
        <Routes>
          {/* Public Route */}
          <Route element={<PublicCustomerRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="Galeri" element={<Gallery />} />
            <Route path="TentangKami" element={<AboutUs />} />
            <Route path="StrukPemesanan/:noPesanan" element={<DigitalReceipt />} />
          </Route>

          <Route element={<HandleLoginSuccessfully />}>
            <Route path="Registrasi" element={<CustomerRegistration />} />
            <Route path="Login" element={<LoginCustomer />} />
            <Route path="LupaPassword" element={<ForgotPasswordRequest />} />
            <Route path="ValidasiAkun" element={<AccountValidation />} />
            <Route path="UbahPassword" element={<ChangePasswordOnForgotPassword />} />
          </Route>

          <Route element={<ProtectedCustomerRoute />}>
            <Route path="AreaPelanggan" element={<CustomerArea />} />
            <Route path="AreaPelanggan/:noPesanan" element={<OrderDetails />} />
            <Route path="AreaPelanggan/EditProfil" element={<EditProfile />} />
            <Route path="AreaPelanggan/UbahPassword" element={<ChangePassword />} />
            <Route path="AreaPelanggan/BuatPesananBaru" element={<CreateNewOrder />} />
            <Route path="AreaPelanggan/RatingDanReview/:idPesanan/:noPesanan" element={<RatingAndReview />} />
          </Route>
        </Routes>
  );
}

export default CustomerRouter;
